import React, { useState } from "react";
import styles from "./CitySelectionBlock.module.scss";
import Video from "../../assets/video-BG/computer/video.mp4";
import VideoForMobile from "../../assets/video-BG/phone/video.mp4";
import VideoPlayer from "react-background-video-player";

const VideoToBackground = () => {
  const screenWidth = window.screen.width;
  const [video, setVideo] = useState(Video);
  // if ((screenWidth < 500) & (video !== VideoForMobile))
  //   setVideo(VideoForMobile);

  return (
    <div className={styles.video}>
      <VideoPlayer
        className={styles.video}
        src={video}
        autoPlay={true}
        muted={true}
      />
    </div>
  );
};

export default VideoToBackground;
