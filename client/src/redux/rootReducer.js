import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

// root redcucer which combnes all the reducers with browser hisory object
import profileReducer from './profile/profileReducers';
import contactsReducer from './contacts/contactsReducers';

const createRootReducer = (history) => combineReducers({
    router: connectRouter(history),
    profile: profileReducer,
    contacts: contactsReducer,
});

export default createRootReducer;