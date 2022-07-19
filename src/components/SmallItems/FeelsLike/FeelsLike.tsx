import React from "react";
import { useSelector } from "react-redux";
import { AppRootStateType } from "../../../state/store";
import styles from "../AboutCurrentWeather.module.scss";
import Thermometer from "../../../assets/icons/thermometer.png";

const FeelsLike = () => {
  const currentWeather = useSelector<AppRootStateType>(
    (state) => state.app.currentWeatherData
  ) as any;
  const feelsLikeTemp = Math.round(currentWeather.main.feels_like);
  return (
    <div className={styles.currentWeatherInDetails}>
      <div className={styles.item}>
        <div className={styles.header}>
          <img src={Thermometer} />
          <div style={{ marginLeft: "-8px" }}>Ощущается как</div>
        </div>
        <div className={styles.value}>{feelsLikeTemp}°</div>
      </div>
    </div>
  );
};

export default FeelsLike;
