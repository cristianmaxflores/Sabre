import { playerListConstants } from '../constants/playerList.constants'
import { createSelector } from 'reselect';

const initialState = {
    players: [],
    error: false,
    loading: false
}


export function PlayerComponent(state = initialState, action) {
    switch (action.type) {
        case playerListConstants.FETCH_PLAYERLIST_REQUEST:
            return Object.assign({}, state, {
                loading: true
            });
        case playerListConstants.FETCH_PLAYERLIST_SUCCESS:
            return Object.assign({}, state, {
                loading: false,
                players: action.response
            });
        case playerListConstants.FETCH_PLAYERLIST_FAILURE:
            console.log(action)
            return Object.assign({}, state, {
                loading: false,
                error: true
            });
        default:
            return state
    }
}

// selector
const getPlayers = (state) => state.PlayerComponent.players
const getStatus = (state) => state.PlayerComponent.error
// reselect function
export const getPlayersState = createSelector([getPlayers], (players) => players)
export const getStatusState = createSelector([getStatus], (status) => status)