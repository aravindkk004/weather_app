"use client"
import { useState } from "react";
import $ from "jquery";
import { CiSearch } from "react-icons/ci";

export default function Home() {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (input.trim() === "") {
      setError("Please enter a city name");
      setTimeout(() => {
        setError("");
      }, 3000);
    } else {
      setError("");
      getDetails(input);
    }
  };

  const getDetails = async (cityName) => {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${process.env.NEXT_PUBLIC_API_KEY}&units=metric`
      );
      if (!res.ok) {
        throw new Error("City not found");
      }
      const api_key = await res.json();
      $(".container").addClass("active");
      $(".temp span").text(Math.round(api_key.main.temp));
      $(".tempImg").attr("src", `./${api_key.weather[0].main}.png`);
      $(".cityName").text(api_key.name);
      $(".humidityRate").text(`${api_key.main.humidity} %`);
      $(".windRate").text(`${api_key.wind.speed} km/h`);
      setInput("");
    } catch (error) {
      setError("Enter a valid city name");
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };

  return (
    <div className="wrapper">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="input"
          placeholder="Enter City name"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit" className="submit">
          <CiSearch size={20} />
        </button>
      </form>
      <div className="error">{error}</div>
      <div className="container">
        <img src="" alt="" className="tempImg" />
        <h2 className="temp">
          <span></span>°C
        </h2>
        <h3 className="cityName"></h3>
        <div className="extra">
          <div className="humidity">
            <div className="img">
              <img src="/Smoke.png" alt="" />
            </div>
            <div className="details">
              <h5 className="humidityRate"></h5>
              <p>Humidity</p>
            </div>
          </div>
          <div className="wind">
            <div className="img">
              <img src="/wind.png" alt="" />
            </div>
            <div className="details">
              <h5 className="windRate"></h5>
              <p>Wind Speed</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
