import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducers';
import ReactGA from 'react-ga';
import createSagaMiddleware, { END } from 'redux-saga';


ReactGA.initialize( 'UA-XXXX-X', { dubug: true } );

export default function () {

  const sagaMiddleware = createSagaMiddleware();
  const initialState = {};

  const store = createStore(
    rootReducer,
    initialState,
    compose(
      //applyMiddleware(require('redux-immutable-state-invariant')()),
      applyMiddleware( sagaMiddleware ),
      window.devToolsExtension ? window.devToolsExtension() : f => f,
    ),
  );


  if ( module.hot ) {
    module.hot.accept( '../reducers', () => {
      const nextRootReducer = require( '../reducers' );
      store.replaceReducer( nextRootReducer );
    } );
  }

  store.runSaga = sagaMiddleware.run;
  store.close = () => store.dispatch( END );
  return store;
};