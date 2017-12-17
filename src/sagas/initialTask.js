import {put, call, take, fork} from 'redux-saga/effects';
import * as authType from '../actionTypes/authType';
import * as appType from '../actionTypes/appType';
import {checkLogin} from '../services/api';
import Cookies from 'universal-cookie';
const cookies = new Cookies();
const token = cookies.get('csrftoken');

function* initialTask() {

  yield take(appType.INITIALIZE);


  if (token) {
    const res = yield call(checkLogin);

    if (res.success) {
      yield put({type: authType.USER_LOGIN_SUCCESS, payload: res.success});
      yield put({type: appType.LOCALIZED_APP});
    }
  }
  yield put({type: appType.INITIALIZED});
}


export default function*() {
  return [
    yield fork(initialTask),
  ];
}
