import { createSelector } from 'reselect'
// selector
const getPlayers = (state) => state.PlayerComponent.players
const getStatus = (state) => state.PlayerComponent.error
const getLoading = (state) => state.PlayerComponent.loading
// reselect function
export const getPlayersState = createSelector([getPlayers], (players) => players)
export const getStatusState = createSelector([getStatus], (status) => status)
export const getLoadingState = createSelector([getLoading], (loading) => loading)