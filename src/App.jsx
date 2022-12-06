import Navbar from "./components/Navbar";
import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
import LocationFilter from "./components/LocationFilter";
import LocationInfo from "./components/LocationInfo";
import ResidentList from "./components/ResidentList";
import getRandomNumber from "../utils/getRandomNumber";
import ErrorMessages from "./components/ErrorMessages";
import "react-datalist-input/dist/styles.css";
import ToTopButton from "./components/ToTopButton";
import RefreshButton from "./components/RefreshButton";

function App() {
  const [location, setLocation] = useState();
  const [locationName, setLocationName] = useState();
  const [showError, setShowError] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [query, setQuery] = useState("");
  const [change, setChange] = useState(false);

  const getDataDimension = (idDimension) => {
    if (idDimension) {
      const URL = `https://rickandmortyapi.com/api/location/${idDimension}`;
      axios
        .get(URL)
        .then((res) => setLocation(res.data))
        .catch((err) => {
          setShowError(true);
          setTimeout(() => {
            setShowError(false);
            console.log(err);
          }, 2000);
        });
    } else {
      alert("Ingrese un Valor");
    }
  };

  // const getLocations = () => {
  //   axios
  //     .get(`https://rickandmortyapi.com/api/location/?name=${query}`)
  //     .then((data) => setSuggestions(data.data?.results))
  //     .catch((err) => {
  //       if (err.response && err.response.status === 404) {
  //         setSuggestions(null);
  //       }
  //     });
  // };

  // useEffect(() => {
  //   const randomDimension = getRandomNumber();
  //   getDataDimension(randomDimension);
  // }, []);

  const searchRandomDimension = () => {
    const randomDimension = getRandomNumber();
    getDataDimension(randomDimension);
  };

  useEffect(() => {
    searchRandomDimension();
  }, [change]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const dimensionSearch = e.target.searchValue.value;
    getDataDimension(dimensionSearch);
  };

  const handleChange = (e) => {
    setLocationName(e.target.value);
  };
  const getNewLocation = (URL, name) => {
    setLocationName(name);
    axios
      .get(URL)
      .then(({ data }) => setLocation(data))
      .catch((err) => console.log(err));
  };

  return (
    <div className="App">
      <Navbar
        brand={"Rick and Morty Random Dimension Viewer"}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        locationName={locationName}
        getNewLocation={getNewLocation}
      />
      <LocationInfo location={location} />
      <ResidentList location={location} />
      <RefreshButton />
      <ToTopButton />
    </div>
  );
}

export default App;
