'use strict';
var numberOfAdd = 8;
var addArr = [];
var titles = ['Уютное гнездышко для молодоженов', 'Маленькая квартирка рядом с парком', 'Небольшая лавочка в парке', 'Императорский дворец в центре Токио'];
var getRandom = function (min, max) {
  return Math.round(min + (Math.random() * (max - 1)));
};

var map = document.querySelector('.map__pins');
var mapWidth = map.offsetWidth;
var pin = document.querySelector('.map__pin');
var pinWidth = pin.clientWidth;
var pinHeight = pin.clientHeight;
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

// создает массив данных имеющихся пользователей
var buildAdd = function (array) {
  array.push({
    author: {
      avatar: 'img/avatars/user0' + getRandom(1, 8) + '.png'
    },
    offer: {
      title: titles[getRandom(0, 3)],
      address: '600, 350',
      price: '400',
      type: 'palace',
      rooms: 4,
      guests: 2,
      checkin: '12:00',
      checkout: '13:00',
      features: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
      description: 'Замечательный дворец в старинном центре города. Только для тех кто может себе позволить дворец. Лакеев и прочих жокеев просим не беспокоить.',
      photos: 'http://o0.github.io/assets/images/tokyo/hotel1.jpg'
    },
    location: {
      x: getRandom(pinWidth, mapWidth) - pinWidth,
      y: getRandom(130, 630) - pinHeight
    }
  });
};

for (var j = 0; j < numberOfAdd; j++) {
  buildAdd(addArr);
}

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
var similarAddPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var mainPin = document.querySelector('.map__pin--main');
document.querySelector('#address').value = mainPin.style.left + ' ' + mainPin.style.top;
mainPin.addEventListener('mousedown', function (evt) {
  if (evt.button === 0) {
    document.querySelector('.map').classList.remove('map--faded');
    document.querySelector('.ad-form').classList.remove('ad-form--disabled');
    resetDisabled(fieldsetToAdForm);
    resetDisabled(fieldsetToMapFilter);
    resetDisabled(selectorToMapFilter);
    document.querySelector('#address').value = mainPin.style.left + ' ' + mainPin.style.top;
    map.appendChild(basketForPin);
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
    map.appendChild(basketForPin);
  }
});

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
    userTitle.setCustomValidity('Имя должно состоять минимум из 30 символов');
  } else if (userTitle.validity.tooLong) {
    userTitle.setCustomValidity('Имя не должно превышать 100 символов');
  } else if (userTitle.validity.valueMissing) {
    userTitle.setCustomValidity('Обязательное поле');
  } else {
    userTitle.setCustomValidity('');
  }
});

var userPrice = document.querySelector('#price');
var userAppart = document.querySelector('#type');

var setCostForAppart = function (appart, cost) {
  cost.setAttribute('min', typeOfPlace[appart.value].cost);
  cost.setAttribute('placeholder', typeOfPlace[appart.value].cost);
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


var renderAddPin = function (element) {
  var AddPin = similarAddPinTemplate.cloneNode(true);
  AddPin.style = 'left:' + element.location.x + 'px; top:' + element.location.y + 'px;';
  AddPin.querySelector('img').setAttribute('src', element.author.avatar);
  AddPin.querySelector('img').setAttribute('alt', element.offer.title);
  AddPin.classList.add('unic');
  return AddPin;
};

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

var basketForPin = document.createDocumentFragment();

var pressClosePopupHendler = function (evt) {
  if (evt.key === 'Escape') {
    map.removeChild(document.querySelector('.map__card'));
    document.removeEventListener('keydown', pressClosePopupHendler);
  }
};

addArr.forEach(function (currentItem) {
  var pinClone = renderAddPin(currentItem);
  var openPopup = function () {
    var getInfoTurgetCard = renderAddCard(currentItem);
    if (document.querySelector('.map__card')) {
      map.removeChild(document.querySelector('.map__card'));
    }
    map.appendChild(getInfoTurgetCard);
    document.addEventListener('keydown', pressClosePopupHendler);

    getInfoTurgetCard.querySelector('.popup__close').addEventListener('click', function () {
      map.removeChild(getInfoTurgetCard);
    });
  };
  pinClone.addEventListener('click', openPopup);
  basketForPin.appendChild(pinClone);
});
