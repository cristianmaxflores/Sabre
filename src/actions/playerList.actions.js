import { playerListConstants } from '../constants/playerList.constants'

export const playerListActions = {
    fetchPlayers
}

function fetchPlayersFromAPI() {
    return fetch('https://football-players-b31f2.firebaseio.com/players.json').then(response => response.json())
    //return Promise.reject("failed") //return fail promise
}

function fetchPlayers(params) {
    return dispatch => {
        dispatch(request());
        fetchPlayersFromAPI()
            .then(
                response => dispatch(success(response, params)),
                error => dispatch(failure(error))
            );
    };
    function request() { return { type: playerListConstants.FETCH_PLAYERLIST_REQUEST } }
    function success(response) { return { type: playerListConstants.FETCH_PLAYERLIST_SUCCESS, response, params } }
    function failure(error) { return { type: playerListConstants.FETCH_PLAYERLIST_FAILURE, error } }
}