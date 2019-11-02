import authReducer from './authReducer'
import notifReducer from './notifReducer'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
	auth: authReducer,
	notification: notifReducer,
})

export default rootReducer
