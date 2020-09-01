import {
    FETCH_CONTACTS_REQUEST,
    FETCH_CONTACTS_SUCCESS,
    FETCH_CONTACTS_FAILURE,
} from './contactsTypes';

const initialState = {
    loading: false,
    data: {},
    error: ''
};

// pure component reducer
function reducer(state = initialState, action){
    switch (action.type) {
        case FETCH_CONTACTS_REQUEST:
            return {
                ...state,
                loading: !action.payload
            }
        case FETCH_CONTACTS_SUCCESS:
            return {
                loading: false,
                data: action.payload,
                error: ''
            }
        case FETCH_CONTACTS_FAILURE:
            return {
                loading: false,
                data: {},
                error: action.payload
            }
        default: return state
    }
}

export default reducer;
