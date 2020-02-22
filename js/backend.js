'use strict';
(function () {
// Ссылка на передачу и загрузку данных
  var URL_LOAD = 'https://js.dump.academy/keksobooking/data';
  var URL_UPLOAD = 'https://js.dump.academy/keksobooking';
  // Функция на запрос отправки данных
  window.load = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    listenRequest(xhr, onSuccess, onError);
    xhr.open('GET', URL_LOAD);
    xhr.send();
  };
  // Функция на запрос получения данных
  window.upload = function (data, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    listenRequest(xhr, onSuccess, onError);
    xhr.open('POST', URL_UPLOAD);
    xhr.send(data);
  };
  // Слушатель на загрзку файлов с сервера
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
    // Слушатель на ошибку соединения
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения. Проверьте подключение к интернету.');
    });
    // Слушатель на ошибку превышения времени ожидания запроса
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполнитлься за ' + xhr.timeout + 'ms, попробуйте снова');
    });
    xhr.timeout = 2000;
  };
})();
