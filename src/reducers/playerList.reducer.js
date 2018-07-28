import { playerListConstants } from '../constants/playerList.constants'
const initialState = {
    players: [{
        "contractUntil": "2022-06-30",
        "dateOfBirth": "1993-05-13",
        "jerseyNumber": 9,
        "name": "Romelu Lukaku",
        "nationality": "Belgium",
        "position": "Centre-Forward"
      }, {
        "contractUntil": "2019-06-30",
        "dateOfBirth": "1990-11-07",
        "jerseyNumber": 1,
        "name": "David de Gea",
        "nationality": "Spain",
        "position": "Keeper"
      }],
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
                loading: false
            });
        case playerListConstants.FETCH_PLAYERLIST_FAILURE:
            return Object.assign({}, state, {
                loading: false
            });
        default:
            return state
    }
}