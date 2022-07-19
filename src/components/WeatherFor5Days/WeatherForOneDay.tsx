import React, { useState } from "react";
import {
  get24HoursWeather,
  getDayFromDate,
  getMaxTemerature,
  getMinTemperature,
  getWeatherIcon,
  returnWeatherIcon,
} from "../../functions/functions";
import styles from "./WeatherFor5Days.module.scss";
type PropsType = {
  day: any;
  weather: any;
};
const WeatherForOneDay = (props: PropsType) => {
  let date = String(new Date());
  let currentDay = Number(date.split(" ")[2]);
  let img = getWeatherIcon(props.day[0].weather[0].icon);
  const weather = props.weather;
  const currentTemperature = Math.round(
    get24HoursWeather(weather)[0].main.temp
  );
  let switchValue;
  let slider = "";
  const day = [...props.day];
  let data = day[0].dt_txt.split(" ")[0].split("-")[2];
  const minTemperature = getMinTemperature(day);
  const maxTemperature = getMaxTemerature(day);
  if (currentDay === getDayFromDate(day[0].dt_txt)) {
    slider = "●";
    let differenceBetweenMinAndMaxTemperature =
      Number(maxTemperature) - Number(minTemperature);
    let x = 100 / differenceBetweenMinAndMaxTemperature;
    switchValue = `${String(
      Math.round(
        (differenceBetweenMinAndMaxTemperature -
          (Number(maxTemperature) - currentTemperature)) *
          x
      )
    )}px`;
    data = "Cегодня";
  }

  return (
    <div className={styles.weatherForOneDay}>
      <div className={styles.day}>{data}</div>
      <div>
        <img src={img} />
      </div>
      <div>{minTemperature}°</div>
      <div className={styles.borderWrap}>
        <div className={styles.line} style={{ left: switchValue }}>
          {slider}
        </div>
      </div>
      <div>{maxTemperature}°</div>
    </div>
  );
};

export default WeatherForOneDay;
