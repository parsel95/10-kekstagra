/* eslint-disable arrow-body-style */
import { renderPictures } from './picture.js';
import { getData } from './fetch.js';
import { setOnFilterClick, turnFilterOn, filterPictures } from './filters.js';
import './form.js';
import './scale.js';
import './effect.js';
import './fetch.js';

const onGetDataSuccess = (data) => {
  turnFilterOn(data);
  renderPictures(filterPictures());
  setOnFilterClick(renderPictures);
};

getData(onGetDataSuccess);

