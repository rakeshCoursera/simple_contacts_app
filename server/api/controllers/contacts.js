const axios = require('axios');
const { contactsApiHost } = require('../../config/config');

const listContacts = async (token, pageToken = null, pageNo = 0, pageSize = 10) => {
  try {
    const pageTokenQueryString = pageNo !== 0 && ![null, 'null', undefined, 'undefined'].includes(pageToken) ? `&pageToken=${pageToken}` : '';
    const options = {
      baseURL: contactsApiHost,
      method: 'GET',
      url: `/v1/people/me/connections?personFields=names,emailAddresses,phoneNumbers,photos&pageSize=${pageSize}${pageTokenQueryString}&sortOrder=FIRST_NAME_ASCENDING`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const resp = await axios(options);
    return { statusCode: resp.status, data: resp.data };
  } catch (err) {
    return {
      statusCode: err.status ? err.status : 500,
      message: `Something went wrong while fetching contacts, Error: ${err.message}`,
    };
  }
};

const getContact = async (token, accountId) => {
  try {
    const options = {
      baseURL: contactsApiHost,
      method: 'GET',
      url: `/v1/people/${accountId}?personFields=names,emailAddresses,phoneNumbers,photos`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const resp = await axios(options);
    return { statusCode: resp.status, data: resp.data };
  } catch (err) {
    return {
      statusCode: err.status ? err.status : 500,
      message: `Something went wrong while fetching a contact details, Error: ${err.message}`,
    };
  }
};

const createContact = async (token, body) => {
  try {
    const {
      firstName, middleName, lastName, email, mobile, mobileType,
    } = body;
    const options = {
      baseURL: contactsApiHost,
      method: 'POST',
      url: '/v1/people:createContact?personFields=names,emailAddresses,phoneNumbers,photos',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        names: [{
          familyName: lastName,
          givenName: firstName,
          middleName,
          phoneticFullName: `${firstName} ${middleName} ${lastName}`,
        }],
        emailAddresses: [{
          value: email,
        }],
        phoneNumbers: [{
          value: mobile,
          type: mobileType,
        }],
      },
    };

    const resp = await axios(options);
    return { statusCode: resp.status, data: resp.data };
  } catch (err) {
    return {
      statusCode: err.status ? err.status : 500,
      message: `Something went wrong while creating a contact, Error: ${err.message}`,
    };
  }
};

const updateContactPhoto = async (token, accountId, photo) => {
  try {
    const options = {
      baseURL: contactsApiHost,
      method: 'PATCH',
      url: `/v1/people/${accountId}:updateContactPhoto`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        photoBytes: photo,
        personFields: 'names,emailAddresses,phoneNumbers,photos',
      },
    };

    const resp = await axios(options);
    return { statusCode: resp.status, data: resp.data };
  } catch (err) {
    return {
      statusCode: err.status ? err.status : 500,
      message: `Something went wrong while updating contact photo, Error: ${err.message}`,
    };
  }
};

const updateContactDetails = async (token, accountId, body) => {
  try {
    const {
      etag, firstName, middleName, lastName, email, mobile, mobileType,
    } = body;

    const options = {
      baseURL: contactsApiHost,
      method: 'PATCH',
      url: `/v1/people/${accountId}:updateContact?updatePersonFields=names,emailAddresses,phoneNumbers&personFields=names,emailAddresses,phoneNumbers,photos`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        etag,
        names: [{
          familyName: lastName,
          givenName: firstName,
          middleName,
          phoneticFullName: `${firstName} ${middleName} ${lastName}`,
        }],
        emailAddresses: [{
          value: email,
        }],
        phoneNumbers: [{
          value: mobile,
          type: mobileType,
        }],
      },
    };

    const resp = await axios(options);
    return { statusCode: resp.status, data: resp.data };
  } catch (err) {
    return {
      statusCode: err.status ? err.status : 500,
      message: `Something went wrong while updating a contact, Error: ${err.message}`,
    };
  }
};

const updateContact = async (token, accountId, body) => {
  try {
    const [resp1, resp2] = await Promise.all([
      updateContactPhoto(token, accountId, body),
      updateContactDetails(token, accountId, body.photo),
    ]);
    if (resp1.statusCode === 200 && resp2.statusCode === 200) {
      return { statusCode: resp2.statusCode, data: resp2.data };
    }

    if (resp1.statusCode !== 200) {
      return { statusCode: resp1.statusCode, message: resp1.message };
    }

    return { statusCode: resp2.statusCode, message: resp2.message };
  } catch (err) {
    return {
      statusCode: err.status ? err.status : 500,
      message: `Something went wrong while updating a contact details and photo, Error: ${err.message}`,
    };
  }
};

const deleteContact = async (token, accountId) => {
  try {
    const options = {
      baseURL: contactsApiHost,
      method: 'DELETE',
      url: `/v1/people/${accountId}:deleteContact`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const resp = await axios(options);
    return { statusCode: resp.status, data: { message: 'contact deleted successfully' } };
  } catch (err) {
    return {
      statusCode: err.status ? err.status : 500,
      message: `Something went wrong while deleting a contact, Error: ${err.message}`,
    };
  }
};

module.exports = {
  listContacts,
  getContact,
  createContact,
  updateContact,
  deleteContact,
};
