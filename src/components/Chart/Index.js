import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
    LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import Typography from '@material-ui/core/Typography'
import DataFetcher from '../DataFetch/DataFetcher'
import Table from '../Table';
import Winner from '../Winner';
import CircularProgress from '@material-ui/core/CircularProgress';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';


const useStyles = theme => ({
    root: {
        margin: theme.spacing(1),
        width: '100%',
        height: 'fit-content'
    },
    loading: {
        margin: 'auto',
        width: '10%',
        padding: theme.spacing(2)
    },
    table_wrapper: {
        marginRight: theme.spacing(1),
        display: 'flex',
        justifyContent:'space-between'
    }
    ,
    card: {
        width:'95%',
        margin: theme.spacing(1),
        backgroundColor:"#ede7f6",
    },

    title: {
        fontSize: 20,
    },
});


class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            disabled: [],
        };
    }


    componentDidMount() {
        setTimeout(() => this.setState({ show: true }), 1000)
    }

    render() {
        const { classes } = this.props;
        const { show } = this.state;

        return (

            <DataFetcher >
                {({ error, isLoading, details_individual }) => {


                    if (error) {
                        return <p style={{ color: "red" }}>{error.message}</p>
                    }
                    if (isLoading) {
                        return <CircularProgress className={classes.loading} />
                    }

                    if (show) {

                        return (
                            <div className={classes.root}>
                                <div className={classes.table_wrapper}>
                                    <Table data={details_individual}></Table>
                                    <Winner></Winner>
                                </div>
                                <Card className={classes.card}>
                                    <CardContent>
                                        <Typography className={classes.title} color="textSecondary" gutterBottom  align="center">Chart</Typography>
                                        <ResponsiveContainer width="95%" height={400}>
                                            <LineChart >

                                                <XAxis dataKey="event" tick={false} allowDuplicatedCategory={false} />
                                                <YAxis dataKey="points" />
                                                <Tooltip />
                                                <Legend />

                                                {details_individual.map(item => (<Line type="monotone" dataKey="points" data={item.data} name={item.name} key={item.id} stroke={item.color} />))}
                                            </LineChart>
                                        </ResponsiveContainer></CardContent></Card>

                            </div>
                        )
                    }
                    return (
                        <div className={classes.loading}>
                            <CircularProgress />
                        </div>
                    )
                }}
            </DataFetcher>)


    }
}

export default withStyles(useStyles)(Index);