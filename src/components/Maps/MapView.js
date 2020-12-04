import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import data from "../../assets/data.json";
import Markers from "./VenueMarkers";

import "leaflet/dist/leaflet.css";

import * as apiGetService from "../../services/apiGetService";

const MapView = () => {
  /* const [state, setState] = useState({
    currentLocation: { lat: 3.4312924, lng: -76.511727 },
    zoom: 13,
    data,
  }); */
  const [currentLocation, setCurrentLocation] = useState({ lat: 3.4312924, lng: -76.511727 })
  const [zoom, setZoom] = useState(13)
  const [geo, setGeo] = useState(data)

  const geoComp = (jsonData) => {
    let geoData = {
        venues: [],
    };
    for (let i = 0; i < jsonData.length; i++) {
        geoData.venues.push({
            geometry: [jsonData[i].lat, jsonData[i].long],
        });
    }
    return geoData;
};

  useEffect(() => {
    async function fetchData() {
      // You can await here
      setGeo(geoComp(await apiGetService.getGeoplace()))
    }
    fetchData();
  }, []); 

  //console.log(geo)
  return (
    <MapContainer center={currentLocation} zoom={zoom}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <Markers venues={geo.venues} />
    </MapContainer>
  );
};

export default MapView;
