import Smart from './smart.js';

import {getFormattedReleaseDate, getFormattedRuntime, getHumanizeCommentDate} from '../utils/date';
import {getRandomElement} from '../utils/common.js';
import he from 'he';
const AUTHORS = [`Vladimir`, `Olegator`, `Valik`, `Lehich`, `Bolodya`, `Metla`, `Yulik`, `Zhekos`, `Ivan`];
const EmojiType = {
  SMILE: `smile`,
  SLEEP: `sleeping`,
  PUKE: `puke`,
  ANGRY: `angry`,
};

const SHAKE_ANIMATION_TIMEOUT = 600;

const getEmojiPath = (emoji) => {
  return `images/emoji/${emoji}.png`;
};

const getCommentTemplate = (commentItem) => {
  const {emoji, date, author, comment, id} = commentItem;

  const formattedDate = getHumanizeCommentDate(date);

  return (
    `<li class="film-details__comment">
      <span class="film-details__comment-emoji">
        <img src="./images/emoji/${emoji}.png" width="55" height="55" alt="emoji-${emoji}">
      </span>
      <div>
        <p class="film-details__comment-text"><p class="film-details__comment-text">${he.encode(comment)}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${author}</span>
          <span class="film-details__comment-day">${formattedDate}</span>
          <button class="film-details__comment-delete" data-comment-id="${id}">Delete</button>
        </p>
      </div>
    </li>`
  );
};


const createSelectedEmojiTemplate = (emoji) => {
  if (!emoji) {
    return ``;
  }

  const emojiPath = getEmojiPath(emoji);


  return (
    `<img src="${emojiPath}" width="55" height="55" alt="emoji-${emoji}">`
  );
};

export const createPopUpTemplate = (film) => {
  const {title, posterName, rating, director, writers, actors, release, filmDuration, genres, censorAge, description, comments, isWatched, isFavorite, isInWatchlist, userEmoji, userText} = film;

  const stringifyedWriters = writers.join();
  const stringifyedActors = actors.join();
  const releaseDate = getFormattedReleaseDate(release.date);
  const formattedRuntime = getFormattedRuntime(filmDuration);
  const commentsList = comments.map((comment) => {
    return getCommentTemplate(comment);
  }).join(`\n`);
  const selectedEmojiTemplate = createSelectedEmojiTemplate(userEmoji);


  return (`<section class="film-details">
      <form class="film-details__inner" action="" method="get">
        <div class="form-details__top-container">
          <div class="film-details__close">
            <button class="film-details__close-btn" type="button">close</button>
          </div>
          <div class="film-details__info-wrap">
            <div class="film-details__poster">
              <img class="film-details__poster-img" src="${posterName}" alt="">
              <p class="film-details__age">${censorAge}</p>
            </div>
            <div class="film-details__info">
              <div class="film-details__info-head">
                <div class="film-details__title-wrap">
                  <h3 class="film-details__title">${title}</h3>
                  <p class="film-details__title-original">${title}</p>
                </div>
                <div class="film-details__rating">
                  <p class="film-details__total-rating">${rating}</p>
                </div>
              </div>
              <table class="film-details__table">
                <tr class="film-details__row">
                  <td class="film-details__term">Director</td>
                  <td class="film-details__cell">${director}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Writers</td>
                  <td class="film-details__cell">${stringifyedWriters}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Actors</td>
                  <td class="film-details__cell">${stringifyedActors}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Release Date</td>
                  <td class="film-details__cell">${releaseDate}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Runtime</td>
                  <td class="film-details__cell">${formattedRuntime}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Country</td>
                  <td class="film-details__cell">${release.releaseCountry}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Genres</td>
                  <td class="film-details__cell">
    ${genres.map((genreName) => {
      return `<span class="film-details__genre">` + genreName + `</span>`;
    }).join(``)}
                </tr>
              </table>
              <p class="film-details__film-description">
                ${description}
              </p>
            </div>
          </div>
          <section class="film-details__controls">
            <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${isInWatchlist ? `checked` : ``}>
            <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>
            <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${isWatched ? `checked` : ``}>
            <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>
            <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${isFavorite ? `checked` : ``}>
            <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
          </section>
        </div>
        <div class="form-details__middle-container">
        </div>
        <div class="form-details__bottom-container">
          <section class="film-details__comments-wrap">
            <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>

            <ul class="film-details__comments-list">
            ${commentsList}
            </ul>

            <div class="film-details__new-comment">
               <div for="add-emoji" class="film-details__add-emoji-label">${selectedEmojiTemplate}</div>


              <label class="film-details__comment-label">
                <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment">${userText ? he.encode(userText) : ``}</textarea>
              </label>

              <div class="film-details__emoji-list">
                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile" ${userEmoji === EmojiType.SMILE ? `checked` : ``}>
                <label class="film-details__emoji-label" for="emoji-smile">
                  <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
                </label>

                 <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping" ${userEmoji === EmojiType.SLEEP ? `checked` : ``}>
                <label class="film-details__emoji-label" for="emoji-sleeping">
                  <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
                </label>

                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke" ${userEmoji === EmojiType.PUKE ? `checked` : ``}>
                <label class="film-details__emoji-label" for="emoji-puke">
                  <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
                </label>

                    <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry" ${userEmoji === EmojiType.ANGRY ? `checked` : ``}>
                <label class="film-details__emoji-label" for="emoji-angry">
                  <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
                </label>
              </div>
            </div>
          </section>
        </div>

      </form>
    </section>
  `);
};

