// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import registerServiceWorker from './registerServiceWorker';

// ReactDOM.render(<App />, document.getElementById('root'));
// registerServiceWorker();

import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { PlayerList } from './components/PlayerList'
import appReducer from './rootReducer'

const store = createStore(appReducer)
render(
    <Provider store={store}>
        <PlayerList />
    </Provider>,
    document.getElementById('root')
) 