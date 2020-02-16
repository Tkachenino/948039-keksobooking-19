'use strict';
(function () {
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

  var userPrice = document.querySelector('#price');
  var userAppart = document.querySelector('#type');

  var setCostForAppart = function (appart, cost) {
    cost.setAttribute('min', window.card.typeOfPlace[appart.value].cost);
    cost.setAttribute('placeholder', window.card.typeOfPlace[appart.value].cost);
  };

  formSection.addEventListener('change', function () {
    setCostForAppart(userAppart, userPrice);
  });

  document.querySelector('#avatar').setAttribute('accept', 'image/png, image/jpeg');
  document.querySelector('#images').setAttribute('accept', 'image/png, image/jpeg');


  var userAddress = document.querySelector('#address');
  userAddress.setAttribute('readonly', true);

  var userTimeIn = document.querySelector('#timein');
  var userTimeOut = document.querySelector('#timeout');

  userTimeIn.addEventListener('change', function () {
    userTimeOut.value = userTimeIn.value;
  });
  userTimeOut.addEventListener('change', function () {
    userTimeIn.value = userTimeOut.value;
  });

  window.form = {
    formSection: formSection
  };
})();
