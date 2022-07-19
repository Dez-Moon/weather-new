import React from "react";
import { useSelector } from "react-redux";
import { AppRootStateType } from "../../../state/store";
import styles from "../AboutCurrentWeather.module.scss";
import PrecipicationIMG from "../../../assets/icons/precipication.png";
import {
  get24HoursWeather,
  getHoursFromDate,
} from "../../../functions/functions";

const Precipitation = () => {
  let precipication = null as any;
  let data = useSelector<AppRootStateType>((state) => state.app.data) as any;
  const currentWeather = useSelector<AppRootStateType>(
    (state) => state.app.currentWeatherData
  ) as any;
  let precipicationPerDay = null as any;
  for (let i = 0; i < data.list.length; i++) {
    if (getHoursFromDate(data.list[i].dt_txt) === 0) {
      break;
    }
    if (data.list[i].rain && i !== 0) {
      precipicationPerDay += data.list[i].rain["3h"];
    }
  }
  if (currentWeather.rain) {
    precipication = currentWeather.rain["3h"];
  } else {
    precipication = 0;
  }
  return (
    <div className={styles.currentWeatherInDetails}>
      <div className={styles.item}>
        <div className={styles.header}>
          <img src={PrecipicationIMG} />
          <div>Осадки</div>
        </div>
        <div style={{ marginTop: "-20px" }}>
          <div className={styles.value}>
            {precipication} <span>мм</span>
          </div>
          <div className={styles.text}>
            <div>
              за последние 3 часа
              <div className={styles.precipicationPerDay}>
                {precipicationPerDay || 0} мм ожидается в течении суток
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Precipitation;
