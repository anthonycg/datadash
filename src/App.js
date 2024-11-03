import "./App.css";
import { React, useEffect, useState } from "react";
import axios from "axios";
import WeatherChart from "./WeatherChart";
import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";
import LocationSelector from "./LocationSelector";

Chart.register(CategoryScale);

function App() {
    const [apiData, setApiData] = useState([]); // Change to an array
    const [loading, setLoading] = useState(true); // For loading state
    const [error, setError] = useState(null); // For error state

    useEffect(() => {
        const fetchWeatherData = async () => {
            try {
                const response = await axios.post(
                    "http://127.0.0.1:8000/getWeather",
                    {
                        lat: 25.7743, // Miami
                        lon: -80.1937,
                    },
                    {
                        headers: {
                            "Content-Type": "application/json",
                            setContentLength: 0,
                            Accept: "*/*",
                        },
                    }
                );
                console.log(JSON.parse(response.data.data.body));
                setApiData(JSON.parse(response.data.data.body)); // Wrap the response in an array
            } catch (error) {
                console.error("Error fetching weather data:", error);
                setError("Error fetching weather data");
            } finally {
                setLoading(false);
            }
        };

        fetchWeatherData();
    }, []);

    // Handle loading and error states
    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <LocationSelector />
            <WeatherChart data={apiData} />
        </div>
    );
}

export default App;
