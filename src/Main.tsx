import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import CurrentWeather from "./components/CurrentWeather/CurrentWeather";
import Footer from "./components/Footer/Footer";
import AboutCurrentWeather from "./components/SmallItems/AboutCurrentWeather";
import VideoBG from "./components/VideoBG/VideoBG";
import WeatherToday from "./components/Weather today/WeatherToday";
import WeatherFor5Days from "./components/WeatherFor5Days/WeatherFor5Days";
import styles from "./Main.module.scss";
import { AppRootStateType } from "./state/store";

const Main = () => {
  const weather = useSelector<AppRootStateType>(
    (state) => state.app.currentWeatherData
  ) as any;

  if (!localStorage.coordinates) {
    return <Navigate to='/select' />;
  }
  return (
    <div className={styles.main}>
      <VideoBG weather={weather.weather[0].icon} />
      <div className={styles.content}>
        <CurrentWeather />
        <WeatherToday />
        <div className={styles.gridContainer}>
          <WeatherFor5Days />
          <AboutCurrentWeather />
        </div>
        <div style={{ height: "40px" }}></div>
      </div>
      <Footer />
    </div>
  );
};

export default Main;
