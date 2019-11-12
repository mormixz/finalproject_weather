import React, { Component } from 'react';
 
import config from '../config.json';
import DetailPresent from './detail_present';

const API_KEY = config.WEATHER_API_KEY
const MainURL = "http://api.openweathermap.org/data/2.5/weather"

class detail extends Component {

    state = {
        detailData:{},
        is_loading:false
    }

    componentDidMount(){
        const { id } = this.props.match.params
        this.setState({ is_loading:true })
        fetch(`${MainURL}?id=${id}&appid=${API_KEY}&units=metric`)
        .then( response => response.json())
        .then( data => this.setState({ detailData:data,is_loading:false }))
        .catch( err => alert(err) )    
        
    }

    
    render() {
        const { detailData,is_loading } = this.state;
        return (
            <>
                {!is_loading
                    ?
                    <DetailPresent
                        data={detailData}
                    />
                    :
                    "loading..."
                }
            </>
        );
    }
}

export default detail;