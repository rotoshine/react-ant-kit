import {createStore, applyMiddleware, compose} from 'redux';
import rootReducer from '../reducers';
import ReactGA from 'react-ga';
import createSagaMiddleware, {END} from 'redux-saga';

ReactGA.initialize('UA-XXXXXX-X');

export default function () {

  const sagaMiddleware = createSagaMiddleware();
  const initialState = {};

  const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(sagaMiddleware),
    )
  );

  store.runSaga = sagaMiddleware.run;
  store.close = () => store.dispatch(END);
  return store;
}