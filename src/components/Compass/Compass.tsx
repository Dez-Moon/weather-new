import React from "react";
import CompassImg from "../../assets/icons/compass1.png";
import Arrow from "../../assets/icons/arrow1.png";
import styles from "./Compass.module.scss";
import { useSelector } from "react-redux";
import { AppRootStateType } from "../../state/store";

type windDataType = {
  speed: number;
  deg: number;
  gust: number;
};
const Compass = () => {
  const windData = useSelector<AppRootStateType>(
    (state) => state.app.currentWeatherData.wind
  ) as windDataType;
  const num = (e: number) => {
    return e % 1 === 0 ? e.toFixed(0) : e.toFixed(1);
  };
  const windSpeed = num(windData.speed);

  return (
    <div className={styles.compassContainer}>
      <div className={styles.compass}>
        <img src={CompassImg} className={styles.icon} />
        <img
          src={Arrow}
          className={styles.arrow}
          style={{ transform: `rotate(${windData.deg}deg)` }}
        />
        <div className={styles.windSpeed}>
          <div>
            <span>{windSpeed}</span>
          </div>
          <div>
            <span>км/ч</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Compass;
