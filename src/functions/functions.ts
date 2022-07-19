import React from "react";
import DayClearIMG from "../assets/weather-icons/day_clear.svg";
import NightClearIMG from "../assets/weather-icons/night_full_moon_clear.svg";
import DayPartialCloudIMG from "../assets/weather-icons/day_partial_cloud.svg";
import NightPartialCloudIMG from "../assets/weather-icons/night_full_moon_partial_cloud.svg";
import DayCloudyIMG from "../assets/weather-icons/cloudy.svg";
import NightCloudyIMG from "../assets/weather-icons/angry_clouds.svg";
import OvercastIMG from "../assets/weather-icons/overcast.svg";
import DayRainIMG from "../assets/weather-icons/day_rain.svg";
import NightRainIMG from "../assets/weather-icons/night_full_moon_rain.svg";
import DayThunderIMG from "../assets/weather-icons/day_rain_thunder.svg";
import NightThunderIMG from "../assets/weather-icons/night_full_moon_rain_thunder.svg";
import DaySnowIMG from "../assets/weather-icons/day_snow.svg";
import NightSnowIMG from "../assets/weather-icons/night_full_moon_snow.svg";
import FoxIMG from "../assets/weather-icons/fog.svg";


import { listFromData } from "../components/api/api";
// Получить часы из даты
export const getHoursFromDate = (date: string) => {
  return Number(date.split(" ")[1].split(":")[0]);
};
// Получить число месяца из даты
export const getDayFromDate = (date: string) => {
  return Number(date.split(" ")[0].split("-")[2]);
};
// Получить погоду почасово на текущий день
export const getWeatherForCurrentDay = (
  arr: Array<{ dt_txt: string }> | any
) => {
  let getWeatherForCurrentDay = [];
  for (let i = 0; i < arr.length; i++) {
    let time = getHoursFromDate(arr[i].dt_txt);
    if (time === 0) {
      return getWeatherForCurrentDay;
    }
    getWeatherForCurrentDay.push(arr[i]);
  }
};
// Получить погоду почасово за 24 часа
export const get24HoursWeather = (arr: Array<{}>) => {
  let currentHour = getCurrentHour();
  let weather = arr.map((e: any) => e);
  const newWeather: any = [];
  if (weather.length === arr.length) {
    weather = weather.splice(0, 9);
    let j = 0;
    for (let i = 0; i < weather.length; i++) {
      let x = weather[i].dt_txt.split(" ");
      let y = x[1].split(":");
      let hour = y[0];
      newWeather.splice(j, 0, weather[i]);
      j++;
      hour++;
      y[0] = hour;
      if (hour < 10) {
        y[0] = `0${hour}`;
      }
      x[1] = y.join(":");
      let time = x.join(" ");
      let temperature = Math.round(weather[i].main.temp);
      if (i < weather.length - 1) {
        temperature = Math.round(
          (weather[i + 1].main.temp + weather[i].main.temp) / 2
        );
      }
      newWeather.splice(j, 0, {
        ...weather[i],
        dt_txt: time,
        main: { ...weather[i].main, temp: temperature },
      });
      j++;
      hour++;
      y[0] = hour;
      if (hour < 10) {
        y[0] = `0${hour}`;
      }
      x[1] = y.join(":");
      let time1 = x.join(" ");
      let temperature2 = Math.round(weather[i].main.temp);
      if (i < weather.length - 1) {
        temperature2 = Math.round(
          (weather[i + 1].main.temp + weather[i].main.temp) / 2
        );
      }
      newWeather.splice(j, 0, {
        ...weather[i],
        dt_txt: time1,
        main: { ...weather[i].main, temp: temperature2 },
      });
      j++;
    }
    for (let i = 0; i < newWeather.length; i++) {
      let hour = getHoursFromDate(newWeather[i].dt_txt);
      if (currentHour - hour === 2) {
        newWeather.splice(i, 2);
      } else if (currentHour - hour === 1) {
        newWeather.splice(i, 1);
      } else {
        break;
      }
    }
  }
  if (newWeather.length > 24) {
    newWeather.splice(24, newWeather.length);
  }
  return newWeather;
};
// Получить текущую погоду
export const getCurrentWeather = (arr: Array<{ dt_txt: string }>) => {
  return get24HoursWeather(arr)[0];
};
// Получить текущую температуру
export const getCurrentTemperature = (arr: listFromData) => {
  for (let i = 0; i < arr.length; i++) {
    if (getDayFromDate(arr[i].dt_txt) === getCurrentDay()) {
      return Math.round(arr[i].main.temp);
    }
  }
};
// Получить максимальную температуру
export const getMaxTemerature = (arr: any) => {
  let maxTemerature;
  for (let i = 0; i < arr.length; i++) {
    if (!maxTemerature) {
      maxTemerature = Math.round(arr[i].main.temp_max);
    }
    if (maxTemerature < Math.round(arr[i].main.temp_max)) {
      maxTemerature = Math.round(arr[i].main.temp_max);
    }
  }
  return maxTemerature;
};
// Получить минимальную температуру
export const getMinTemperature = (arr: any) => {
  let minTemerature;
  for (let i = 0; i < arr.length; i++) {
    if (!minTemerature) {
      minTemerature = Math.round(arr[i].main.temp);
    }
    if (minTemerature > Math.round(arr[i].main.temp)) {
      minTemerature = Math.round(arr[i].main.temp);
    }
  }
  return minTemerature;
};
// Изменить Первую букву в слове на большую
export const changeFirstLetterToCapital = (word: string | any) => {
  let arrLetters = word.split("");
  let capitaLetter = arrLetters[0].toUpperCase();
  arrLetters[0] = capitaLetter;
  let capitalizedWord = arrLetters.join("");
  return capitalizedWord;
};
// Получить самый частый icon
export const returnWeatherIcon = (arr: any) => {
  let arrayIcon: any = {};
  let icon;
  for (let i = 0; i < arr.length; i++) {
    if (arrayIcon[arr[i].weather[0].icon]) {
      arrayIcon[arr[i].weather[0].icon] += 1;
    } else {
      arrayIcon[arr[i].weather[0].icon] = 1;
    }
  }
  icon = Object.keys(arrayIcon);
  icon.sort((a, b) => arrayIcon[String(b)] - arrayIcon[String(a)]);
  return icon[0];
};
// Получить текущий день
export const getCurrentDay = () => {
  return Number(String(new Date()).split(" ")[2]);
};
// Получить текущее время
export const getCurrentHour = () => {
  return Number(String(new Date()).split(" ")[4].split(":")[0]);
};
// Получить мировое время
export const getWorldTime = (data: any) => {
  if (data) {
    let currentTime = String(new Date()).split(" ")[4];
    let arrayTime = currentTime.split(":");
    arrayTime.splice(2, 1);
    let currentHour = Number(arrayTime[0]);
    if (data.city.timezone === 3600) {
      arrayTime[0] = String(currentHour - 2);
      return arrayTime.join(":");
    } else if (data.city.timezone === 7200) {
      arrayTime[0] = String(currentHour - 1);
      return arrayTime.join(":");
    } else if (data.city.timezone === 10800) {
      arrayTime[0] = String(currentHour);
      return arrayTime.join(":");
    } else if (data.city.timezone === 14400) {
      arrayTime[0] = String(currentHour + 1);
      return arrayTime.join(":");
    } else if (data.city.timezone === 18000) {
      arrayTime[0] = String(currentHour + 2);
      return arrayTime.join(":");
    } else if (data.city.timezone === 21600) {
      arrayTime[0] = String(currentHour + 3);
      return arrayTime.join(":");
    } else if (data.city.timezone === 25200) {
      arrayTime[0] = String(currentHour + 4);
      return arrayTime.join(":");
    } else if (data.city.timezone === 28800) {
      arrayTime[0] = String(currentHour + 5);
      return arrayTime.join(":");
    } else if (data.city.timezone === 32400) {
      arrayTime[0] = String(currentHour + 6);
      return arrayTime.join(":");
    } else if (data.city.timezone === 36000) {
      arrayTime[0] = String(currentHour + 7);
      return arrayTime.join(":");
    } else if (data.city.timezone === 39600) {
      arrayTime[0] = String(currentHour + 8);
      return arrayTime.join(":");
    } else if (data.city.timezone === 43200) {
      arrayTime[0] = String(currentHour + 9);
      return arrayTime.join(":");
    } else if (data.city.timezone === 46800) {
      arrayTime[0] = String(currentHour + 10);
      return arrayTime.join(":");
    } else if (data.city.timezone === 50400) {
      arrayTime[0] = String(currentHour + 11);
      return arrayTime.join(":");
    } else if (data.city.timezone === -3600) {
      arrayTime[0] = String(currentHour - 3);
      return arrayTime.join(":");
    } else if (data.city.timezone === -7200) {
      arrayTime[0] = String(currentHour - 4);
      return arrayTime.join(":");
    } else if (data.city.timezone === -10800) {
      arrayTime[0] = String(currentHour - 5);
      return arrayTime.join(":");
    } else if (data.city.timezone === -14400) {
      arrayTime[0] = String(currentHour - 6);
      return arrayTime.join(":");
    } else if (data.city.timezone === -18000) {
      arrayTime[0] = String(currentHour - 7);
      return arrayTime.join(":");
    } else if (data.city.timezone === -21600) {
      arrayTime[0] = String(currentHour - 8);
      return arrayTime.join(":");
    } else if (data.city.timezone === -25200) {
      arrayTime[0] = String(currentHour - 9);
      return arrayTime.join(":");
    } else if (data.city.timezone === -28800) {
      arrayTime[0] = String(currentHour - 10);
      return arrayTime.join(":");
    } else if (data.city.timezone === -32400) {
      arrayTime[0] = String(currentHour - 11);
      return arrayTime.join(":");
    } else if (data.city.timezone === -36000) {
      arrayTime[0] = String(currentHour - 12);
      return arrayTime.join(":");
    } else if (data.city.timezone === -39600) {
      arrayTime[0] = String(currentHour - 13);
      return arrayTime.join(":");
    } else if (data.city.timezone === -43200) {
      arrayTime[0] = String(currentHour - 14);
      return arrayTime.join(":");
    }
  }
};

