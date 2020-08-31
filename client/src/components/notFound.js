import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  notFound: {
      marginTop: theme.spacing(5),
  },
}));

const NotFound = () => {
  const classes = useStyles();
  return (
    <Grid container direction="column" justify="center" alignItems="center" className={classes.notFound}> 
      <Typography variant="h5">
        404 page not found
      </Typography>
      <Typography variant="body">
        We are sorry but the page you are looking for does not exist.
      </Typography>
    </Grid>
  );
}

export default NotFound;
