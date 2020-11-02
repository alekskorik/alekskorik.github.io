export const getFilters = (films) => {
  const filters = {
    watchlist: films.filter((film) => film.isInWatchlist),
    watched: films.filter((film) => film.isWatched),
    favorite: films.filter((film) => film.isFavorite)
  };
  return filters;
};
