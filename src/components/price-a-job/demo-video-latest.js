import React from "react";

import BgVideo from "../../video/Screen Recording 2024-03-12 at 11.35.44 AM.mov";

import NavBar from "../layout/nav-bar";
import FooterComponent from "../layout/footer";
const PriceAJobVideoLatest = () => {
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

export default PriceAJobVideoLatest;
