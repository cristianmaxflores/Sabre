import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import fetchMock from 'fetch-mock'
import * as actionType from '../Modules/PlayerList/playerList.actionTypes'
import * as actionCreators from '../Modules/PlayerList/playerList.actions'
import { API_URL } from '../Modules/PlayerList/playerList.constants'
const mockStore = configureMockStore([thunk])
const store = mockStore({ players: [], error: false, loading: false })
const arrayFetched = [{ "name": "Romelu Lukaku", "nationality": "Belgium", "position": "Centre-Forward" }]
const params = { name: "not relevant for the thunk" }
const expectedActions = [
  { type: actionType.FETCH_PLAYERLIST_REQUEST },
  { type: actionType.FETCH_PLAYERLIST_SUCCESS, response: arrayFetched, params }
]
describe('async actions', () => {
  afterEach(() => {
    fetchMock.reset()
    fetchMock.restore()
  })
  it('call fetchPlayers request', () => {
    store.dispatch(actionCreators.fetchPlayersRequest())
    expect(store.getActions()).toEqual([expectedActions[0]])
  })
  it('call fetchPlayers success', () => {
    fetchMock.get('*', { body: { players: arrayFetched }, headers: { 'content-type': 'application/json' } })
    fetch().then(response => response.json())
      .then(
        response => store.dispatch(actionCreators.fetchPlayersSuccess(response.players, params)),
        error => store.dispatch(actionCreators.fetchPlayersFailure(error))
      );
  })
  it('check actions', () => {
    expect(store.getActions()).toEqual(expectedActions)
  })
  it('call fetchPlayers error', () => {
    store.clearActions()
    fetchMock.get('*', { body: { players: arrayFetched }, headers: { 'content-type': 'application/json' } })
    fetch()
      .then(
        response => { return Promise.reject("some error") }//return a promise reject to trigger the error dispatch
      )
      .then(
        response => store.dispatch(actionCreators.fetchPlayersSuccess(response, params)),
        error => store.dispatch(actionCreators.fetchPlayersFailure(error))
      );
  })
  it('check last action to be failure', () => {
    const actualActions = store.getActions()
    const failureAction = { type: actionType.FETCH_PLAYERLIST_FAILURE, error: "some error" }
    expect(actualActions[0]).toEqual(failureAction)
  })
})

describe('async fetch', () => {
  beforeAll(() => {
    fetchMock.get(API_URL, { body: { players: [] }, headers: { 'content-type': 'application/json' } })
  })
  it('should try to dispatch async fetch', () => {
    store.dispatch(actionCreators.fetchPlayers(params))
    expect(fetchMock.called()).toEqual(true)
  })
  it('should try to fetch players from api', () => {
    fetchMock.reset()
    actionCreators.fetchPlayersFromAPI()
    expect(fetchMock.called()).toEqual(true)
  })
})