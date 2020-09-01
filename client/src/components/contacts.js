import React, { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {
    Typography, Paper, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, TablePagination,
    Avatar, Grid, CircularProgress, // Checkbox
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

import { fetchContacts, deleteContact } from '../redux/index';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing(3),
    },
    progress: {
        textAlign: 'center',
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
}));

const StyledDeleteIcon = withStyles(() => ({
    root: {
        "&:hover": {
            color: "green !important",
        },
    },
}))(DeleteIcon);

const StyledTableRow = withStyles(() => ({
    root: {
        "&:hover": {
            backgroundColor: "#ddd !important",
        },
    },
}))(TableRow);

export default function Login() {
    const classes = useStyles();

    const dispatch = useDispatch();
    const [cookies] = useCookies(['token']);
    const profile = useSelector(state => state.profile);
    const contacts = useSelector(state => state.contacts.list);

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    useEffect(() => {
        dispatch(fetchContacts(cookies.token));
    }, [profile, cookies, dispatch]);

    useEffect(() => {
        if (page === 0) {
            dispatch(fetchContacts(cookies.token, null, page, rowsPerPage));
        } else {
            dispatch(fetchContacts(cookies.token, contacts.data.nextPageToken, page, rowsPerPage));
        }
    // eslint-disable-next-line
    }, [page, rowsPerPage, cookies, dispatch]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <div className={classes.root}>
            {contacts.loading ?
                <div className={classes.progress}> <CircularProgress /> </div> :
                contacts.error ?
                    <div>{`Error: ${contacts.error}`}</div> :
                    Object.keys(contacts.data).length > 0 ?
                        <Paper className={classes.paper}>
                            <Typography variant="h6">
                                &nbsp; Contacts ({contacts.data.totalItems})
                            </Typography>
                            <TableContainer className={classes.table}>
                                <Table stickyHeader size="small" aria-label="sticky table" >
                                    <TableHead>
                                        <TableRow>
                                            {['Name', 'Email', 'Phone Number', ''].map((val) => (
                                                <TableCell className={classes.headCell} key={val}>{val}</TableCell>
                                            ))}
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {contacts.data.connections.map((row) => (
                                            <StyledTableRow hover key={row.etag}>
                                                <TableCell component="th" scope="row">
                                                    <Grid container direction="row" alignItems="center">
                                                        {/* <Grid item>
                                                            <Checkbox
                                                                checked={true}
                                                                size="small"
                                                                color="primary"
                                                                inputProps={{ 'aria-label': 'primary checkbox' }}
                                                            />
                                                        </Grid> */}
                                                        <Grid item>
                                                            <Avatar alt={'names' in row ? row.names[0].displayName : ''} src={'photos' in row ? row.photos[0].url : ''} />
                                                        </Grid>
                                                        <Grid item>
                                                            &nbsp; {'names' in row ? row.names[0].displayName : ''}
                                                        </Grid>
                                                    </Grid>
                                                </TableCell>
                                                <TableCell>
                                                    {'emailAddresses' in row ? row.emailAddresses[0].value : ''}
                                                </TableCell>
                                                <TableCell>
                                                    {'phoneNumbers' in row ? row.phoneNumbers[0].value : ''} &emsp;
                                                </TableCell>
                                                <TableCell>
                                                    <StyledDeleteIcon 
                                                        style={{ marginTop: '6px' }} 
                                                        fontSize="small"
                                                        onClick={() => dispatch(deleteContact(cookies.token, row.resourceName))}
                                                    />
                                                </TableCell>
                                            </StyledTableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <TablePagination
                                rowsPerPageOptions={[10, 25, 50]}
                                component="div"
                                count={contacts.data.totalItems}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onChangePage={handleChangePage}
                                onChangeRowsPerPage={handleChangeRowsPerPage}
                            />
                        </Paper> :
                        <div className={classes.progress}> <CircularProgress /> </div>
            }
        </div>
    );
};