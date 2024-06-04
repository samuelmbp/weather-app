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

    return (
        <div className="weather-container">
            <div className="weather">
                {error ? (
                    <p className="weather__error">{error}</p>
                ) : data ? (
                    <div className="weather__data">
                        <p className="weather__temperature">
                            Current Temperature: {data.current.temp_c}°C (
                            {data.current.temp_f}°F)
                        </p>
                        <p className="weather__condition">
                            Condition: {data.current.condition.text}
                        </p>
                        <img
                            className="weather__icon"
                            src={data.current.condition.icon}
                            alt={data.current.condition.text}
                        />
                        <p className="weather__wind">
                            Wind: {data.current.wind_mph} mph (
                            {data.current.wind_kph} kph) {data.current.wind_dir}
                        </p>
                        <p className="weather__humidity">
                            Humidity: {data.current.humidity}%
                        </p>
                        <p className="weather__pressure">
                            Pressure: {data.current.pressure_mb} mb (
                            {data.current.pressure_in} in)
                        </p>
                    </div>
                ) : (
                    <p className="weather__loading">Loading...</p>
                )}
            </div>
            <div className="weather">
                {error ? (
                    <p className="weather__error">{error}</p>
                ) : data ? (
                    <div className="weather__data">
                        <p className="weather__precipitation">
                            Precipitation: {data.current.precip_mm} mm (
                            {data.current.precip_in} in)
                        </p>
                        <p className="weather__cloud-cover">
                            Cloud Cover: {data.current.cloud}%
                        </p>
                        <p className="weather__feels-like">
                            Feels Like: {data.current.feelslike_c}°C (
                            {data.current.feelslike_f}°F)
                        </p>
                        <p className="weather__visibility">
                            Visibility: {data.current.vis_km} km (
                            {data.current.vis_miles} miles)
                        </p>
                        <p className="weather__uv-index">
                            UV Index: {data.current.uv}
                        </p>
                        <p className="weather__gust">
                            Gust: {data.current.gust_mph} mph (
                            {data.current.gust_kph} kph)
                        </p>
                    </div>
                ) : null}
            </div>
        </div>
    );
};

export default Weather;
