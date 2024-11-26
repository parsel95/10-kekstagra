// import {getRandomPositiveInteger, getRandomArrayElement} from './util.js';

// /* eslint-disable arrow-body-style */

// const COMMENTLINES = [
//   'Всё отлично!',
//   'В целом всё неплохо. Но не всё.',
//   'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
//   'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
//   'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
//   'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
// ];
// const NAMES = [
//   'Дорохов Даниил',
//   'Попов Матвей',
//   'Фирсова Арина',
//   'Иванова Ева',
//   'Зотова Полина',
//   'Смирнов Денис',
//   'Лапина Виктория',
//   'Туманов Мирон',
//   'Дмитриева Любовь',
//   'Сорокин Даниил',
//   'Токарева Вера',
//   'Новикова Полин',
//   'Исаева Виктория',
//   'Наумова Ярослава',
//   'Сидоров Даниил',
//   'Косарева Элина',
//   'Касьянов Артём',
//   'Булатов Юрий',
//   'Федоров Дмитрий',
//   'Малышева Александр',
//   'Романова Мария',
//   'Дмитриев Александр',
//   'Карпова София',
//   'Фомин Андрей',
//   'Леонова Анастасия'
// ];
// const DESCRIPTIONS = [
//   'Таким образом начало повседневной работы по формированию позиции требуют от нас анализа модели развития.',
//   'Задача организации, в особенности же реализация намеченных плановых заданий обеспечивает широкому кругу (специалистов) участие в формировании системы обучения кадров, соответствует насущным потребностям.',
//   'Летний чил на югах. #тай #отдых #лето #чил #travel #travelgram #summergram #chill',
//   'Тестим новую камеру! #camera #test #new #newcameratest #pic #photo #instaphoto',
//   'Затусили с друзьями на море #laptevsea #north #northeastpassage',
//   'Как же круто тут кормят #food #foodgram #instafood #delicious #yummy',
//   'Отдыхаем... #chill #relax #group #photo',
//   'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
//   'Вот это тачка! #wow #car #carwow #drive',
//   '#fun #party #cool #young',
//   'Господи, это такая милота, я сейчас умру от нежности, у меня закшалил мимимиметр',
//   'Хорошо, когда в жизни есть #друзья, которые вместе со мной могут зайти в #барнарубинштейна и бахнуть #пивка',
//   'Норм',
//   'Как же круто тут кормят #food #foodgram #instafood #delicious #yummy',
//   'Отдыхаем... #chill #relax #group #photo',
//   'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
//   'Вот это тачка! #wow #car #carwow #drive',
//   '#fun #party #cool #young',
//   'Господи, это такая милота, я сейчас умру от нежности, у меня закшалил мимимиметр',
//   'Хорошо, когда в жизни есть #друзья, которые вместе со мной могут зайти в #барнарубинштейна и бахнуть #пивка',
//   'Норм',
//   'Летний чил на югах. #тай #отдых #лето #чил #travel #travelgram #summergram #chill',
//   'Тестим новую камеру! #camera #test #new #newcameratest #pic #photo #instaphoto',
//   'Затусили с друзьями на море #laptevsea #north #northeastpassage',
//   'Как же круто тут кормят #food #foodgram #instafood #delicious #yummy',
//   'Отдыхаем... #chill #relax #group #photo',
// ];

// Создание comment

// const createMessage = () => {
//   return Array.from({ length: getRandomPositiveInteger(1, 2) }, () =>
//     getRandomArrayElement(COMMENTLINES)
//   ).join(' ');
// };

// const createComment = (index) => {
//   return {
//     id: index,
//     avatar: `img/avatar-${getRandomPositiveInteger(1, 6)}.svg`,
//     message: createMessage(),
//     name: getRandomArrayElement(NAMES)
//   };
// };

// Создание объекта с фото

// const createPicture = (index) => {
//   return {
//     id: index,
//     url: `photos/${index}.jpg`,
//     description: getRandomArrayElement(DESCRIPTIONS),
//     likes: getRandomPositiveInteger(1, 999),
//     comments: Array.from(
//       { length: getRandomPositiveInteger(0, 20) },
//       (_, commentIndex) => createComment(commentIndex + 1)
//     ),
//   };
// };

// Создание массива длинной в numberOfPhotos из объектов с фото

// const numberOfPhotos = 25;

// const getPictures = () => {
//   return Array.from({ length: numberOfPhotos }, (_, pictureIndex) =>
//     createPicture(pictureIndex + 1)
//   );
// };

// export { getPictures };
