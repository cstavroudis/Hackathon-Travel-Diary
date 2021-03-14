import React from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
// import { useSelector } from "react-redux";
// import { useFirestoreConnect } from "react-redux-firebase";
// import { useFirestore } from "react-redux-firebase";

// import { Link } from "react-router-dom";

import "../css/AllEntries.css";

const containerStyle = {
  width: "100vw",
  height: "95vh",
};

const center = {
  lat: 30.52,
  lng: 20.34,
};

const Map = () => {
  return (
    <LoadScript googleMapsApiKey="AIzaSyCDEsVVDxhaLpF-J78BJ9Qe7yDdDJAdW-c">
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={2.5}>
        {/* Child components, such as markers, info windows, etc. */}
        <></>
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
