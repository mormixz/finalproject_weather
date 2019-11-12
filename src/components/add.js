import React, { useState } from 'react'

import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';

import city from '../country.json';
import config from '../config.json';

const Add = (props) => {
    const [country,setCountry] = useState(city.country)
    const [center,setCenter] = useState({
        lat:13.75,
        lng:100.51667
    })
    const [is_loading,setLoading] = useState(false)
    
    const mapStyles = {
        width: '80%',
        height: '80%',
        marginLeft : '150px'
      };

    const addWeather = (data) => {
        console.log(data)
        const ListID = JSON.parse(localStorage.getItem('ListID'))
        const Temp = {
            "id":data.id,
            "lng": data.coord.lon,
            "lat": data.coord.lat
        }
        ListID.push(Temp)
        console.log(ListID)

        localStorage.setItem('ListID',JSON.stringify(ListID))
        alert('Add Complete')
        props.history.push('/')
    }
    
    const handleSearchChange = e => {
        const query = e.target.value
        const tempCountry = [...country]
        let search_data
        let Tempcenter = {
            lat:13.75,
            lng:100.51667
        }

        setLoading(true)
        if( query ){
            search_data = tempCountry.filter((data)=>
                data.country.toUpperCase().includes(query.toUpperCase())|| 
                data.name.toUpperCase().includes(query.toUpperCase())
            )       

            if(search_data.length!==0){
                Tempcenter.lat=search_data[0].coord.lat
                Tempcenter.lng=search_data[0].coord.lon
            }else{
                search_data = city.country
            }
        }else{
            search_data = city.country
        }

        setLoading(false)
        setCenter(Tempcenter)
        setCountry(search_data)
    }

    return(
            <div>
                <div style={{ margin: '20px'}}>
                    <div className="ui icon input">
                        <input 
                            type="text" 
                            className="prompt"
                            placeholder="...search by country"
                            onChange={handleSearchChange} 
                        />
                        <i aria-hidden="true" className="search icon"></i>
                    </div>
                </div>
                <div>
                    {!is_loading 
                    ?
                        <Map
                            google={props.google}
                            zoom={7}
                            style={mapStyles}
                            center={{ lat: center.lat, lng:center.lng }}
                            initialCenter={{ lat: center.lat, lng: center.lng }} //Bangkok
                        >
                            {country.map((data,index)=>{
                                return (
                                        <Marker 
                                            key={index} 
                                            id={index} 
                                            position={{ lat: data.coord.lat, lng: data.coord.lon }}
                                            onClick={()=>addWeather(data)} 
                                        />
                                )
                            })} 
                        </Map>
                    : <span>Loading....</span>
                    }
                </div>
            </div>
    );
}
export default GoogleApiWrapper({
    apiKey: config.GOOGLEMAP_API_KEY
})(Add);

