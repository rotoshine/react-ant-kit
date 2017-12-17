import * as authType from '../actionTypes/authType';
import update from 'immutability-helper';

const initialState = {
  isLoggedIn: false,
  loginStatus: 'INIT'
};

export default (state = initialState, action) => {

  switch (action.type) {

    // 로그인 유저
    case authType.USER_LOGIN: {
      return update(state, {
        loginStatus: {$set: 'REQUESTING'}
      });
    }
    case authType.USER_LOGIN_SUCCESS: {
      return {isLoggedIn: true, ...action.payload};
    }

    // 로그아웃
    case authType.USER_LOGOUT: {
      return {
        isLoggedIn: false
      }
    }

    default:
      return state;
  }

}
