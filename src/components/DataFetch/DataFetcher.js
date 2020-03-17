import { Component } from 'react';


const proxyUrl = 'https://cors-anywhere.herokuapp.com/'
//const loginURL = "https://users.premierleague.com/accounts/login/"

//const League_Url = "https://fantasy.premierleague.com/api/leagues-classic/407866/standings/?page_new_entries=1&page_standings=1&phase=1";
// const League_Url = "https://fplappapi.herokuapp.com/fpl/league/407866/"
// const indi_Url = "https://fplappapi.herokuapp.com/fpl/individual/"

const League_Url = "http://127.0.0.1:8000/fpl/league/407866/";
const indi_Url = "http://127.0.0.1:8000/fpl/individual/"


class index extends Component {


    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            error: null,
            details: [],
            details_individual: [],
            winners: [],
            disqualify_game: [27],
            disqualify_id: [1958495],
           
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
        setTimeout(() => { this.findWinners(this.state.disqualify_game, this.state.disqualify_id) }, 3000)
        this.setState({ isLoading: false })




    }
    // async loginFPL() {

    //     // let h=new Headers();
    //     // h.append("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json')
    //     // let encoded=window.btoa('chapssrijan@gmail.com:DONTangryME123');
    //     // console.log(encoded)
    //     // h.append('Authorization','Basic '+encoded )
    //     // const response=fetch(loginURL,{
    //     //     method:"GET",
    //     //     headers:h,
    //     //     credentials:'include'

    //     // });

    //     const login_response = await fetch(loginURL, {
    //         method: "POST",
    //         mode: 'no-cors',
    //         headers: {
    //             'Access-Control-Allow-Origin': '*',
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({
    //             'login': 'Chapssrijan@gmail.com',
    //             'password': 'dontangryme',
    //             'app': 'plfpl-web',
    //             'redirect_uri': 'https://fantasy.premierleague.com/'
    //         })
    //     })
    //     return login_response
    // }


    async fetchInitialData() {
        this.setState({ isLoading: true })
        const response= await fetch(League_Url);
        const currentValue = await response.json();
        const myArray = currentValue.standings.results

        this.setState({
            details: myArray, error: response.error
        })
        return  myArray


    }

    async fetchDetailsData() {

        const data = await this.fetchInitialData();

        let CustomData = [];
        const unresolvedPromise = data.map(items => {
            this.setState({ isLoading: true })
            fetch((indi_Url + (items.entry+"/")))
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

    findWinners(gameweek, idet) {

        const cparray = this.state.details_individual;
        console.log(cparray) //Making a copy of the details 
        const total_gameWeek = cparray[0]["data"].length //To get total gameweeks

        let event_winner = []


        let filtered_data = []
        let filtered_data_group = []
        let count = 0;

        let gameweek_id = Array.from(Array(total_gameWeek).keys()) //Array to loop through all gameweek
        let all_winners = []
        gameweek_id.map(ids => {
            cparray.map((item) => {
                const i = item["data"]

                i.map(points => {

                    if ((points["event"] === (ids + 1))) {
                        let points_after_transfers = []
                        let id = []
                        let name = []
                        let gameWeek = []
                        for (var i = 0; i < gameweek.length; i++) {
                            if (!(points["event"] === gameweek[i] && item["id"] === idet[i])) {  //Not goodly done, disqualify feature
                                points_after_transfers = (points["points"]) - (points["event_transfers_cost"])
                                id = (item["id"])
                                name = (item["name"])
                                gameWeek = points["event"]

                            }

                        }
                        event_winner.push({ id: id, name: name, points: points_after_transfers, gameWeek: gameWeek }) //Formatted data
                    }
                })


            })
            const maxValue = Math.max.apply(Math, event_winner.map(function (o) { return o.points; })) //Finds max value
            count = event_winner.lastIndexOf(maxValue) === event_winner.indexOf(maxValue)
            if (maxValue !== 0) {
                filtered_data_group = (event_winner.filter(item => item.points === maxValue)) // Finds the winners object
            }
            all_winners.push(filtered_data_group)
            event_winner = []
            filtered_data = []
            filtered_data_group = []
        })

        // console.log(all_winners)
        // console.log(cparray)
        this.setState({ winners: all_winners }) //Setting the data
    }


    render() {
        return this.props.children(this.state)

    }
}

export default (index);