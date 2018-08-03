import { playersReducer as reducer } from '../Modules/PlayerList/playerList.reducer'
import * as actionType from '../Modules/PlayerList/playerList.actionTypes'
import * as selectors from '../Modules/PlayerList/playerList.selector'
import { createSelector } from 'reselect'

//getAge
export function getAge(dateOfBirth) {
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
//const
const responseFromAPI = [{ name: 'Cristian', dateOfBirth: "1993-05-13", position: "Left-Back" }, { name: 'Maximiliano', dateOfBirth: "1993-05-13", position: "Left-Back" }]
const initialState = {
    playersReducer: {
        players: [],
        error: false,
        loading: false
    }
}
const params = { playername: "", age: "", position: "", functionGetAge: getAge }

//actions
function request() { return { type: actionType.FETCH_PLAYERLIST_REQUEST } }
function success(response, params) { return { type: actionType.FETCH_PLAYERLIST_SUCCESS, response, params } }
function failure(error) { return { type: actionType.FETCH_PLAYERLIST_FAILURE, error } }




describe('Selectors Tests', () => {
    it("selector unit test getplayers == [{name:'Cristian'}]", () => {
        const store = initialState
        const players = selectors.getPlayers(store)
        expect(players).toEqual([])
    })
    it("selector unit test error == false", () => {
        const store = initialState
        const error = selectors.getError(store)
        expect(error).toEqual(false)
    })
    it('reselector unit test for getPlayerState after fetch failure', () => {
        const store = initialState
        const getPlayersState = createSelector([selectors.getPlayers], (players) => players)
        //init
        expect(getPlayersState(store)).toEqual([])
        //passing the branch of the store + action to reducer
        const storeAfterRequest = { playersReducer: reducer(store.playersReducer, request())}
        //reselector for players after request
        expect(getPlayersState(storeAfterRequest)).toEqual([])
        const storeAfterFailure = { playersReducer: reducer(store.playersReducer, failure("error"))}
        //reselector for players after failure
        expect(getPlayersState(storeAfterFailure)).toEqual([])
        //check for recomputations == 2
        expect(getPlayersState.recomputations()).toEqual(2)
    })
    it('reselector unit test for getLoading after fetch failure', () => {
        const getLoadingState = createSelector(selectors.getLoading, loading => loading)
        const store = initialState
        //reselector
        const storeAfterRequest = { playersReducer: reducer(store.playersReducer, request())}
        //reselector for status after request
        expect(getLoadingState(storeAfterRequest)).toEqual(true)
        //failure deletes all players, set error to true and loading false
        const storeAfterFailure = { playersReducer : reducer(storeAfterRequest, failure("error"))}
        //reselector for status after failure
        expect(getLoadingState(storeAfterFailure)).toEqual(false)
        //check for recomputations == 2
        expect(getLoadingState.recomputations()).toEqual(2)
    })
    it('reselector unit test for getPlayers after fetching twice with no params', () => {
        const getPlayersState = createSelector(selectors.getPlayers, players => players)
        const store = initialState
        //reselector
        const storeAfterFirstRequest = { playersReducer: reducer(store.playersReducer, request())}
        //reselector for status after request
        expect(getPlayersState(storeAfterFirstRequest)).toEqual([])
        //failure deletes all players, set error to true and loading false
        const storeAfterSuccess = { playersReducer : reducer(storeAfterFirstRequest, success(responseFromAPI, params))}
        //reselector for status after failure
        expect(getPlayersState(storeAfterSuccess)).toEqual(responseFromAPI)
        //check for recomputations == 2
        expect(getPlayersState.recomputations()).toEqual(2)
        //reducer deletes players in case of fail to fetch
        const storeAfterSecondRequest = { playersReducer: reducer(store.playersReducer, request())}
        expect(getPlayersState(storeAfterFirstRequest)).toEqual([])
        const storeAfterSecondSuccess = { playersReducer : reducer(storeAfterSecondRequest, success(responseFromAPI, params))}
        expect(getPlayersState(storeAfterSuccess)).toEqual(responseFromAPI)
        //expect 4 recomputations
        expect(getPlayersState.recomputations()).toEqual(4)

    })
});

