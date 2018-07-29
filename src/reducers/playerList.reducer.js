import { playerListConstants } from '../constants/playerList.constants'
import { createSelector } from 'reselect';

const initialState = {
    players: [],
    error: "",
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
            return Object.assign({}, state, {
                loading: false,
                error: action.error
            });
        default:
            return state
    }
}


// selector
const getPlayers = (state) => state.PlayerComponent.players
// reselect function
export const getPlayersState = createSelector([getPlayers], (players) => players)