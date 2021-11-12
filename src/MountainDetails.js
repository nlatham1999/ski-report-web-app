import React, {useState, useEffect} from 'react';
import axios from "axios";
import { Container, Col, Row, Card, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import backButton from "./back.png";
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
                        
                        <Card style={cellStyle2}>
                            <Card.Header style={cardTopHeaderStyle}>
                                <Link to={backLink} style={{textDecoration: "none", color: "black"}}>
                                    <Button style={buttonStyleNotClicked}>
                                        {"<"}
                                    </Button>
                                </Link>
                                {mountain["display name"]}
                            </Card.Header>
                        </Card>
            </Container>
            <Container style={{marginTop: "1%"}}>
                <Card style={cellStyle}>
                    <Card.Header style={cardHeader}>
                        Forecast
                    </Card.Header>
                        < div
                            className="horizontalScrollDisplay"
                            style={cardBigInside}
                        >
                            {longerRange.map((forecast, i) => (
                                    <Card style={cardStyle} className="customCard">
                                        <Card.Header style={cardHeader}>
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
                <Card style={cellStyle}>
                    <Card.Header style={cardHeader}>
                        Hourly Forecast
                    </Card.Header>
                        < div
                            className="horizontalScrollDisplay"
                            style={cardBigInside}
                        >
                            {hourly.map((forecast, i) => (
                                    <Card style={cardStyle} className="customCard">
                                        <Card.Header style={cardHeader}>
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

const boxShadowStyle1 = "-4px 4px 10px #bebebe, 7px -7px 10px #ffffff";
const boxShadowStyle2 = "-4px 4px 10px #bebebe, 4px -4px 10px #ffffff";
const boxShadowStyle2Inset = "inset -4px 4px 10px #bebebe, inset 4px -4px 10px #ffffff";
const borderRadius1 = "10px";
const textColor = "#606060";
const backgroundColor1 = "#e0e0e0";

const cellStyle = {
    color: textColor,
    marginTop: "3vmin", 
    marginBottom: "3vmin", 
    borderWidth: 0, 
    backgroundColor: backgroundColor1, 
    boxShadow: boxShadowStyle2,
    borderRadius: borderRadius1
}

const cellStyle2 = {
    color: textColor,
    marginTop: "2vmin", 
    borderWidth: 0, 
    backgroundColor: backgroundColor1, 
    boxShadow: boxShadowStyle2,
    borderRadius: borderRadius1
}

const cellStyleInset = {
    color: textColor,
    marginTop: "1%", 
    marginBottom: "1%", 
    borderWidth: 0, 
    backgroundColor: backgroundColor1, 
    boxShadow: boxShadowStyle2Inset
}

const cardStyle = {
    color: textColor,
    display: "inline-block", 
    width: "55vmin", 
    marginLeft: "3vmin", 
    marginTop: "3vmin", 
    marginBottom: "3vmin", 
    paddingTop: "0", 
    top: "0",
    borderWidth: 0, 
    backgroundColor: backgroundColor1,
    boxShadow: boxShadowStyle2,
    borderRadius: borderRadius1
}

const cardBigInside = {
    color: textColor,
    overflowX: "scroll", 
    scrollbarWidth: "none", 
    overflowY: "hidden", 
    whiteSpace: "nowrap", 
    left: "0", 
    right: "0", 
    backgroundColor: backgroundColor1,
    boxShadow: boxShadowStyle2Inset,
    borderBottomLeftRadius: borderRadius1,
    borderBottomRightRadius: borderRadius1
}

const cardHeader = {
    color: textColor,
    borderWidth: 0,
    whiteSpace: "break-spaces", 
    backgroundColor: backgroundColor1,
    borderTopLeftRadius: borderRadius1, 
    borderTopRightRadius: borderRadius1
}

const cardTopHeaderStyle = {
    color: textColor,
    borderWidth: 0,
    backgroundColor: backgroundColor1,
    borderRadius: borderRadius1
}

const buttonStyleNotClicked = {
    paddingTop: "1%",
    paddingBottom: "1%",
    paddingLeft: "3%",
    paddingRight: "3%", 
    marginRight: "2%",
    backgroundColor: "#e0e0e0",
    borderWidth: 0, 
    color: textColor, 
    boxShadow: boxShadowStyle1,
    borderRadius: borderRadius1,
    fontWeight: 600
}