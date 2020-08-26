'use strict';
(function () {
  var pictureTemplate = document.querySelector('#picture').content;
  var newPictureTemplate = pictureTemplate.querySelector('.picture');
  var gallery = document.querySelector('.pictures');
  var bigPicture = document.querySelector('.big-picture');
  var body = document.querySelector('body');
  var bigPictureCancel = document.querySelector('.big-picture__cancel');
  var likes = document.querySelector('.likes-count');
  var description = document.querySelector('.social__caption');
  var comments = document.querySelector('.social__comments');
  var commentsCount = document.querySelector('.comments-count');
  var shownCommentsCount = document.querySelector('.social__comment-count');
  var likesCount = document.querySelector('.likes-count');
  var socialSubmitButton = document.querySelector('.social__footer-btn');
  var newSocialText = document.querySelector('.social__footer-text');
  var commentList = document.createElement('li');
  var commentAvatar = document.createElement('img');
  var commentText = document.createElement('p');
  var imgFilters = document.querySelector('.img-filters');
  var imgFilterButtons = document.querySelectorAll('.img-filters__button');
  var filterDefault = document.querySelector('#filter-default');
  var filterRandom = document.querySelector('#filter-random');
  var filterDiscussed = document.querySelector('#filter-discussed');
  var commentsLoader = document.querySelector('.comments-loader');
  comments.innerHTML = '';
  commentList.classList.add('social__comment');
  commentAvatar.classList.add('social__picture');
  commentText.classList.add('social__text');
  commentAvatar.setAttribute('src', '');
  commentAvatar.setAttribute('alt', 'Аватар комментатора фотографии');
  commentList.appendChild(commentAvatar);
  commentList.appendChild(commentText);
  var onError = function (message) {
    console.error(message);
  };
  var onSuccess = function (data) {
    console.log(data);
    // data.sort((b, a) => a.comments.length - b.comments.length );

    // console.log( data );
    imgFilters.classList.remove('img-filters--inactive');
    filterDefault.classList.add('img-filters__button--active');
    // for (var i = 0; i < data.length; i++) {
    function createPictures(i) {


      var clonedPicture = newPictureTemplate.cloneNode(true);
      clonedPicture.children[0].src = data[i].url;
      clonedPicture.children[1].children[0].textContent = data[i].comments.length;
      clonedPicture.children[1].children[1].textContent = data[i].likes;
      clonedPicture.children[0].setAttribute('id', i);
      // imgFilters.classList.remove('img-filters--inactive');
      clonedPicture.addEventListener('click', function (evt) {
        body.classList.add('modal-open');
        bigPicture.classList.remove('hidden');
        bigPicture.children[1].children[0].children[0].src = evt.target.src;
        likes.textContent = data[evt.target.id].likes;
        description.textContent = data[evt.target.id].description;
        commentsCount.textContent = data[evt.target.id].comments.length;
        comments.length = data[evt.target.id].comments.length;
        for (var j = 0; j < comments.length; j++) {
          var clonedComment = commentList.cloneNode(true);
          comments.appendChild(clonedComment);
          clonedComment.children[1].textContent = data[evt.target.id].comments[j].message;
          clonedComment.children[0].src = data[evt.target.id].comments[j].avatar;
          clonedComment.children[0].alt = data[evt.target.id].comments[j].name;
        }
        var f = 5;
        if (comments.length > 5) {
          shownCommentsCount.textContent = 5 + ' из ' + comments.length + ' комментариев';
          for (var a = 5; a < comments.length; a++) {
            comments.children[a].classList.add('hidden');
          }
          commentsLoader.classList.remove('hidden');
          commentsLoader.addEventListener('click', function loadNewComment() {
            f += 5;
            if (f >= comments.length) {
              f = comments.length;
              commentsLoader.classList.add('hidden');
              commentsLoader.removeEventListener('click', loadNewComment, false);
            }
            for (var b = 5; b <= f; b++) {
              comments.children[b - 1].classList.remove('hidden');
            }
            shownCommentsCount.textContent = f + ' из ' + comments.length + ' комментариев';
          });
        } else {
          f = comments.length;
          commentsLoader.classList.add('hidden');
          shownCommentsCount.textContent = f + ' из ' + comments.length + ' комментариев';
        }
      });
      gallery.appendChild(clonedPicture);
    }
    for (var i = 0; i < data.length; i++) {
      createPictures(i);
    }
    imgFilterButtons.forEach(function (button) {
      button.addEventListener('click', function () {
        imgFilterButtons[0].classList.remove('img-filters__button--active');
        imgFilterButtons[1].classList.remove('img-filters__button--active');
        imgFilterButtons[2].classList.remove('img-filters__button--active');
        button.classList.add('img-filters__button--active');
        while (gallery.children[2]) {
          gallery.removeChild(gallery.children[2]);
        }
        // });
        // for (var j = 2; j < gallery.children.length; j++) {
        //   gallery.removeChild(gallery.children[2]);
        // }
        if (filterDefault.classList.contains('img-filters__button--active')) {
          for (i = 0; i < data.length; i++) {
            createPictures(i);
          }
        // for (var j = 2; j < gallery.children.length; j++) {
        //   gallery.children[j].classList.remove('hidden');
        // }
        } else if (filterRandom.classList.contains('img-filters__button--active')) {
          for (var j = 0; j < 10; j++) {
            var randomPicture = Math.floor(Math.random() * data.length);
            createPictures(randomPicture);
          }
        } else if (filterDiscussed.classList.contains('img-filters__button--active')) {
          console.log('discussed');
          // function discussedCommentsSort() {
          //
          // }
          // data.slice().sort((b, a) => a.comments.length - b.comments.length );
          // for (i = 0; i < data.length; i++) {
          //   createPictures(i);
          // }
          var copiedData = data.slice();
          // console.log(copiedData);
          copiedData.sort((b, a) => a.comments.length - b.comments.length );
          console.log(copiedData);
          for (i = 0; i < copiedData.length; i++) {
            var clonedPicture = newPictureTemplate.cloneNode(true);
            clonedPicture.children[0].src = copiedData[i].url;
            clonedPicture.children[1].children[0].textContent = copiedData[i].comments.length;
            clonedPicture.children[1].children[1].textContent = copiedData[i].likes;
            clonedPicture.children[0].setAttribute('id', i);
            // imgFilters.classList.remove('img-filters--inactive');
            clonedPicture.addEventListener('click', function (evt) {
              body.classList.add('modal-open');
              bigPicture.classList.remove('hidden');
              bigPicture.children[1].children[0].children[0].src = evt.target.src;
              likes.textContent = copiedData[evt.target.id].likes;
              description.textContent = copiedData[evt.target.id].description;
              commentsCount.textContent = copiedData[evt.target.id].comments.length;
              comments.length = copiedData[evt.target.id].comments.length;
              for (var j = 0; j < comments.length; j++) {
                var clonedComment = commentList.cloneNode(true);
                comments.appendChild(clonedComment);
                clonedComment.children[1].textContent = copiedData[evt.target.id].comments[j].message;
                clonedComment.children[0].src = copiedData[evt.target.id].comments[j].avatar;
                clonedComment.children[0].alt = copiedData[evt.target.id].comments[j].name;
              }
              var f = 5;
              if (comments.length > 5) {
                shownCommentsCount.textContent = 5 + ' из ' + comments.length + ' комментариев';
                for (var a = 5; a < comments.length; a++) {
                  comments.children[a].classList.add('hidden');
                }
                commentsLoader.classList.remove('hidden');
                commentsLoader.addEventListener('click', function loadNewComment() {
                  f += 5;
                  if (f >= comments.length) {
                    f = comments.length;
                    commentsLoader.classList.add('hidden');
                    commentsLoader.removeEventListener('click', loadNewComment, false);
                  }
                  for (var b = 5; b <= f; b++) {
                    comments.children[b - 1].classList.remove('hidden');
                  }
                  shownCommentsCount.textContent = f + ' из ' + comments.length + ' комментариев';
                });
              } else {
                f = comments.length;
                commentsLoader.classList.add('hidden');
                shownCommentsCount.textContent = f + ' из ' + comments.length + ' комментариев';
              }
            });
            gallery.appendChild(clonedPicture);
          }
        }
      });
    });
  };
  socialSubmitButton.addEventListener('click', function (evt) {
    evt.preventDefault();
    var newComment = document.createElement('li');
    var newCommentAvatar = document.createElement('img');
    var newCommentText = document.createElement('p');
    newCommentAvatar.classList.add('social__picture');
    newCommentText.classList.add('social__text');
    newCommentAvatar.setAttribute('src', 'img/avatar-6.svg');
    newCommentAvatar.setAttribute('alt', 'Аватар комментатора фотографии');
    newCommentText.textContent = newSocialText.value;
    newComment.appendChild(newCommentAvatar);
    newComment.appendChild(newCommentText);
    newComment.classList.add('social__comment');
    comments.append(newComment);
    newSocialText.value = '';
  });
  likesCount.onclick = function () {
    if (likesCount.classList.contains('likes-count--active')) {
      likesCount.textContent--;
    } else {
      likesCount.textContent++;
    }
    likesCount.classList.toggle('likes-count--active');
  };

  bigPictureCancel.addEventListener('click', function () {
    body.classList.remove('modal-open');
    bigPicture.classList.add('hidden');
    comments.innerHTML = '';
    likesCount.classList.remove('likes-count--active');
  });
  window.addEventListener('keydown', function (tap) {
    if (tap.keyCode === 27) {
      body.classList.remove('modal-open');
      bigPicture.classList.add('hidden');
      comments.innerHTML = '';
      likesCount.classList.remove('likes-count--active');
    }
  }
  );
  // var arr = [5, 2, 1, -10, 8];

  // data.sort((a, b) => a.likes - b.likes );
  //
  // alert( data );
  window.load('https://javascript.pages.academy/kekstagram/data', onSuccess, onError);
})();
