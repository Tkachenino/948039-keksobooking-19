'use strict';
(function () {
// Ссылка на передачу и загрузку данных
  var methodRequestMap = {
    load: {
      method: 'GET',
      url: 'https://js.dump.academy/keksobooking/data'
    },
    upload: {
      method: 'POST',
      url: 'https://js.dump.academy/keksobooking'
    }
  };
  var STATUS_OK = 200;
  var TIME_FOR_REQUEST = 2000;
  // Функция на запрос отправки данных
  window.load = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    listenRequest(xhr, onSuccess, onError);
    xhr.open(methodRequestMap.load.method, methodRequestMap.load.url);
    xhr.send();
  };
  // Функция на запрос получения данных
  window.upload = function (data, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    listenRequest(xhr, onSuccess, onError);
    xhr.open(methodRequestMap.upload.method, methodRequestMap.upload.url);
    xhr.send(data);
  };
  // Слушатель на загрзку файлов с сервера
  var listenRequest = function (xhr, onSuccess, onError) {
    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case STATUS_OK:
          onSuccess(xhr.response);
          break;
        default:
          onError();
          break;
      }
    });
    // Слушатель на ошибку соединения
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения. Проверьте подключение к интернету.');
    });
    // Слушатель на ошибку превышения времени ожидания запроса
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполнитлься за ' + xhr.timeout + 'ms, попробуйте снова');
    });
    xhr.timeout = TIME_FOR_REQUEST;
  };
})();
