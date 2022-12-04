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
  const [showError, setShowError] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
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
            console.log(err);
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

  const getNewLocation = (URL, name) => {
    setLocation(name);
    axios
      .get(URL)
      .then((res) => setLocation(res.data))
      .catch((err) => console.log(err));
  };

  return (
    <div className="App">
      <Navbar brand={"Rick and Morty Random Dimension Viewer"} />
      <form className="search" onSubmit={handleSubmit}>
        <input
          id="searchValue"
          type="text"
          name="query"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            getLocations();
          }}
          placeholder="Search Dimension"
          list="locations"
          className="locations-list"
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
      <LocationFilter location={location} getNewLocation={getNewLocation} />
      <LocationInfo location={location} />
      <ResidentList location={location} />
      <RefreshButton />
      <ToTopButton />
    </div>
  );
}

export default App;
