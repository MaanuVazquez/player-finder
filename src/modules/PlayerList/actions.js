// @flow
import {PLAYER_LIST_ERROR, PLAYER_LIST_LOAD, PLAYER_LIST_SUCCESS} from './actionTypes'
import type {Player} from './model'
import {API_URL} from './constants'

export const playerListError = (message: string) => ({
  type: PLAYER_LIST_ERROR,
  message
})

export const playerListLoad = () => ({type: PLAYER_LIST_LOAD})

export const playerListSuccess = (players: Player[]) => ({
  type: PLAYER_LIST_SUCCESS,
  items: players
})

export const playerListFetch = () => async(dispatch: any) => {
  dispatch(playerListLoad())
  try {
    const response = await fetch(API_URL)

    if (!response.ok) throw new Error(response.statusText)

    dispatch(playerListSuccess(await response.json()))
  } catch (e) {
    dispatch(playerListError(e.message))
  }
}
