
const initialState = {
  currentCity: `Amsterdam`,
  isAuthorizationRequired: false,
  userData: {},
};

const ActionType = {
  CITY_CHANGE: `CITY_CHANGE`,
  USER_LOGIN: `USER_LOGIN`,
  USER_SAVE_DATA: `USER_SAVE_DATA`
};

const ActionCreator = {
  changeCity: (city) => {
    return {
      type: ActionType.CITY_CHANGE,
      city
    };
  },
  userLogin: () => {
    return {
      type: ActionType.USER_LOGIN
    };
  },
  userSaveData: (userData) => {
    return {
      type: ActionType.USER_SAVE_DATA,
      userData
    };
  }
};

const Operation = {
  userSaveData: (email, password) => (dispatch, _getState, api) => {
    return api.post(`/login`, {email, password})
      .then(({status, data}) => {
        if (status === 200) {
          dispatch(ActionCreator.userSaveData(data));
          dispatch(ActionCreator.userLogin());
        }
      });
  },
  userSaveCookie: () => (dispatch, _getState, api) => {
    return api.get(`/login`).then(({data, status}) => {
      if (status === 200) {
        dispatch(ActionCreator.userSaveData(data));
        dispatch(ActionCreator.userLogin());
      }
    });
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case `CITY_CHANGE`:
      return Object.assign({}, state, {
        currentCity: action.city
      });
    case `USER_LOGIN`:
      return Object.assign({}, state, {
        isAuthorizationRequired: !state.isAuthorizationRequired
      });
    case `USER_SAVE_DATA`:
      return Object.assign({}, state, {
        userData: action.userData
      });
    default: return state;
  }
};


export {
  reducer,
  ActionCreator,
  Operation
};
