import axios from 'axios'
import jwt_decoded from 'jwt-decode'
import setAuthToken from '../../utils/setAuthToken'
import { GET_NOTIFICATION, SET_CURRENT_USER } from './types'

//Register User...
export const registerUser = (data, history) => dispatch => {
	axios
		.post('/api/users/register', data)
		// push to login page after successful register
		.then(res => history.push('/login'))
		// dispatch notification incase of any errors
		.catch(err => {
			dispatch({
				type: GET_NOTIFICATION,
				payload: err.response,
			})
		})
}

//Get login token ...
export const loginUser = userData => dispatch => {
	axios
		.post('/api/users/login', userData)
		.then(res => {
			//Set token to local storage
			const { token } = res.data
			//Save to localstorage
			localStorage.setItem('jwtToken', token)
			setAuthToken(token)
			//decode token
			const decoded = jwt_decoded(token)

			dispatch(setCurrentUser(decoded))
		})
		.catch(err => {
			dispatch({
				type: GET_NOTIFICATION,
				payload: err.response,
			})
		})
}

//Set logged in user
export const setCurrentUser = decoded => {
	return {
		type: SET_CURRENT_USER,
		payload: decoded,
	}
}

//Log user out
export const logOutUser = () => dispatch => {
	//remove toke from localstorage
	localStorage.removeItem('jwtToken')
	//remove auth header for future requests
	setAuthToken(false)
	//remove current user and set auth state to false
	dispatch(setCurrentUser({}))
}
