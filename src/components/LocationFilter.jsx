import axios from "axios";
import React, { useEffect, useState } from "react";

const LocationFilter = ({ locationName, getNewLocation }) => {
  const [locationOptions, setLocationOptions] = useState();

  useEffect(() => {
    const URL = `https://rickandmortyapi.com/api/location?name=${locationName}`;

    if (!locationName) return setLocationOptions();
    axios
      .get(URL)
      .then(({ data }) => setLocationOptions(data.results))
      .catch((err) => console.log(err));
  }, [locationName]);

  return (
    <ul className="navbar-filter">
      {locationOptions?.map(
        (locOpt) =>
          locationName !== locOpt.name && (
            <li
              onClick={() => getNewLocation(locOpt.url, locOpt.name)}
              key={locOpt.url}
            >
              {locOpt.name}
            </li>
          )
      )}
    </ul>
  );
};

export default LocationFilter;
