'use strict';
(function () {
  // Границы карты по Y
  var MIN_Y_MAP = 130;
  var MAX_Y_MAP = 630;
  // Поиск габаритов pin
  var mapPins = document.querySelector('.map__pins');
  var mapPinsWidth = parseInt(mapPins.offsetWidth, 10);
  var pin = document.querySelector('.map__pin');
  var pinWidth = parseInt(pin.clientWidth, 10);
  var pinHeight = parseInt(pin.clientHeight, 10);
  // Вывод данных в глобальное окружение
  window.data = {
    mapPins: mapPins,
    pin: pin,
    mapPinsWidth: mapPinsWidth,
    pinWidth: pinWidth,
    pinHeight: pinHeight,
    MIN_Y_MAP: MIN_Y_MAP,
    MAX_Y_MAP: MAX_Y_MAP
  };
})();
