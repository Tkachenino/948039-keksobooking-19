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
// создает массив данных имеющихся пользователей
var buildAdd = function (array) {
  array.push({
    author: {
      avatar: 'img/avatars/user0' + getRandom(1, 8) + '.png'
    },
    offer: {
      title: titles[getRandom(0, 3)],
      address: '600, 350',
      price: '400 т.р.',
      type: 'palace',
      rooms: 4,
      guests: 2,
      checkin: '12:00',
      checkout: '13:00',
      features: 'push arr',
      description: '',
      photos: 'arr photo'
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

var fragment = document.createDocumentFragment();

addArr.forEach(function (currentItem) {
  fragment.appendChild(renderAddPin(currentItem));

});

map.appendChild(fragment);
