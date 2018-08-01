import * as actionType from './playerList.actionTypes'

const initialState = {
    players: [],
    error: false,
    loading: false
}

export function PlayerComponent(state = initialState, action) {
    switch (action.type) {
        case actionType.FETCH_PLAYERLIST_REQUEST:
            return Object.assign({}, state, {
                loading: true
            })
        case actionType.FETCH_PLAYERLIST_SUCCESS:
            const { params } = action
            if (params.age === "" && params.position === "" && params.playername === "") {
                console.log("No params")
                return Object.assign({}, state, {
                    loading: false,
                    error: false,
                    players: action.response
                })
            }
            var newArrayOfPlayers = action.response
            if (params.age !== "") { newArrayOfPlayers = newArrayOfPlayers.filter(player => (params.functionGetAge(player.dateOfBirth).toString() === params.age)) }
            if (params.position !== "") { newArrayOfPlayers = newArrayOfPlayers.filter(player => (player.position === params.position)) }
            if (params.playername !== "") { newArrayOfPlayers = newArrayOfPlayers.filter(player => (player.name.includes(params.playername))) }
            return Object.assign({}, state, {
                loading: false,
                error: false,
                players: newArrayOfPlayers
            })
        case actionType.FETCH_PLAYERLIST_FAILURE:
            return Object.assign({}, state, {
                loading: false,
                error: true,
                players:[]
            })
        default:
            return state
    }
}