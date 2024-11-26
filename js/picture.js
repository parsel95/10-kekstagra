import { showBigPicture } from './bigpicture.js';

const container = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const createPicture = (data) => {
  const pictureItem = pictureTemplate.cloneNode(true);

  pictureItem.querySelector('.picture__img').src = data.url;
  pictureItem.querySelector('.picture__img').alt = data.description;
  pictureItem.querySelector('.picture__likes').textContent = data.likes;
  pictureItem.querySelector('.picture__comments').textContent = data.comments.length;

  pictureItem.addEventListener('click', () => {
    showBigPicture(data);
  });

  return pictureItem;
};

const renderPictures = (pictures) => {
  container.querySelectorAll('.picture').forEach((element) => element.remove());
  const pictureFragment = document.createDocumentFragment();
  pictures.forEach((pictureItem) => {
    const pictureElement = createPicture(pictureItem);
    pictureFragment.append(pictureElement);
  });

  container.appendChild(pictureFragment);
};

export {renderPictures, createPicture};

