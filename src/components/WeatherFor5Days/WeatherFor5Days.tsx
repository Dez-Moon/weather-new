import React, { useEffect } from "react";
import styles from "./WeatherFor5Days.module.scss";
import { getHoursFromDate } from "../../functions/functions";
import WeatherForOneDay from "./WeatherForOneDay";
import { useSelector } from "react-redux";
import { AppRootStateType } from "../../state/store";

const WeatherFor5Days = () => {
  const data = useSelector<AppRootStateType>((state) => state.app.data) as any;
  const weather = data.list;
  const days: any = [];
  let j = 0;
  for (let i = 0; i < weather.length; i++) {
    let hour = getHoursFromDate(weather[i].dt_txt);
    if (hour === 0 && i !== 0) {
      let day = weather.slice(j * 7, i);
      if (j !== 0) {
        day = weather.slice(j * 7 + j - 1, i);
      }
      days[j] = day;
      j++;
    }
  }
  return (
    <div className={styles.weatherFor5Days}>
      <div className={styles.header}>Погода на 5 дней</div>
      <div className={styles.oneDayContainer}>
        {days.map((day: any) => (
          <WeatherForOneDay day={day} key={day[0].dt} weather={weather} />
        ))}
      </div>
    </div>
  );
};

export default WeatherFor5Days;
