import React from "react";

const LocationInfo = ({ location }) => {
  console.log(location);
  return (
    <article>
      <h2>{location?.name}</h2>
      <ul>
        <li>
          <span> Type: {location?.type}</span>
        </li>
        <li>Dimension: {location?.dimension}</li>
        <li>Population: {location?.residents.length}</li>
      </ul>
    </article>
  );
};
export default LocationInfo;
