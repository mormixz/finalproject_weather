import React, { Component } from 'react';
 
// import config from '../config.json';
import DetailPresent from './detail_present';
import { Container, Placeholder, Grid, Divider } from 'semantic-ui-react'

const WEATHER_API_KEY = process.env.WEATHER_API_KEY
const WEATHER = "http://api.openweathermap.org/data/2.5/weather"

const SEARCH_API_KEY = process.env.FLICKR_API_KEY
const SEARCH = 'https://api.flickr.com/services/rest?method=flickr.photos.search&format=json&nojsoncallback=1'

class detail extends Component {

    state = {
        detailData:{},
        results:{}
    }

    componentDidMount(){
        this.getWeatherAPI()
        
    }

    getWeatherAPI = () =>{
        const { id } = this.props.match.params
        fetch(`${WEATHER}?id=${id}&appid=${WEATHER_API_KEY}&units=metric`)
        .then( response => response.json())
        .then( data => {
            this.setState({ detailData:data })
            this.getLocation(data.coord)
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
        const { detailData,results } = this.state;

        const items = []

        for (let i=0;i<20;i++) {
            items.push(<LoadImage key={i} index={i}/>)
        }

        return (
            <>
                <DetailPresent
                    data={detailData}
                />
                <Divider hidden/>
                <Container image>
                    {
                        'photos' in results
                        ?
                            results.photos.photo.map((photo,index)=>{
                                if(index<20){
                                    return <Thumbnail photo={ photo } key={ index }/>
                                }
                            })
                        :
                            <Grid centered>
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
    <Placeholder style={{ height: '150px', width: '150px', margin:'3px' }}>
        <Placeholder.Image />
    </Placeholder>
)
