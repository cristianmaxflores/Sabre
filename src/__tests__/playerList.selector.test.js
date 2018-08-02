import { playersReducer as reducer } from '../Modules/PlayerList/playerList.reducer'
import * as actionType from '../Modules/PlayerList/playerList.actionTypes'
import * as selectors from '../Modules/PlayerList/playerList.selector'

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
        const error = selectors.getStatus(store)
        expect(error).toEqual(false)
    })
    it('reselector unit test for getPlayerState after failure', () => {
        let store = initialState
        //reselectors
        console.log(store)
        store = reducer(store, request)
        console.log(store)
        //reselector for players after request
        expect(selectors.getPlayersState(store)).toEqual([{ name: 'Cristian' }])
        store = reducer(store, failure)
        //reselector for players after failure
        expect(selectors.getPlayersState(store)).toEqual([{ name: 'Cristian' }])
        //check for recomputations == 1
        expect(selectors.getPlayersState.recomputations()).toEqual(1)
    })
    // it('reselector unit test for getStatusState after failure', () => {

    //     let store = initialState
    //     //reselector
    //     const getLoadingState = createSelector([getLoading], (loading) => loading)
    //     const getErrorState = createSelector([getStatus], (error) => error)
    //     store = reducer(store, request())

    //     //reselector for status after request
    //     expect(getErrorState(store)).toEqual(false)
    //     store = reducer(store.playersReducer, failure("some error"))
    //     //console.log(getErrorState.recomputations())

    //     //reselector for status after failure
    //     //console.log(store)
    //     //console.log(getErrorState(store))
    //     expect(getStatusState(store)).toEqual(true)

    //     // //check for recomputations == 1
    //     // expect(getStatusState.recomputations()).toEqual(1)
    // })
});

