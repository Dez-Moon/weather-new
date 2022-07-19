import React from "react";
import FeelsLike from "./FeelsLike/FeelsLike";
import Humidity from "./Humidity/Humidity";
import Precipitation from "./Precipitation/Precipitation";
import Pressure from "./Pressure/Pressure";
import Wind from "./Wind/Wind";
import styles from "./AboutCurrentWeather.module.scss";
import Cloudiness from "./Cloudiness/Cloudiness";

const AboutCurrentWeather = () => {
  return (
    <div className={styles.aboutCurrentWeather}>
      <Wind />
      <Humidity />
      <FeelsLike />
      <Pressure />
      <Precipitation />
      <Cloudiness />
    </div>
  );
};

export default AboutCurrentWeather;
