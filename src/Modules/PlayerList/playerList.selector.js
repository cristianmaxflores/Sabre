import { createSelector } from 'reselect'
// selector
export const getPlayers = (state) => state.playersReducer.players
export const getError = (state) => state.playersReducer.error
export const getLoading = (state) => state.playersReducer.loading
// reselect function
export const getPlayersState = createSelector([getPlayers], (players) => players)
export const getErrorState = createSelector([getError], (error) => error)
export const getLoadingState = createSelector([getLoading], (loading) => loading)