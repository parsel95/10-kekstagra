// Уменьшение и увелчение изображения в форме

const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger  = document.querySelector('.scale__control--bigger');
const scaleControlValue  = document.querySelector('.scale__control--value');
const imgUploadPreview = document.querySelector('.img-upload__preview');

scaleControlSmaller.addEventListener('click', () => {
  const scaleControlCertainValue = Math.round(parseInt(scaleControlValue.value, 10));

  if (scaleControlCertainValue > 25) {
    scaleControlValue.value = `${scaleControlCertainValue - 25}%`;
    scaleControlValue.dispatchEvent(new Event('change'));
  }
});

scaleControlBigger.addEventListener('click', () => {
  const scaleControlCertainValue = Math.round(parseInt(scaleControlValue.value, 10));

  if (scaleControlCertainValue < 100) {
    scaleControlValue.value = `${scaleControlCertainValue + 25}%`;
    scaleControlValue.dispatchEvent(new Event('change'));
  }
});

scaleControlValue.addEventListener('change', () => {
  const scaleControlCertainValue = Math.round(parseInt(scaleControlValue.value, 10));

  imgUploadPreview.style.transform = `scale(${scaleControlCertainValue/100})`;
});

export {imgUploadPreview};
