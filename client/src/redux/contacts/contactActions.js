import axios from 'axios';
import config from '../../config/config';
import {
  FETCH_CONTACTS_REQUEST,
  FETCH_CONTACTS_SUCCESS,
  FETCH_CONTACTS_FAILURE,
} from './contactsTypes';

// fetch new asyc action creator
export const fetchContacts = (token, pageToken = null, pageNo = 0, pageSize = 10) => {
  return async (dispatch) => {
    try{
      dispatch(fetchContactsRequest());
      const options = {
        method: 'GET',
        url: `${config.apiUrl}/api/v1/contact?pageNo=${pageNo}&pageSize=${pageSize}&pageToken=${pageToken}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      
      const resp = await axios(options);
      dispatch(fetchContactsSuccess(resp.data.data));
    } catch(err) {
      console.log('Error: ', err);
      dispatch(fetchContactsFailure(err.message))
    }
  }
}

export const fetchContactsRequest = () => {
  return {
    type: FETCH_CONTACTS_REQUEST,
  }
}

export const fetchContactsSuccess = data => {
  return {
    type: FETCH_CONTACTS_SUCCESS,
    payload: data
  }
}

export const fetchContactsFailure = error => {
  return {
    type: FETCH_CONTACTS_FAILURE,
    payload: error
  }
}
