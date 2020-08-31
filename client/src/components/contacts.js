import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {
    Typography, Paper, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Avatar,
    Grid, Checkbox,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing(5),
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    table: {
        width: '100%',
        maxHeight: 440,
    },
    headCell: {
        fontWeight: "bold",
        color: '#B0C6FF'
    },
    media: {
        width: '30.93px',
        height: '32px',
        textAlign: 'center',
    }
}));

function createData(name, email, phone, photo) {
    return { name, email, phone, photo };
}

const rows = [
    createData('Rakesh Sharma', 'rakesh@test.com', '1234567891', 'https://lh3.googleusercontent.com/a-/AOh14Gi5m3G2KaJGgDDfbefCY84BE6XuxZFzMxvpVqWxAA=s80-p-k-no'),
    createData('Gaurav Sharma', 'gaurav@test.com', '2345678912', 'https://lh3.googleusercontent.com/a-/AOh14GjB1TW8n8xjqhej0cwZj9TKyBdNZnJTYJ_X_P_xzQ=s80-p-k-no'),
    createData('Shubham Gawle', 'shubham@test.com', '3456789123', 'https://lh3.googleusercontent.com/a-/AOh14Gi34Bi20J7BTXH9FjkffjDQB2N-ciPlRuY7ZokmMw=s80-p-k-no'),
];

export const StyledTableRow = withStyles(() => ({
    root: {
        "&:hover": {
            backgroundColor: "#ddd !important",
        },
    },
}))(TableRow);

export default function Login({ data }) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <Typography variant="h6">
                    Contacts ({rows.length})
                </Typography>
                <TableContainer className={classes.table}>
                    <Table stickyHeader size="small" aria-label="sticky table" >
                        <TableHead>
                            <TableRow>
                                <TableCell className={classes.headCell}>Name</TableCell>
                                <TableCell className={classes.headCell}>Email</TableCell>
                                <TableCell className={classes.headCell}>Phone Number</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <StyledTableRow hover key={row.name}>
                                    <TableCell component="th" scope="row">
                                        <Grid container direction="row" alignItems="center">
                                            <Grid item>
                                                <Checkbox 
                                                    checked={true}
                                                    size="small"
                                                    color="primary"
                                                    inputProps={{ 'aria-label': 'primary checkbox' }} 
                                                />
                                            </Grid>
                                            <Grid item>
                                                <Avatar alt={`${row.name}`} src={row.photo} />
                                            </Grid>
                                            <Grid item>
                                                &nbsp; {row.name}
                                            </Grid>
                                        </Grid>
                                    </TableCell>
                                    <TableCell>{row.email}</TableCell>
                                    <TableCell>
                                        <Grid container direction="row" alignItems="center">
                                            <Grid item>
                                                {row.phone} &emsp;
                                            </Grid>
                                            <Grid item>
                                                <DeleteIcon style={{marginTop: '6px'}} fontSize="small"/>
                                            </Grid>
                                        </Grid>
                                    </TableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </div>
    );
};