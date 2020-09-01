const express = require('express');
const { validationResult } = require('express-validator');
const { isLoggedIn } = require('./middleware');
const { findUser } = require('../controllers/user');
const {
  listContacts, getContact, createContact, updateContact, deleteContact,
} = require('../controllers/contacts');
const { createContactValidator, updateContactValidator } = require('../validators/contacts');

const router = express.Router();

router.get('/', isLoggedIn, async (req, res) => {
  const { pageToken, pageNo, pageSize } = req.query;
  const user = await findUser(req.user.userId);

  if (user.statusCode === 200) {
    const resp = await listContacts(user.data.accessToken,
      pageToken, parseInt(pageNo, 10), parseInt(pageSize, 10));

    if (resp.statusCode === 200) {
      return res.status(resp.statusCode).json({
        data: resp.data,
      });
    }

    return res.status(resp.statusCode).json({
      message: resp.message,
    });
  }

  return res.status(user.statusCode).json({
    message: user.message,
  });
});

router.get('/:accountId', isLoggedIn, async (req, res) => {
  const user = await findUser(req.user.userId);
  if (user.statusCode === 200) {
    const resp = await getContact(user.data.accessToken, req.params.accountId);

    if (resp.statusCode === 200) {
      return res.status(resp.statusCode).json({
        contact: resp.data,
      });
    }

    return res.status(resp.statusCode).json({
      message: resp.message,
    });
  }

  return res.status(user.statusCode).json({
    message: user.message,
  });
});

router.post('/', [isLoggedIn, createContactValidator], async (req, res) => {
  // const body = {
  //   firstName: 'Rakesh',
  //   middleName: 'Kumar',
  //   lastName: 'Sharma',
  //   email: 'rakesh143190014@gmail.com',
  //   mobile: '9326715481',
  //   mobileType: 'work',
  // };

  // Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const user = await findUser(req.user.userId);
  if (user.statusCode === 200) {
    const resp = await createContact(user.data.accessToken, req.body);

    if (resp.statusCode === 200) {
      return res.status(resp.statusCode).json({
        contact: resp.data,
      });
    }

    return res.status(resp.statusCode).json({
      message: resp.message,
    });
  }

  return res.status(user.statusCode).json({
    message: user.message,
  });
});

router.patch('/', [isLoggedIn, updateContactValidator], async (req, res) => {
  // const body = {
  //   firstName: 'Rakesh',
  //   middleName: 'kr',
  //   lastName: 'Sharma',
  //   email: 'rakesh143190014@gmail.com',
  //   mobile: '7738692380',
  //   mobileType: 'home',
  //   etag: '%EgoBAj0DCT4LPzcuGgQBAgUHIgxNU1FqTmVpUTdDRT0=',
  //   photo: 'base 64 encoded string',
  // };

  // Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const user = await findUser(req.user.userId);
  if (user.statusCode === 200) {
    const resp = await updateContact(user.data.accessToken, user.data.googleId, req.body);

    if (resp.statusCode === 200) {
      return res.status(resp.statusCode).json({
        contact: resp.data,
      });
    }

    return res.status(resp.statusCode).json({
      message: resp.message,
    });
  }

  return res.status(user.statusCode).json({
    message: user.message,
  });
});

router.delete('/:accountId', isLoggedIn, async (req, res) => {
  const user = await findUser(req.user.userId);
  if (user.statusCode === 200) {
    const resp = await deleteContact(user.data.accessToken, req.params.accountId);

    if (resp.statusCode === 200) {
      return res.status(resp.statusCode).json({
        response: resp.data,
      });
    }

    return res.status(resp.statusCode).json({
      message: resp.message,
    });
  }

  return res.status(user.statusCode).json({
    message: user.message,
  });
});

module.exports = router;
