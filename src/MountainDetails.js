import React, {useState, useEffect} from 'react';
import axios from "axios";


const MountainDetails = ({mountain}) => {

    const [longerRange, setLongerRange] = useState([]);
    const [hourly, setHourly] = useState([]);

    useEffect(() => {
        getWeather();
      }, [])

    return (
        <div>
            <div>Mountain Details {mountain["name"]}</div>
            {longerRange.map((forecast, i) => (
                <div>
                    <h6>{forecast["name"]}</h6>
                    <p>{forecast["detailedForecast"]}</p>
                </div>
            ))}
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
}

export default MountainDetails;