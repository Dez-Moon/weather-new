import React, { createRef, KeyboardEvent, useState } from "react";
import CityItem from "./CityItem";
import styles from "./CitySelectionBlock.module.scss";
import SearchImg from "../../assets/icons/search.png";
import axios from "axios";
import { myKey } from "../api/api";
import CitiesToChoose from "./CitiesToChoose";
import { useDispatch, useSelector } from "react-redux";
import { AppRootStateType } from "../../state/store";
import SettingsImg from "../../assets/icons/settings-in-city-select.png";
import { setCitiesAC, setErrorAC } from "../../state/app-reducer";
import VideoToBackground from "./VideoToBackground";

export const searchCityInput = createRef() as any;

const CitySelectionBlock = () => {
  const [editMode, setEditMode] = useState(false);
  const [findCityes, setFindCityes] = useState([]);
  const cities = useSelector<AppRootStateType>(
    (state) => state.app.cities
  ) as any;

  const dispatch = useDispatch();
  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.charCode === 13) {
      let value = searchCityInput.current.value;
      axios
        .get(
          `https://api.openweathermap.org/geo/1.0/direct?q=${value}&limit=5&appid=${myKey}`
        )
        .then((res) => {
          setFindCityes(res.data);
        });
    }
  };
  const changeEditMode = () => {
    if (editMode) setEditMode(false);
    else setEditMode(true);
  };
  const deleteCity = (deleteCity: string) => {
    let newCities = cities.filter((city: string) => city !== deleteCity);
    dispatch(setCitiesAC({ cities: newCities }));
    localStorage.coordinates = newCities.join();
  };
  return (
    <div className={styles.citySelectionBlock}>
      <VideoToBackground />
      <div className={styles.container}>
        <button
          className={styles.settingsImg}
          onClick={changeEditMode}
          disabled={findCityes.length !== 0}
        >
          {!editMode ? <img src={SettingsImg} /> : <div>Готово</div>}
        </button>
        <div className={styles.header}>Погода</div>
        <div className={styles.input}>
          <img src={SearchImg} />
          <input
            placeholder='Поиск города'
            onKeyPress={onKeyPressHandler}
            ref={searchCityInput}
            disabled={editMode}
          ></input>
        </div>
        {findCityes.length !== 0 && (
          <div className={styles.citiesToFindBlock}>
            {findCityes.map((city, index) => (
              <CitiesToChoose
                key={index}
                city={city}
                setFindCityes={setFindCityes}
              />
            ))}
          </div>
        )}
        {findCityes.length === 0 &&
          cities.map((city: any) => (
            <CityItem
              key={city}
              city={city}
              editMode={editMode}
              deleteCity={deleteCity}
            />
          ))}
      </div>
    </div>
  );
};

export default CitySelectionBlock;
