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
import CircularProgress from '@material-ui/core/CircularProgress';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const StyledTableCell = withStyles(theme => ({
    head: {
        backgroundColor: theme.palette.secondary.light,
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
        width: 'fit-content',
    },
    container: {
        maxHeight: 345,
      },
    loading: {
        margin: 'auto',
        width: '10%',
        padding: theme.spacing(2)
    },
    
     card: {
       width:'fit-content'
      },
      
      title: {
        fontSize: 20,
      },

});


class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
        };
    }
    render() {
        const { classes } = this.props;
        const { show } = this.state
        
        return (
            <div>
                <DataFetcher>
                    {({ error, isLoading, winners }) => {
                        if (error) {
                            return <p style={{ color: "red" }}>{error.message}</p>
                        }
                        if (isLoading) {
                            return <CircularProgress className={classes.loading} />
                        }
                            return (
                                <div className={classes.root}>
                                    <Card className={classes.card}>
                                <CardContent>
                                    <Typography className={classes.title} color="textSecondary" gutterBottom >Winners</Typography>
                                    <TableContainer component={Paper} className={classes.container}>
                                        <Table stickyHeader size="small" aria-label="simple table" >
                                            <TableHead className={classes.head}>
                                                <TableRow>
                                                    <StyledTableCell>Manager</StyledTableCell>
                                                    <StyledTableCell align="right">GameWeek</StyledTableCell>
                                                    <StyledTableCell align="right">Points</StyledTableCell>

                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {winners.map(win=>win.map(winner=> (
                                                 
                                                    <StyledTableRow key={winner.index}>
                                                        
                                                        <StyledTableCell component="th" scope="row">{winner.name}</StyledTableCell>
                                                        <StyledTableCell component="th" scope="row" align="right">{winner.gameWeek}</StyledTableCell>
                                                        <StyledTableCell component="th" scope="row" align="right">{winner.points}</StyledTableCell>


                                                    </StyledTableRow>
                                                )))}

                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                    </CardContent>
                                    </Card>

                                </div>
                            )
                       
                    }}

                </DataFetcher>
            </div>
        )


    }
}

export default withStyles(useStyles)(index);

