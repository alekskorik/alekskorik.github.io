export const AppRoute = {
  LOGIN: `/login`,
  FAVORITES: `/favorites`,
  ROOT: `/`,
  OFFER: `/offer`,
};

export const RequestStatus = {
  NOT_SENT: `NOT_SENT`,
  SENDING: `SENDING`,
  SUCCESS: `SUCCESS`,
  ERROR: `ERROR`,
};

export const SortingOptions = {
  Popular: `POPULAR`,
  HighToLow: `HIGH_TO_LOW`,
  LowToHigh: `LOW_TO_HIGH`,
  ByRating: `BY_RATING`,
};

export const switchRating = (rating) => {
  return rating * 20 + `%`;
};
