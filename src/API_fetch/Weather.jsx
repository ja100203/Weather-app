import React, { useEffect, useState } from 'react'
import './Weather.css';
import Description from './Description'
import { getFormattedWeatherData } from './Weather_service';


function Weather() {
    const [city, setCity] = useState("Paris")
    const [weather, setWeather] = useState(null);
    const [units, setUnits] = useState("metric");
   //  const [bg,setBg]=useState(hotBg);

    useEffect(() => {
        const fetchWeatherData = async () => {
            const data = await getFormattedWeatherData(city, units);
            setWeather(data)
        };
        fetchWeatherData();
    }, [city,units]
    );

    const handleUnitsClick = (e) => {
        const button = e.currentTarget;
        const currentUnit = button.innerText.slice(1);
        const isCelsius = currentUnit === 'C';
        button.innerText = isCelsius ? 'F' : 'C';
        setUnits(isCelsius ? 'metric' : 'imperial');
    }
    const enterKeyPressed = (e) => {
        if (e.keyCode === 13) {
            setCity(e.currentTarget.value);
            e.currentTarget.blur();
        }
    }



    return (
        <div className='Weather'
        //style={{background: `url{${coldBg}}`}}
        >
            <div className='overlay'>
                {
                    weather && (
                        <div className='container'>
                            <div className='section section-inputs'>
                                <input onKeyDown={enterKeyPressed} type="text" name="city" placeholder='Enter City...' />
                                <button onClick={(e) => handleUnitsClick(e)}>F</button>
                            </div>
                            <div className='section section_temperature'>
                                <div className='icon'>
                                    <h3>{`${weather.name}, ${weather.country}`}</h3>
                                    <img src={weather.iconURL} alt="weather-icon" />
                                    <h3>{weather.description}</h3>
                                </div>
                                <div className='temperature'>
                                    <h1>{`${weather.temp.toFixed()} ${units == 'metric' ? 'C' : 'F'}`}</h1>
                                </div>
                            </div>
                            <Description weather={weather} units={units} />
                        </div>

                    )}

            </div>
        </div>
    )
}

export default Weather;