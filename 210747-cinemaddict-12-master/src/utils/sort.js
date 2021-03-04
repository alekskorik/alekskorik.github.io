export const sortByDate = (filmA, filmB) => {
  return filmB.release - filmA.release;
};

export const sortByRating = (filmA, filmB) => {
  return filmB.rating - filmA.rating;
};

export const sortByComments = (filmA, filmB) => {
  return filmB.comments.length - filmA.comments.length;
};
export const SortType = {
  DEFAULT: `default`,
  DATE: `date`,
  RATING: `rating`,
};
