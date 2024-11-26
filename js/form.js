import { isEscapeKey, isEnterKey } from './util.js';
import { imgUploadPreview } from './scale.js';
import { imgUploadPreviewPicture } from './effect.js';
import { createMessage, messageSuccessTemplate, messageErrorTemplate } from './fetch.js';

const uploadFile = document.querySelector('#upload-file');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const body = document.querySelector('body');
const uploadCancelButton = imgUploadOverlay.querySelector('#upload-cancel');
const imgUploadForm = document.querySelector('#upload-select-image');
const previewPhoto = document.querySelector('.img-upload__preview img');
const effectsPreviews = document.querySelectorAll('.effects__preview');
const hashtags = document.querySelector('#hashtags');
const comment = document.querySelector('#comment');

const FILE_TYPES = ['jpg', 'jpeg', 'png'];

// Валидация

const pristine = new Pristine(imgUploadForm, {
  classTo: 'text__item',
  errorClass: 'text__item--invalid',
  successClass: 'text__item--valid',
  errorTextParent: 'text__item',
  errorTextTag: 'div',
  errorTextClass: 'text__error'
});

// Логика открытия и закрытия окна

const onModalEscKeydown = (evt) => {
  if (isEscapeKey(evt) && document.activeElement !== hashtags && document.activeElement !== comment) {
    evt.preventDefault();
    closeUserModal();
  }
};

function openUserModal () {
  imgUploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');

  document.addEventListener('keydown', onModalEscKeydown);
}

function closeUserModal () {
  imgUploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  imgUploadPreview.style.transform = 'none';
  imgUploadPreviewPicture.style.filter = 'none';
  imgUploadForm.reset();
  pristine.reset();

  document.removeEventListener('keydown', onModalEscKeydown);
}

uploadCancelButton.addEventListener('keydown', (evt) => {
  if (isEnterKey(evt)) {
    closeUserModal();
  }
});

const onCancelButtonClick = () => {
  closeUserModal();
};

const onFileInputChange = () => {
  openUserModal();

  const file = uploadFile.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    previewPhoto.src = URL.createObjectURL(file);
    effectsPreviews.forEach((preview) => {
      preview.style.backgroundImage = `url('${previewPhoto.src}')`;
    });
  }
};

// Валидация хэштегов

// Проверка, что хэш-тег начинается с символа # (решётка);

const startsWithHash = (string) => string[0] === '#';

const validateFirstLetter = (value) => {
  const tags = value
    .trim()
    .split(' ')
    .filter((tag) => tag.trim().length);
  return tags.every(startsWithHash);
};

pristine.addValidator(
  hashtags,
  validateFirstLetter,
  'Должен начинаться с #'
);

// Проверка, что строка после решётки должна состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д.;

const re = /[^a-zA-Z0-9а-яА-ЯёЁ]/g;

const hasValidSymbols = (string) => !re.test(string.slice(1));

const validateSymbols = (value) => {
  const tags = value
    .trim()
    .split(' ')
    .filter((tag) => tag.trim().length);
  return tags.every(hasValidSymbols);
};

pristine.addValidator(
  hashtags,
  validateSymbols,
  'Должен состоять только из букв и чисел'
);

// Проверка, что максимальная длина одного хэш-тега 20 символов, включая решётку и что хеш-тег не может состоять только из одной решётки;

const MAX_HASHTAG_COUNT = 5;
const MIN_HASHTAG_LENGTH = 2;
const MAX_HASHTAG_LENGTH = 20;

const hasValidLength = (string) =>
  string.length >= MIN_HASHTAG_LENGTH && string.length <= MAX_HASHTAG_LENGTH;

const validateLength = (value) => {
  const tags = value
    .trim()
    .split(' ')
    .filter((tag) => tag.trim().length);
  return tags.length <= MAX_HASHTAG_COUNT ? tags.every(hasValidLength) : tags.every;
};

pristine.addValidator(
  hashtags,
  validateLength,
  'Не меньше 2 и не больше 20 символов'
);

// Проверка, что нельзя указать больше пяти хэш-тегов;

const hasValidCount = (tags) => tags.length <= MAX_HASHTAG_COUNT;

const validateCount = (value) => {
  const tags = value
    .trim()
    .split(' ')
    .filter((tag) => tag.trim().length);
  return hasValidCount(tags);
};

pristine.addValidator(
  hashtags,
  validateCount,
  'Не больше пяти хэш-тегов'
);

// Проверка, что один и тот же хэш-тег не может быть использован дважды и что хэш-теги нечувствительны к регистру (#ХэшТег и #хэштег считаются одним и тем же тегом);

const hasUniqueTags = (tags) => {
  const lowerCaseTags = tags.map((tag) => tag.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};

const validateUniqueTags = (value) => {
  const tags = value
    .trim()
    .split(' ')
    .filter((tag) => tag.trim().length);
  return hasUniqueTags(tags);
};

pristine.addValidator(
  hashtags,
  validateUniqueTags,
  'Все хэш-теги должны быть уникальными'
);

// Хэш-теги разделяются пробелами;

const startsWithSpace = (string) => {
  // eslint-disable-next-line no-shadow
  const re = /(\S+)#/g;
  return re.test(string);
};

const validateSpacesBetween = (value) => {
  const tags = value.substring(1);
  return !startsWithSpace(tags);
};

pristine.addValidator(
  hashtags,
  validateSpacesBetween,
  'Между хэш-тегами должен быть пробел'
);

// Валидация комментария

function validateComment (value) {
  return value.length <= 140;
}

pristine.addValidator(
  comment,
  validateComment,
  'До 140 символов'
);

// Отправка формы

const onFormSubmit = (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();
  if (isValid) {
    const formData = new FormData(evt.target);

    fetch(
      'https://25.javascript.htmlacademy.pro/kekstagram',
      {
        method: 'POST',
        body: formData,
      },
    )
      .then((response) => {
        if (response.ok) {
          closeUserModal();
          createMessage(messageSuccessTemplate);
        } else {
          closeUserModal();
          createMessage(messageErrorTemplate);
        }
      })
      .catch(() => {
        closeUserModal();
        createMessage(messageErrorTemplate);
      });
  }
};

// Обработчики событий

uploadFile.addEventListener('change', onFileInputChange);
uploadCancelButton.addEventListener('click', onCancelButtonClick);
imgUploadForm.addEventListener('submit', onFormSubmit);

uploadCancelButton.addEventListener('keydown', (evt) => {
  if (isEnterKey(evt)) {
    closeUserModal();
  }
});


