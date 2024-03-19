import React from "react";

import BgVideo from "../../video/demo.mp4";

import NavBar from "../layout/nav-bar";
import FooterComponent from "../layout/footer";
const PayPulseVideo = () => {
  return (
    <div>
      <NavBar />
      <div
        style={{
          marginTop: "100px",
          display: "grid",
          placeItems: "center",
          height: "90vh",
        }}
        className="container"
      >
        <div>
          <video
            style={{
              width: "90%",
              height: "90%",
              objectFit: "contain",
            }}
            src={BgVideo}
            autoPlay
            controls
          />
        </div>
      </div>
      <FooterComponent />
    </div>
  );
};

export default PayPulseVideo;