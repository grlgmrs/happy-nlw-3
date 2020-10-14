import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { FiPlus, FiArrowRight } from "react-icons/fi";
import { Map, Marker, Popup } from "react-leaflet";
import ReactLeafletGoogleLayer from "react-leaflet-google-layer";
import api from "../services/api";

import "../styles/pages/orphanages-map.css";

import mapMarkerImg from "../images/map-marker.svg";
import mapIcon from "src/utils/mapIcon";

interface Orphanage {
  id: string;
  latitude: number;
  longitude: number;
  name: string;
}

function OrphanagesMap() {
  const [orphanages, setOrphanages] = useState<Orphanage[]>([]);

  useEffect(() => {
    api.get("orphanages").then((response) => {
      setOrphanages(response.data);
    });
  }, []);

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

        {orphanages.map((orphanage: Orphanage) => {
          return (
            <Marker
              icon={mapIcon}
              position={[orphanage.latitude, orphanage.longitude]}
              key={orphanage.id}
            >
              <Popup
                closeButton={false}
                minWidth={240}
                maxWidth={240}
                className="map-popup"
              >
                {orphanage.name}
                <Link to={`/orphanages/${orphanage.id}`}>
                  <FiArrowRight size={20} color="#FFF" />
                </Link>
              </Popup>
            </Marker>
          );
        })}
      </Map>

      <Link to="/orphanages/create" className="create-orphanage">
        <FiPlus size={32} color="#FFF" />
      </Link>
    </div>
  );
}

export default OrphanagesMap;
