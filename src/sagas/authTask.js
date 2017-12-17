import {put, call, take, fork} from 'redux-saga/effects';
import * as authType from '../actionTypes/authType';
import * as appType from '../actionTypes/appType';
import {login, logout} from '../services/api';
import {notification} from 'antd';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

function* loginTask() {
  while (true) {

    const action = yield take([authType.USER_LOGIN, authType.USER_LOGOUT]);
    const {history} = action;

    if (action.type === authType.USER_LOGOUT) {

      yield call(logout);
      cookies.remove('csrftoken', {path: '/'});
      history.replace('/auth/login');

    } else {
      const {username, password} = action.payload;
      const response = yield call(login, username, password);

      if (response.success) {
        yield put({type: authType.USER_LOGIN_SUCCESS, payload: response.success});
        yield put({type: appType.LOCALIZED_APP});

        history.replace('/');
      }

      if (response.error) {

        const error = response.error;
        notification.info({message: '어이쿠!', description: error.message});
        yield put({type: authType.USER_LOGIN_FAILURE, error: true, payload: {message: error.message}});

      }
    }
  }
}


export default function*() {
  return [
    yield fork(loginTask),
  ];
}
