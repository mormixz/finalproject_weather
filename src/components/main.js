import React, { Component } from 'react';
import dotenv from 'dotenv';

import { Container, Table, Label, Icon } from 'semantic-ui-react';

import SubTable from './table';
import city from '../City.json';
import config from '../config.json';


const API_KEY = config.WEATHER_API_KEY
const MainURL = "http://api.openweathermap.org/data/2.5/weather"

// How to use API_KEY
// process.env.REACT_APP_TMDB_API_KEY

const ListID = [2768263,707860]

class Main extends Component {

    state = {
        ListData:[],
        is_loading:false
    }

    componentDidMount(){
        this.getWeatherAPI()
    }

    getWeatherAPI = () => {
        const ListData = [...this.state.ListData]
        
        this.setState({ is_loading: true })

        const requests = ListID.map((id)=>{
            return fetch(`${MainURL}?id=${id}&appid=${API_KEY}&units=metric`)
                    .then( response => response.json())
                    .then( data => ListData.push(data))
                    .catch( err => alert(err) )    
        })

        Promise.all(requests).then(() => this.setState({ ListData,is_loading: false}))
    }

    deleteWeather = e => id => {
        e.stopPropagation();
        console.log('delete')
    }
    
    render() {
        return (
            <>  
                <Container text>
                    <div className="Main-block">
                        <div style={{ textAlign: 'right'}} className="pointer plus-icon">
                            <Icon name='plus' circular/>
                        </div>
                        <Table>
                            <Table.Body>
                                {this.state.ListData.map((item,index)=>{
                                    return <SubTable 
                                            key={index}
                                            history={this.props.history}
                                            item={item}
                                            deleteWeather={this.deleteWeather}
                                        />
                                })}
                            </Table.Body>
                        </Table>
                    </div>
                </Container>
            </>
        );
    }
}

export default Main;


