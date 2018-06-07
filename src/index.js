import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { unregister } from './registerServiceWorker';
// don't delete the RegisterServiceWorker because by the time you open your app, it will already register, so just unregister it
import { Provider } from 'react-redux';
import store from './store';

ReactDOM.render(
    <Provider store={store}>
    {/* store is the one prop Provider needs */}
        <App />
    </Provider>
    , document.getElementById('root'));
unregister();
