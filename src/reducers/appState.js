import * as appType from '../actionTypes/appType';
import * as authType from '../actionTypes/authType';
import update from 'immutability-helper';

const initialState = {
  initialize: false,
};

export default (state = initialState, action) => {

  switch (action.type) {

    case authType.USER_LOGIN_SUCCESS:
    case appType.INITIALIZED: {
      return update(state, {
        initialize: {$set: true}
      });
    }

    default:
      return state;
  }

}
