import { FormEvent, useState } from "react";
import searchIcon from "../../assets/search-icon.svg";
import currentLocationIcon from "../../assets/current-location.png";
import "./SearchCity.scss";

interface SearchCityProps {
    onSearch: (city: string) => void;
    onGetCurrentLocation: () => void;
}

const SearchCity = ({ onSearch, onGetCurrentLocation }: SearchCityProps) => {
    const [city, setCity] = useState<string>("");

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (city.trim()) {
            onSearch(city);
            setCity("");
        }
    };

    const handleGetCurrentLocation = () => {
        onGetCurrentLocation();
    };
    return (
        <section className="search__city-container">
            <form onSubmit={handleSubmit} className="search-city">
                <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Enter a city name"
                    className="search-city__input"
                />
                <button type="submit" className="search-city__button search">
                    <img
                        className="search-city__icon"
                        src={searchIcon}
                        alt="Search Icon"
                    />
                </button>
            </form>
            <button
                onClick={handleGetCurrentLocation}
                type="submit"
                className="search-city__location location"
            >
                <img
                    className="search-city__location-icon"
                    src={currentLocationIcon}
                    alt="Current Location Icon"
                />
            </button>
        </section>
    );
};

export default SearchCity;
