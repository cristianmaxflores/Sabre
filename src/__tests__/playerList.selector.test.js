import { playersReducer as reducer } from '../Modules/PlayerList/playerList.reducer'
import * as actionType from '../Modules/PlayerList/playerList.actionTypes'
import * as selectors from '../Modules/PlayerList/playerList.selector'
import { createSelector } from 'reselect'

//actions
function request() { return { type: actionType.FETCH_PLAYERLIST_REQUEST } }
function failure(error) { return { type: actionType.FETCH_PLAYERLIST_FAILURE, error } }

const initialState = {
    playersReducer: {
        players: [{ name: 'Cristian' }],
        error: false,
        loading: false
    }
}


describe('Selectors Tests', () => {
    it("selector unit test getplayers == [{name:'Cristian'}]", () => {
        let store = initialState
        const players = selectors.getPlayers(store)
        //assert.deepEqual(selector({ a: 1, b: 2 }), { c: 2, d: 6 })
        //assert.deepEqual(selector({ a: 2, b: 3 }), { c: 4, d: 9 })
        expect(players).toEqual([{ name: 'Cristian' }])
    })
    it("selector unit test error == false", () => {
        let store = initialState
        const error = selectors.getError(store)
        expect(error).toEqual(false)
    })
    it('reselector unit test for getPlayerState after fetch failure', () => {
        let store = initialState
        const getPlayersState = createSelector([selectors.getPlayers], (players) => players)
        //init
        expect(getPlayersState(store)).toEqual([{ name: 'Cristian' }])
        //passing the branch of the store + action to reducer
        store.playersReducer = reducer(store.playersReducer, request())
        //reselector for players after request
        expect(getPlayersState(store)).toEqual([{ name: 'Cristian' }])
        store.playersReducer = reducer(store.playersReducer, failure("error"))
        //reselector for players after failure
        expect(getPlayersState(store)).toEqual([{ name: 'Cristian' }])
        //check for recomputations == 1
        expect(getPlayersState.recomputations()).toEqual(1)
    })
    it('reselector unit test for getLoading after fetch failure', () => {
        const getLoadingState = createSelector(selectors.getLoading, loading => loading)
        const store = initialState
        //reselector
        store.playersReducer = reducer(store.playersReducer, request())
        //reselector for status after request
        expect(getLoadingState(store)).toEqual(true)
        //failure deletes all players, set error to true and loading false
        const storeAfterfailure = { playersReducer : reducer(store.playersReducer, failure("error"))}
        //reselector for status after failure
        expect(getLoadingState(storeAfterfailure)).toEqual(false)
        //check for recomputations == 2
        expect(getLoadingState.recomputations()).toEqual(2)
    })
});

