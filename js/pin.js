'use strict';
(function () {
  var PINS_WIDTH = 50;
  var PINS_HEIGHT = 50;
  // Функция для отрисовки pin
  var similarAddPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var renderAddPin = function (element) {
    var AddPin = similarAddPinTemplate.cloneNode(true);
    AddPin.style = 'left:' + (element.location.x - PINS_WIDTH / 2) + 'px; top:' + (element.location.y - PINS_HEIGHT) + 'px;';
    AddPin.querySelector('img').setAttribute('src', element.author.avatar);
    AddPin.querySelector('img').setAttribute('alt', element.offer.title);
    return AddPin;
  };

  window.pin = {
    renderAddPin: renderAddPin
  };
})();
