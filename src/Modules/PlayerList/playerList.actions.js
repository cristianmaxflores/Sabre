import * as actionType from './playerList.actionTypes'
import playerlist from './'

export const playerListActions = {
    fetchPlayers
}

export function fetchPlayersFromAPI() {
    return fetch(playerlist.constants.API_URL).then(response => response.json())
    //return Promise.reject("failed") //return fail promise
}

export function fetchPlayers(params) {
    return dispatch => {
        dispatch(fetchPlayersRequest());
        fetchPlayersFromAPI()
            .then(
                response => dispatch(fetchPlayersSuccess(response, params)),
                error => dispatch(fetchPlayersFailure(error))
            );
    };
}
export function fetchPlayersRequest() { return { type: actionType.FETCH_PLAYERLIST_REQUEST } }
export function fetchPlayersSuccess(response, params) { return { type: actionType.FETCH_PLAYERLIST_SUCCESS, response, params } }
export function fetchPlayersFailure(error) { return { type: actionType.FETCH_PLAYERLIST_FAILURE, error } }