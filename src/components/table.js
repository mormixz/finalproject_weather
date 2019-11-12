import React from 'react'

import { Icon, Table, Statistic, Header } from 'semantic-ui-react'

const SubTable = (props) => {
    
    const gotoDetail = () => {
        props.history.push(`/detail/${props.item.id}`)
    }

    const imgsrc=`http://openweathermap.org/img/w/${props.item.weather[0].icon}.png`
    const curTemp= props.item.main.temp
    
    return(
        <Table.Row className="weather-block pointer" onClick={gotoDetail}>
            <Table.Cell>
                <div className="margin-left30px">
                    <Header>{props.item.name}</Header>
                </div>
            </Table.Cell>
            <Table.Cell>
                <img className="image-style" src={imgsrc} alt={props.item.weather[0].icon}/>
            </Table.Cell>
            <Table.Cell >
                <Statistic horizontal>
                    <Statistic.Value>{curTemp}</Statistic.Value>
                    <Statistic.Label>o</Statistic.Label>
                </Statistic>
            </Table.Cell>
            <Table.Cell>
                <Icon 
                    className="pointer trash-style" 
                    name="trash alternate"
                    onClick={(e)=>props.deleteWeather(e,props.item.id)}
                />
            </Table.Cell>
        </Table.Row>
            
    )
}
export default SubTable;

