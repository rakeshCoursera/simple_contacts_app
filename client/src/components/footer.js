import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

const Copyright = () => {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="#">
                Knolskape
            </Link>
            {' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles({
    footer: {
        marginTop: '2%', 
        padding: '2% 0',
    }
});

const Footer = () => {
    const classes = useStyles();
    return (
        <Container maxWidth="md" component="footer" className={classes.footer}>
            <Box mt={2}>
                <Copyright />
            </Box>
        </Container>
    );
}

export default Footer;