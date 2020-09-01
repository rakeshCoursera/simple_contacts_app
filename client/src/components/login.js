import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper, Button, CardMedia } from '@material-ui/core';
import glogo from '../static/google.png';
import config from '../config/config';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        marginTop: theme.spacing(5),
    },
    paper: {
        height: 250,
        width: 300,
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    button: {
        textTransform: 'none',
    },
    media: {
        width: '30.93px',
        height: '32px',
        textAlign: 'center',
    }
}));

export default function Login() {
    const classes = useStyles();

    const handleAuthRedirect = () => {
        window.location.replace(`${config.apiUrl}/auth/google`);
    }

    return (
        <Grid container className={classes.root} spacing={2}>
            <Grid item xs={12}>
                <Grid container justify="center" spacing={2}>
                    <Paper elevation={3} className={classes.paper} onClick={()=> handleAuthRedirect()}>
                        <Button color="default" className={classes.button}>
                            <CardMedia
                                className={classes.media}
                                image={`${glogo}`}
                                title="google logo"
                            />
                        </Button>
                        <Button color="default" className={classes.button}>
                            Sign in with Google
                        </Button>
                    </Paper>
                </Grid>
            </Grid>
        </Grid>
    );
}
