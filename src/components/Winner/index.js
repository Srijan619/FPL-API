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
        width: '100%',
    },
    container: {
        maxHeight: 345,
      },
    loading: {
        margin: 'auto',
        width: '10%',
        padding: theme.spacing(2)
    },

});


class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
        };
    }

    componentDidMount() {
        setTimeout(() => this.setState({ show: true }), 3000)
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
                        if (show) {

                            return (
                                <div className={classes.root}>
                                    <Typography variant="h5" gutterBottom color="primary" align="center">Winners</Typography>
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

                                </div>
                            )
                        }
                        return (
                            <div className={classes.loading}>
                                <CircularProgress />
                            </div>
                        )
                    }}

                </DataFetcher>
            </div>
        )


    }
}

export default withStyles(useStyles)(index);

