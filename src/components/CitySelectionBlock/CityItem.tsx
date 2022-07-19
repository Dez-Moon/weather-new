import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import {
  changeFirstLetterToCapital,
  get24HoursWeather,
  getCurrentTemperature,
  getCurrentWeather,
  getLatFromString,
  getLonFromString,
  getMaxTemerature,
  getMinTemperature,
  getWeatherForCurrentDay,
  getWorldTime,
} from "../../functions/functions";
import { API, myKey } from "../api/api";
import styles from "./CitySelectionBlock.module.scss";
import VideoBGForItem from "./VideoBGForItem";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import MenuIcon from "@mui/icons-material/Menu";
import { setCurrentWeatherDataAC, setDataAC } from "../../state/app-reducer";
import { useDispatch, useSelector } from "react-redux";
import { AppRootStateType } from "../../state/store";

type PropsType = {
  city: any;
  editMode: boolean;
  deleteCity: any;
};
const CityItem = React.memo((props: PropsType) => {
  const dispatch = useDispatch();
  const lat = getLatFromString(props.city);
  const lon = getLonFromString(props.city);
  const [data, setData] = useState() as any;
  const [cityName, setCityName] = useState() as any;
  const [currentTemperature, setCurrentTemperature] = useState() as any;
  const [maxTemp, setMaxTemp] = useState() as any;
  const [minTemp, setMinTemp] = useState() as any;
  const [currentWeather, setCurrentWeather] = useState() as any;
  const [weather, setWeather] = useState() as any;
  useEffect(() => {
    if (!data) {
      API.getWeather(lat, lon, "ru", myKey).then((res) => {
        debugger;
        setData(res.data);
        let name = res.data.city.name;
        if (name === "Подол" || name === "Пуща Водица") name = "Киев";
        setCityName(name);
        setCurrentWeather(
          changeFirstLetterToCapital(
            getCurrentWeather(res.data.list).weather[0].description
          )
        );
        setCurrentTemperature(getCurrentTemperature(res.data.list));
        setMaxTemp(getMaxTemerature(getWeatherForCurrentDay(res.data.list)));
        setMinTemp(getMinTemperature(getWeatherForCurrentDay(res.data.list)));
        setWeather(getCurrentWeather(res.data.list).weather[0].icon);
      });
    }
  }, []);
  let time = getWorldTime(data);

  const onHandleClick = () => {
    dispatch(setDataAC({ data: data }));
    dispatch(setCurrentWeatherDataAC({ data: getCurrentWeather(data.list) }));
  };
  const styleForEditMode = {
    textDecoration: "none",
    color: "white",
    width: props.editMode ? "70%" : "100%",
  };
  return (
    <div className={styles.itemContainer}>
      {props.editMode && (
        <RemoveCircleIcon
          color='error'
          onClick={() => props.deleteCity(props.city)}
        />
      )}
      <Link to='/' onClick={onHandleClick} style={styleForEditMode}>
        <div className={styles.item}>
          <VideoBGForItem weather={weather} />
          <div className={styles.top}>
            <div className={styles.topLeft}>
              <div className={styles.cityName}>{cityName}</div>
              <div>{time}</div>
            </div>
            <div style={{ width: "150px", fontSize: "30px" }}>
              {currentTemperature}°
            </div>
          </div>
          <div className={styles.bottom}>
            <div className={styles.currentWeather}>{currentWeather}</div>
            <div className={styles.bottomRight}>
              <div>Макс:{maxTemp}°</div>
              <div>мин:{minTemp}°</div>
            </div>
          </div>
        </div>
      </Link>
      {props.editMode && <MenuIcon />}
    </div>
  );
});

export default CityItem;
