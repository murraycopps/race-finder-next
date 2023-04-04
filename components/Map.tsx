import { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import {
  MapContainer,
  TileLayer,
  Polyline,
} from "react-leaflet";
import { Map as MapType } from "@/scripts/stravaTypes";
import L from "leaflet";

const polyline = require("polyline-encoded");

function parseMapPoints(map: MapType) {
  const polylineString = map.summary_polyline;
  const coordinates = polyline.decode(polylineString);
  const mapPoints = coordinates.map((coord: [number, number]) => ({
    lat: coord[0],
    lng: coord[1],
  }));
  return mapPoints;
}

export default function Map({ map, fixed = false }: { map: MapType; fixed?: boolean }) {
  const positions = parseMapPoints(map);

  const center = {
    lat:
      positions.reduce(
        (a: number, b: { lat: number; lng: number }) => a + b.lat,
        0
      ) / positions.length,
    lng:
      positions.reduce(
        (a: number, b: { lat: number; lng: number }) => a + b.lng,
        0
      ) / positions.length,
  };

  return (
    <MapContainer
      center={center}
      className="w-full h-full"
      bounds={L.latLngBounds(positions)}
      zoomControl={!fixed}
      scrollWheelZoom={!fixed}
      dragging={!fixed}
      doubleClickZoom={!fixed}
      touchZoom={!fixed}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Polyline positions={positions} color="blue" weight={5} />
    </MapContainer>
  );
}
