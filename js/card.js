'use strict';
(function () {
  var typeOfPlace = {
    palace: {
      name: 'Дворец',
      cost: 10000
    },
    flat: {
      name: 'Квартира',
      cost: 1000
    },
    bungalo: {
      name: 'Бунгало',
      cost: 0
    },
    house: {
      name: 'Дом',
      cost: 5000
    }
  };
  var mainPin = document.querySelector('.map__pin--main');

  var createFeature = function (element) {
    var newFeatures = document.createDocumentFragment();
    element.offer.features.forEach(function (currentIndex) {
      var newFeature = document.createElement('li');
      newFeature.classList.add('popup__feature');
      newFeature.classList.add('popup__feature--' + currentIndex);
      newFeatures.appendChild(newFeature);
    });
    return newFeatures;
  };

  var similarAdddCardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var renderAddCard = function (element) {
    var addCard = similarAdddCardTemplate.cloneNode(true);
    addCard.querySelector('.popup__title').innerHTML = element.offer.title;
    addCard.querySelector('.popup__text--address').innerHTML = element.offer.address;
    addCard.querySelector('.popup__text--price').innerHTML = element.offer.price + 'Р/ночь';
    addCard.querySelector('.popup__type').innerHTML = typeOfPlace[element.offer.type].name;
    addCard.querySelector('.popup__text--capacity').innerHTML = element.offer.rooms + ' комнаты для ' + element.offer.guests + ' гостей';
    addCard.querySelector('.popup__text--time').innerHTML = 'Заезд после ' + element.offer.checkin + ', выезд до ' + element.offer.checkout;
    addCard.querySelector('.popup__features').appendChild(createFeature(element));
    addCard.querySelector('.popup__photos').querySelector('img').src = element.offer.photos;
    addCard.querySelector('.popup__avatar').src = element.author.avatar;
    return addCard;
  };

  mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };
    var moveMouseHendler = function (moveEvt) {
      moveEvt.preventDefault();
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };
      if (moveEvt.clientY <= 120 || moveEvt.clientY >= 630) {
        mainPin.style.top = moveEvt.clientY;
      } else {
        mainPin.style.top = (mainPin.offsetTop - shift.y) + 'px';
      }
      if (moveEvt.clientX >= 1980 || moveEvt.clientX <= 870) {
        mainPin.style.left = moveEvt.clientX;
      } else {
        mainPin.style.left = (mainPin.offsetLeft - shift.x) + 'px';
      }
      window.map.setCoords();
    };

    var upMouseHendler = function (upEvt) {
      upEvt.preventDefault();
      window.data.map.removeEventListener('mousemove', moveMouseHendler);
      document.removeEventListener('mouseup', upMouseHendler);
    };
    window.data.map.addEventListener('mousemove', moveMouseHendler);
    document.addEventListener('mouseup', upMouseHendler);
  });

  window.card = {
    renderAddCard: renderAddCard,
    typeOfPlace: typeOfPlace
  };
})();
