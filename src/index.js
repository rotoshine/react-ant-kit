import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { LocaleProvider } from 'antd';
import koKR from 'antd/lib/locale-provider/ko_KR';
import configureStore from './store/configureStore';
import createHistory from 'history/createBrowserHistory';
import rootSaga from './sagas';
import trackingGA from './trackingGA';
import App from './App';
import { INITIALIZE } from './actionTypes/appType';
import './styles/style.less';

//import registerServiceWorker from './registerServiceWorker';

const store = configureStore();
window.store = store; // for debugging;


const unsubscribe = store.subscribe( () => {
  const initialize = store.getState().appState.initialize;
  if ( initialize ) {
    render();
    unsubscribe();
  }
});

store.runSaga( rootSaga );
store.dispatch( { type: INITIALIZE } );

function render() {
  ReactDOM.render(
    <Provider store={store}>
      <LocaleProvider locale={koKR}>
        <App history={trackingGA(createHistory())}/>
      </LocaleProvider>
    </Provider>,
    document.getElementById('root'),
  )
}


// PWA 설정이 필요하다면 실행한다.
//registerServiceWorker();


