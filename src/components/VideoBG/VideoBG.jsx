import React, { useEffect, useState } from "react";
import styles from "./VideoBG.module.scss";
import VideoPlayer from "react-background-video-player";
import Sun from "../../assets/video-BG/computer/sun.mp4";
import Cloudy from "../../assets/video-BG/computer/cloudy.mp4";
import PartlyCloudy from "../../assets/video-BG/computer/partly-cloudy.mp4";
import Murkly from "../../assets/video-BG/computer/murky.mp4";
import Rain from "../../assets/video-BG/computer/rain.mp4";
import RainNight from "../../assets/video-BG/computer/rain-night.mp4";
import Thunder from "../../assets/video-BG/computer/thunder.mp4";
import Snow from "../../assets/video-BG/computer/snow.mp4";
import SunNight from "../../assets/video-BG/computer/sun-night.mp4";
import CloudyNight from "../../assets/video-BG/computer/cloudy-night.mp4";

const VideoBG = ({ weather }) => {
  const screenWidth = window.screen.width;
  const [video, setVideo] = useState("");

  useEffect(() => {
    if (weather === "01d") {
      setVideo(Sun);
    } else if (weather === "01n") {
      setVideo(SunNight);
    } else if (weather === "02d") {
      setVideo(Cloudy);
    } else if (weather === "02n" || weather === "03n") {
      setVideo(CloudyNight);
    } else if (weather === "03d") {
      setVideo(PartlyCloudy);
    } else if (weather === "04d" || weather === "04n") {
      setVideo(Murkly);
    } else if (weather === "09d" || weather === "10d") {
      setVideo(Rain);
    } else if (weather === "09n" || weather === "10n") {
      setVideo(RainNight);
    } else if (weather === "11d" || weather === "11n") {
      setVideo(Thunder);
    } else if (weather === "13d") {
      setVideo(Snow);
    }
  }, [weather]);

  return (
    <div className={styles.video}>
      <VideoPlayer className='video' autoPlay={true} src={video} />
    </div>
  );
};

export default VideoBG;
