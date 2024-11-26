import { isEscapeKey } from './util.js';

const bigPicture = document.querySelector('.big-picture');
const commentList = bigPicture.querySelector('.social__comments');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const body = document.querySelector('body');
const cancelButton = bigPicture.querySelector('.big-picture__cancel');
const commentsCount = bigPicture.querySelector('.comments-count');
const commentsActualCount = bigPicture.querySelector('.comments-actual-count');

// Реализация кнопки "загрузить ещё"

const increaseCountComments = () => {
  let count = parseInt(commentsActualCount.textContent, 10);
  const allCount = parseInt(commentsCount.textContent, 10);
  if (allCount > 5 && count + 5 < allCount) {
    count += 5;
    commentsActualCount.textContent = count;
  } else {
    count = count + (allCount - count);
    commentsActualCount.textContent = count;
  }

  if (commentsCount.textContent === commentsActualCount.textContent) {
    commentsLoader.classList.add('hidden');
  }
};

const createCommentArray = () => {
  const AllComments = bigPicture.querySelectorAll('.social__comment');
  const commentListArray = Array.from(AllComments);
  return commentListArray;
};

const createArrayWithoutHidden = () => {
  const filteredArray = createCommentArray().filter((comment) => !comment.classList.contains('hidden'));
  return filteredArray;
};

const addComments = (array, startIndex, className) => {
  array.forEach((comment, i) => {
    if (i < startIndex) {
      comment.classList.remove(className);
    }
  });
};

const addNewComments = () => {
  increaseCountComments();
  addComments(createCommentArray(), commentsActualCount.textContent, 'hidden');
};

// Рендер комментариев

const createComment = ({avatar, name, message}) => {
  const comment = document.createElement('li');
  comment.innerHTML = '<img class="social__picture" src="" alt=""width="35" height="35"><p class="social__text">{{текст комментария}}</p>';
  comment.classList.add('social__comment');
  comment.classList.add('hidden');

  comment.querySelector('.social__picture').src = avatar;
  comment.querySelector('.social__picture').alt = name;
  comment.querySelector('.social__text').textContent = message;

  return comment;
};

const renderComments = (comments) => {
  commentList.innerHTML = '';

  const fragment = document.createDocumentFragment();
  comments.forEach((comment, index) => {
    const commentElement = createComment(comment);
    if (index < 5) {
      commentElement.classList.remove('hidden');
    }
    fragment.append(commentElement);
  });

  commentList.append(fragment);
  commentsCount.textContent = commentList.children.length;
  commentsActualCount.textContent = createArrayWithoutHidden().length;

  if (commentsCount.textContent === commentsActualCount.textContent) {
    commentsLoader.classList.add('hidden');
  }
};

const hideBigPicture = () => {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscKeyDown);
  document.removeEventListener('click', addNewComments);
  commentsLoader.classList.remove('hidden');
};

function onEscKeyDown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    hideBigPicture();
  }
}

const onCancelButtonClick = () => {
  hideBigPicture();
};

const renderPictureDetails = ({ url, likes, description }) => {
  bigPicture.querySelector('.big-picture__img img').src = url;
  bigPicture.querySelector('.big-picture__img img').alt = description;
  bigPicture.querySelector('.likes-count').textContent = likes;
  bigPicture.querySelector('.social__caption').textContent = description;
};

const showBigPicture = (data) => {
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onEscKeyDown);

  renderPictureDetails(data);
  renderComments(data.comments);

  commentsLoader.addEventListener('click', addNewComments);
};

cancelButton.addEventListener('click', onCancelButtonClick);

export { showBigPicture };
