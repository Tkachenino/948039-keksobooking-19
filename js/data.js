'use strict';
(function () {
  var MIN_Y_MAP = 130;
  var MAX_Y_MAP = 630;

  var map = document.querySelector('.map__pins');
  var mapWidth = parseInt(map.offsetWidth, 10);
  var pin = document.querySelector('.map__pin');
  var pinWidth = parseInt(pin.clientWidth, 10);
  var pinHeight = parseInt(pin.clientHeight, 10);

  window.data = {
    map: map,
    pin: pin,
    mapWidth: mapWidth,
    pinWidth: pinWidth,
    pinHeight: pinHeight,
    MIN_Y_MAP: MIN_Y_MAP,
    MAX_Y_MAP: MAX_Y_MAP
  };
})();
