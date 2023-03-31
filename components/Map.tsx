// import { MapContainer, Marker, TileLayer, Polyline } from "react-leaflet";

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

// const Map = ({ map }: { map: any }) => {

//   const positions = parseMapPoints(map);

//   return (
//     <MapContainer center={positions[0]} zoom={13} style={{ height: '100vh' }}>
//       <TileLayer
//         attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//       />
//       <Marker position={positions[0]} />
//       {/* <Polyline positions={positions} color="blue" weight={5} /> */}
//     </MapContainer>
//   );
// };

// export default Map;

const myMap = {
  "id": "a8793724789",
  "summary_polyline": "slj}Fn}~nLJOB@@GES?a@[eABUDA`@DNSRi@VQ~Ao@TOXa@Z_Ah@iAhCLn@Gh@Up@_@zBiAVKl@Qf@?XHJDb@^^Vf@h@l@x@p@l@Zf@\\`@rBvBb@TJAPMRc@Pi@|@{C^yBx@gDLkALk@NeAFaBW{E[cCQ{Bi@wDG_A[gCE}@@y@Nk@JSd@a@xAwBHEZc@j@{@|@mA\\[`@Sx@g@x@}@VI~AgAx@e@LQ~@eBn@k@f@U~@WnAWp@E\\BRDr@Sx@EpCc@x@ChC]xAe@h@@b@GL?t@Id@Cj@K`CWVKZAt@Oj@S^S\\_@Dm@@q@Iq@Ae@@eDEW@aAG{@CuCCwD@]DMRQ`@EfDFnDA^DqAQyCFcCFi@DYFIJE`@JvBCtBHdA?rAH|A@lBGxABRFbBKh@CBa@V_A\\mBRa@PI@m@De@JgAHSDiFh@aC`@e@De@@[DOF@Bc@A_@D}@Tw@LgBBOJSBQ?iATo@Ti@Xc@^[\\KPa@j@c@`@qBvAc@d@_@Zy@h@mAbA_@b@e@x@gArAk@~@}A`BUp@CXBXLv@\\pAd@rDNt@TjCHZBXA?@SECF^@vAPhBDbBDp@AhAOjBa@zAKr@S|@g@pCIt@{BnFUROSQq@_@[kBqBYe@k@i@k@w@qBwA]Qa@Ck@JuC~AqB`Aa@Dm@C",
  "resource_state": 2
};

import { useState, useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, useMap, Polyline } from 'react-leaflet';

export function ChangeView({ coords }: {coords: any}) {
  const map = useMap();
  map.setView(coords, 14);
  return null;
}

const geoData = {
  lat: parseMapPoints(myMap)[0].lat,
  lng: parseMapPoints(myMap)[0].lng,
};
const positions = parseMapPoints(myMap);

export default function Map() {
  // const [geoData, setGeoData] = useState({ lat:g, lng: 16.779852 });

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
