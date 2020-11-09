import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Table from '../Table'

const useStyles = theme => ({
    league: {
        '& >*': {
            margin: theme.spacing(1),
            display: "flex",
            flexDirection: "row",
            width: "fit-content",

        }

    },
    root: {
        display: "flex",
        flexDirection: "row",
        width: "fit-content",
    }
    ,
    title: {
        fontSize: 20,
    }
});



function Index(props) {

    const [leagues, setLeague] = useState(null);
    const [loading, setLoading] = useState(true);
    const [Id, setId] = useState(1);
    const [leagueName, setLeagueName] = useState("Arsenal")
    const { classes } = props
    useEffect(() => {
        (async function () {

            const response = await fetch("https://fplappapi.herokuapp.com/fpl/allLeague/779926/");
            const data = await response.json();
            const item = data.leagues.classic;
            setLeague(item);
            setLoading(false);
        })();
    }, [])

    return (
        <div>

            {
                loading ? <CircularProgress className={classes.loading} /> :
                    <div className={classes.root}>

                        <Card  >
                            <CardContent>
                                <Typography className={classes.league}>
                                    <Typography className={classes.title} color="textSecondary" gutterBottom >Leagues</Typography>

                                    {leagues.map(item => (

                                        <Link href="#" key={item.id} onClick={() => { setId(item.id); setLeagueName(item.name) }
                                        }>{item.name}</Link>
                                    )

                                    )}
                                </Typography>
                            </CardContent>
                        </Card>
                        <Table leagueId={Id} leagueName={leagueName}></Table>
                    </div>
            }


        </div>
    );
}

export default withStyles(useStyles)(Index);