import React, { useEffect } from "react";
import { Line } from "react-chartjs-2";

export default function WeatherChart({ data }) {
    useEffect(() => console.log("comp data:::", data));
    // Ensure data is structured correctly for the chart
    const chartData = {
        labels: data.map((item) => item.datetime), // Extract datetime labels
        datasets: [
            {
                label: "Rain",
                data: data.map((item) => item.rain), // Extract humidity data
                fill: false,
                borderColor: "dodgerBlue",
                tension: 0.1,
            },
            {
                label: "Wind Speed",
                data: data.map((item) => item.wind_speed), // Extract wind speed data
                fill: false,
                borderColor: "white",
                tension: 0.1,
            },
        ],
    };

    return (
        <Line
            data={chartData}
            options={{
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: "Date and Time",
                        },
                    },
                    y: {
                        title: {
                            display: true,
                            text: "Rain and Wind Speed",
                        },
                    },
                },
            }}
        />
    );
}
