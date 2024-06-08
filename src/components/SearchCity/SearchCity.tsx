import { FormEvent, useState } from "react";
import searchIcon from "../../assets/search-icon.svg";
import "./SearchCity.scss";

interface SearchCityProps {
    onSearch: (city: string) => void;
}

const SearchCity = ({ onSearch }: SearchCityProps) => {
    const [city, setCity] = useState<string>("");

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (city.trim()) {
            onSearch(city);
            setCity("");
        }
    };
    return (
        <form onSubmit={handleSubmit} className="search-city">
            <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Enter a town or city"
                className="search-city__input"
            />
            <button type="submit" className="search-city__button">
                <img
                    className="search-city__icon"
                    src={searchIcon}
                    alt="Search Icon"
                />
            </button>
        </form>
    );
};

export default SearchCity;
