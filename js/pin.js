'use strict';
(function () {
  var similarAddPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  var renderAddPin = function (element) {
    var AddPin = similarAddPinTemplate.cloneNode(true);
    AddPin.style = 'left:' + element.location.x + 'px; top:' + element.location.y + 'px;';
    AddPin.querySelector('img').setAttribute('src', element.author.avatar);
    AddPin.querySelector('img').setAttribute('alt', element.offer.title);
    AddPin.classList.add('unic');
    return AddPin;
  };

  window.pin = {
    renderAddPin: renderAddPin
  };
})();
