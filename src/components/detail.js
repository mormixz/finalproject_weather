import React, { Component } from 'react';
 
// import config from '../config.json';
import DetailPresent from './detail_present';
import { Container, Placeholder, Grid, Divider } from 'semantic-ui-react'
import fakeDB from '../fakeDB';

const WEATHER_API_KEY = fakeDB.weather_api_key
const CURRENT_WEATHER = "https://api.openweathermap.org/data/2.5/weather"
const WEATHER = "https://api.openweathermap.org/data/2.5/forecast"

const SEARCH_API_KEY = fakeDB.flickr_api_key
const SEARCH = 'https://api.flickr.com/services/rest?method=flickr.photos.search&format=json&nojsoncallback=1'


const imageNo = 14

class detail extends Component {

    state = {
        detailData:{},
        results:{},
        ListWeather:[]
    }

    componentDidMount(){
        this.getCurrentWeatherAPI()  
        this.getListWeatherAPI()
    }

    getCurrentWeatherAPI = () =>{
        const { id } = this.props.match.params
        fetch(`${CURRENT_WEATHER}?id=${id}&appid=${WEATHER_API_KEY}&units=metric`)
        .then( response => response.json())
        .then( data => {
            this.setState({ detailData:data })
            this.getLocation(data.coord) 
        })
        .catch( err => alert(err) )    
    }

    getListWeatherAPI = () =>{
        const { id } = this.props.match.params
        fetch(`${WEATHER}?id=${id}&appid=${WEATHER_API_KEY}&units=metric&cnt=7`)
        .then( response => response.json())
        .then( data => {
            this.setState({ ListWeather:data })
        })
        .catch( err => alert(err) ) 
    }

    getLocation = (coord) =>{
        fetch(`${SEARCH}&api_key=${SEARCH_API_KEY}&lat=${coord.lat}&lon=${coord.lon}`)
        .then( response => response.json())
        .then( data => this.setState({ results:data}))
        .catch( err => alert(err) )    
    }
    
    render() {
        const { detailData,results,ListWeather } = this.state;

        const items = []

        for (let i=0;i<imageNo;i++) {
            items.push(<LoadImage key={i} index={i}/>)
        }

        return (
            <>
                <DetailPresent
                    data={detailData}
                    ListWeather={ListWeather}
                />
                <Divider hidden/>
                <Container>
                    {
                        'photos' in results
                        ?
                            results.photos.photo.map((photo,index)=>{
                                if(index<imageNo){
                                    return <Thumbnail photo={ photo } key={ index }/>
                                }else{
                                    return ""
                                }
                            })
                        :
                            <Grid centered style={{ marginTop:"10px"}}>
                                {items}
                            </Grid>
                        
                    }
                </Container>
            </>
        );
    }
}

export default detail;

const Thumbnail = (props) => {
    const { farm, server, id, secret} = props.photo;
    const thumbnailUrl = `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}_q.jpg`
    return(
        <img className="img" src={ thumbnailUrl } alt={ props.photo.title }/>
    )
}

const LoadImage = (props) => (
    <Placeholder style={{ height: '150px', width: '150px', margin:'4px' }}>
        <Placeholder.Image />
    </Placeholder>
)
