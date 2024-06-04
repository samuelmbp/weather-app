import { useEffect, useState } from "react";
import "./App.css";
import Weather from "./components/Weather/Weather";
import Intro from "./components/Intro/Intro";
import { WeatherData } from "./types/WeatherData";

function App() {
    const [data, setData] = useState<WeatherData | null>(null);
    const [error, setError] = useState<string>("");
    const [greeting, setGreeting] = useState<string>("");

    useEffect(() => {
        const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

        const fetchWeatherData = async (
            latitude: number,
            longitude: number
        ) => {
            try {
                const response = await fetch(
                    `http://api.weatherapi.com/v1/current.json?key=${WEATHER_API_KEY}&q=${latitude},${longitude}&aqi=no`
                );
                const weatherData: WeatherData = await response.json();
                setData(weatherData);
                console.log(weatherData);
            } catch (error) {
                if (error instanceof Error) setError(error.message);
            }
        };

        const getGreetingMessage = () => {
            const currentHour = new Date().getHours();
            if (currentHour < 12) return "Good Morning!";
            if (currentHour < 18) return "Good Afternoon!";
            return "Good Evening!";
        };

        const getUserLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((position) => {
                    fetchWeatherData(
                        position.coords.latitude,
                        position.coords.longitude
                    );
                    setGreeting(getGreetingMessage());
                });
            } else {
                setError("Geolocation is not supported by this browser");
            }
        };

        getUserLocation();
    }, []);

    // TODO: Add a spinner component
    if (!data) return "Loading...";
    return (
        <>
            <Intro
                greeting={greeting}
                name={data.location.name}
                region={data.location.region}
                country={data.location.country}
            />
            <Weather data={data} error={error} />
        </>
    );
}

export default App;
