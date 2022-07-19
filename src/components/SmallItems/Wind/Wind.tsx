import React, { useState } from "react";
import { useSelector } from "react-redux";
import { AppRootStateType } from "../../../state/store";
import Compass from "../../Compass/Compass";
import WindImg from "../../../assets/icons/wind.png";
import styles from "../AboutCurrentWeather.module.scss";

const Wind = () => {
  return (
    <div className={styles.currentWeatherInDetails}>
      <div className={styles.header}>
        <img src={WindImg} />
        <div>Ветер</div>
      </div>
      <div className={styles.wind}>
        <Compass />
      </div>
    </div>
  );
};

export default Wind;
