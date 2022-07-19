import React from "react";
import styles from "../AboutCurrentWeather.module.scss";
import PressureImg from "../../../assets/icons/pressure.png";
import { useSelector } from "react-redux";
import { AppRootStateType } from "../../../state/store";

const Pressure = () => {
  const currentWeather = useSelector<AppRootStateType>(
    (state) => state.app.currentWeatherData
  ) as any;
  return (
    <div className={styles.currentWeatherInDetails}>
      <div className={styles.item}>
        <div className={styles.header}>
          <img src={PressureImg} />
          <div>Давление</div>
        </div>
        <div style={{ textAlign: "center" }}>
          <div className={styles.value}>{currentWeather.main.pressure}</div>
          <div>гПА</div>
        </div>
      </div>
    </div>
  );
};

export default Pressure;
