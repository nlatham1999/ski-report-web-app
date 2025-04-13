import React, {useState, useEffect, useCallback} from 'react';
import axios from "axios";
import './MainPage.css'

import 'react-spinning-wheel/dist/style.css';

import { Link} from 'react-router-dom';

import {Button, Card, Form, Row, Container, Col, Modal } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';


const MainPage = ({mountainNames, includeHeaders, title}) => {
    
    const [mtnNames, setMtnNames] = useState(mountainNames);
    const [userLocation, setUserLocation] = useState({"lat": 0, "lng": 0})
    const [sortByDist, setSortByDist] = useState(false);
    const [gettingLocation, setGettingLocation] = useState(false);
    const [weatherData, setWeatherData] = useState({});
    // const [refresh, setRefresh] = useState(false);
    const [showInfo, setShowInfo] = useState(false);

    
    var locationOptions = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
    };

    const getWeather = useCallback(() => {
        mtnNames.forEach((mtn) => getWeatherOfEach(mtn));
    }, [mtnNames]);
    
    useEffect(() => {
        getWeather();
    }, [getWeather]);

    if(sortByDist){
        sortByDistance();
    }else{
        sortByName();
    }

    return (
        <div>
            {/* {gettingLocation && <ReactSpinner />} */}
            {includeHeaders &&
            <Container className="buttonContainerStyle" >
                
                <Button 
                    onClick={()=>getUserLocation()} 
                    className = {sortByDist || gettingLocation ? "buttonStyleClicked" : "buttonStyleNotClicked"}
                    disabled={gettingLocation}
                >
                    {gettingLocation ? 'Loading…' : 'Sort by Distance'}
                </Button>
                <Button 
                    onClick={()=>setSortByDist(false)} 
                    className = {sortByDist || gettingLocation ? "buttonStyleNotClicked" : "buttonStyleClicked"}
                    disabled={gettingLocation}
                >
                    Sort by Name
                </Button>
                {window.innerWidth < window.innerHeight &&
                    <Button
                        className = "buttonStyleNotClicked2"
                        style = {{float: "right", marginRight: 0}}
                        onClick={() => setShowInfo(true)}
                    >   
                        i
                    </Button>
                }
                {window.innerWidth >= window.innerHeight &&
                    <Button
                        className = "buttonStyleNotClicked2"
                        style = {{float: "right", marginRight: 0}}
                        onClick={() => setShowInfo(true)}
                    >   
                        about
                    </Button>
                }
            </Container >
            }
            {!includeHeaders &&
            <Container 
                className="buttonContainerStyle"
            >{title}</Container>
            }
            <Container
                className="buttonContainerStyle2"
            >
                {mtnNames.map((mtn, i) => (
                    <Link to={"/"+mtn["name"]} style={{textDecoration: "none", color: "black"}}>
                        <Card className="customCard">
                            <Row md={3} lg={3} className="rowStyle">
                                <Col xs={8} className="columnStyle">
                                    {mtn["display name"]}
                                </Col>
                                <Col className="columnStyle">
                                    {weatherData[mtn.name] && weatherData[mtn.name].temperature + "°F"}
                                </Col>
                                {window.innerWidth >= window.innerHeight &&
                                    <Col className="columnStyle">
                                        {weatherData[mtn.name] && weatherData[mtn.name].shortForecast}
                                    </Col>
                                }
                            </Row>
                            {window.innerWidth < window.innerHeight &&
                                <Row className="rowStyleSmall">
                                    <Col className="columnStyle">
                                        {weatherData[mtn.name] && weatherData[mtn.name].shortForecast}
                                    </Col>
                                </Row>
                            }
                        </Card>
                    </Link>
                ))}
            </Container>
            <Modal show={showInfo} onHide={() => setShowInfo(false)} centered className="ModalStyle">
                <Modal.Header closeButton>
                    <Modal.Title>Ski Weather App</Modal.Title>
                </Modal.Header>

                <Modal.Body >
                    <h>Creator: <a href="https://nicholaslatham.com">Nick Latham</a></h>
                    <p>The design style of this app is <a href="https://www.justinmind.com/blog/neumorphism-ui/">Neumorphism</a> <br></br> 
                        Data is gathered using the <a href="https://www.weather.gov/documentation/services-web-api">NOAA weather API</a><br></br>
                        Made with React and hosted on AWS Amplify <br></br></p>
                    <a 
                        rel="noreferrer"
                        class="bmc-button bmcButton" 
                        href="https://www.buymeacoffee.com/nicklatham" 
                        target="_blank" 
                        onclick="return getOutboundLink(&quot;https://www.buymeacoffee.com/nicklatham&quot;),!0">
                            <img alt="Buy me a coffee" src="https://cdn.buymeacoffee.com/buttons/bmc-new-btn-logo.svg" />
                            <span>Buy me a coffee</span>
                    </a>
                </Modal.Body>
            </Modal>

            
        </div>
    );

    function sortByName() {
        const sorted = [...mtnNames].sort((a, b) =>
            a["display name"] > b["display name"] ? 1 : -1
        );
        setMtnNames(sorted);
    }
    
    function sortByDistance() {
        const sorted = [...mtnNames].sort((a, b) =>
            haversineFormula(a.lat, a.lng, userLocation.lat, userLocation.lng) >
            haversineFormula(b.lat, b.lng, userLocation.lat, userLocation.lng)
                ? 1
                : -1
        );
        setMtnNames(sorted);
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
                //   console.log(result.state);
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

        setUserLocation({ lat: crd.latitude, lng: crd.longitude });
        setSortByDist(true);
        setGettingLocation(false);
    }
    
    function errors(err) {
        setGettingLocation(false);
        // console.warn(`ERROR(${err.code}): ${err.message}`);
    }


    function getWeatherOfEach(mtn){
        var url = "https://api.weather.gov/points/" + mtn["lat"] + "," + mtn["lng"];
        // console.log(mtn.name)
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
                    // console.log(data.temperature)
                    var data2 = weatherData;
                    data2[mtn.name] = data;
                    setWeatherData(data2);
                    // setRefresh(true);
                    // setRefresh(false);

                })
        })
    }
}

export default MainPage;
