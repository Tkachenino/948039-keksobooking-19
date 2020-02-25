'use strict';
(function () {
  var fileChooserAvatar = document.querySelector('.ad-form__field input[type="file"]');
  var avatar = document.querySelector('.ad-form-header__preview img');
  var fileChooserRoom = document.querySelector('.ad-form__upload input[type="file"]');
  var fieldForYourPhoto = document.querySelector('.ad-form__photo');
  fileChooserAvatar.addEventListener('change', function () {
    var file = fileChooserAvatar.files[0];
    var reader = new FileReader();
    reader.addEventListener('load', function () {
      avatar.src = reader.result;
    });
    reader.readAsDataURL(file);
  });

  fileChooserRoom.addEventListener('change', function () {
    var file = fileChooserRoom.files[0];
    var reader = new FileReader();
    reader.addEventListener('load', function () {
      var setPhotoRoom = function () {
        var picRoom = document.createElement('img');
        picRoom.width = 70;
        picRoom.height = 70;
        picRoom.alt = 'Фото комнаты для сдачи в аренду';
        return picRoom;
      };
      fieldForYourPhoto.appendChild(setPhotoRoom());
      document.querySelector('.ad-form__photo img').src = reader.result;
    });
    reader.readAsDataURL(file);
  });

})();
