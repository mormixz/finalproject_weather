import React from 'react';

import { Container, Segment, Statistic, Header, Label } from 'semantic-ui-react';

const weekday=["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"]

const DetailPresent = (props) => {
    const { data } = props;
    console.log(data)
    let date
    if('dt' in data){
        date = new Date(data.dt).getDay()
    }
    return(
        <Container text>
            {'main' in data
                ?   <Segment>
                        <Header as='h1'>
                        <i className={`${data.sys.country.toLowerCase()} flag`}/>
                            {data.name}
                            <Header.Subheader>
                                {data.weather[0].description}
                            </Header.Subheader>
                        </Header>
                        <div>
                            <img 
                                className="image-style" 
                                src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`} 
                                alt={data.weather[0].icon}
                            />
                        </div>
                        <Statistic horizontal>
                            <Statistic.Value>{data.main.temp}</Statistic.Value>
                            <Statistic.Label>o</Statistic.Label>
                        </Statistic>
                        <div style={{ height:'30px', fontSize: '20px', marginTop: '20px'}}>
                            <div className="alignleft">
                                {weekday[date]}
                            </div>
                            <div className="alignright">
                                {`max: ${data.main.temp_max} min: ${data.main.temp_min}`}
                            </div>
                        </div>
                    </Segment>
                :   ""
            }
        </Container>
    )
}
export default DetailPresent;