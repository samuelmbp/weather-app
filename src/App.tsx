import { useEffect, useState } from "react";
import "./App.scss";
import Intro from "./components/Intro/Intro";
import SearchCity from "./components/SearchCity/SearchCity";
import Spinner from "./components/Spinner/Spinner";
import TodaysGoal from "./components/TodaysGoal/TodaysGoal";
import TodoForm from "./components/TodoForm/TodoForm";
import TodoList from "./components/TodoList/TodoList";
import Weather from "./components/Weather/Weather";
import { Todo } from "./types/todo";
import { WeatherData } from "./types/WeatherData";

const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

const App = () => {
    const [data, setData] = useState<WeatherData | null>(null);
    const [error, setError] = useState<string>("");
    const [greeting, setGreeting] = useState<string>("");
    const [todos, setTodos] = useState<Todo[]>(() => {
        const storedTodos = localStorage.getItem("todos");
        return storedTodos ? JSON.parse(storedTodos) : [];
    });

    const fetchWeatherData = async (query: string) => {
        try {
            const response = await fetch(
                `https://api.weatherapi.com/v1/forecast.json?key=${WEATHER_API_KEY}&q=${query}&days=1&aqi=no&alerts=no`
            );

            if (!response.ok) {
                throw new Error(
                    "City not found. Please enter a valid town or city name."
                );
            }
            const weatherData: WeatherData = await response.json();
            setData(weatherData);
            setError("");
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
                const query = `${position.coords.latitude},${position.coords.longitude}`;
                fetchWeatherData(query);
                setGreeting(getGreetingMessage());
            });
        } else {
            setError("Geolocation is not supported by this browser");
        }
    };

    const handleSearchCity = (city: string) => {
        fetchWeatherData(city);
    };

    const addTodo = (text: string) => {
        const newTodos = [...todos, { text, isCompleted: false }];
        setTodos(newTodos);
    };

    const completeTodo = (index: number) => {
        const newTodos = [...todos];
        newTodos[index].isCompleted = !newTodos[index].isCompleted;
        setTodos(newTodos);
    };

    const removeTodo = (index: number) => {
        const newTodos = todos.filter((_, i) => i !== index);
        setTodos(newTodos);
    };

    useEffect(() => {
        getUserLocation();
    }, []);

    useEffect(() => {
        const storedTodos = localStorage.getItem("todos");
        if (storedTodos) {
            try {
                const parsedTodos = JSON.parse(storedTodos);
                setTodos(parsedTodos);
            } catch (error) {
                console.error(
                    "Failed to parse todos from localStorage:",
                    error
                );
            }
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]);

    if (!data) return <Spinner />;
    return (
        <>
            <Intro
                greeting={greeting}
                name={data.location.name}
                region={data.location.region}
                country={data.location.country}
            />
            <SearchCity
                onSearch={handleSearchCity}
                onGetCurrentLocation={getUserLocation}
            />
            <Weather data={data} error={error} />
            <TodaysGoal todos={todos} />
            <TodoForm addTodo={addTodo} />
            <TodoList
                todos={todos}
                completeTodo={completeTodo}
                removeTodo={removeTodo}
            />
        </>
    );
};

export default App;
