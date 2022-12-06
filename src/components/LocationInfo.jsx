import React from "react";

const LocationInfo = ({ location }) => {
  return (
    <article className="location-container">
      <h2 className="location_title">{location?.name}</h2>
      <ul className="location-list">
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
