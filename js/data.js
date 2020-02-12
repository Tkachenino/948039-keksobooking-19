'use strict';
(function () {
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

  window.data = {
    addArr: addArr,
    map: map
  };
})();
