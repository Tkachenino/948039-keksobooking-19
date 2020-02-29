'use strict';
(function () {
  // Проверка валидации соотношения гостей и комнат
  var MAX_AMOUNT_GUEST = 3;
  var sectionGuest = document.querySelector('#capacity');
  var sectionRoom = document.querySelector('#room_number');
  var formSection = document.querySelector('.ad-form');

  var validityCheckHendler = function () {
    if ((sectionGuest.value <= sectionRoom.value) && (sectionGuest.value !== '0') && (sectionRoom.value !== '100')) {
      sectionRoom.setCustomValidity('');
    } else if ((sectionGuest.value === '0') && (sectionRoom.value === '100')) {
      sectionRoom.setCustomValidity('');
    } else {
      sectionRoom.setCustomValidity('Колличество гостей не может превышать колличество комнат');
    }
  };

  formSection.addEventListener('click', validityCheckHendler);
  // Установка disabled на кол. гостей
  sectionRoom.addEventListener('change', function (evt) {
    (sectionGuest.querySelectorAll('option[disabled]')).forEach(function (items) {
      return items.removeAttribute('disabled');
    });

    if (evt.target.value === '100') {
      sectionGuest.value = '0';

      for (var i = 0; i < MAX_AMOUNT_GUEST;) {
        sectionGuest.querySelector('option[value="' + (++i) + '"]').setAttribute('disabled', true);
      }
    } else {
      sectionGuest.value = evt.target.value;
      sectionGuest.querySelector('option[value="0"]').setAttribute('disabled', true);

      for (var q = Number(evt.target.value); q < MAX_AMOUNT_GUEST;) {
        sectionGuest.querySelector('option[value="' + (++q) + '"]').setAttribute('disabled', true);
      }
    }
  });
  // Установка disabled на кол. гостей при первой загрзке
  sectionGuest.querySelector('option[value="0"]').setAttribute('disabled', true);
  for (var q = Number(sectionRoom.value); q < MAX_AMOUNT_GUEST;) {
    sectionGuest.querySelector('option[value="' + (++q) + '"]').setAttribute('disabled', true);
  }
  // Проверка валидации заголовка обьявления на длину
  var userTitle = document.querySelector('#title');

  userTitle.addEventListener('invalid', function (evt) {
    if (evt.target.validity.tooShort) {
      evt.target.setCustomValidity('Заголовок должен состоять минимум из 30 символов');
    } else if (evt.target.validity.tooLong) {
      evt.target.setCustomValidity('Заголовок не должен превышать 100 символов');
    } else if (evt.target.validity.valueMissing) {
      evt.target.setCustomValidity('Обязательное поле для заполнения');
    } else {
      evt.target.setCustomValidity('');
    }
  });
  // Установка зависимости цены аренды от типа жилья
  var userPrice = document.querySelector('#price');
  var userAppart = document.querySelector('#type');

  var setCostForAppart = function (appart, cost) {
    cost.setAttribute('min', window.card.placeMap[appart.value].cost);
    cost.setAttribute('placeholder', window.card.placeMap[appart.value].cost);
  };

  formSection.addEventListener('change', function () {
    setCostForAppart(userAppart, userPrice);
  });
  // Ограничение типов файлов для загрузки
  document.querySelector('#avatar').setAttribute('accept', 'image/png, image/jpeg');
  document.querySelector('#images').setAttribute('accept', 'image/png, image/jpeg');
  // Ограничение на ввод данных в адресную строку
  var userAddress = document.querySelector('#address');
  userAddress.setAttribute('readonly', true);
  // Установка зависимости на время заселения и выселения
  var userTimeIn = document.querySelector('#timein');
  var userTimeOut = document.querySelector('#timeout');

  userTimeIn.addEventListener('change', function (evt) {
    userTimeOut.value = evt.target.value;
  });

  userTimeOut.addEventListener('change', function (evt) {
    userTimeIn.value = evt.target.value;
  });

  window.form = {
    formSection: formSection,
    setCostForAppart: setCostForAppart,
    userPrice: userPrice,
    userAppart: userAppart
  };
})();
