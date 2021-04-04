import React, {useState, useEffect} from 'react';
import axios from "axios";
import { Container, Col, Row, Card } from 'react-bootstrap';

import './MountainDetails.css'


const MountainDetails = ({mountain}) => {

    const [longerRange, setLongerRange] = useState([]);
    const [hourly, setHourly] = useState([]);

    useEffect(() => {
        getWeather();
      }, [])

    return (

        <div>
            <Container style={{marginTop: "1%"}}>
                <Card>
                    <Card.Header>
                        {mountain["display name"]}
                    </Card.Header>
                </Card>
            </Container>
            <Container style={{marginTop: "1%"}}>
                <Card>
                    <Card.Header>
                        Forecast
                    </Card.Header>
                        < div
                            className="horizontalScrollDisplay"
                            style={{overflowX: "scroll", scrollbarWidth: "none", overflowY: "hidden", whiteSpace: "nowrap", left: "0", right: "0"}}
                        >
                            {longerRange.map((forecast, i) => (
                                    <Card style={{display: "inline-block", width: "55vmin", marginLeft: "1%", marginTop: "1%", marginBottom: "1%", paddingTop: "0", top: "0"}}>
                                        <Card.Header>
                                            {forecast["name"]}
                                        </Card.Header>
                                        <Card.Body style={{height: "30%", whiteSpace: "pre-wrap"}}>
                                            <div>   
                                                {forecast["temperature"] + " ºF"}
                                            </div>
                                            <div>
                                                {forecast["windSpeed"] + " @ " + forecast["windDirection"]}
                                            </div>
                                            <div style={{whiteSpace: "pre"}}>   
                                                {forecast["shortForecast"]}
                                            </div>
                                        </Card.Body>
                                    </Card>
                            ))}
                        </div>
                </Card>
            </Container>
            <Container style={{marginTop: "1%"}}>
                <Card>
                    <Card.Header>
                        Hourly Forecast
                    </Card.Header>
                        < div
                            className="horizontalScrollDisplay"
                            style={{overflowX: "scroll", scrollbarWidth: "none", overflowY: "hidden", whiteSpace: "nowrap", left: "0", right: "0"}}
                        >
                            {hourly.map((forecast, i) => (
                                    <Card style={{display: "inline-block", width: "55vmin", marginLeft: "1%", marginTop: "1%", marginBottom: "1%", paddingTop: "0", top: "0"}}>
                                        <Card.Header style={{whiteSpace: "break-spaces"}}>
                                            {getTime(forecast)}
                                        </Card.Header>
                                        <Card.Body style={{height: "30%", whiteSpace: "pre-wrap"}}>
                                            <div>   
                                                {forecast["temperature"] + " ºF"}
                                            </div>
                                            <div>
                                                {forecast["windSpeed"] + " @ " + forecast["windDirection"]}
                                            </div>
                                            <div style={{whiteSpace: "pre"}}>   
                                                {forecast["shortForecast"]}
                                            </div>
                                        </Card.Body>
                                    </Card>
                            ))}
                        </div>
                </Card>
            </Container>
                        
                    
        </div>
    );

    function getWeather(){
        var url = "https://api.weather.gov/points/" + mountain["lat"] + "," + mountain["lng"];

        axios
            .get(url, {
                responseType: 'json',
            })
            .then(response => {
                axios.get(response.data.properties.forecast, {
                    responseType: 'json',
                })
                .then(response2 =>{
                    setLongerRange(response2.data.properties.periods);
                })
                axios.get(response.data.properties.forecastHourly, {
                    responseType: 'json',
                })
                .then(response2 =>{
                    setHourly(response2.data.properties.periods);
                })
            })
    }

    function getTime(forecast){
        var d = new Date(forecast["startTime"]);
        console.log(d.toString())
        var dateStringArr = d.toString().split(" ")
        var dateString = "";
        for (let index = 0; index < dateStringArr.length; index++) {
            if(index < 5){
                dateString += dateStringArr[index] + " ";
            }
            if(index == 4){
                dateString += "\n";
            }
            
        }
        return dateString;
    }
}

export default MountainDetails;