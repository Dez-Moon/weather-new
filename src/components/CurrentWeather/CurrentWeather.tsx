import { Fab } from "@mui/material";
import axios from "axios";
import React, {
  ChangeEvent,
  createRef,
  KeyboardEvent,
  MouseEventHandler,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeFirstLetterToCapital,
  get24HoursWeather,
  getCurrentTemperature,
  getCurrentWeather,
  getMaxTemerature,
  getMinTemperature,
  getWeatherForCurrentDay,
} from "../../functions/functions";
import { AppRootStateType } from "../../state/store";
import { myKey, ResponseDataType } from "../api/api";
import styles from "./CurrentWeather.module.scss";
import SearchIcon from "@mui/icons-material/Search";
import { updateDataTC } from "../../state/app-reducer";
import UpdateIcon from "@mui/icons-material/Update";

const CurrentWeather = () => {
  const state = useSelector<AppRootStateType>((state) => state.app) as any;
  const dispatch = useDispatch();

  const description = useSelector<AppRootStateType>((state) =>
    changeFirstLetterToCapital(
      getCurrentWeather(state.app.data.list).weather[0].description
    )
  );
  let city = useSelector<AppRootStateType>(
    (state) => state.app.data.city.name
  ) as string;
  if (city === "Подол" || city === "Пуща Водица") city = "Киев";
  let currentTemp = useSelector<AppRootStateType>((state) =>
    getCurrentTemperature(state.app.data.list)
  ) as string;
  const weatherCurrentDay = getWeatherForCurrentDay(
    get24HoursWeather(state.data.list)
  );
  const maxTemp = getMaxTemerature(weatherCurrentDay);
  const minTemp = getMinTemperature(weatherCurrentDay);
  const text = changeFirstLetterToCapital(String(description));
  if (city === "Пуща Водица") {
    city = "Киев";
  }
  return (
    <div className={styles.wheatherNow}>
      <div className={styles.city}>{city}</div>

      <div className={styles.temp}>
        {currentTemp}°
        <UpdateIcon
          style={{
            fontSize: "16px",
            position: "absolute",
            bottom: "0px",
            right: "0px",
            cursor: "pointer",
          }}
          onClick={() => {
            updateDataTC()(dispatch, state);
          }}
        />
      </div>
      <div className={styles.text}>
        <div>{text}</div>
        <div>
          Макс:{maxTemp}°, мин:
          {minTemp}°
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
