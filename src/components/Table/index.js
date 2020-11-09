import React, { useState, useEffect } from 'react';
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
        width: "fit-content",
        maxHeight: 300
    },
    card: {
        width: 'fit-content'
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


function Index(props) {

    const [record, setRecord] = useState(null);
    const [loading, setLoading] = useState(true);
    const [totalgw,setTotalgw] = useState(0);
    const {classes} =props;
    
    
    useEffect(() => {
      
        (async function () {
        
            const response = await fetch("https://fplappapi.herokuapp.com/fpl/league/"+props.leagueId+"/");
            const data = await response.json();
            const item = data.standings.results;
            setRecord(item);
            setTotalgw(1)
            setLoading(false);
        })();
    }, [props.leagueId])

    return (
       
        <div className={classes.root}>
            {
            loading ?<CircularProgress className={classes.loading} />: 
         
           
        <Card className={classes.card}>
            <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom key={props.leagueName} >{props.leagueName}</Typography>
                <TableContainer component={Paper} className={classes.container}>
                    <Table stickyHeader size="small" aria-label="simple table" >
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
                            {record.map(row => (
                                <StyledTableRow key={row.id}>
                                    <StyledTableCell >{(row.last_rank < row.rank) ? (<ProgressIcon color="red"></ProgressIcon>) : (row.last_rank === row.rank) ? (<ProgressIcon color="grey"></ProgressIcon>) : (row.last_rank > row.rank) ? (<ProgressIcon color="green"></ProgressIcon>) : null}
                                        {row.rank}</StyledTableCell>
                                    <StyledTableCell component="th" scope="row">
                                        {row.player_name}
                                    </StyledTableCell>
                                    <StyledTableCell align="right">{row.event_total}</StyledTableCell>
                                    <StyledTableCell align="right">{parseInt(row.total / totalgw)}</StyledTableCell>
                                    <StyledTableCell align="right">{row.total}</StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </CardContent>
        </Card>
 }
    </div>
    );
}


export default withStyles(useStyles)(Index);