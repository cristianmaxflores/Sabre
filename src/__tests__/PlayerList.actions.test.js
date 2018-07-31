import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import fetchMock from 'fetch-mock'
import * as actionType from '../Modules/PlayerList/playerList.actionTypes'

const mockStore = configureMockStore([thunk])
const store = mockStore({ players: [], error: false, loading: false })
const arrayFetched = [{ "name": "Romelu Lukaku", "nationality": "Belgium", "position": "Centre-Forward" }]
const params = { name: "not relevant for the thunk" }
const expectedActions = [
  { type: actionType.FETCH_PLAYERLIST_REQUEST },
  { type: actionType.FETCH_PLAYERLIST_SUCCESS, response: arrayFetched, params }
]

// function fetchPlayers(params) {
//   return dispatch => {
//     dispatch(request());
//     fetch('/someapi')
//       .then(
//         response => dispatch(success(response, params)),
//         error => dispatch(failure(error))
//       );
//   }
// }
function request() { return { type: actionType.FETCH_PLAYERLIST_REQUEST } }
function success(response) { return { type: actionType.FETCH_PLAYERLIST_SUCCESS, response, params } }
function failure(error) { return { type: actionType.FETCH_PLAYERLIST_FAILURE, error } }

describe('async actions', () => {
  afterEach(() => {
    fetchMock.reset()
    fetchMock.restore()
  })
  it('call fetchPlayers request', () => {
    store.dispatch(request())
    expect(store.getActions()).toEqual([expectedActions[0]])
  })
  it('call fetchPlayers success', () => {
    fetchMock.get('*', { body: { players: arrayFetched }, headers: { 'content-type': 'application/json' } })
    fetch().then(response => response.json())
      .then(
        response => store.dispatch(success(response.players, params)),
        error => store.dispatch(failure(error))
      );
  })
  it('check actions', () => {
    expect(store.getActions()).toEqual(expectedActions)
  })
  it('call fetchPlayers error', () => {
    fetchMock.get('*', { body: { players: arrayFetched }, headers: { 'content-type': 'application/json' } })
    fetch()
      .then(
        response => {return Promise.reject("some error")}//return a promise reject to trigger the error dispatch
      )
      .then(
        response => store.dispatch(success(response, params)),
        error => store.dispatch(failure(error))
      );
  })
  it('check last action to be failure', () => {
    const actualActions = store.getActions()
    const failureAction = { type: actionType.FETCH_PLAYERLIST_FAILURE, error: "some error" }
    expect(actualActions[2]).toEqual(failureAction)
  })
}) 

