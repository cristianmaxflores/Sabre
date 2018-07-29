import { combineReducers } from 'redux';
import { PlayerComponent, privatePlayerListSelectors } from './reducers/playerList.reducer'

const appReducer = combineReducers({
    PlayerComponent
})

export default appReducer

//public selector

export const publicPlayerListSelectors = {
    getPlayers
}

function getPlayers(store) {
    return privatePlayerListSelectors.getPlayers(store.PlayerComponent);
}