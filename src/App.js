import "./App.css";
import { React, useEffect, useState } from "react";
import axios from "axios";
import WeatherChart from "./WeatherChart";
import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";

Chart.register(CategoryScale);

function App() {
    const [apiData, setApiData] = useState([]); // Change to an array
    const [loading, setLoading] = useState(true); // For loading state
    const [error, setError] = useState(null); // For error state
    const [coords, setCoords] = useState({ lat: 25.7743, lon: -80.1937 }); // Location Coordinates - MIA by default

    useEffect(() => {
        const fetchWeatherData = async () => {
            try {
                const response = await axios.post(
                    "http://127.0.0.1:8000/getWeather",
                    {
                        lat: coords.lat,
                        lon: coords.lon,
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
                setApiData(JSON.parse(response.data.data.body));
            } catch (error) {
                console.error("Error fetching weather data:", error);
                setError("Error fetching weather data");
            } finally {
                setLoading(false);
            }
        };

        fetchWeatherData();
    }, [coords]);

    // Handle loading and error states
    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <div className="mt-2">
                <button
                    class="bg-pink-700 text-cyan-800 text-xl rounded-md p-2 mx-2"
                    onClick={() => setCoords({ lat: 25.7743, lon: -80.1937 })}
                >
                    Miami, FL
                </button>
                {/* 25.7743, lon: -80.1937 */}
                <button
                    class="bg-cyan-950 text-amber-400 text-xl rounded-md p-2 mr-2"
                    onClick={() => setCoords({ lat: 35.2339, lon: -75.5364 })}
                >
                    Cape Hatteras, NC
                </button>
                {/* 35.2339, lon: -75.5364 */}
                <button
                    class="bg-purple-700 text-amber-50 text-xl rounded-md p-2 mr-2"
                    onClick={() => setCoords({ lat: 29.7633, lon: -95.3633 })}
                >
                    Houston, TX
                </button>
                {/* 29.7633, lon: -95.3633 */}
                <button
                    class="bg-yellow-900 text-white text-xl rounded-md p-2 mr-2"
                    onClick={() => setCoords({ lat: 29.9547, lon: -90.0751 })}
                >
                    New Orleans, LA
                </button>
                {/* 29.9547 -90.0751 */}
            </div>
            <WeatherChart data={apiData} />
        </div>
    );
}

export default App;
