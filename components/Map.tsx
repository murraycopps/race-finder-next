import { useState, useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, useMap, Polyline } from 'react-leaflet';

const polyline = require("polyline-encoded");

function parseMapPoints(map: any) {
  const polylineString = map.summary_polyline;
  const coordinates = polyline.decode(polylineString);
  const mapPoints = coordinates.map((coord: any) => ({
    lat: coord[0],
    lng: coord[1],
  }));
  return mapPoints;
}


export function ChangeView({ coords }: {coords: any}) {
  const map = useMap();
  map.setView(coords, 14);
  return null;
}

export default function Map({map} : {map: any}) {
  // const [geoData, setGeoData] = useState({ lat:g, lng: 16.779852 });
  const positions = parseMapPoints(map);

// const center is average of all points
  const center = {
    lat: positions.reduce((a: any, b: any) => a + b.lat, 0) / positions.length,
    lng: positions.reduce((a: any, b: any) => a + b.lng, 0) / positions.length,
  };
  
  return (
    // @ts-ignore
    <MapContainer center={center} zoom={14} className="w-128 h-128">
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Polyline positions={positions} color="blue" weight={5} />
      <ChangeView coords={center} />
    </MapContainer>
  );
}
