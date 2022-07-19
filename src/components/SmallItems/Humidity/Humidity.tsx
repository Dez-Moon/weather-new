import React from "react";
import { useSelector } from "react-redux";
import { AppRootStateType } from "../../../state/store";
import HumidityImg from "../../../assets/icons/humidity.png";
import styles from "../AboutCurrentWeather.module.scss";

const Humidity = () => {
  const currentWeather = useSelector<AppRootStateType>(
    (state) => state.app.currentWeatherData
  ) as any;
  return (
    <div className={styles.currentWeatherInDetails}>
      <div className={styles.item}>
        <div className={styles.header}>
          <img src={HumidityImg} />
          <div>Влажность</div>
        </div>
        <div className={styles.value}>{currentWeather.main.humidity}%</div>
      </div>
    </div>
  );
};

export default Humidity;
