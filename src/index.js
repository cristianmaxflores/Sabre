import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { PlayerList } from './Modules/PlayerList/components/PlayerList'
import appReducer from './rootReducer'
import thunk from 'redux-thunk'

const store = createStore(
    appReducer,
    applyMiddleware(thunk)
)

render(
    <Provider store={store}>
        <PlayerList />
    </Provider>,
    document.getElementById('root')
) 