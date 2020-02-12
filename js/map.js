'use strict';
(function () {
  var basketForPin = document.createDocumentFragment();

  var pressClosePopupHendler = function (evt) {
    if (evt.key === 'Escape') {
      document.removeEventListener('keydown', pressClosePopupHendler);
      window.data.map.removeChild(document.querySelector('.map__card'));
    }
  };

  window.data.addArr.forEach(function (currentItem) {
    var pinClone = window.pin.renderAddPin(currentItem);
    var openPopup = function () {
      var getInfoTurgetCard = window.card.renderAddCard(currentItem);
      if (document.querySelector('.map__card')) {
        window.data.map.removeChild(document.querySelector('.map__card'));
      }
      window.data.map.appendChild(getInfoTurgetCard);
      document.addEventListener('keydown', pressClosePopupHendler);

      getInfoTurgetCard.querySelector('.popup__close').addEventListener('click', function () {
        document.removeEventListener('keydown', pressClosePopupHendler);
        window.data.map.removeChild(getInfoTurgetCard);
      });
    };
    pinClone.addEventListener('click', openPopup);
    basketForPin.appendChild(pinClone);
  });

  window.map = {
    basketForPin: basketForPin
  };
})();
