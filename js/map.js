'use strict';
(function () {
  var basketForPin = document.createDocumentFragment();
  var sectionMap = document.querySelector('.map');
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
  var fieldsetToMapFilter = document.querySelectorAll('.map__filters fieldset');
  var selectorToMapFilter = document.querySelectorAll('.map__filters select');

  var setDisableMap = function () {
    setDisabled(fieldsetToAdForm);
    setDisabled(fieldsetToMapFilter);
    setDisabled(selectorToMapFilter);
  };

  setDisableMap();

  var mainPin = document.querySelector('.map__pin--main');
  var setCoords = function () {
    document.querySelector('#address').value = parseInt(String(mainPin.style.left).replace('px', ''), 10) + parseInt(window.data.pinWidth / 2, 10) + ' '
     + (parseInt(String(mainPin.style.top).replace('px', ''), 10) + parseInt((window.data.pinHeight), 10));
  };
  setCoords();
  var resetDisableMap = function () {
    sectionMap.classList.remove('map--faded');
    window.form.formSection.classList.remove('ad-form--disabled');
    window.load(successHandler, errorHandler);
    resetDisabled(fieldsetToAdForm);
    resetDisabled(fieldsetToMapFilter);
    resetDisabled(selectorToMapFilter);
  };
  mainPin.addEventListener('mousedown', function (evt) {
    if (evt.button === 0 && sectionMap.classList.contains('map--faded')) {
      resetDisableMap();
    }
  });

  mainPin.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter' && sectionMap.classList.contains('map--faded')) {
      resetDisableMap();
    }
  });

  window.map = {
    setCoords: setCoords
  };

  var cleanPins = function () {
    while (document.querySelector('.map__pin:not(.map__pin--main)')) {
      document.querySelector('.map__pin:not(.map__pin--main)').remove();
    }
  };

  window.form.formSection.addEventListener('submit', function (evt) {
    window.upload(new FormData(window.form.formSection), function () {
      sectionMap.classList.add('map--faded');
      window.form.formSection.classList.add('ad-form--disabled');
      setDisableMap();
      cleanPins();
    });
    evt.preventDefault();
  });
})();
