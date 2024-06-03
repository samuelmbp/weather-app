import { useEffect, useState } from "react";
import "./App.css";
import { WeatherData } from "./types/WeatherData";

function App() {
    const [data, setData] = useState<WeatherData | null>(null);

    useEffect(() => {
        const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
        const fetchWeatherData = async (
            latitude: number,
            longitude: number
        ) => {
            const response = await fetch(
                `http://api.weatherapi.com/v1/current.json?key=${WEATHER_API_KEY}&q=${latitude},${longitude}&aqi=no`
            );
            const weatherData: WeatherData = await response.json();
            setData(weatherData);
        };

        const getUserLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((position) => {
                    fetchWeatherData(
                        position.coords.latitude,
                        position.coords.longitude
                    );
                });
            }
        };

        getUserLocation();
    }, []);

    return (
        <>
            <h1>Weather App</h1>
            {data ? (
                <div>
                    <h2>
                        {data.location.name}, {data.location.region},{" "}
                        {data.location.country}
                    </h2>
                    <p>
                        Temperature: {data.current.temp_c}°C (
                        {data.current.temp_f}°F)
                    </p>
                    <p>Condition: {data.current.condition.text}</p>
                    <img
                        src={data.current.condition.icon}
                        alt={data.current.condition.text}
                    />
                    <p>
                        Wind: {data.current.wind_mph} mph (
                        {data.current.wind_kph} kph) {data.current.wind_dir}
                    </p>
                    <p>Humidity: {data.current.humidity}%</p>
                    <p>
                        Pressure: {data.current.pressure_mb} mb (
                        {data.current.pressure_in} in)
                    </p>
                    <p>
                        Precipitation: {data.current.precip_mm} mm (
                        {data.current.precip_in} in)
                    </p>
                    <p>Cloud Cover: {data.current.cloud}%</p>
                    <p>
                        Feels Like: {data.current.feelslike_c}°C (
                        {data.current.feelslike_f}°F)
                    </p>
                    <p>
                        Visibility: {data.current.vis_km} km (
                        {data.current.vis_miles} miles)
                    </p>
                    <p>UV Index: {data.current.uv}</p>
                    <p>
                        Gust: {data.current.gust_mph} mph (
                        {data.current.gust_kph} kph)
                    </p>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </>
    );
}

export default App;
