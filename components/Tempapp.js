import React, { useEffect, useState } from "react";
import Link from "next/link";

const Tempapp = () => {
  const [search, setSearch] = useState("Dhaka");
  const [city, setCity] = useState(null);
  const [error, setError] = useState(false);

  const fetchData = async () => {
    try {
      setError(false);
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=a0dfce10c63107f25ccb7fe294dd50e5&units=metric`
      );

      const data = await response.json();
      setCity(data);
    } catch (error) {}
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleKeypress = (e) => {
    if (e.keyCode === 13) {
      if (search) {
        fetchData();
      }
    }
  };

  return (
    <div className="box">
      <h1 className="title-main">Weather app</h1>

      <div className="input-city">
        <input
          type="search"
          className="input-box"
          placeholder="Enter city name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleKeypress}
        />

        <button
          disabled={search.length < 1}
          onClick={fetchData}
          className="button"
        >
          Search
        </button>
      </div>

      {city?.cod === "404" ? (
        <p>City not found</p>
      ) : (
        <>
          <div className="city-name">
            {city?.name} <span className="country">{city?.sys?.country}</span>
          </div>
          <div className="city-temp">{city?.main?.temp}&#xb0; Celsius</div>

          <div className="min-max-temp">
            <div>
              Humidity:{" "}
              <span className="city-temp">{city?.main?.humidity}%</span>
            </div>

            <div>
              Wind: <span className="city-temp">{city?.wind?.speed} km/h</span>
            </div>
          </div>

          <div className="detailsButton">
            <Link href={`${city?.name}`} className="button">
              Details Report
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Tempapp;
