import React, { Component } from 'react';

import { Container, Table, Icon } from 'semantic-ui-react';

import SubTable from './table';
// import config from '../config.json';
import LoadingTable from './loading_table';
import dotenv from 'dotenv';

// dotenv.config();
const API_KEY = process.env.WEATHER_API_KEY
const MainURL = "http://api.openweathermap.org/data/2.5/weather"

class Main extends Component {

    state = {
        ListID : JSON.parse(localStorage.getItem('ListID')),
        ListData:[],
        is_loading:false,
        open:false,
    }

    componentDidMount(){
        console.log("APIKEY",API_KEY,1)
        // this.getWeatherAPI()
    }

    componentDidUpdate(oldProps, oldState){
        if(oldState.ListID !== this.state.ListID){
            this.getWeatherAPI()
        }
    }

    getWeatherAPI = () => {
        const ListData = [...this.state.ListData]
        
        this.setState({ is_loading: true })

        const requests = this.state.ListID.map( async(data)=>{
            return fetch(`${MainURL}?id=${data.id}&appid=${API_KEY}&units=metric`)
                    .then( response => response.json())
                    .then( data => ListData.push(data))
                    .catch( err => alert(err) )    
        })

        //wait for map is done
        Promise.all(requests).then(() => this.setState({ ListData,is_loading: false}))
    }

    gotoAdd = () => {
        this.props.history.push('/add')
    }

    deleteWeather = (e,id) => {
        e.stopPropagation();
        const ListID = [...this.state.ListID]
        const No = ListID.findIndex(item => item.id ===id);
        ListID.splice(No,1)

        this.setState({ ListID,ListData:[] })
        localStorage.setItem('ListID',JSON.stringify(ListID))
    }
    
    render() {
        return (
            <>  
                <Container text>
                    <div className="Main-block">
                        <div style={{ textAlign: 'right'}} className="pointer plus-icon" onClick={this.gotoAdd}>
                            <Icon name='plus' circular/>
                        </div>
                        {this.state.ListID.length !==0
                            ?<Table>
                                <Table.Body>
                                    {!this.state.is_loading
                                        ?
                                        this.state.ListData.map((item,index)=>{
                                            return <SubTable 
                                                    key={index}
                                                    history={this.props.history}
                                                    item={item}
                                                    deleteWeather={this.deleteWeather}
                                                />
                                        })  
                                        :
                                        this.state.ListID.map((item,index)=>{
                                            return <LoadingTable
                                                    key={index}
                                                    />
                                        })
                                    }
                                </Table.Body>
                            </Table>
                            :   "No Weather"
                        }
                    </div>
                </Container>
            </>
        );
    }
}

export default Main;

