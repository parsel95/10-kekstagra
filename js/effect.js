const effectLevelSlider = document.querySelector('.effect-level__slider');
const effectLevelValue = document.querySelector('.effect-level__value');
const effects = document.querySelector('.effects');
const radioButtonsArray = Array.from(effects.querySelectorAll('input[type="radio"]'));
const imgUploadPreviewPicture = document.querySelector('.img-upload__preview img');
let currentEffect = '';

effectLevelValue.value = 100;

noUiSlider.create(effectLevelSlider, {
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
  step: 1,
  connect: 'lower',
});

effectLevelSlider.classList.add('hidden');

const getFilterFromCurrentEffect = () => {
  switch (currentEffect) {
    case 'none':
      return 'none';

    case 'grayscale':
      return `grayscale(${effectLevelValue.value})`;

    case 'sepia':
      return `sepia(${effectLevelValue.value})`;

    case 'invert':
      return `invert(${effectLevelValue.value }%`;

    case 'blur':
      return `blur(${effectLevelValue.value }px)`;

    case 'brightness':
      return `brightness(${effectLevelValue.value})`;

    default:
      return '';
  }
};

function updateFilter() {
  const newFilter = getFilterFromCurrentEffect();
  imgUploadPreviewPicture.style.filter = newFilter;
}

const setCurrentEffect = (className) => {
  switch (className) {
    case 'effects__preview--none':
      effectLevelSlider.classList.add('hidden');
      currentEffect = 'none';
      break;

    case 'effects__preview--chrome':
      currentEffect = 'grayscale';
      effectLevelSlider.classList.remove('hidden');
      effectLevelSlider.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 1,
        },
        step: 0.1,
      });
      effectLevelSlider.noUiSlider.set(1);
      break;

    case 'effects__preview--sepia':
      currentEffect = 'sepia';
      effectLevelSlider.classList.remove('hidden');
      effectLevelSlider.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 1,
        },
        step: 0.1,
      });
      effectLevelSlider.noUiSlider.set(1);
      break;

    case 'effects__preview--marvin':
      currentEffect = 'invert';
      effectLevelSlider.classList.remove('hidden');
      effectLevelSlider.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 100,
        },
        step: 1,
      });
      effectLevelSlider.noUiSlider.set(100);
      break;

    case 'effects__preview--phobos':
      currentEffect = 'blur';
      effectLevelSlider.classList.remove('hidden');
      effectLevelSlider.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 3,
        },
        step: 0.1,
      });
      effectLevelSlider.noUiSlider.set(3);
      break;

    case 'effects__preview--heat':
      currentEffect = 'brightness';
      effectLevelSlider.classList.remove('hidden');
      effectLevelSlider.noUiSlider.updateOptions({
        range: {
          min: 1,
          max: 3,
        },
        step: 0.1,
      });
      effectLevelSlider.noUiSlider.set(3);
      break;

    default:
      break;
  }

  requestAnimationFrame(() => {
    updateFilter();
  });
};


const handleChange = () => {
  const selectedIndex = radioButtonsArray.findIndex((checkbox) => checkbox.checked);
  const previewSpan = radioButtonsArray[selectedIndex].closest('.effects__item').querySelector('.effects__preview');
  const classPreviewSpan = previewSpan.className.split(' ')[2];

  imgUploadPreviewPicture.classList = '';
  imgUploadPreviewPicture.classList.add(classPreviewSpan);

  setCurrentEffect(classPreviewSpan);
};

radioButtonsArray.forEach((radioButton) => {
  radioButton.addEventListener('change', handleChange);
});

effectLevelSlider.noUiSlider.on('update', () => {
  effectLevelValue.value = effectLevelSlider.noUiSlider.get();

  requestAnimationFrame(() => {
    updateFilter();
  });
});

export {imgUploadPreviewPicture};
