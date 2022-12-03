import Navbar from "./components/Navbar";
import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
import LocationFilter from "./components/LocationFilter";
import LocationInfo from "./components/LocationInfo";
import ResidentList from "./components/ResidentList";
import getRandomNumber from "../utils/getRandomNumber";
import ErrorMessages from "./components/ErrorMessages";
import DatalistInput from "react-datalist-input";
import "react-datalist-input/dist/styles.css";

function App() {
  const [location, setLocation] = useState();
  const [locationName, setLocationName] = useState();
  const [showError, setShowError] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [text, setText] = useState();
  const [query, setQuery] = useState("");

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
          }, 2000);
        });
    } else {
      alert("Ingrese un Valor");
    }
  };

  const getLocations = () => {
    axios
      .get(`https://rickandmortyapi.com/api/location/?name=${query}`)
      .then((data) => setSuggestions(data.data?.results))
      .catch((err) => {
        if (err.response && err.response.status === 404) {
          setSuggestions(null);
          console.clear();
        }
      });
  };

  useEffect(() => {
    const randomDimension = getRandomNumber();
    getDataDimension(randomDimension);
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const dimensionSearch = event.target.searchValue.value;
    getDataDimension(dimensionSearch);
  };

  const handleChangeInput = (event) => {
    setLocationName(event.target.value);
  };

  const getNewLocation = (URL, name) => {
    setLocationName(name);
    axios
      .get(URL)
      .then((res) => setLocation(res.data))
      .catch((err) => console.log(err));
  };

  return (
    <div className="App">
      <Navbar brand={"Rick and Morty Dimension"} />
      <form className="search" onSubmit={handleChangeInput}>
        <input
          id="searchValue"
          type="text"
          name="query"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            getLocations();
          }}
          placeholder="Search Dimension"
          list="locations"
        />

        <datalist id="locations">
          {query.length > 0 &&
            suggestions?.map((el, index) => {
              if (el.name.toLowerCase().includes(query)) {
                return <option key={index} value={el.name} />;
              }
              return "";
            })}
        </datalist>
        <button type="submit">Search</button>
        {showError ? <ErrorMessages /> : ""}
      </form>
      <LocationFilter
        locationName={locationName}
        getNewLocation={getNewLocation}
      />
      <LocationInfo location={location} />
      <ResidentList location={location} />
    </div>
  );
}

export default App;
