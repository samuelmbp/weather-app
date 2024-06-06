import "./Weather.scss";
import { WeatherData } from "../../types/WeatherData";

// USE THE GUARDIAN NEWS OPEN API TO DISPLAY NEWS TO THE USER ALONGSIDE THE WEATHER
// OR INSTEAD OF NEWS, CREATE A TODO LIST (IAIA)
interface WeatherProps {
    data: WeatherData | null;
    error: string;
}

const Weather = ({ data, error }: WeatherProps) => {
    // TODO: Use object destructuring for data!
    console.log(data?.forecast.forecastday);

    return (
        <div className="weather-container">
            <div className="weather">
                {error ? (
                    <p className="weather__error">{error}</p>
                ) : data ? (
                    <div className="weather__data">
                        <p className="weather__temperature">
                            {data.current.temp_c}°C ({data.current.temp_f}°F)
                        </p>
                        <p className="weather__condition">
                            {data.current.condition.text}
                        </p>
                        <img
                            className="weather__icon"
                            src={data.current.condition.icon}
                            alt={data.current.condition.text}
                        />
                        <p className="weather__wind">
                            Wind {data.current.wind_mph} mph (
                            {data.current.wind_kph} kph) {data.current.wind_dir}
                        </p>
                        <p className="weather__humidity">
                            Humidity {data.current.humidity}%
                        </p>
                        <div className="weather__astro">
                            <p className="weather__astro-sunrise bold">
                                Sunrise{" "}
                                {data?.forecast.forecastday[0].astro.sunrise}
                            </p>
                            <p className="weather__astro-sunset bold">
                                Sunset{" "}
                                {data?.forecast.forecastday[0].astro.sunset}
                            </p>
                        </div>
                    </div>
                ) : (
                    <p className="weather__loading">Loading...</p>
                )}
            </div>

            <div className="weather">
                <h2 className="weather__title">Hourly Forecast</h2>
                <div className="weather__hourly-forecast">
                    {data?.forecast.forecastday[0].hour.map(
                        (hourData, index) => (
                            <div className="weather__hour" key={index}>
                                <p className="weather__hour-time">
                                    {hourData.time.split(" ")[1]}
                                </p>
                                <div className="weather__hour-container">
                                    <img
                                        className="weather__hour-icon"
                                        src={hourData.condition.icon}
                                        alt={hourData.condition.text}
                                    />
                                    <span className="weather__hour-temp">
                                        {hourData.temp_c}°C
                                    </span>
                                </div>
                            </div>
                        )
                    )}
                </div>
            </div>
        </div>
    );
};

export default Weather;
