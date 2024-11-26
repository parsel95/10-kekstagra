import { showAlert } from './util.js';
import { isEscapeKey } from './util.js';

async function getData (callback) {
  try {
    const response = await fetch('https://25.javascript.htmlacademy.pro/kekstagram/data');
    const photos = await response.json();

    callback(photos);

    if (!response.ok) {
      throw new Error(showAlert('Не удалось получить данные с сервера. Попробуйте ещё раз'));
    }
  } catch (error) {
    showAlert('Не удалось получить данные с сервера. Попробуйте ещё раз');
  }
}

// Сообщения при отправке данных

const messageSuccessTemplate = document.querySelector('#success').content.querySelector('.success');
const messageErrorTemplate = document.querySelector('#error').content.querySelector('.error');

const createMessage = (message) => {
  const messageItem = message.cloneNode(true);
  const messageItemInside = messageItem.querySelector(`.${messageItem.className}__inner`);
  const cancelButton = messageItem.querySelector('button');

  document.body.append(messageItem);

  cancelButton.addEventListener('click', () => {
    removeMessage(messageItem, cancelButton);
  });

  const keyDownHandler = (evt) => {
    if (isEscapeKey(evt)) {
      removeMessage(messageItem, cancelButton);
    }
  };

  document.addEventListener('keydown', keyDownHandler);

  document.addEventListener('mousedown', (evt) => {
    if (!messageItemInside.contains(evt.target) && evt.target !== cancelButton) {
      removeMessage(messageItem, cancelButton);
    }
  });

  function removeMessage (modal, button) {
    modal.remove();
    button.removeEventListener('click', removeMessage);
    document.removeEventListener('keydown', keyDownHandler);
    document.removeEventListener('mousedown', removeMessage);
  }
};

export {getData, createMessage, messageSuccessTemplate, messageErrorTemplate};
