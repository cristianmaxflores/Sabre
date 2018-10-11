import { combineReducers } from 'redux'
import PlayerList from './Modules/PlayerList'

const appReducer = combineReducers({
    playersReducer: PlayerList.reducer
})

export default appReducer
