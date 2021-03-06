import Observer from '../utils/observer';

export default class Films extends Observer {
  constructor() {
    super();

    this._films = [];
  }

  setFilms(updateType, films) {
    this._films = films;

    this._notify(updateType);
  }

  getFilms() {
    return this._films;
  }
  updateFilm(updateType, update) {
    const index = this._films.findIndex((film) => film.id === update.id);

    if (index === -1) {
      throw new Error(`Can't update unexisting film`);
    }

    this._films = [
      ...this._films.slice(0, index),
      update,
      ...this._films.slice(index + 1)
    ];

    this._notify(updateType, update);
  }

  addComment(updateType, update) {
    const index = this._films.findIndex((film) => film.id === update.id);

    if (index === -1) {
      throw new Error(`Can't add comment to unexisting film`);
    }

    this._films = [
      ...this._films.slice(0, index),
      update,
      ...this._films.slice(index + 1)
    ];

    this._notify(updateType, update);
  }

  deleteComment(updateType, update) {
    const index = this._films.findIndex((film) => film.id === update.id);

    if (index === -1) {
      throw new Error(`Can't delete unexisting comment`);
    }

    this._films = [
      ...this._films.slice(0, index),
      update,
      ...this._films.slice(index + 1)
    ];

    this._notify(updateType, update);
  }
  static adaptToClient(film) {
    const adaptedFilm = Object.assign(
        {},
        film,
        {
          actors: film.film_info.actors,
          censorAge: film.film_info.age_rating,
          alternativeTitle: film.film_info.alternative_title,
          description: film.film_info.description,
          director: film.film_info.director,
          genres: film.film_info.genre,
          posterName: film.film_info.poster,
          release: {
            date: (film.film_info.release.date) ? new Date(film.film_info.release.date) : ``,
            releaseCountry: film.film_info.release.release_country
          },
          filmDuration: film.film_info.runtime,
          title: film.film_info.title,
          rating: film.film_info.total_rating,
          writers: film.film_info.writers,
          isInWatchlist: film.user_details.watchlist,
          isFavorite: film.user_details.favorite,
          isWatched: film.user_details.already_watched,
          watchingDate: (film.user_details.watching_date) ? new Date(film.user_details.watching_date) : ``,
        }
    );

    delete adaptedFilm.user_details;
    delete adaptedFilm.film_info;

    return adaptedFilm;
  }

  static adaptToServer(film) {
    const adaptedComments = [];
    film.comments.forEach((comment) => adaptedComments.push(comment.id));
    const adaptedFilm = Object.assign(
        {},
        film,
        {
          "film_info": {
            "actors": film.actors,
            "age_rating": film.censorAge,
            "alternative_title": film.alternativeTitle,
            "description": film.description,
            "director": film.director,
            "genre": film.genres,
            "poster": film.posterName,
            "release": {
              "date": film.release.date instanceof Date ? film.release.date.toISOString() : null,
              "release_country": film.release.releaseCountry,
            },
            "runtime": film.filmDuration,
            "title": film.title,
            "total_rating": film.rating,
            "writers": film.writers
          },
          "user_details": {
            "watchlist": film.isInWatchlist,
            "favorite": film.isFavorite,
            "already_watched": film.isWatched,
            "watching_date": film.watchingDate instanceof Date ? film.watchingDate.toISOString() : null,
          },
          "comments": adaptedComments
        }
    );

    delete adaptedFilm.actors;
    delete adaptedFilm.ageRating;
    delete adaptedFilm.alternativeTitle;
    delete adaptedFilm.description;
    delete adaptedFilm.director;
    delete adaptedFilm.genres;
    delete adaptedFilm.poster;
    delete adaptedFilm.release;
    delete adaptedFilm.runtime;
    delete adaptedFilm.title;
    delete adaptedFilm.totalRating;
    delete adaptedFilm.writers;
    delete adaptedFilm.isWatchlisted;
    delete adaptedFilm.isFavorite;
    delete adaptedFilm.isWatched;
    delete adaptedFilm.watchingDate;

    return adaptedFilm;
  }

  static adaptCommentsToClient(comments) {
    const adaptedComments = [];

    comments.forEach((comment) => {
      const item = {
        author: comment.author,
        id: comment.id,
        emoji: comment.emotion,
        comment: comment.comment,
        date: (comment.date) ? new Date(comment.date) : ``,
      };

      adaptedComments.push(item);
    });

    return adaptedComments;
  }

  static adaptCommentsToServer(film) {
    const adaptedComments = [];

    film.comments.forEach((comment) => {
      const item = {
        author: comment.author || `You`,
        id: comment.id,
        emotion: comment.emoji || comment.emotion,
        comment: comment.comment,
        date: (comment.date instanceof Date) ? comment.date.toISOString() : comment.date,
      };

      adaptedComments.push(item);
    });
    return adaptedComments;
  }

  static combineDataToClient(comments, film) {
    film.comments = this.adaptCommentsToClient(comments);
    return film;
  }
}
