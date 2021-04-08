import React, {useState, useEffect} from 'react';
import axios from "axios";

import './MainPage.css'

import {ReactSpinner} from 'react-spinning-wheel';
import 'react-spinning-wheel/dist/style.css';

import { Link} from 'react-router-dom';

import {Button, Card, Form, Row, Container, Col } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

import mountainNames from './MountainNames';

const boxShadowStyle1 = "-4px 4px 8px #5a5a5a, 7px -7px 50px #ffffff";
const boxShadowStyle2 = "-4px 4px 8px #c5c5c5, 4px -4px 8px #e7e7e7";
const boxShadowStyleInset = "inset -7px 7px 10px #5a5a5a, inset 7px -7px 10px #ffffff"

const buttonStyleNotClicked = {
    marginTop: "1%", 
    marginRight: "1%",
    backgroundColor: "#e0e0e0", 
    borderWidth: 0, 
    color: "#383838", 
    boxShadow: boxShadowStyle1
}

const buttonStyleClicked = {
    marginTop: "1%", 
    marginRight: "1%",
    backgroundColor: "#e0e0e0", 
    borderWidth: 0, 
    color: "#383838", 
    boxShadow: boxShadowStyleInset
}

const cellStyle = {
    color: "#383838",
    marginTop: "1%", 
    marginBottom: "1%", 
    borderWidth: 0, 
    backgroundColor: "#e0e0e0", 
    boxShadow: boxShadowStyle2
}

const MainPage = () => {
    
    const [mtnNames, setMtnNames] = useState(mountainNames());
    const [userLocation, setUserLocation] = useState({"lat": 0, "lng": 0})
    const [sortByDist, setSortByDist] = useState(false);
    const [gettingLocation, setGettingLocation] = useState(false);
    const [weatherData, setWeatherData] = useState({});
    const [refresh, setRefresh] = useState(false);

    
    var locationOptions = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
    };
    
    useEffect(() => {
        getWeather();
    }, [])

    if(sortByDist){
        sortByDistance();
    }else{
        sortByName();
    }

    return (
        <div>
            {/* {gettingLocation && <ReactSpinner />} */}
            <Container 
                style={{position: "fixed", zIndex: 1, paddingBottom: "1%", top: 0, left: 0, right: 0, backgroundColor: "#e0e0e0"}}
            >
                
                <Button 
                    onClick={()=>getUserLocation()} 
                    style={sortByDist || gettingLocation ? buttonStyleClicked : buttonStyleNotClicked}
                    disabled={gettingLocation}
                    // variant= {sortByDist || gettingLocation ? "dark" : "light"}
                >
                    {gettingLocation ? 'Loading…' : 'Sort by Distance'}
                </Button>
                <Button 
                    onClick={()=>setSortByDist(false)} 
                    style={!sortByDist && !gettingLocation ? buttonStyleClicked : buttonStyleNotClicked}
                    disabled={gettingLocation}
                >
                    Sort by name
                </Button>
            </Container >
            <Container style={{paddingTop: "70px", backgroundColor: "#e0e0e0"}}>
                {mtnNames.map((mtn, i) => (
                    <Link to={"/"+mtn["name"]} style={{textDecoration: "none", color: "black"}}>
                        <Card 
                            className="customCard"
                            style={cellStyle}
                        >
                            <Row style={{margin: "1%"}}>
                                <Col>
                                    {mtn["display name"]}
                                </Col>
                                <Col>
                                    {weatherData[mtn.name] && weatherData[mtn.name].temperature + "ºF"}
                                </Col>
                                <Col>
                                    {weatherData[mtn.name] && weatherData[mtn.name].shortForecast}
                                </Col>
                            </Row>
                        </Card>
                    </Link>
                ))}
            </Container>

            
        </div>
    );

    function sortByName() {
        mtnNames.sort((a, b) => (a["display name"] > b["display name"]) ? 1 : -1)
    }

    function sortByDistance(){
        mtnNames.sort((a, b) => (haversineFormula(a.lat, a.lng, userLocation.lat, userLocation.lng) > haversineFormula(b.lat, b.lng, userLocation.lat, userLocation.lng)) ? 1 : -1)
    }

    function getUserLocation(){
        setGettingLocation(true);
        if (navigator.geolocation) {
            navigator.permissions
              .query({ name: "geolocation" })
              .then(function (result) {
                if (result.state === "granted") {
                    navigator.geolocation.getCurrentPosition(success);
                } else if (result.state === "prompt") {
                    navigator.geolocation.getCurrentPosition(success, errors, locationOptions);
                } else if (result.state === "denied") {
                    alert("enable location to sort by distance")
                    setGettingLocation(false);
                }
                result.onchange = function () {
                  console.log(result.state);
                };
            });
        } else {
            alert("Sorry Not available!");
        }
    }


    function haversineFormula(lat1,lon1,lat2,lon2) {
        var R = 6371; // Radius of the earth in km
        var dLat = (lat2 - lat1) * Math.PI / 180;  // deg2rad below
        var dLon = (lon2 - lon1) * Math.PI / 180;
        var a = 
            0.5 - Math.cos(dLat)/2 + 
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
            (1 - Math.cos(dLon))/2;

        return R * 2 * Math.asin(Math.sqrt(a));
    }

    function success(pos) {
        var crd = pos.coords;
        
        // console.log("Your current position is:");
        // console.log(`Latitude : ${crd.latitude}`);
        // console.log(`Longitude: ${crd.longitude}`);
        // console.log(`More or less ${crd.accuracy} meters.`);

        userLocation.lat = crd.latitude;
        userLocation.lng = crd.longitude;
        setSortByDist(true);
        setGettingLocation(false);
    }
    
    function errors(err) {
        setGettingLocation(false);
        // console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    function getWeather(){
        mtnNames.map((mtn, i) => (
            getWeatherOfEach(mtn)    
        ));
    }

    function getWeatherOfEach(mtn){
        var url = "https://api.weather.gov/points/" + mtn["lat"] + "," + mtn["lng"];
        console.log(mtn.name)
        axios
            .get(url, {
                responseType: 'json',
            })
            .then(response => {
                axios.get(response.data.properties.forecastHourly, {
                    responseType: 'json',
                })
                .then(response2 =>{
                    var data = {}
                    data["temperature"] = response2.data.properties.periods[0].temperature;
                    data["shortForecast"] = response2.data.properties.periods[0].shortForecast;
                    console.log(data.temperature)
                    var data2 = weatherData;
                    data2[mtn.name] = data;
                    setWeatherData(data2);
                    setRefresh(true);
                    setRefresh(false);

                })
        })
    }
}

export default MainPage;