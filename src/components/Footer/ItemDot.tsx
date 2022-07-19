import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCurrentWeather,
  getLatFromString,
  getLonFromString,
} from "../../functions/functions";
import { setCurrentWeatherDataAC, setDataAC } from "../../state/app-reducer";
import { AppRootStateType } from "../../state/store";
import { API, myKey } from "../api/api";
import styles from "./Footer.module.scss";

type PropsType = {
  city: string;
  valueForStyles: number;
};
const ItemDot = (props: PropsType) => {
  const dispatch = useDispatch();
  const [dataItem, setDataItem] = useState() as any;
  const data = useSelector<AppRootStateType>((state) => state.app.data) as any;
  const lat = getLatFromString(props.city);
  const lon = getLonFromString(props.city);
  useEffect(() => {
    API.getWeather(lat, lon, "ru", myKey).then((res) => {
      setDataItem(res.data);
    });
  }, []);

  const onHandleClick = () => {
    if (data.city.id !== dataItem.city.id) {
      dispatch(setDataAC({ data: dataItem }));
      dispatch(
        setCurrentWeatherDataAC({ data: getCurrentWeather(dataItem.list) })
      );
    }
  };
  let stylesReact = {
    animationDelay: `${props.valueForStyles}s`,
  };
  if (data && dataItem) {
    if (data.city.id === dataItem.city.id) {
      return (
        <div className={styles.itemSelected} style={stylesReact}>
          <span onClick={onHandleClick}>●</span>
        </div>
      );
    }
  }

  return (
    <div className={styles.item} style={stylesReact}>
      <span onClick={onHandleClick}>●</span>
    </div>
  );
};

export default ItemDot;
