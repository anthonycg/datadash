import React, { useState } from "react";

export default function LocationSelector() {
    const [coords, setCoords] = useState();
    return (
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
    );
}
