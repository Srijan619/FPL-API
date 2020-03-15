import { Component } from 'react';


const loginURL="https://fantasy.premierleague.com/"

const League_Url = "https://fantasy.premierleague.com/api/leagues-classic/407866/standings/?page_new_entries=1&page_standings=1&phase=1";

class index extends Component {
 

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            error: null,
            details: [],
            userDetails:[{email:"chapssrijan@gmail.com",password:"DONTangryME123"}],
            details_individual: [],
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
       this.loginFPL()
       await this.fetchDetailsData();
       this.setState({isLoading:false})

    }
    loginFPL(){
        let h=new Headers();
        h.append('Access-Control-Allow-Origin','*')
        h.append('Accept','application/json')
        let encoded=window.btoa('chapssrijan@gmail.com:DONTangryME123');
        console.log(encoded)
        h.append('Authorization','Basic '+encoded )
        const response=fetch(loginURL,{
            method:"GET",
            headers:h,
            credentials:'include'
            
        });
      console.log(response)
    }


    async fetchInitialData() {
        this.setState({ isLoading: true })
        const response=await fetch(League_Url);
        const currentValue=await response.json();
        const myArray=currentValue.standings.results

        this.setState({
            details:myArray,error:response.error
        })
        return await myArray
     
      
    }

    async fetchDetailsData() {
        const data = await this.fetchInitialData();
        let CustomData=[];
        const unresolvedPromise=data.map(items => {
            this.setState({ isLoading: true })
            fetch(`https://fantasy.premierleague.com/api/entry/${items.entry}/history/`)
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
                    name:items.player_name,
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
        await this.setState({
            details_individual: CustomData
        })
    }


    render() {
        return this.props.children(this.state)

    }
}

export default (index);