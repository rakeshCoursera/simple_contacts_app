import {
  GET_PROFILE,
} from './profileTypes';


export const getProfile = (profile) => {
  return {
    type: GET_PROFILE,
    payload: profile
  }
}