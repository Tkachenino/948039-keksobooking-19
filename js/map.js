'use strict';
(function () {
  var basketForPin = document.createDocumentFragment();

  var setDisabled = function (allSelector) {
    allSelector.forEach(function (index) {
      index.setAttribute('disabled', 'true');
    });
  };
  var resetDisabled = function (allSelector) {
    allSelector.forEach(function (index) {
      index.removeAttribute('disabled');
    });
  };

  var fieldsetToAdForm = document.querySelectorAll('.ad-form fieldset');
  setDisabled(fieldsetToAdForm);
  var fieldsetToMapFilter = document.querySelectorAll('.map__filters fieldset');
  setDisabled(fieldsetToMapFilter);
  var selectorToMapFilter = document.querySelectorAll('.map__filters select');
  setDisabled(selectorToMapFilter);

  var mainPin = document.querySelector('.map__pin--main');
  var setCoords = function () {
    document.querySelector('#address').value = mainPin.style.left + ' ' + mainPin.style.top;
  };
  setCoords();
  mainPin.addEventListener('mousedown', function (evt) {
    if (evt.button === 0) {
      document.querySelector('.map').classList.remove('map--faded');
      document.querySelector('.ad-form').classList.remove('ad-form--disabled');
      resetDisabled(fieldsetToAdForm);
      resetDisabled(fieldsetToMapFilter);
      resetDisabled(selectorToMapFilter);
      window.data.map.appendChild(basketForPin);
    }
  });

  mainPin.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      document.querySelector('.map').classList.remove('map--faded');
      document.querySelector('.ad-form').classList.remove('ad-form--disabled');
      resetDisabled(fieldsetToAdForm);
      resetDisabled(fieldsetToMapFilter);
      resetDisabled(selectorToMapFilter);
      document.querySelector('#address').value = mainPin.style.left + ' ' + mainPin.style.top;
      window.data.map.appendChild(basketForPin);
    }
  });

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
    setCoords: setCoords
  };
})();
