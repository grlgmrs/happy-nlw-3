import React from "react";

import mapMarkerImg from "../images/map-marker.svg";
import { Link } from "react-router-dom";
import { FiPlus } from "react-icons/fi";
import { Map } from "react-leaflet";
import ReactLeafletGoogleLayer from "react-leaflet-google-layer";

import "leaflet/dist/leaflet.css";

import "../styles/pages/orphanages-map.css";

function OrphanagesMap() {
  return (
    <div id="page-map">
      <aside>
        <header>
          <img src={mapMarkerImg} alt="Happy" />

          <h2>Escolha um orfanato no mapa</h2>
          <p>Muitas crianças estão esperando a sua visita :)</p>
        </header>

        <footer>
          <strong>Bauru</strong>
          <span>São Paulo</span>
        </footer>
      </aside>

      <Map
        center={[-22.3217174, -49.0621683]}
        zoom={15}
        style={{ width: "100%", height: "100%" }}
      >
        <ReactLeafletGoogleLayer
          googleMapsLoaderConf={{ KEY: process.env.REACT_APP_GOOGLE_MAPS_KEY }}
          type={"roadmap"}
        />
      </Map>

      <Link to="" className="create-orphanage">
        <FiPlus size={32} color="#FFF" />
      </Link>
    </div>
  );
}

export default OrphanagesMap;
