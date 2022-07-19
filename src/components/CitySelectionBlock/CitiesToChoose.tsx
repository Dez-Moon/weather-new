import React from "react";
import { useDispatch } from "react-redux";
import { addCitiesTC } from "../../state/app-reducer";
import { searchCityInput } from "./CitySelectionBlock";
import styles from "./CitySelectionBlock.module.scss";

type PropsType = {
  city: any;
  setFindCityes: any;
};
const CitiesToChoose = React.memo((props: PropsType) => {
  const dispatch = useDispatch();
  const addCity = () => {
    props.setFindCityes([]);
    addCitiesTC(props.city.lat.toFixed(2), props.city.lon.toFixed(2))(dispatch);
  };
  searchCityInput.current.value = "";
  return (
    <div className={styles.cityes} onClick={addCity}>
      <div>
        {props.city.local_names
          ? props.city.local_names.ru || props.city.local_names.en
          : props.city.name}
      </div>
      <div className={styles.location}>
        <div>{props.city.country}</div>
        <div>{props.city.state}</div>
      </div>
    </div>
  );
});

export default CitiesToChoose;
