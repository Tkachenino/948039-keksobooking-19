'use strict';
(function () {
  var MIN_Y_MAP = 130;
  var MAX_Y_MAP = 630;
  var numberOfAdd = 8;
  var addArr = [];
  var titles = ['Уютное гнездышко для молодоженов', 'Маленькая квартирка рядом с парком', 'Небольшая лавочка в парке', 'Императорский дворец в центре Токио'];
  var getRandom = function (min, max) {
    return Math.round(min + (Math.random() * (max - 1)));
  };

  var map = document.querySelector('.map__pins');
  var mapWidth = parseInt(map.offsetWidth, 10);
  var pin = document.querySelector('.map__pin');
  var pinWidth = parseInt(pin.clientWidth, 10);
  var pinHeight = parseInt(pin.clientHeight, 10);
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
        x: getRandom(pinWidth, (mapWidth - pinWidth)),
        y: getRandom((MIN_Y_MAP - pinHeight), (MAX_Y_MAP - pinHeight))
      }
    });
  };

  for (var j = 0; j < numberOfAdd; j++) {
    buildAdd(addArr);
  }

  window.data = {
    addArr: addArr,
    map: map,
    pin: pin,
    mapWidth: mapWidth,
    pinWidth: pinWidth,
    pinHeight: pinHeight,
    MIN_Y_MAP: MIN_Y_MAP,
    MAX_Y_MAP: MAX_Y_MAP
  };
})();
