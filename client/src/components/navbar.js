import React from 'react';
import { useSelector } from 'react-redux';
import { AppBar, Toolbar, IconButton, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(1),
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  userDiv: {
    flex: 1,
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

export default function SearchAppBar() {
  const classes = useStyles();
  const profile = useSelector(state => state.profile);

  console.log('navbar profile: ', profile)

  return (
    <div className={classes.root}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <AccountCircleIcon style={{ fontSize: 40 }} />
          </IconButton>

          <div className={classes.userDiv}>
            <Typography className={classes.title} variant="body1" noWrap>
              {profile.username}
            </Typography>
            <Typography className={classes.title} variant="caption" noWrap>
              {profile.email}
            </Typography>
          </div>

          {Object.keys(profile).length ? <Button color="inherit"> <ExitToAppIcon /> </Button>: <div></div>}

        </Toolbar>
      </AppBar>
    </div>
  );
}
