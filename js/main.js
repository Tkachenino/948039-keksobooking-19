'use strict';
var numberOfAdd = 8;
var addArr = [];
var titles = ['Уютное гнездышко для молодоженов', 'Маленькая квартирка рядом с парком', 'Небольшая лавочка в парке', 'Императорский дворец в центре Токио'];
var getRandom = function (min, max) {
  return Math.round(min + (Math.random() * (max - 1)));
};

var map = document.querySelector('.map__pins');
var mapWidth = map.offsetWidth;
var pin = document.querySelector('.map__pin');
var pinWidth = pin.clientWidth;
var pinHeight = pin.clientHeight;
var typeOfPlace = {palace: 'Дворец', flat: 'Квартира', bungalo: 'Бунгало', house: 'Дом'};

// создает массив данных имеющихся пользователей
var buildAdd = function (array) {
  array.push({
    author: {
      avatar: 'img/avatars/user0' + getRandom(1, 8) + '.png'
    },
    offer: {
      title: titles[getRandom(0, 3)],
      address: '600, 350',
      price: '400',
      type: 'palace',
      rooms: 4,
      guests: 2,
      checkin: '12:00',
      checkout: '13:00',
      features: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
      description: 'Замечательный дворец в старинном центре города. Только для тех кто может себе позволить дворец. Лакеев и прочих жокеев просим не беспокоить.',
      photos: 'http://o0.github.io/assets/images/tokyo/hotel1.jpg'
    },
    location: {
      x: getRandom(pinWidth, mapWidth) - pinWidth,
      y: getRandom(130, 630) - pinHeight
    }
  });
};

for (var j = 0; j < numberOfAdd; j++) {
  buildAdd(addArr);
}

document.querySelector('.map').classList.remove('map--faded');

var similarAddPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var renderAddPin = function (element) {
  var AddPin = similarAddPinTemplate.cloneNode(true);
  AddPin.style = 'left:' + element.location.x + 'px; top:' + element.location.y + 'px;';
  AddPin.querySelector('img').setAttribute('src', element.author.avatar);
  AddPin.querySelector('img').setAttribute('alt', element.offer.title);
  return AddPin;
};
var createFeature = function (element) {
  var newFeatures = document.createDocumentFragment();
  element.offer.features.forEach(function (currentIndex) {
    var newFeature = document.createElement('li');
    newFeature.classList.add('popup__feature');
    newFeature.classList.add('popup__feature--' + currentIndex);
    newFeatures.appendChild(newFeature);
  });
  return newFeatures;
};

var similarAdddCardTemplate = document.querySelector('#card').content.querySelector('.map__card');
var renderAddCard = function (element) {
  var addCard = similarAdddCardTemplate.cloneNode(true);
  addCard.querySelector('.popup__title').innerHTML = element.offer.title;
  addCard.querySelector('.popup__text--address').innerHTML = element.offer.address;
  addCard.querySelector('.popup__text--price').innerHTML = element.offer.price + 'Р/ночь';
  addCard.querySelector('.popup__type').innerHTML = typeOfPlace[element.offer.type];
  addCard.querySelector('.popup__text--capacity').innerHTML = element.offer.rooms + ' комнаты для ' + element.offer.guests + ' гостей';
  addCard.querySelector('.popup__text--time').innerHTML = 'Заезд после ' + element.offer.checkin + ', выезд до ' + element.offer.checkout;
  addCard.querySelector('.popup__features').appendChild(createFeature(element));
  addCard.querySelector('.popup__photos').querySelector('img').src = element.offer.photos;
  addCard.querySelector('.popup__avatar').src = element.author.avatar;
  return addCard;
};

map.appendChild(renderAddCard(addArr[0]));

var fragment = document.createDocumentFragment();
addArr.forEach(function (currentItem) {
  fragment.appendChild(renderAddPin(currentItem));
});

map.appendChild(fragment);