export default class FilmPopUp extends Smart {
  constructor(film, api) {
    super();
    this._data = FilmPopUp.parseFilmToData(film);
    this._api = api;

    this._clickHandler = this._clickHandler.bind(this);
    this._favoriteToggleHandler = this._favoriteToggleHandler.bind(this);
    this._watchedToggleHandler = this._watchedToggleHandler.bind(this);
    this._watchlistToggleHandler = this._watchlistToggleHandler.bind(this);
    this._emojiChangeHandler = this._emojiChangeHandler.bind(this);
    this._userMessageInputHandler = this._userMessageInputHandler.bind(this);
    this._addCommentKeyDownHandler = this._addCommentKeyDownHandler.bind(this);
    this._deleteClickHandler = this._deleteClickHandler.bind(this);
    this.setInnerHandlers();
  }

  getTemplate() {
    return createPopUpTemplate(this._data);
  }

  getUpdatedData() {
    return FilmPopUp.parseDataToFilm(this._data);
  }

  _clickHandler(evt) {
    evt.preventDefault();
    this._callback.closeClick(FilmPopUp.parseDataToFilm(this._data));
  }
  restoreHandlers() {
    this.setInnerHandlers();
    this.setPopUpRemoveClickHandler(this._callback.closeClick);
    this.setDeleteClickHandler(this._callback.deleteClick);
    this.setAddCommentKeyDownHandler(this._callback.addCommentKeyDown);
  }

  setInnerHandlers() {
    this._setFavoriteChangeHandler(this._favoriteToggleHandler);
    this._setWatchedChangeHandler(this._watchedToggleHandler);
    this._setWatchlistChangeHandler(this._watchlistToggleHandler);
    this._setEmojiChangeHandler(this._emojiChangeHandler);
    this._setUserMessageInputHandler(this._userMessageInputHandler);
  }

