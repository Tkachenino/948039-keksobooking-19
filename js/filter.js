'use strict';
(function () {
  // var filterDataType = [];
  // var filterDataCost = [];
  // var filterDataRoom = [];
  // var filterDataForAll = [];
  var unicData = [];
  var amountOfPins = 5;
  var basketForPin = document.createDocumentFragment();
  var filterMap = function () {
    // Отбор pins по типу жилья

    var getFilterDataType = function (data) {
      if (document.querySelector('.map__filters').querySelector('#housing-type').value === 'any') {
        return true;
      } else {
        return data.offer.type === document.querySelector('.map__filters').querySelector('#housing-type').value;
      }
    };

    var getFilterDataCost = function (data) {
      if (document.querySelector('.map__filters').querySelector('#housing-price').value === 'any') {
        return true;
      } else if (document.querySelector('.map__filters').querySelector('#housing-price').value === 'low') {
        return parseInt((data.offer.price), 10) < 10000;
      } else if (document.querySelector('.map__filters').querySelector('#housing-price').value === 'high') {
        return parseInt((data.offer.price), 10) > 50000;
      } else {
        return parseInt((data.offer.price), 10) >= 10000 && parseInt((data.offer.price), 10) <= 50000;
      }
    };

    var getFilterDataRoom = function (data) {
      if (document.querySelector('.map__filters').querySelector('#housing-rooms').value === 'any') {
        return true;
      } else if (document.querySelector('.map__filters').querySelector('#housing-rooms').value === '1') {
        return data.offer.rooms === 1;
      } else if (document.querySelector('.map__filters').querySelector('#housing-rooms').value === '2') {
        return (data.offer.rooms === 2);
      } else {
        return (data.offer.rooms === 3);
      }
    };

    var getFilterDataGuest = function (data) {
      if (document.querySelector('.map__filters').querySelector('#housing-guests').value === 'any') {
        return true;
      } else if (document.querySelector('.map__filters').querySelector('#housing-guests').value === '2') {
        return data.offer.guests === 2;
      } else if (document.querySelector('.map__filters').querySelector('#housing-guests').value === '1') {
        return data.offer.guests === 1;
      } else {
        return data.offer.guests === 0;
      }
    };
    var getFilterDataWiFi = function (data) {
      if (document.querySelector('.map__filters').querySelector('#filter-wifi').checked) {
        return data.offer.features.indexOf('wifi') !== -1;
      } else {
        return true;
      }
    };

    var getFilterDataDishwasher = function (data) {
      if (document.querySelector('.map__filters').querySelector('#filter-dishwasher').checked) {
        return data.offer.features.indexOf('dishwasher') !== -1;
      } else {
        return true;
      }
    };

    var getFilterDataParking = function (data) {
      if (document.querySelector('.map__filters').querySelector('#filter-parking').checked) {
        return data.offer.features.indexOf('parking') !== -1;
      } else {
        return true;
      }
    };

    var getFilterDataWasher = function (data) {
      if (document.querySelector('.map__filters').querySelector('#filter-washer').checked) {
        return data.offer.features.indexOf('washer') !== -1;
      } else {
        return true;
      }
    };

    var getFilterDataElevator = function (data) {
      if (document.querySelector('.map__filters').querySelector('#filter-elevator').checked) {
        return data.offer.features.indexOf('elevator') !== -1;
      } else {
        return true;
      }
    };

    var getFilterDataConditioner = function (data) {
      if (document.querySelector('.map__filters').querySelector('#filter-conditioner').checked) {
        return data.offer.features.indexOf('conditioner') !== -1;
      } else {
        return true;
      }
    };

    unicData = window.map.newData
    .filter(getFilterDataType)
    .filter(getFilterDataCost)
    .filter(getFilterDataRoom)
    .filter(getFilterDataGuest)
    .filter(getFilterDataWiFi)
    .filter(getFilterDataDishwasher)
    .filter(getFilterDataParking)
    .filter(getFilterDataWasher)
    .filter(getFilterDataElevator)
    .filter(getFilterDataConditioner)
    .slice(0, amountOfPins);

    unicData.forEach(function (currentItem) {
      var pinClone = window.pin.renderAddPin(currentItem);
      var openPopup = function () {
        var getInfoTurgetCard = window.card.renderAddCard(currentItem);
        window.map.controlCard(getInfoTurgetCard);
      };
      pinClone.addEventListener('click', openPopup);
      basketForPin.appendChild(pinClone);
    });
    window.data.mapPins.appendChild(basketForPin);
  };

  document.querySelector('.map__filters').addEventListener('change', function () {
    window.map.cleanPins();
    if (document.querySelector('.map__card')) {
      window.data.mapPins.removeChild(document.querySelector('.map__card'));
    }
    filterMap();
  });

})();
