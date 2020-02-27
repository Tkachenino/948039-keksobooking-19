'use strict';
(function () {
  var lastTimeout;
  var uniqDates = [];
  var amountOfPins = 5;
  var offers = [];
  var tagFilters = {
    houseType: document.querySelector('.map__filters').querySelector('#housing-type'),
    housePrice: document.querySelector('.map__filters').querySelector('#housing-price'),
    houseRoom: document.querySelector('.map__filters').querySelector('#housing-rooms'),
    houseGuest: document.querySelector('.map__filters').querySelector('#housing-guests')
  };
  var basketForPin = document.createDocumentFragment();
  var searchFeature = function () {
    document.querySelectorAll('#housing-features input[name="features"]').forEach(function (item) {
      return !item.checked ? true : offers.push(item.value);
    });
  };
  var filterMap = function () {
    // Отбор pins по типу жилья
    var getFilterDataType = function (data) {
      return tagFilters.houseType.value === 'any' ? true : data.offer.type === tagFilters.houseType.value;
    };
    // Отбор pins по цене
    var getFilterDataCost = function (data) {
      if (tagFilters.housePrice.value === 'any') {
        return true;
      } else if (tagFilters.housePrice.value === 'low') {
        return parseInt((data.offer.price), 10) < 10000;
      } else if (tagFilters.housePrice.value === 'high') {
        return parseInt((data.offer.price), 10) > 50000;
      } else {
        return parseInt((data.offer.price), 10) >= 10000 && parseInt((data.offer.price), 10) <= 50000;
      }
    };
    // Отбор pins по кол комнат
    var getFilterDataRoom = function (data) {
      return isNaN(Number(tagFilters.houseRoom.value)) ? true : data.offer.rooms === Number(tagFilters.houseRoom.value);
    };
    // Отбор pins по кол гостей
    var getFilterDataGuest = function (data) {
      return isNaN(Number(tagFilters.houseGuest.value)) ? true : data.offer.guests === Number(tagFilters.houseGuest.value);
    };

    uniqDates = window.map.newData
    .filter(getFilterDataType)
    .filter(getFilterDataCost)
    .filter(getFilterDataRoom)
    .filter(getFilterDataGuest);
    // Отбор pins по доп услугам
    var getFilterDataFeature = function (feature) {
      return function (data) {
        var featureElement = document.querySelector('.map__filters').querySelector('input[value = ' + feature + ']');
        return !featureElement.checked ? true : data.offer.features.includes(feature);
      };
    };
    for (var i = 0; i < offers.length; i++) {
      uniqDates = uniqDates.filter(getFilterDataFeature(offers[i]));
    }
    // Отбор pins по кол меток
    uniqDates = uniqDates.slice(0, amountOfPins);
    // Отрисовка pins
    uniqDates.forEach(function (currentItem) {
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
      offers = [];
      searchFeature();
      filterMap();
    }, 500);
  });
})();
