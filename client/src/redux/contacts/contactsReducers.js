import {
    FETCH_CONTACTS_REQUEST,
    FETCH_CONTACTS_SUCCESS,
    FETCH_CONTACTS_FAILURE,
    DELETE_CONTACT_REQUEST,
    DELETE_CONTACT_SUCCESS,
    DELETE_CONTACT_FAILURE,
} from './contactsTypes';

const initialState = {
    list: {
        loading: false,
        data: {},
        error: ''
    },
    delete: {
        loading: false,
        data: '',
        error: ''
    },
};

// pure component reducer
function reducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_CONTACTS_REQUEST:
            return {
                ...state,
                list: {
                    ...state.list,
                    loading: true
                }
            }
        case FETCH_CONTACTS_SUCCESS:
            return {
                ...state,
                list: {
                    loading: false,
                    data: action.payload,
                    error: ''
                }
            }
        case FETCH_CONTACTS_FAILURE:
            return {
                ...state,
                list: {
                    loading: false,
                    data: {},
                    error: action.payload
                }
            }
        case DELETE_CONTACT_REQUEST:
            return {
                ...state,
                delete: {
                    ...state.delete,
                    loading: true
                }
            }
        case DELETE_CONTACT_SUCCESS:
            const listContacts = Object.assign({}, state.list);
            listContacts.data.connections = listContacts.data.connections.filter(val => val.resourceName !== action.payload.resourceName);
            return {
                ...state,
                list: listContacts,
                delete: {
                    loading: false,
                    data: action.payload.data,
                    error: ''
                }
            }
        case DELETE_CONTACT_FAILURE:
            return {
                ...state,
                delete: {
                    loading: false,
                    data: {},
                    error: action.payload
                }
            }
        default: return state
    }
}

export default reducer;
