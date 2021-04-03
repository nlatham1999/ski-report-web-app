import React, {useState, useEffect} from 'react';
import axios from "axios";

import {ReactSpinner} from 'react-spinning-wheel';
import 'react-spinning-wheel/dist/style.css';

import { Link} from 'react-router-dom';

import {Button, Card, Form, Row, Container, Col } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

import mountainNames from './MountainNames';


const MainPage = () => {
    
    const [mtnNames, setMtnNames] = useState(mountainNames());
    const [userLocation, setUserLocation] = useState({"lat": 0, "lng": 0})
    const [sortByDist, setSortByDist] = useState(false);
    const [gettingLocation, setGettingLocation] = useState(false);



    
    var locationOptions = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
    };
    
    useEffect(() => {
    }, [])

    if(sortByDist){
        sortByDistance();
    }else{
        sortByName();
    }

    return (
        <div>
            {gettingLocation && <ReactSpinner />}
            <Button onClick={()=>getUserLocation()}>Sort by distance</Button>
            <Button onClick={()=>setSortByDist(false)}>Sort by name</Button>

            <Card style={{ width: '100%', marginTop: '2%'}}>
                <Card.Body>
                    <Container>
                        {mtnNames.map((mtn, i) => (
                            <Link to={"/"+mtn["name"]} style={{textDecoration: "none", color: "black"}}>
                                <Row>
                                    <Col>
                                        {mtn["display name"]}
                                    </Col>
                                    <Col>
                                    testing
                                    </Col>
                                </Row>
                            </Link>
                        ))}
                    </Container>
                </Card.Body>
            </Card>

            
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
}

export default MainPage;