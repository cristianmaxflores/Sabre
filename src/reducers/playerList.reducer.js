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
            const { params } = action
            if (params.age === "" && params.position === "" && params.playername === "") {
                console.log("No params")
                return Object.assign({}, state, {
                    loading: false,
                    error: false,
                    players: action.response
                });
            }
            var newArrayOfPlayers = action.response
            if (params.age !== "") { newArrayOfPlayers = newArrayOfPlayers.filter(player => (params.functionGetAge(player.dateOfBirth).toString() === params.age)) }
            if (params.position !== "") { newArrayOfPlayers = newArrayOfPlayers.filter(player => (player.position === params.position)) }
            if (params.playername !== "") { newArrayOfPlayers = newArrayOfPlayers.filter(player => (player.name.includes(params.playername))) }
            console.log(newArrayOfPlayers)
            return Object.assign({}, state, {
                loading: false,
                error: false,
                players: newArrayOfPlayers
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
const getLoading = (state) => state.PlayerComponent.loading
// reselect function
export const getPlayersState = createSelector([getPlayers], (players) => players)
export const getStatusState = createSelector([getStatus], (status) => status)
export const getLoadingState = createSelector([getLoading], (loading) => loading)