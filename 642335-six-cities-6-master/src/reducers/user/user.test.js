import {ActionType, reducer} from './user.js';


const state = {
  currentCity: `Amsterdam`,
  isAuthorizationRequired: false,
  userData: {},
};


describe(`Reducer testing on AXIOS`, () => {
  it(`Test reducer action CITY_CHANGE`, () => {
    const action = {
      type: ActionType.CITY_CHANGE,
      city: `Wroclaw`
    };
    expect(reducer(state, action).currentCity).toEqual(`Wroclaw`);
  });

  it(`Test reducer action USER_LOGIN`, () => {
    const action = {
      type: ActionType.USER_LOGIN,
      isAuthorizationRequired: true
    };
    expect(reducer(state, action).isAuthorizationRequired).toEqual(true);
  });

  it(`Test reducer action USER_SAVE_DATA`, () => {
    const action = {
      type: ActionType.USER_SAVE_DATA,
      userData: {
        name: `Olexii`,
        id: 1
      }
    };
    expect(reducer(state, action).userData).toEqual({
      name: `Olexii`,
      id: 1
    });
  });


});
