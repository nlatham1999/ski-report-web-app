import React, {useState, useEffect} from 'react';
import axios from "axios";
import { Container, Col, Row, Card, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link} from 'react-router-dom';


import './MountainDetails.css'



const MountainDetails = ({mountain, backLink}) => {

    const [longerRange, setLongerRange] = useState([]);
    const [hourly, setHourly] = useState([]);

    useEffect(() => {
        getWeather();
      }, [])

    return (

        <div styles={{backgroundColor: "#e0e0e0"}}>
            <Container style={{marginTop: "1%", backgroundColor: "transparent"}}>
                        
                <Card className="CellStyle2">
                    <Card.Header className="CardTopHeaderStyle">
                        <Link to={backLink} style={{textDecoration: "none", color: "black"}}>
                            <Button className="CardButtonStyleNotClicked">
                                {"<"}
                            </Button>
                        </Link>
                        {mountain["display name"]}
                    </Card.Header>
                </Card>
            </Container>
            <Container style={{marginTop: "1%"}}>
                <Card className="CellStyle">
                    <Card.Header className="CardHeader">
                        Forecast
                    </Card.Header>
                        < div
                            className="horizontalScrollDisplay BigCardInside"
                            
                        >
                            {longerRange.map((forecast, i) => (
                                    <Card className="CustomCard">
                                        <Card.Header className="CardHeader">
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
                <Card className="CellStyle">
                    <Card.Header className="CardHeader">
                        Hourly Forecast
                    </Card.Header>
                        < div
                            className="horizontalScrollDisplay BigCardInside"
                        >
                            {hourly.map((forecast, i) => (
                                    <Card className="CustomCard">
                                        <Card.Header className="CardHeader">
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
