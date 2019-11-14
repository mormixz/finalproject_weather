import React, { Component } from 'react';

import { Container, Table, Icon } from 'semantic-ui-react';

import SubTable from './table';

import LoadingTable from './loading_table';
import fakeDB from '../fakeDB';

const API_KEY = fakeDB.weather_api_key
const MainURL = "http://api.openweathermap.org/data/2.5/weather"

class Main extends Component {

    state = {
        ListID : JSON.parse(localStorage.getItem('ListID')),
        ListData:[],
        is_loading:false,
        open:false,
    }

    componentDidMount(){
        // console.log(this.state.ListID)
        this.getWeatherAPI()
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
                        <div style={{ textAlign: 'right'}}>
                            <Icon name='plus' className="pointer plus-icon" onClick={this.gotoAdd} circular/>
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

