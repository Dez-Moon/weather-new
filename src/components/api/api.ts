import axios from "axios";
import React from "react";

export const myKey = "31e246961f1385b787db383d04641831";
export type listFromData = Array<{
  clouds: { all: number };
  dt: number;
  dt_txt: string;
  main: {
    feels_like: number;
    grnd_level: number;
    humidity: number;
    pressure: number;
    sea_level: number;
    temp: number;
    temp_kf: number;
    temp_max: number;
    temp_min: number;
  };
  pop: number;
  sys: { pod: string };
  visibility: number;
  weather: [{ id: number; main: string; description: string; icon: string }];
  wind: { deg: number; gust: number; speed: number };
}>;
export type ResponseDataType = {
  city: {
    id: number;
    name: string;
    coord: { lat: number; lon: number };
    country: string;
  };
  cod: string;
  list: listFromData;
  message: number;
};
export const API = {
  getWeather: (
    lat: string | number,
    lon: string | number,
    language: string,
    key: string
  ) => {
    let promise = axios.get<ResponseDataType>(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&lang=${language}&units=metric&APPID=${key}`
    );
    return promise;
  },
};
