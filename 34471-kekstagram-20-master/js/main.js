'use strict';
// function randomNumber(min, max) {
//   return Math.floor(Math.random() * (max - min + 1) + min);
// }
var hashtagsElement = document.querySelector('.text__hashtags');
hashtagsElement.addEventListener('input', function hashtagCheck() {
  hashtagsElement.setCustomValidity('');
  var hashtags = hashtagsElement.value.split(' ');
  var re = /^#[a-zA-Zа-яА-Я0-9]{2-20}$/;
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
    if (!isHashTagUnique(hashtags, hashtag)) {
      hashtagsElement.setCustomValidity('ошибка');
      break;
    }
    if (hashtags.length > 5) {
      hashtagsElement.setCustomValidity('ошибка');
    }
  }
}
);


// var names = ['Антон', 'Иван', 'Анна', 'Анастасия', 'Ольга', 'Никита', 'Богдан', 'Дарья', 'Антон', 'Сергей'];
// var randomName = Math.floor(Math.random() * names.length);
var body = document.querySelector('body');
var uploadFile = document.querySelector('#upload-file');
var uploadCancel = document.querySelector('#upload-cancel');
var imgUpload = document.querySelector('.img-upload__overlay');
uploadFile.addEventListener('change', function () {
  body.classList.add('modal-open');
  imgUpload.classList.remove('hidden');
});
uploadCancel.addEventListener('click', function () {
  body.classList.remove('modal-open');
  imgUpload.classList.add('hidden');
});
// var photos = [];
// for (var i = 0; i < 25; i++) {
//   var photo = {
//     url: 'photos/' + randomNumber(1, 25) + '.jpg',
//     description: 'Описание: ' + i,
//     likes: randomNumber(15, 200),
//     comments: [{
//       avatar: 'img/avatar-' + randomNumber(0, 6) + '.svg',
//       message: 'В целом всё неплохо. Но не всё.',
//       name: names(names[randomName])
//     }]
//   };
// }
