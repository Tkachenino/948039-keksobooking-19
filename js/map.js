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

  var pressClosePopupHendler = function (evt) {
    if (evt.key === 'Escape') {
      document.removeEventListener('keydown', pressClosePopupHendler);
      window.data.map.removeChild(document.querySelector('.map__card'));
    }
  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: #ff5635;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  var successHandler = (function (info) {
    info.forEach(function (currentItem) {
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
    window.data.map.appendChild(basketForPin);
  });


  var fieldsetToAdForm = document.querySelectorAll('.ad-form fieldset');
  setDisabled(fieldsetToAdForm);
  var fieldsetToMapFilter = document.querySelectorAll('.map__filters fieldset');
  setDisabled(fieldsetToMapFilter);
  var selectorToMapFilter = document.querySelectorAll('.map__filters select');
  setDisabled(selectorToMapFilter);

  var mainPin = document.querySelector('.map__pin--main');
  var setCoords = function () {
    document.querySelector('#address').value = parseInt(String(mainPin.style.left).replace('px', ''), 10) + parseInt(window.data.pinWidth / 2, 10) + ' '
     + (parseInt(String(mainPin.style.top).replace('px', ''), 10) + parseInt((window.data.pinHeight), 10));
  };
  setCoords();
  var resetDisableMap = function () {
    document.querySelector('.map').classList.remove('map--faded');
    document.querySelector('.ad-form').classList.remove('ad-form--disabled');
    window.load(successHandler, errorHandler);
    resetDisabled(fieldsetToAdForm);
    resetDisabled(fieldsetToMapFilter);
    resetDisabled(selectorToMapFilter);
  };
  mainPin.addEventListener('mousedown', function (evt) {
    if (evt.button === 0 && document.querySelector('.map').classList.contains('map--faded')) {
      resetDisableMap();
    }
  });

  mainPin.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter' && document.querySelector('.map').classList.contains('map--faded')) {
      resetDisableMap();
    }
  });

  window.map = {
    setCoords: setCoords
  };
})();
