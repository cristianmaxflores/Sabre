import { combineReducers } from '../../../AppData/Local/Microsoft/TypeScript/2.9/node_modules/redux'
import PlayerList from './Modules/PlayerList'

const appReducer = combineReducers({
    playersReducer: PlayerList.reducer
})

export default appReducer