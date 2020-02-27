'use strict';
(function () {
  var PIC_WIDTH = 70;
  var PIC_HEIGHT = 70;
  var fileChooserAvatar = document.querySelector('.ad-form__field input[type="file"]');
  var avatar = document.querySelector('.ad-form-header__preview img');
  var fileChooserRoom = document.querySelector('.ad-form__upload input[type="file"]');
  var fieldForYourPhoto = document.querySelector('.ad-form__photo');
  // Слушатель на загрузку фото аватара
  fileChooserAvatar.addEventListener('change', function () {
    var file = fileChooserAvatar.files[0];
    var reader = new FileReader();
    reader.addEventListener('load', function () {
      avatar.src = reader.result;
    });
    reader.readAsDataURL(file);
  });
  // Слушатель на загрузку фото комнаты
  fileChooserRoom.addEventListener('change', function () {
    var file = fileChooserRoom.files[0];
    var reader = new FileReader();
    if (document.querySelector('.ad-form__photo img')) {
      fieldForYourPhoto.removeChild(document.querySelector('.ad-form__photo img'));
    }
    reader.addEventListener('load', function () {
      var setPhotoRoom = function () {
        var picRoom = document.createElement('img');
        picRoom.width = PIC_WIDTH;
        picRoom.height = PIC_HEIGHT;
        picRoom.alt = 'Фото комнаты для сдачи в аренду';
        return picRoom;
      };
      fieldForYourPhoto.appendChild(setPhotoRoom());
      document.querySelector('.ad-form__photo img').src = reader.result;
    });
    reader.readAsDataURL(file);
  });
})();
