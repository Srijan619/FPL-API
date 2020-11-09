import { Component } from 'react';
//const proxyUrl = 'https://cors-anywhere.herokuapp.com/'

const all_leagues = "https://fplappapi.herokuapp.com/fpl/allLeague/779926/"

const url = "https://fplappapi.herokuapp.com/fpl/league/220929/"
// League_Url:"https://fplappapi.herokuapp.com/fpl/league/220929/"

class index extends Component {


    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            error: null,
            details: [],
            details_individual: [],
            winners: [],
            leagues: [],
            League_Url: "https://fplappapi.herokuapp.com/fpl/league/458631/",
            indi_Url: "https://fplappapi.herokuapp.com/fpl/individual/",
            LeagueName:"Jeppis"

        };

    }

    get_random_color() {
        function c() {
            var hex = Math.floor(Math.random() * 256).toString(16);
            return ("0" + String(hex)).substr(-2); // pad with zero
        }

        return "#" + c() + c() + c();
    }
    async componentDidMount() {
        await this.fetchDetailsData();
        setTimeout(() => this.findWinners(), 3000);
        this.setState({ isLoading: false })

    }

    async fetchInitialData() {
        this.setState({ isLoading: true })
        const response = await fetch(this.state.League_Url);
        const currentValue = await response.json();
        const myArray = currentValue.standings.results

        this.setState({
            details: myArray, error: response.error, isLoading: false
        })
        return myArray


    }

    async fetchLeagueData() {

        this.setState({ isLoading: true })
        const response = await fetch(all_leagues);
        const currentValue = await response.json();
        const myArray = currentValue.leagues.classic
        this.setState({
            leagues: myArray, error: response.error, isLoading: false
        })
    }



    async fetchDetailsData() {

        const data = await this.fetchInitialData();
        await this.fetchLeagueData();

        let CustomData = [];
        const unresolvedPromise = data.map(items => {
            this.setState({ isLoading: true })
            fetch((this.state.indi_Url + (items.entry + "/")))
                .then(res => {
                    if (res.ok) {
                        return res.json()
                    } else {
                        throw Error("Error fetching data!")
                    }
                })
                .then(posts => {
                    let formatData = {
                        id: items.entry,
                        name: items.player_name,
                        color: this.get_random_color(),
                        data: posts.current
                    }
                    CustomData.push(formatData)
                })
                .catch(error => this.setState({
                    error: error
                }))
        })

        await Promise.all(unresolvedPromise)
        this.setState({
            details_individual: CustomData
        })


    }

    findWinners() {

        const cparray = this.state.details_individual;

        const total_gameWeek = cparray[0]["data"].length //To get total gameweeks

        let event_winner = []


        let filtered_data_group = []


        let gameweek_id = Array.from(Array(total_gameWeek).keys()) //Array to loop through all gameweek
        let all_winners = []

        gameweek_id.map(ids => {
            cparray.map((item) => {
                const i = item["data"]
                let points_after_transfers = []
                let id = []
                let name = []
                let gameWeek = []
                i.map(points => {

                    if ((points["event"] === (ids + 1))) {
                        points_after_transfers = (points["points"]) - (points["event_transfers_cost"])
                        id = item["id"]
                        name = item["name"]
                        gameWeek = points["event"]


                    }
                    event_winner.push({ id: id, name: name, points: points_after_transfers, gameWeek: gameWeek }) //Formatted data
                }
                )


            })

            const maxValue = Math.max.apply(Math, event_winner.map(function (o) { return o.points; })) //Finds max value

            if (maxValue !== 0) {
                filtered_data_group = (event_winner.filter(item => item.points === maxValue)) // Finds the winners object
            }
            all_winners.push(filtered_data_group)
            event_winner = []
            filtered_data_group = []
        })


        this.setState({ winners: all_winners }) //Setting the data
    }

    setUrl() {

        this.setState({LeagueName:"Kokkola"},()=>{console.log(this.state.LeagueName)})
    }
    render() {
        return this.props.children({
            ...this.state,
            actions: this.setUrl.bind(this)
        })

    }
}

export default (index);
