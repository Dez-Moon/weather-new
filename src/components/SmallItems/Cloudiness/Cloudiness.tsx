import React from "react";
import { useSelector } from "react-redux";
import CloudinessIMG from "../../../assets/icons/сloudiness.png";
import { AppRootStateType } from "../../../state/store";
import styles from "../AboutCurrentWeather.module.scss";

const Cloudiness = () => {
  const currentWeather = useSelector<AppRootStateType>(
    (state) => state.app.currentWeatherData
  ) as any;

  return (
    <div className={styles.currentWeatherInDetails}>
      <div className={styles.item}>
        <div className={styles.header}>
          <img src={CloudinessIMG} />
          <div>Облачность </div>
        </div>
        <div className={styles.value}>{currentWeather.clouds.all}%</div>
      </div>
    </div>
  );
};

export default Cloudiness;
