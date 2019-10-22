import { GET_NOTIFICATION, CLEAR_NOTIFICATION } from '../actions/types';

const initialState = {
    message: '',
    status: 200,
};

export default function (state = initialState, action) {
    const { payload } = action
    switch (action.type) {
        case GET_NOTIFICATION:
            return {
                message: payload.data,
                status: payload.status,
            };
        case CLEAR_NOTIFICATION:
            return {
                message: null,
                status: null,
            };
        default:
            return state;
    }
}