'use strict';
(function () {
  // Проверка валидации соотношения гостей и комнат
  var sectionGuest = document.querySelector('#capacity');
  var sectionRoom = document.querySelector('#room_number');
  var formSection = document.querySelector('.ad-form');

  var checkValidityHendler = function () {
    if ((parseInt(sectionGuest.value, 10) <= parseInt(sectionRoom.value, 10)) && parseInt(sectionGuest.value, 10) !== 0 && parseInt(sectionRoom.value, 10) !== 100) {
      sectionRoom.setCustomValidity('');
    } else if (parseInt(sectionGuest.value, 10) === 0 && parseInt(sectionRoom.value, 10) === 100) {
      sectionRoom.setCustomValidity('');
    } else {
      sectionRoom.setCustomValidity('Опачки, ошибка');
    }
  };

  formSection.addEventListener('click', checkValidityHendler);
  // Проверка валидации заголовка обьявления на длину
  var userTitle = document.querySelector('#title');
  userTitle.addEventListener('invalid', function () {
    if (userTitle.validity.tooShort) {
      userTitle.setCustomValidity('Заголовок должен состоять минимум из 30 символов');
    } else if (userTitle.validity.tooLong) {
      userTitle.setCustomValidity('Заголовок не должен превышать 100 символов');
    } else if (userTitle.validity.valueMissing) {
      userTitle.setCustomValidity('Обязательное поле для заполнения');
    } else {
      userTitle.setCustomValidity('');
    }
  });
  // Установка зависимости цены аренды от типа жилья
  var userPrice = document.querySelector('#price');
  var userAppart = document.querySelector('#type');

  var setCostForAppart = function (appart, cost) {
    cost.setAttribute('min', window.card.typeOfPlaceMap[appart.value].cost);
    cost.setAttribute('placeholder', window.card.typeOfPlaceMap[appart.value].cost);
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

  userTimeIn.addEventListener('change', function () {
    userTimeOut.value = userTimeIn.value;
  });
  userTimeOut.addEventListener('change', function () {
    userTimeIn.value = userTimeOut.value;
  });

  window.form = {
    formSection: formSection,
    setCostForAppart: setCostForAppart,
    userPrice: userPrice,
    userAppart: userAppart
  };
})();
