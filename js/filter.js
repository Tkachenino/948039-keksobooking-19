'use strict';
(function () {
  var lastTimeout;
  var unicData = [];
  var amountOfPins = 5;
  var offer = [];
  var basketForPin = document.createDocumentFragment();
  var searchFeature = function () {
    document.querySelectorAll('#housing-features input[name="features"]').forEach(function (item) {
      return !item.checked ? true : offer.push(item.value);
    });
  };

  var filterMap = function () {
    // Отбор pins по типу жилья

    var getFilterDataType = function (data) {
      return document.querySelector('.map__filters').querySelector('#housing-type').value === 'any' ? true : data.offer.type === document.querySelector('.map__filters').querySelector('#housing-type').value;
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
      var currentValue = document.querySelector('.map__filters').querySelector('#housing-rooms').value;
      return isNaN(Number(currentValue)) ? true : data.offer.rooms === Number(currentValue);
    };

    var getFilterDataGuest = function (data) {
      var currentValue = document.querySelector('.map__filters').querySelector('#housing-guests').value;
      return isNaN(Number(currentValue)) ? true : data.offer.guests === Number(currentValue);
    };

    unicData = window.map.newData
    .filter(getFilterDataType)
    .filter(getFilterDataCost)
    .filter(getFilterDataRoom)
    .filter(getFilterDataGuest);

    var getFilterDataFeature = function (feature) {
      return function (data) {
        var featureElement = document.querySelector('.map__filters').querySelector('input[value = ' + feature + ']');
        return !featureElement.checked ? true : data.offer.features.includes(feature);
      };
    };

    for (var featureIndex = 0; featureIndex < offer.length; featureIndex++) {
      unicData = unicData.filter(getFilterDataFeature(offer[featureIndex]));
    }

    unicData = unicData.slice(0, amountOfPins);

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
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = setTimeout(function () {
      window.map.cleanPins();
      if (document.querySelector('.map__card')) {
        window.data.mapPins.removeChild(document.querySelector('.map__card'));
      }
      offer = [];
      searchFeature();
      filterMap();
    }, 500);
  });
})();
