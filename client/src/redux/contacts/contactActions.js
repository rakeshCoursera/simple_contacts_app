import axios from 'axios';
import config from '../../config/config';
import {
  FETCH_CONTACTS_REQUEST,
  FETCH_CONTACTS_SUCCESS,
  FETCH_CONTACTS_FAILURE,
  DELETE_CONTACT_REQUEST,
  DELETE_CONTACT_SUCCESS,
  DELETE_CONTACT_FAILURE,
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

// delete new asyc action creator
export const deleteContact = (token, resourceName) => {
  return async (dispatch) => {
    try{
      const accountId = resourceName.split('/')[1];
      dispatch(deleteContactRequest());
      const options = {
        method: 'DELETE',
        url: `${config.apiUrl}/api/v1/contact/${accountId}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      
      const resp = await axios(options);
      dispatch(deleteContactSuccess(resp.data.data, resourceName));
    } catch(err) {
      dispatch(deleteContactFailure(err.message))
    }
  }
}

export const deleteContactRequest = () => {
  return {
    type: DELETE_CONTACT_REQUEST,
  }
}

export const deleteContactSuccess = (data, resourceName) => {
  return {
    type: DELETE_CONTACT_SUCCESS,
    payload: {resourceName, data},
  }
}

export const deleteContactFailure = error => {
  return {
    type: DELETE_CONTACT_FAILURE,
    payload: error
  }
}


