'use strict';
var numberOfAdd = 8;
var arr = [];
var addArr = [];
var getRandom = function (n) {
  return Math.round(Math.random() * n)
};
// Cоздает массив случайной уникальной последоватльности 8 элементов
var createArr = function (n) {
  var i = 1;
  arr[0] = getRandom(n-1) + 1;
  while (arr.length < n) {
    var a = getRandom(n);
    if (arr.indexOf(a) === -1 && a !== 0) {
      arr[i] = a;
      i++;
    }
  }
};
// создает массив данных имеющихся пользователей
var buildAdd = function (arr) {
arr.push({
  author: {
    avatar: 'img/avatars/iser0' + 1 + '.png'
  },
  offer: {
    title: 'Царские хоромы',
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
    x: getRandom(400),
    y: getRandom(630)
  }
})
};

for ( var j = 0; j < numberOfAdd; j++ ) {
  buildAdd(addArr);
}
console.log(addArr);

document.querySelector('.map').classList.remove('map--faded');

var similarMap = document.querySelector('.map__pins');
var similarAddPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var renderAddPin = function (arr) {
  var AddPin = similarAddPinTemplate.cloneNode(true);
  AddPin.querySelector('map__pin').style = 'left: ' + arr.location.x + 'px; top: ' + arr.location.y + 'px;';
  AddPin.src = arr.author.avatar;
  AddPin.alt = 'Продам гараж';
  return AddPin;
};

var fragment = document.createDocumentFragment();
for (var q = 0; q < addArr.length; q++) {
  fragment.appendChild(renderAddPin(addArr));
}

similarMap.appendChild(fragment);
