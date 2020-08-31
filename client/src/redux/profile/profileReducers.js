import {
    GET_PROFILE,
} from './profileTypes';

const initialState = {};

// pure component reducer
function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_PROFILE:
            return {
                ...action.payload
            }
        default: return state
    }
}

export default reducer;
