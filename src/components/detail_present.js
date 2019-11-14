import React from 'react';

import { Container, Segment, Statistic, Header, Placeholder, Divider, Grid } from 'semantic-ui-react';

const weekday=["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"]

const DetailPresent = (props) => {
    const { data,ListWeather } = props;

    console.log(ListWeather)
    const timezone = data.timezone

    const timestap = data.dt+timezone
    let currentdate = new Date(timestap*1000)

    const day = currentdate.getUTCDay()

    return(
        <Container text>
            {'main' in data && 'list' in ListWeather
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
                                src={`https://openweathermap.org/img/w/${data.weather[0].icon}.png`} 
                                alt={data.weather[0].icon}
                            />
                        </div>
                        <Statistic horizontal>
                            <Statistic.Value>{data.main.temp}</Statistic.Value>
                            <Statistic.Label>o</Statistic.Label>
                        </Statistic>
                        <div style={{ height:'30px', fontSize: '20px', marginTop: '20px'}}>
                            <div className="alignleft">
                                {weekday[day-1]}
                            </div>
                            <div className="alignright">
                                <Statistic horizontal size='mini'>
                                    <Statistic.Value>{data.main.temp_max}</Statistic.Value>
                                </Statistic>
                                <Statistic horizontal size='mini'>
                                    <Statistic.Value>{data.main.temp_min}</Statistic.Value>
                                </Statistic>
                            </div>
                        </div>

                        <Divider/>

                        <Grid>
                            <Grid.Row columns={7}>
                                {ListWeather.list.map((data,index)=>{
                                    return <Content 
                                                data={data} 
                                                key={index} 
                                                timezone={timezone} 
                                            />
                                })}
                            </Grid.Row>
                        </Grid>
                        
                    </Segment>
                :   <Segment>
                        <Placeholder>
                            <Placeholder.Paragraph>
                            <Placeholder.Line />
                            <Placeholder.Line />
                            <Placeholder.Line />
                            <Placeholder.Line />
                            <Placeholder.Line />
                            </Placeholder.Paragraph>
                            <Placeholder.Paragraph>
                            <Placeholder.Line />
                            <Placeholder.Line />
                            <Placeholder.Line />
                            </Placeholder.Paragraph>
                        </Placeholder>

                        <Divider/>

                        <Grid columns={7} stackable>
                            <Grid.Column>
                            <Segment basic>
                                <Placeholder>
                                    <Placeholder.Header image>
                                        <Placeholder.Line />
                                        <Placeholder.Line />
                                    </Placeholder.Header>
                                    <Placeholder.Paragraph>
                                        <Placeholder.Line length='medium' />
                                        <Placeholder.Line length='short' />
                                    </Placeholder.Paragraph>
                                </Placeholder>
                            </Segment>
                            </Grid.Column>
                        </Grid>
                    </Segment>
            }
        </Container>
    )
}
export default DetailPresent;

const Content = (props) => {
    const timestap = props.data.dt + props.timezone
    let currentdate = new Date(timestap*1000)
    
    const day = currentdate.getUTCDay()
    let date = currentdate.getUTCHours()
    if(date>12 || date===0){
        date = `${date-12} PM `
    }else{
        date = `${date} AM`
    }

    return(
        <Grid.Column>
            <Segment basic>
                <Header as='h4'>
                    {weekday[day-1]}
                    <Header.Subheader>
                        {date}
                    </Header.Subheader>
                </Header>
                <div>
                        <img 
                        className="image-style" 
                        src={`https://openweathermap.org/img/w/${props.data.weather[0].icon}.png`} 
                        alt={props.data.weather[0].icon}
                    />
                </div>
                <div>
                    <Statistic horizontal size='mini'>
                        <Statistic.Value>{props.data.main.temp}</Statistic.Value>
                        <Statistic.Label style={{ fontSize: '7px'}}>o</Statistic.Label>
                    </Statistic>
                </div>
            </Segment>
        </Grid.Column>
    )
}