// Получить координаты города из строки localStorage
export const getCoordinatesFromString = (string: string) => {
  let a = string.split(",");
  let b = a[0].split(":");
  let c = a[1].split(":");
  return { lat: b[1], lon: c[1] };
};
//Получить массив координат из localStorage
export const getCoordinatesFromLocalStorage = () => {
  return localStorage.coordinates.split(",");
};
//Получить lat из строки
export const getLatFromString = (string: string) => {
  return string.split("&")[0].split(":")[1];
};
// Получить lon из строки
export const getLonFromString = (string: string) => {
  return string.split("&")[1].split(":")[1];
};
// Получить иконпу погоды
export const getWeatherIcon = (string: string) => {
  let img;
  if (string === "01d") {
    img = DayClearIMG;
  } else if (string === "01n") {
    img = NightClearIMG;
  } else if (string === "02d") {
    img = DayPartialCloudIMG;
  } else if (string === "02n") {
    img = NightPartialCloudIMG;
  } else if (string === "03d") {
    img = DayCloudyIMG;
  } else if (string === "03n") {
    img = NightCloudyIMG;
  } else if (string === "04d" || string === "04n") {
    img = OvercastIMG;
  } else if (string === "09d" || string === "10d") {
    img = DayRainIMG;
  } else if (string === "09n" || string === "10n") {
    img = NightRainIMG;
  } else if (string === "11d") {
    img = DayThunderIMG;
  } else if (string === "11n") {
    img = NightThunderIMG;
  } else if (string === "13d") {
    img = DaySnowIMG;
  } else if (string === "13n") {
    img = NightSnowIMG;
  } else if (string === "50d" || string === "50n") {
    img = FoxIMG;
  }
  return img;
};
