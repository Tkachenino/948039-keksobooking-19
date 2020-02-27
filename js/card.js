
'use strict';
(function () {
  // Добавляем словарь
  var placeMap = {
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
  // Обьявляем mainPin для заполнения личной формы
  var mainPin = document.querySelector('.map__pin--main');
  // Устанавливаем края карты для движения mainPin
  var eadgeMap = {
    top: window.data.MIN_Y_MAP - parseInt(window.data.pinHeight, 10),
    bottom: window.data.MAX_Y_MAP,
    left: -parseInt(window.data.pinWidth / 2, 10),
    right: parseInt(window.data.mapWidth - window.data.pinWidth / 2, 10)
  };
  // Создаем DOM элементы (DIV) для плашек доп. параметров у карточки
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
  // Создаем DOM элементы (IMG) для плашек доп. фото у карточки
  var createImage = function (element) {
    var newImages = document.createDocumentFragment();
    element.offer.photos.forEach(function (currentIndex) {
      var newImage = document.createElement('img');
      newImage.classList.add('popup__photo');
      newImage.width = 45;
      newImage.width = 40;
      newImage.alt = 'Фотография жилья';
      newImage.src = currentIndex;
      newImages.appendChild(newImage);
    });
    return newImages;
  };
  // Поиск шаблона для карточки
  var similarAdddCardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  // Функция для отрисовки карточки
  var renderAddCard = function (element) {
    var addCard = similarAdddCardTemplate.cloneNode(true);
    addCard.querySelector('.popup__title').textContent = element.offer.title;
    addCard.querySelector('.popup__text--address').textContent = element.offer.address;
    addCard.querySelector('.popup__text--price').textContent = element.offer.price + 'Р/ночь';
    addCard.querySelector('.popup__type').textContent = placeMap[element.offer.type].name;
    addCard.querySelector('.popup__text--capacity').textContent = element.offer.rooms + ' комнаты для ' + element.offer.guests + ' гостей';
    addCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + element.offer.checkin + ', выезд до ' + element.offer.checkout;
    addCard.querySelector('.popup__features').appendChild(createFeature(element));
    addCard.querySelector('.popup__photos').appendChild(createImage(element));
    addCard.querySelector('.popup__avatar').src = element.author.avatar;
    addCard.querySelector('.popup__description').textContent = element.offer.description;
    return addCard;
  };
  // Слушатель на активацию mainPin
  mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };
      // Функция на переопределение координат mainPin при его "перетаскивание"
    var mouseMoveHendler = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      mainPin.style.top = (mainPin.offsetTop - shift.y) + 'px';
      mainPin.style.left = (mainPin.offsetLeft - shift.x) + 'px';

      if (parseInt(mainPin.style.top, 10) < eadgeMap.top) {
        mainPin.style.top = (eadgeMap.top + 'px');
      } else if (parseInt(mainPin.style.top, 10) > eadgeMap.bottom) {
        mainPin.style.top = (eadgeMap.bottom + 'px');
      }
      if (parseInt(mainPin.style.left, 10) < eadgeMap.left) {
        mainPin.style.left = (eadgeMap.left + 'px');
      } else if (parseInt(mainPin.style.left, 10) > eadgeMap.right) {
        mainPin.style.left = (eadgeMap.right + 'px');
      }

      window.map.setCoords();
    };
    // Функция для зачистки слушателей о "перетаскивание" mainPin
    var mouseUpHendler = function (upEvt) {
      upEvt.preventDefault();
      window.data.mapPins.removeEventListener('mousemove', mouseMoveHendler);
      document.removeEventListener('mouseup', mouseUpHendler);
    };
      // Обьявляем слушатели на "перетаскивание" и отпускание mainPin
    window.data.mapPins.addEventListener('mousemove', mouseMoveHendler);
    document.addEventListener('mouseup', mouseUpHendler);
  });

  window.card = {
    renderAddCard: renderAddCard,
    placeMap: placeMap
  };
})();
