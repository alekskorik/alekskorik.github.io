'use strict';
(function () {
  var main = document.querySelector('main');
  var body = document.querySelector('body');
  var uploadFile = document.querySelector('#upload-file');
  var uploadCancel = document.querySelector('#upload-cancel');
  var imgUpload = document.querySelector('.img-upload__overlay');
  var effectDepth = document.querySelector('.effect-level__depth');
  var effectLevelFieldset = document.querySelector('.effect-level');
  var effectLevel = document.querySelector('.effect-level__pin');
  var imgUploadPreview = document.querySelector('.img-upload__preview');
  var effectNone = document.querySelector('#effect-none');
  var effectChrome = document.querySelector('#effect-chrome');
  var effectSepia = document.querySelector('#effect-sepia');
  var effectMarvin = document.querySelector('#effect-marvin');
  var effectPhobos = document.querySelector('#effect-phobos');
  var effectHeat = document.querySelector('#effect-heat');
  var effectLevelValue = document.querySelector('.effect-level__value');
  var scaleValue = document.querySelector('.scale__control--value');
  var scaleSmaller = document.querySelector('.scale__control--smaller');
  var scaleBigger = document.querySelector('.scale__control--bigger');
  var uploadDescription = document.querySelector('.text__description');
  var hashtagsElement = document.querySelector('.text__hashtags');
  var formSubmit = document.querySelector('.img-upload__form');
  var imgUploadLogo = document.querySelector('.img-upload__label');
  uploadFile.addEventListener('change', function () {
    body.classList.add('modal-open');
    imgUpload.classList.remove('hidden');
  });
  var effects = [effectNone, effectChrome, effectSepia, effectMarvin, effectPhobos, effectHeat];
  effectLevelFieldset.classList.add('hidden');
  effects.forEach(function (effect) {
    effect.addEventListener('click', function (evt) {
      var classEffect = 'effects__preview--' + evt.target.value;
      imgUploadPreview.className = '';
      imgUploadPreview.classList.add(classEffect);
      imgUploadPreview.style.filter = '';
      effectLevel.style.left = '100%';
      effectDepth.style.width = '100%';
      if (evt.target.value === 'none') {
        effectLevelFieldset.classList.add('hidden');
      } else {
        effectLevelFieldset.classList.remove('hidden');
      }
    });
  });
  effectLevel.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var startCoords = {
      x: evt.clientX
    };
    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      var shift = {
        x: startCoords.x - moveEvt.clientX
      };
      startCoords = {
        x: moveEvt.clientX
      };
      effectLevel.style.left = (effectLevel.offsetLeft - shift.x) + 'px';
      if (effectLevel.offsetLeft < 0) {
        effectLevel.style.left = '0px';
      } else if (
        effectLevel.offsetLeft > 455
      ) {
        effectLevel.style.left = '455px';
      }
      effectDepth.style.width = effectLevel.style.left;
      effectLevelValue.value = Math.trunc(effectLevel.offsetLeft / 4.55);
      effectLevelValue.value = Math.trunc(effectLevel.offsetLeft / 4.55);
      var selectedEffect = document.querySelector('.effects__radio:checked').value;
      if (selectedEffect === 'none') {
        imgUploadPreview.style.filter = '';
      } else if (selectedEffect === 'chrome') {
        imgUploadPreview.style.filter = 'grayscale(' + effectLevelValue.value / 100 + ')';
      } else if (selectedEffect === 'sepia') {
        imgUploadPreview.style.filter = 'sepia(' + effectLevelValue.value / 100 + ')';
      } else if (selectedEffect === 'marvin') {
        imgUploadPreview.style.filter = 'invert(' + effectLevelValue.value + '%)';
      } else if (selectedEffect === 'phobos') {
        imgUploadPreview.style.filter = 'blur(' + effectLevelValue.value * 3 / 100 + 'px)';
      } else if (selectedEffect === 'heat') {
        imgUploadPreview.style.filter = 'brightness(' + effectLevelValue.value * 3 / 100 + ')';
      }
    };
    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
  scaleValue.value = '100%';
  scaleSmaller.addEventListener('click', function () {
    if (scaleValue.value === '100%') {
      imgUploadPreview.style.transform = 'scale(0.75)';
      scaleValue.value = '75%';
    } else if (scaleValue.value === '75%') {
      imgUploadPreview.style.transform = 'scale(0.50)';
      scaleValue.value = '50%';
    } else if (scaleValue.value === '50%') {
      imgUploadPreview.style.transform = 'scale(0.25)';
      scaleValue.value = '25%';
    }
  });
  scaleBigger.addEventListener('click', function () {
    if (scaleValue.value === '25%') {
      imgUploadPreview.style.transform = 'scale(0.50)';
      scaleValue.value = '50%';
    } else if (scaleValue.value === '50%') {
      imgUploadPreview.style.transform = 'scale(0.75)';
      scaleValue.value = '75%';
    } else if (scaleValue.value === '75%') {
      imgUploadPreview.style.transform = 'scale(1)';
      scaleValue.value = '100%';
    }
  });
  uploadDescription.addEventListener('input', function commentCheck() {
    uploadDescription.setCustomValidity('');
    if (uploadDescription.value.length > 140) {
      uploadDescription.setCustomValidity('Слишком длинный комментарий');
    }
  }
  );
  hashtagsElement.addEventListener('input', function hashtagCheck() {
    hashtagsElement.setCustomValidity('');
    var hashtags = hashtagsElement.value.split(' ');
    var re = /^#[a-zA-Zа-яА-Я0-9]{1,20}$/;
    function checkHashTagValidaty(hashtag) {
      if (re.test(hashtag) === true) {
        return true;
      } else {
        return false;
      }
    }
    function isHashTagUnique(hashtag, index) {
      if (index === hashtags.indexOf(hashtag)) {
        return true;
      } else {
        return false;
      }
    }
    for (var i = 0; i < hashtags.length; i++) {
      var hashtag = hashtags[i];
      if (!checkHashTagValidaty(hashtag)) {
        hashtagsElement.setCustomValidity('ошибка');
        break;
      }
      if (!isHashTagUnique(hashtag, i)) {
        hashtagsElement.setCustomValidity('ошибка');
        break;
      }
      if (hashtags.length > 5) {
        hashtagsElement.setCustomValidity('ошибка');
      }
    }
    if (hashtagsElement.value === '') {
      hashtagsElement.setCustomValidity('');
    }
  }
  );
  formSubmit.addEventListener('submit', function (evt) {
    window.upload(new FormData(formSubmit), function (response) {
      var successUploadMessage = document.querySelector('#success').content;
      imgUploadLogo.classList.add('hidden');
      imgUpload.classList.add('hidden');
      main.appendChild(successUploadMessage);
      var successButton = document.querySelector('.success__button');
      successButton.addEventListener('click', function functionName() {
        console.log(main.children[3]);
        main.removeChild(main.children[3]);
        console.log(successButton);
      });
      body.addEventListener('click', function removeSuccessMessage(e) {
        if (!e.target.classList.contains('success__inner')) {
          main.removeChild(main.children[3]);
          body.removeEventListener('click', removeSuccessMessage, false);
        }
      });
    });
    evt.preventDefault();
  });
  uploadCancel.addEventListener('click', function imgUploadClose() {
    body.classList.remove('modal-open');
    imgUpload.classList.add('hidden');
    effectLevelFieldset.classList.add('hidden');
  });
  window.addEventListener('keydown', function imgUploadClose(evt) {
    if (evt.keyCode === 27) {
      body.classList.remove('modal-open');
      imgUpload.classList.add('hidden');
      effectLevelFieldset.classList.add('hidden');
    }
  }
  );
})();
