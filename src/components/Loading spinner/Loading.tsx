import React from "react";
import { Player } from "@lottiefiles/react-lottie-player";

const Loading: React.FC = () => {
  return (
    <div className="loading-container">
      <Player
        autoplay
        loop
        src="https://lottie.host/ea22191a-df07-4956-b33f-729aa255b5a3/U2yl1rFw6L.json"
        style={{ height: "300px", width: "300px", color: "white" }}
      ></Player>
    </div>
  );
};

export default Loading;
