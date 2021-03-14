import React from "react";
import { useSelector } from "react-redux";
import { useFirestoreConnect } from "react-redux-firebase";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import Geocode from "react-geocode";
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

Geocode.setApiKey("AIzaSyCDEsVVDxhaLpF-J78BJ9Qe7yDdDJAdW-c");
Geocode.setLocationType("ROOFTOP");
Geocode.enableDebug();

const getCoords = async (countries) => {
  try {
    let countryCoords = {};
    for (let key in countries) {
      const country = countries[key].name;
      console.log("country:", country);
      const response = await Geocode.fromAddress(country);
      const { lat, lng } = await response.results[0].geometry.location;
      console.log("coords:", { lat, lng });
      countryCoords[country] = { lat, lng };
    }
    return countryCoords;
  } catch (error) {
    console.log("there was an error getting coordinates:", error);
  }
};

const Map = () => {
  const { uid } = useSelector((state) => state.firebase.auth);
  useFirestoreConnect({
    collection: `users/${uid}/countries`,
    storeAs: "countries",
  });
  const countries = useSelector((state) => state.firestore.data.countries);
  console.log("countries:", countries);

  // const callCoordsFunc = async () => {
  //   return await getCoords(countries);
  // };
  // const countryCoords = callCoordsFunc();
  // console.log("countryCoords:", countryCoords);
  // // {countryName: {lat: 12, lng: 12}}
  let countriesCoords;

  getCoords(countries).then(
    (coords) => {
      console.log("coords:", coords);
      countriesCoords = coords;
    },
    (error) => {
      console.error(error);
    }
  );

  return (
    <LoadScript googleMapsApiKey="AIzaSyCDEsVVDxhaLpF-J78BJ9Qe7yDdDJAdW-c">
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={2.5}>
        {/* {Object.values(countriesCoords).map((countryCoords) => {
          return <Marker position={countryCoords} key={countryCoords.lat} />;
        })} */}
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
