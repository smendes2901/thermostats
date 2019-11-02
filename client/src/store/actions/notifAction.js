import { CLEAR_NOTIFICATION, GET_NOTIFICATION } from './types'

export const setNotification = action => {
	return {
		type: GET_NOTIFICATION,
		payload: action,
	}
}

export const clearNotification = () => {
	return {
		type: CLEAR_NOTIFICATION,
	}
}
