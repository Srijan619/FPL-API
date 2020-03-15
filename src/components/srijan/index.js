import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography'

import DataFetcher from '../DataFetch/DataFetcher'

const StyledTableCell = withStyles(theme => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.background.default,
        },
    },
}))(TableRow);
const useStyles = theme => ({
    root: {
        margin: theme.spacing(1),
        width: 'fit-content'
    },

});

function ProgressIcon(props) {
    return (
        <svg height="20" width="20">
            <circle cx="10" cy="15" r="5" fill={props.color} />
        </svg>
    );
}

class index extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }


    render() {
        const { classes } = this.props;

        return (
            <DataFetcher>
                {({ error, isLoading, details,details_individual }) => {
                    if (error) {
                        return <p style={{ color: "red" }}>{error.message}</p>
                    }
                    if (isLoading) {
                        return <p>Loading data....</p>
                    }
                    
                    return (
                        
                        <div className={classes.root}>
                          {console.log(details_individual[0])}
                            <Typography variant="h5" gutterBottom color="primary" align="center">Kokkola Cup</Typography>
                            <TableContainer component={Paper}>
                                <Table size="small" aria-label="simple table" >
                                    <TableHead className={classes.head}>
                                        <TableRow>
                                            <StyledTableCell>Rank</StyledTableCell>
                                            <StyledTableCell>Manager</StyledTableCell>
                                            <StyledTableCell align="right">GameWeek</StyledTableCell>
                                            <StyledTableCell align="right">Average</StyledTableCell>
                                            <StyledTableCell align="right">Total Points</StyledTableCell>

                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {details.map(row => (
                                            <StyledTableRow key={row.id}>
                                                <StyledTableCell >{(row.last_rank < row.rank) ? (<ProgressIcon color="red"></ProgressIcon>) : (row.last_rank === row.rank) ? (<ProgressIcon color="grey"></ProgressIcon>) : (row.last_rank > row.rank) ? (<ProgressIcon color="green"></ProgressIcon>) : null}
                                                    {row.rank}</StyledTableCell>
                                                <StyledTableCell component="th" scope="row">
                                                    {row.player_name}
                                                </StyledTableCell>
                                                <StyledTableCell align="right">{row.event_total}</StyledTableCell>
                                                <StyledTableCell align="right">{parseInt(row.total/30)}</StyledTableCell>
                                                <StyledTableCell align="right">{row.total}</StyledTableCell>
                                            </StyledTableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>

                        </div>
                    )
                }}
            </DataFetcher>
        )


    }
}

export default withStyles(useStyles)(index);