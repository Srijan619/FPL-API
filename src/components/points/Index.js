import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Typography from '@material-ui/core/Typography'
import DataFetcher from '../DataFetch/DataFetcher'


const useStyles = theme => ({
    root: {
        margin: theme.spacing(1),
        width: '100%',
        height: '100%'
    },

});


class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false
        };
    }

    componentDidMount() {
        setTimeout(() => this.setState({ show: true }), 2000)
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
                        return <p style={{ align:"center"}}>Loading data....</p>
                    }
                    if (show) {

                        return (
                            <div className={classes.root}>
                                <Typography variant="h5" gutterBottom color="primary" align="center">Chart</Typography>

                              
                                <ResponsiveContainer width="95%" height={400}>
                                <LineChart >

                                <XAxis dataKey="event" tick={false} allowDuplicatedCategory={false} />
                                <YAxis dataKey="points" />
                                <Tooltip />
                                <Legend />

                             {details_individual.map(item=>(<Line type="monotone" dataKey="points" data={item.data} name={item.name} key={item.id} stroke={item.color} />))} 
                            </LineChart>
                        </ResponsiveContainer> 
                            </div>
                        )
                    }
                    return (
                        <div>Loading data....</div>
                    )
                }}
            </DataFetcher>)


    }
}

export default withStyles(useStyles)(Index);