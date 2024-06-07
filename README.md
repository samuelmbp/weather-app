# Weather & Todo App

A web application that provides current weather, hourly forecasts, daily forecasts, and a todo list functionality. This app features details such as temperature, wind speed, humidity, and the chance of rain, along with the ability to manage personal tasks.

## Installation

Follow these steps to set up the project on your local machine:

1. Clone the repository `git clone https://github.com/samuelmbp/weather-app`
2. Navigate to the project directory: `cd weather-app`
3. Install the dependencies: `npm install`
4. Get a Weather API key at https://www.weatherapi.com/. You'll have to create an account first.
5. Add the API key to a `.env` file as: `VITE_WEATHER_API_KEY=your_api_key`
6. Run the application: `npm run dev`
7. Open the browser and visit http://localhost:5173 to see the app

## Features

-   Current Weather: Displays the current temperature, weather condition, wind speed, humidity, etc.
-   Hourly Forecast: Provides weather information for each hour of the day, including temperature and chance of rain.
-   Daily Forecast: Shows a summary of the weather for the next few days.
-   Todo List: Allows users to create and delete personal tasks.

## Usage

Once the app is running, users can:

-   View Current Weather: See the current temperature, condition, wind speed, humidity, and more.
-   Check Hourly Forecast: Browse the weather forecast for each hour, including temperature and chance of rain.
-   Daily Forecast: Review the weather outlook for the upcoming days.
-   Manage Todos: Create and delete personal tasks to keep track of things to do.

## Technologies Used

-   React
-   TypeScript
-   SCSS
-   Weather API: For fetching weather data.
    -   https://www.weatherapi.com/docs/
