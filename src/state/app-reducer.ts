import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";
import { API, myKey, ResponseDataType } from "../components/api/api";
import {
  getCoordinatesFromLocalStorage,
  getCurrentDay,
  getCurrentHour,
  getCurrentTemperature,
  getCurrentWeather,
  getLatFromString,
  getLonFromString,
} from "../functions/functions";

type PageType = "main" | "city-selection" | null;

type InitialStateType = {
  applicationIsInitialization: boolean;
  error: string | null;
  data: any;
  cities: Array<{}>;
  currentWeatherData: any;
  currentHour: number | null;
  currentDay: number | null;
};

const initialState: InitialStateType = {
  applicationIsInitialization: false,
  error: null,
  data: {},
  cities: [],
  currentWeatherData: null,
  currentHour: null,
  currentDay: null,
};
const slice = createSlice({
  name: "app",
  initialState: initialState,
  reducers: {
    setApplicationIsInitialization(
      state,
      action: PayloadAction<{ value: boolean }>
    ) {
      state.applicationIsInitialization = action.payload.value;
    },
    setErrorAC(state, action: PayloadAction<{ error: string | null }>) {
      state.error = action.payload.error;
    },
    setDataAC(state, action: PayloadAction<{ data: ResponseDataType }>) {
      state.data = action.payload.data;
    },
    setCitiesAC(state, action: PayloadAction<{ cities: Array<{}> }>) {
      state.cities = action.payload.cities;
    },
    setCurrentWeatherDataAC(state, action: PayloadAction<{ data: any }>) {
      state.currentWeatherData = action.payload.data;
    },
    setCurrentHourAC(state, action: PayloadAction<{ currentHour: number }>) {
      state.currentHour = action.payload.currentHour;
    },
    setCurrentDayAC(state, action: PayloadAction<{ currentDay: number }>) {
      state.currentDay = action.payload.currentDay;
    },
  },
});
export const appReducer = slice.reducer;
export const {
  setApplicationIsInitialization,
  setErrorAC,
  setDataAC,
  setCitiesAC,
  setCurrentWeatherDataAC,
  setCurrentHourAC,
  setCurrentDayAC,
} = slice.actions;

export const applicationInitializationTC = () => async (dispatch: Dispatch) => {
  if (localStorage.coordinates) {
    const coordinates = getCoordinatesFromLocalStorage();
    const lat = getLatFromString(coordinates[0]);
    const lon = getLonFromString(coordinates[0]);
    let data = await API.getWeather(lat, lon, "ru", myKey);
    dispatch(setDataAC(data));
    dispatch(setCitiesAC({ cities: coordinates }));
    dispatch(
      setCurrentWeatherDataAC({ data: getCurrentWeather(data.data.list) })
    );
    dispatch(setCurrentHourAC({ currentHour: getCurrentHour() }));
    dispatch(setCurrentDayAC({ currentDay: getCurrentDay() }));
  }
  dispatch(setApplicationIsInitialization({ value: true }));
};
export const updateDataTC = () => async (dispatch: Dispatch, state: any) => {
  let lat = state.data.city.coord.lat;
  let lon = state.data.city.coord.lon;
  let data = await API.getWeather(lat, lon, "ru", myKey);
  dispatch(setDataAC(data));
  dispatch(
    setCurrentWeatherDataAC({ data: getCurrentWeather(data.data.list) })
  );
  dispatch(setCurrentHourAC({ currentHour: getCurrentHour() }));
  dispatch(setCurrentDayAC({ currentDay: getCurrentDay() }));
};

export const addCitiesTC =
  (lat: number, lon: number) => async (dispatch: Dispatch) => {
    debugger;
    let newCoordinates = `lat:${lat}&lon:${lon}` as any;
    if (!localStorage.coordinates) {
      debugger;
      let newArrayCities = newCoordinates.split(" ");
      localStorage.setItem("coordinates", newCoordinates);
      dispatch(setCitiesAC({ cities: newArrayCities }));
    } else {
      let cityesCoordinates = getCoordinatesFromLocalStorage();
      if (!cityesCoordinates.includes(newCoordinates)) {
        debugger;
        cityesCoordinates.splice(1, 0, newCoordinates);
        localStorage.coordinates = cityesCoordinates.join();
        dispatch(setCitiesAC({ cities: cityesCoordinates }));
      } else dispatch(setErrorAC({ error: "Город уже добавлен" }));
    }
  };
