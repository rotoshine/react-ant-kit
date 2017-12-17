import { all } from 'redux-saga/effects';
import authTask from './authTask';
import initialTask from './initialTask';

export default function* rootSaga() {
  yield all( [
    // 무한루프
    authTask(),       // 인증 관련

    // 한번만 실행
    initialTask()     // 초기화 관련
  ] );
};


