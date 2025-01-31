import React, { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useSelector, useDispatch } from 'react-redux';
import jsonwebtoken from 'jsonwebtoken';
import { makeStyles } from '@material-ui/core/styles';

import { getProfile } from '../redux/index';
import Login from './login';
import NavBar from './navbar';
import Footer from './footer';
import Contacts from './contacts';

const useStyles = makeStyles(theme => ({
  layout: {
    fontFamily: 'Verdana, Geneva, sans-serif',
    color: '#828282',
    fontSize: '0.7rem',
    margin: theme.spacing(1),
    width: '98%',
  }
}));

// parent app component
const App = ({ location }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [cookies, setCookie] = useCookies(['token']);
  const profile = useSelector(state => state.profile);

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const token = query.get('token') || cookies.token;
    const decoded = jsonwebtoken.decode(token);
    if (decoded && decoded.exp > Math.floor((new Date()).getTime()/1000)){
      setCookie('token', token, { path: '/' });
      dispatch(getProfile(decoded));
    } else {
      dispatch(getProfile({}))
    }
  // eslint-disable-next-line
  }, [location, setCookie, dispatch]);

  return (
    <div className={classes.layout}>
        <NavBar />
        { Object.keys(profile).length ? <Contacts /> :  <Login />}
        <Footer />
    </div>
  );
}

export default App;