import { playerListConstants } from '../constants/playerList.constants'

export const playerListActions = {
    fetchPlayers
}
function handleResponse(response) {
    return response.json();
}

function fetchPlayersFromAPI() {
    return fetch('https://football-players-b31f2.firebaseio.com/players.json').then(handleResponse)
}

function fetchPlayers() {
    return dispatch => {
        dispatch(request());
        fetchPlayersFromAPI()
            .then(
                response => dispatch(success(response)),
                error => dispatch(failure(error))
            );
    };
    function request() { return { type: playerListConstants.FETCH_PLAYERLIST_REQUEST } }
    function success(response) { return { type: playerListConstants.FETCH_PLAYERLIST_SUCCESS, response } }
    function failure(error) { return { type: playerListConstants.FETCH_PLAYERLIST_FAILURE, error } }
}