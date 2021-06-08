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

export const switchRating = (rating) => {
  return rating * 20 + `%`;
};
