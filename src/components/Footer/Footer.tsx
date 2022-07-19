import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getCurrentWeather } from "../../functions/functions";
import { setCurrentWeatherDataAC, setDataAC } from "../../state/app-reducer";
import { AppRootStateType } from "../../state/store";
import { API, myKey } from "../api/api";
import styles from "./Footer.module.scss";
import ItemDot from "./ItemDot";
import MenuIMG from "../../assets/icons/menu.png";

const Footer = () => {
  const dispatch = useDispatch();
  const cities = useSelector<AppRootStateType>(
    (state) => state.app.cities
  ) as any;
  const data = useSelector<AppRootStateType>((state) => state.app.data) as any;

  const switchToLeft = () => {
    let coords = `lat:${data.city.coord.lat.toFixed(
      2
    )}&lon:${data.city.coord.lon.toFixed(2)}`;
    let index = cities.indexOf(coords);
    if (index !== 0) {
      let newCoords = cities[index - 1].split("&");
      let lat = newCoords[0].split(":")[1];
      let lon = newCoords[1].split(":")[1];
      API.getWeather(lat, lon, "ru", myKey).then((res) => {
        dispatch(setDataAC({ data: res.data }));
        dispatch(
          setCurrentWeatherDataAC({ data: getCurrentWeather(res.data.list) })
        );
      });
    }
  };
  const switchToRight = () => {
    let coords = `lat:${data.city.coord.lat.toFixed(
      2
    )}&lon:${data.city.coord.lon.toFixed(2)}`;
    let index = cities.indexOf(coords);
    if (index !== cities.length - 1) {
      let newCoords = cities[index + 1].split("&");
      let lat = newCoords[0].split(":")[1];
      let lon = newCoords[1].split(":")[1];
      API.getWeather(lat, lon, "ru", myKey).then((res) => {
        dispatch(setDataAC({ data: res.data }));
        dispatch(
          setCurrentWeatherDataAC({ data: getCurrentWeather(res.data.list) })
        );
      });
    }
  };
  let i = 0;
  return (
    <div className={styles.footer}>
      <div className={styles.dotContainer}>
        {cities.map((city: any) => {
          i = i + 0.7;
          return <ItemDot key={city} city={city} valueForStyles={i} />;
        })}
      </div>
      <Link to='/select'>
        <div className={styles.img}>
          <img src={MenuIMG} />
        </div>
      </Link>
      <div className={styles.switches}>
        <div className={styles.switchToLeft} onClick={switchToLeft}></div>
        <div className={styles.switchToRight} onClick={switchToRight}></div>
      </div>
    </div>
  );
};

export default Footer;
