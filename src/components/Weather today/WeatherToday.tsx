import React from "react";
import styles from "./WeatherToday.module.scss";
import WeatherItem from "./WeatherItem";
import { get24HoursWeather } from "../../functions/functions";
import { useSelector } from "react-redux";
import { AppRootStateType } from "../../state/store";

const WeatherToday = () => {
  const data = useSelector<AppRootStateType>((state) => state.app.data) as any;

  let x = 0;
  const weather = get24HoursWeather(data.list);
  return (
    <div className={styles.weatherToday}>
      <div className={styles.header}>
        <span>Солнечно до конца дня</span>
      </div>
      <div className={styles.blockWithWeater}>
        {weather.map((list: any) => (
          <WeatherItem list={list} key={list.dt + x++} />
        ))}
      </div>
    </div>
  );
};

export default WeatherToday;
