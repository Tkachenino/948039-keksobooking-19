'use strict';
(function () {

  var URL_LOAD = 'https://js.dump.academy/keksobooking/data';

  window.load = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    listenRequest(xhr, onSuccess, onError);
    xhr.open('GET', URL_LOAD);
    xhr.send();
  };
  var URL_UPLOAD = 'https://js.dump.academy/keksobooking';
  window.upload = function (data, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    listenRequest(xhr, onSuccess, onError);
    xhr.open('POST', URL_UPLOAD);
    xhr.send(data);
  };

  var listenRequest = function (xhr, onSuccess, onError) {
    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case 200:
          onSuccess(xhr.response);
          break;
        default:
          onError();
          break;
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения. Проверьте подключение к интернету.');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполнитлься за ' + xhr.timeout + 'ms, попробуйте снова');
    });
    xhr.timeout = 2000;
  };
})();
