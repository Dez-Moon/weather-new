import React from "react";
import { useSelector } from "react-redux";
import { getWeatherIcon } from "../../functions/functions";
import { AppRootStateType } from "../../state/store";
import styles from "./WeatherToday.module.scss";

type PropsType = {
  list: any;
};
const WeatherItem = (props: PropsType) => {
  let hour = props.list.dt_txt.split(" ")[1].split(":")[0];
  const currentHour = useSelector<AppRootStateType>(
    (state) => state.app.currentHour
  );
  let img = getWeatherIcon(props.list.weather[0].icon);
  let chanceOfRain = Math.round(props.list.pop * 100) as any;
  if (chanceOfRain < 30) {
    chanceOfRain = null;
  } else {
    chanceOfRain = `${chanceOfRain}%`;
  }

  if (currentHour === Number(hour)) {
    hour = "Cейчас";
  }
  return (
    <div className={styles.hourlyWeather}>
      <div>{hour}</div>
      <div>
        <img src={img} />
      </div>
      <div className={styles.pop}>{chanceOfRain}</div>
      <div>{Math.round(props.list.main.temp)}°</div>
    </div>
  );
};

export default WeatherItem;
