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
import CircularProgress from '@material-ui/core/CircularProgress';
import DataFetcher from '../DataFetch/DataFetcher'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const StyledTableCell = withStyles(theme => ({
    head: {
        backgroundColor: theme.palette.success.dark,
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

    },
    loading: {
        margin: 'auto',
        width: '10%',
        padding: theme.spacing(2)
    },
    container: {
        width: "fit-content"
    },
     card: {
       width:'fit-content'
      },
      
      title: {
        fontSize: 20,
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
        let total_gw = 0;
        return (
            <DataFetcher>
                {({ error, isLoading, details }) => {
                    if (error) {
                        return <p style={{ color: "red" }}>{error.message}</p>
                    }
                    if (isLoading) {
                        return <CircularProgress className={classes.loading} />
                    }

                    total_gw = this.props.data[0]["data"].length
                    return (

                        <div className={classes.root}>
                            <Card className={classes.card}>
                                <CardContent>
                                <Typography className={classes.title} color="textSecondary" gutterBottom >Kokkola Cup</Typography>
                                <TableContainer component={Paper} className={classes.container}>
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
                                                    <StyledTableCell align="right">{parseInt(row.total / total_gw)}</StyledTableCell>
                                                    <StyledTableCell align="right">{row.total}</StyledTableCell>
                                                </StyledTableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                                </CardContent>
                               </Card>

                        </div>
                    )
                }}
            </DataFetcher>
                    )


                }
                }

export default withStyles(useStyles)(index);