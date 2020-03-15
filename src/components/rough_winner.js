import React, { Component } from 'react';

import axios from 'axios';

import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography'
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

//const URL = "https://fantasy.premierleague.com/api/entry/1395281/";
const League_Url = "https://fantasy.premierleague.com/api/leagues-classic/407866/standings/?page_new_entries=1&page_standings=1&phase=1";

//const player=`https://fantasy.premierleague.com/api/entry/${player_id}/history/`
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

const data = [{name: 'Page A', uv: 400, pv: 2400, amt: 2400}];

class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            details: [],
            player_details: []
        };
    }
    get_random_color() {
        function c() {
          var hex = Math.floor(Math.random() * 256).toString(16);
          return ("0" + String(hex)).substr(-2); // pad with zero
        }
        return "#" + c() + c() + c();
      }
    async  componentDidMount() {

        await axios.get(League_Url)
            .then(posts => {
                this.setState({
                    details: posts.data.standings.results
                })
            })

        this.getAllStats()

    }

   
    getAllStats() {
        const player_id = this.state.details
        const custom_array=[]
        player_id.map(items => {
            axios.get(`https://fantasy.premierleague.com/api/entry/${items.entry}/history/`)
                .then(item => {
                    let formatData = {
                        id: items.entry,
                        color: this.get_random_color(),
                        points: item.data.current
                      }
                    custom_array.push(formatData)
                
                })
        })
        this.setState({
            player_details: custom_array
        })
    }

    render() {
        const { classes } = this.props;
        const { player_details } = this.state;
        console.log((player_details))
        return (
            <div>
                {this.state && this.state.player_details &&
                    <div className={classes.root}>
                        <Typography variant="h5" gutterBottom color="primary" align="center">Winners</Typography>
                        <TableContainer component={Paper}>
                            <Table size="small" aria-label="simple table" >
                                <TableHead className={classes.head}>
                                    <TableRow>
                                        <StyledTableCell>Manager</StyledTableCell>
                                        <StyledTableCell align="right">GameWeek</StyledTableCell>
                                        <StyledTableCell align="right">Points</StyledTableCell>

                                    </TableRow>
                                </TableHead>
                                <TableBody>
{/**
                                    {player_details.map(row => {
                                        return (<StyledTableRow key={row.id}>
                                            <StyledTableCell component="th" scope="row">

                                            </StyledTableCell>

                                        </StyledTableRow>

                                        )
                                    })} */}
                                </TableBody>
                            </Table>
                        </TableContainer>
                       
                    </div>
                }
                 <ResponsiveContainer width="80%" height={400}>
                            <LineChart
                                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>

                                <XAxis dataKey="event" tick={false} allowDuplicatedCategory={false} />
                                <YAxis dataKey="points" />
                                <Tooltip />
                                <Legend />

                                {player_details.map(item => (
                                    <Line type="monotone" dataKey="points" data={item.points} />
                                ))}
                            </LineChart>
                        </ResponsiveContainer>
                       
            </div>
            <LineChart width={400} height={400} data={data}>
            <Line type="monotone" dataKey="uv" stroke="#8884d8" />
          </LineChart>
        )


    }
}

export default withStyles(useStyles)(index);

{player_details.map(item => (
    <Line type="monotone" dataKey="points" data={item.data} name={item.id} stroke={item.color} />
))}