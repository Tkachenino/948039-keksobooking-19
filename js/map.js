'use strict';
(function () {
  var BEGIN_COORDS_PIN = 'left: 570px; top: 375px';
  var basketForPin = document.createDocumentFragment();
  var sectionMap = document.querySelector('.map');
  var fieldsetToAdForm = document.querySelectorAll('.ad-form fieldset');
  var fieldsetToMapFilter = document.querySelectorAll('.map__filters fieldset');
  var selectorToMapFilter = document.querySelectorAll('.map__filters select');
  var mainPin = document.querySelector('.map__pin--main');
  var newData = [];
  var filterData = [];
  var amountOfPins = 5;
  // Функция для добавления атрибута disabled
  var setDisabled = function (allSelector) {
    allSelector.forEach(function (index) {
      index.setAttribute('disabled', 'true');
    });
  };
    // Функция для удаления атрибута disabled
  var resetDisabled = function (allSelector) {
    allSelector.forEach(function (index) {
      index.removeAttribute('disabled');
    });
  };
    // Функция для передачи координат mainPin в адресную строку
  var setCoords = function () {
    document.querySelector('#address').value = parseInt(String(mainPin.style.left).replace('px', ''), 10) + parseInt(window.data.pinWidth / 2, 10) + ', '
      + (parseInt(String(mainPin.style.top).replace('px', ''), 10) + parseInt((window.data.pinHeight), 10));
  };
  // Первичная отрисовка disabled формы при загрузке
  var setDisableMap = function () {
    setDisabled(fieldsetToAdForm);
    setDisabled(fieldsetToMapFilter);
    setDisabled(selectorToMapFilter);
  };

  setDisableMap();

  setCoords();
  // Функция возврата карты, пинов и формы в неактивное состояние
  var resetDisableMap = function () {
    sectionMap.classList.remove('map--faded');
    window.form.formSection.classList.remove('ad-form--disabled');
    window.load(successHandler, errorHandler);
    resetDisabled(fieldsetToAdForm);
    resetDisabled(fieldsetToMapFilter);
    resetDisabled(selectorToMapFilter);
  };
  // Сброс с карты всех pin кроме mainPin
  var cleanPins = function () {
    while (document.querySelector('.map__pin:not(.map__pin--main)')) {
      document.querySelector('.map__pin:not(.map__pin--main)').remove();
    }
  };
  // Cброс всех полей формы
  var cleanForm = function () {
    window.form.formSection.reset();
    mainPin.style = BEGIN_COORDS_PIN;
    window.form.setCostForAppart(window.form.userAppart, window.form.userPrice);
    setCoords();
  };
  // Функция отрисовки окна успешной отправки формы
  var successWindowTemplate = document.querySelector('#success').content.querySelector('.success');
  var createSuccessWindows = function () {
    var successWindow = successWindowTemplate.cloneNode(true);
    return successWindow;
  };
  // Функция отрисовки окна при возникновение ошибки
  var errorWindowTemplate = document.querySelector('#error').content.querySelector('.error');
  var createErrorWindows = function (massageError) {
    var errorWindow = errorWindowTemplate.cloneNode(true);
    errorWindow.querySelector('.error__message').innerHTML = massageError;
    return errorWindow;
  };
  // Удаение карточки по Esc
  var pressCloseCardHendler = function (evt) {
    if (evt.key === 'Escape') {
      document.removeEventListener('keydown', pressCloseCardHendler);
      window.data.mapPins.removeChild(document.querySelector('.map__card'));
    }
  };
  // Функция контроля отрисовки одной карточки
  var controlCard = function (ItemCard) {
    if (document.querySelector('.map__card')) {
      window.data.mapPins.removeChild(document.querySelector('.map__card'));
    }
    window.data.mapPins.appendChild(ItemCard);
    document.addEventListener('keydown', pressCloseCardHendler);
    ItemCard.querySelector('.popup__close').addEventListener('click', function () {
      document.removeEventListener('keydown', pressCloseCardHendler);
      window.data.mapPins.removeChild(ItemCard);
    });
  };
  // Функция отрисовки информ окна при ошибке загрузки данных
  var errorHandler = function (errorMessage) {
    document.querySelector('main').appendChild(createErrorWindows(errorMessage));
    document.querySelector('.error__button').addEventListener('keydown', pressCloseErrorWinHendler);
    document.querySelector('.error__button').addEventListener('click', pressCloseErrorWinHendler);
  };
  // Функция отрисовки pins при удачной загрузке данных
  var successHandler = function (info) {
    newData = info;
    info = info.slice(0, amountOfPins);
    info.forEach(function (currentItem) {
      var pinClone = window.pin.renderAddPin(currentItem);
      var openPopup = function () {
        var getInfoTurgetCard = window.card.renderAddCard(currentItem);
        controlCard(getInfoTurgetCard);
      };
      pinClone.addEventListener('click', openPopup);
      basketForPin.appendChild(pinClone);
    });
    window.data.mapPins.appendChild(basketForPin);
  };
  // Слшуатель на вывод из disable по нажатию мыши на mainPin
  mainPin.addEventListener('mousedown', function (evt) {
    if (evt.button === 0 && sectionMap.classList.contains('map--faded')) {
      resetDisableMap();
    }
  });
  // Слшуатель на вывод из disable по нажатию Enter на mainPin
  mainPin.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter' && sectionMap.classList.contains('map--faded')) {
      resetDisableMap();
    }
  });
  // Функция кастомного сброса полей формы с обьявлением слушателей на клик и Enter
  var pressResetHendler = function (evt) {
    if (evt.button === 0 || evt.key === 'Enter') {
      cleanForm();
    }
    evt.preventDefault();
  };

  document.querySelector('.ad-form__reset').addEventListener('keydown', pressResetHendler);
  document.querySelector('.ad-form__reset').addEventListener('click', pressResetHendler);
  // Слушатель на отправку формы с кастомным поведением
  window.form.formSection.addEventListener('submit', function (evt) {
    window.upload(new FormData(window.form.formSection), function () {
      sectionMap.classList.add('map--faded');
      window.form.formSection.classList.add('ad-form--disabled');
      setDisableMap();
      cleanPins();
      cleanForm();
      sectionMap.appendChild(createSuccessWindows());
      document.addEventListener('keydown', pressCloseSuccsesWinHendler);
      document.addEventListener('click', pressCloseSuccsesWinHendler);
    },
    function (massageError) {
      document.querySelector('main').appendChild(createErrorWindows(massageError));
      document.addEventListener('keydown', pressCloseErrorWinHendler);
      document.addEventListener('click', pressCloseErrorWinHendler);
    });
    evt.preventDefault();
  });
  // Слушатель на закрытие окна успешной отправки формы
  var pressCloseSuccsesWinHendler = function (evt) {
    if (evt.key === 'Escape' || evt.button === 0) {
      sectionMap.removeChild(document.querySelector('.success'));
      document.removeEventListener('keydown', pressCloseSuccsesWinHendler);
      document.removeEventListener('click', pressCloseSuccsesWinHendler);
    }
  };
  // Слушатель на закрытие окна ошибки
  var pressCloseErrorWinHendler = function (evt) {
    if (evt.key === 'Escape' || evt.button === 0) {
      document.querySelector('main').removeChild(document.querySelector('.error'));
      document.removeEventListener('keydown', pressCloseErrorWinHendler);
      document.removeEventListener('click', pressCloseErrorWinHendler);
    }
  };
  // Функция отрисовки pins с использованием фильров
  var filterMap = function () {
    if (document.querySelector('.map__filters').querySelector('#housing-type').value === 'any') {
      filterData = newData.slice(0, amountOfPins);
    } else {
      filterData = newData.filter(function (dataItem) {
        return dataItem.offer.type === document.querySelector('.map__filters').querySelector('#housing-type').value;
      }).slice(0, amountOfPins);
    }
    filterData.forEach(function (currentItem) {
      var pinClone = window.pin.renderAddPin(currentItem);
      var openPopup = function () {
        var getInfoTurgetCard = window.card.renderAddCard(currentItem);
        controlCard(getInfoTurgetCard);
      };
      pinClone.addEventListener('click', openPopup);
      basketForPin.appendChild(pinClone);
    });
    window.data.mapPins.appendChild(basketForPin);
  };
  // Слушатель на отрисовку pins по изменению фильтра
  document.querySelector('.map__filters').addEventListener('change', function () {
    cleanPins();
    if (document.querySelector('.map__card')) {
      window.data.mapPins.removeChild(document.querySelector('.map__card'));
    }
    filterMap();
  });

  window.map = {
    setCoords: setCoords
  };
})();