  _setFavoriteChangeHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement()
      .querySelector(`#favorite`)
      .addEventListener(`change`, this._favoriteToggleHandler);
  }

  _favoriteToggleHandler(evt) {
    evt.preventDefault();
    this.updateData({
      isFavorite: !this._data.isFavorite
    }, true);
  }

  _setWatchedChangeHandler() {
    this.getElement()
      .querySelector(`#watched`)
      .addEventListener(`change`, this._watchedToggleHandler);
  }

  _watchedToggleHandler(evt) {
    evt.preventDefault();
    this.updateData({
      isWatched: !this._data.isWatched
    }, true);
  }

  _setWatchlistChangeHandler() {
    this.getElement()
      .querySelector(`#watchlist`)
      .addEventListener(`change`, this._watchlistToggleHandler);
  }

  _watchlistToggleHandler(evt) {
    evt.preventDefault();
    this.updateData({
      isInWatchlist: !this._data.isInWatchlist
    }, true);
  }

  _setEmojiChangeHandler() {
    this.getElement()
      .querySelectorAll(`.film-details__emoji-item`)
      .forEach((item) => item.addEventListener(`change`, this._emojiChangeHandler));
  }

  _emojiChangeHandler(evt) {
    evt.preventDefault();
    const emoji = evt.target.value;

    this.updateData({
      userEmoji: emoji
    }, true);

    this.getElement()
  .querySelector(`.film-details__add-emoji-label`)
  .innerHTML = createSelectedEmojiTemplate(emoji);
  }
  setPopUpRemoveClickHandler(callback) {
    this._callback.closeClick = callback;
    this.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, this._clickHandler);
  }

  setAddCommentKeyDownHandler(callback) {
    this._callback.addCommentKeyDown = callback;
    this.getElement()
      .querySelector(`.film-details__comment-input`)
      .addEventListener(`keydown`, this._addCommentKeyDownHandler);
  }

  _addCommentKeyDownHandler(evt) {
    if (evt.ctrlKey && evt.key === `Enter` && this._data.userText !== null && this._data.userText.length > 0 && this._data.userEmoji !== null) {
      evt.target.disabled = true;

      const newComment = {
        "comment": he.encode(this._data.userText),
        "date": new Date().toISOString(),
        "emotion": this._data.userEmoji,
      };

      this._api.addComment(this._data, newComment)
        .then((response) => {
          this.updateData(Object.assign(
              {},
              response
          ));

          this._callback.addCommentKeyDown(FilmPopUp.parseDataToFilm(this._data));
          this._data.userText = null;
          this._data.userEmoji = null;
        })
.catch(() => {
  evt.target.disabled = false;
  const neededItem = this.getElement().querySelector(`.film-details__new-comment`);
  neededItem.style.animation = `shake ${SHAKE_ANIMATION_TIMEOUT / 1000}s`;
  setTimeout(() => {
    neededItem.style.animation = ``;
  }, SHAKE_ANIMATION_TIMEOUT);
});
    }
  }

  _setUserMessageInputHandler() {
    this.getElement()
      .querySelector(`.film-details__comment-input`)
      .addEventListener(`input`, this._userMessageInputHandler);
  }

  _userMessageInputHandler(evt) {
    evt.preventDefault();

    this._data.userText = evt.target.value;
  }

  _createComment() {
    return {
      emoji: {path: `./images/emoji/${this._data.userEmoji}.png`, alt: `sleeping`},
      date: new Date(),
      author: getRandomElement(AUTHORS),
      commentText: this._data.userText,
    };
  }

  setDeleteClickHandler(callback) {
    this._callback.deleteClick = callback;
    this.getElement()
    .querySelectorAll(`.film-details__comment-delete`)
    .forEach((button) => button.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      this._deleteClickHandler(button);
    }));
  }

  _deleteClickHandler(button) {
    const commentId = button.dataset.commentId;
    button.disabled = true;
    button.textContent = `Deleting...`;

    this._api.deleteComment(commentId)
      .then(() => {
        this.updateData(
            Object.assign(
                {},
                this._data,
                {
                  comments: [...this._data.comments.filter((item) => item.id !== commentId)]
                }
            ), true);
        this._callback.deleteClick(FilmPopUp.parseDataToFilm(this._data));
      })
      .catch(() => {
        button.disabled = false;
        button.textContent = `Delete`;
        const neededItem = Array.from(this.getElement().querySelectorAll(`.film-details__comment`)).find((item) => item.contains(button));
        neededItem.style.animation = `shake ${SHAKE_ANIMATION_TIMEOUT / 1000}s`;
        setTimeout(() => {
          neededItem.style.animation = ``;
        }, SHAKE_ANIMATION_TIMEOUT);
      });
  }
  static parseFilmToData(film) {
    return Object.assign(
        {},
        film,
        {
          userEmoji: null,
          userText: null
        }
    );
  }
  static parseDataToFilm(data) {
    data = Object.assign({}, data);

    delete data.userEmoji;
    delete data.userText;

    return data;
  }
}
