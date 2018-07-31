import playerlist from '../Modules/PlayerList/'
import * as actionType from '../Modules/PlayerList/playerList.actionTypes'
const reducer = playerlist.reducer

const initialState = {
    players: [],
    error: false,
    loading: false
}

function getAge(dateOfBirth) {
    let today = new Date()
    let player = new Date(dateOfBirth)
    let age = today.getUTCFullYear() - player.getUTCFullYear()
    if (today.getUTCMonth() > player.getUTCMonth())
        return age
    else if (today.getUTCMonth() < player.getUTCMonth())
        return age - 1
    else if (today.getUTCDate() >= player.getUTCDate())
        return age
    else
        return age - 1
}

const responseFromAPI = [{ name: 'Cristian', dateOfBirth: "1993-05-13", position: "Left-Back" }, { name: 'Maximiliano', dateOfBirth: "1993-05-13", position: "Left-Back" }]

describe('playerList reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual(initialState)
    })

    it('should handle FETCH_PLAYERLIST_REQUEST', () => {
        expect(reducer(initialState,
            { type: actionType.FETCH_PLAYERLIST_REQUEST }
        )).toEqual(
            {
                players: [],
                error: false,
                loading: true
            }
        )
    })

    it('should handle FETCH_PLAYERLIST_SUCCESS with params name like "Cris" ', () => {
        expect(reducer(initialState,
            { type: actionType.FETCH_PLAYERLIST_SUCCESS, response: responseFromAPI, params: { playername: "Cris", age: "", position: "", functionGetAge: getAge } }
        )).toEqual(
            {
                players: [{ name: 'Cristian', dateOfBirth: "1993-05-13", position: "Left-Back" }],
                error: false,
                loading: false
            }
        )
    })

    it('should handle FETCH_PLAYERLIST_SUCCESS with params age like "18" ', () => {
        expect(reducer(initialState,
            { type: actionType.FETCH_PLAYERLIST_SUCCESS, response: responseFromAPI, params: { playername: "", age: "25", position: "", functionGetAge: getAge } }
        )).toEqual(
            {
                players: responseFromAPI,
                error: false,
                loading: false
            }
        )
    })

    it('should handle FETCH_PLAYERLIST_SUCCESS with params name like "Max" and position like "Left-Back" ', () => {
        expect(reducer(initialState,
            { type: actionType.FETCH_PLAYERLIST_SUCCESS, response: responseFromAPI, params: { playername: "Max", age: "", position: "Left-Back", functionGetAge: getAge } }
        )).toEqual(
            {
                players: [{ name: 'Maximiliano', dateOfBirth: "1993-05-13", position: "Left-Back" }],
                error: false,
                loading: false
            }
        )
    })

    it('should handle FETCH_PLAYERLIST_FAILURE', () => {
        expect(reducer(initialState,
            { type: actionType.FETCH_PLAYERLIST_FAILURE }
        )).toEqual(
            {
                players: [],
                error: true,
                loading: false
            }
        )
    })
}) 