import Navbar from "./components/Navbar";
import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
import LocationInfo from "./components/LocationInfo";
import ResidentList from "./components/ResidentList";
import getRandomNumber from "../utils/getRandomNumber";
import ErrorMessages from "./components/ErrorMessages";
import "react-datalist-input/dist/styles.css";
import ToTopButton from "./components/ToTopButton";
import RefreshButton from "./components/RefreshButton";

const RESIDENTS_PER_PAGE = 15;

function App() {
  const [location, setLocation] = useState();
  const [locationName, setLocationName] = useState();
  const [showError, setShowError] = useState(false);
  const [change, setChange] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [residentsFiltered, setResidentsFiltered] = useState([]);

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

  const searchRandomDimension = () => {
    const randomDimension = getRandomNumber();
    getDataDimension(randomDimension);
    setLoading(false);
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

  const getAllPages = () => {
    const arrayPages = [];
    for (let i = 1; i <= lastPage; i++) {
      arrayPages.push(i);
    }
    return arrayPages;
  };

  useEffect(() => {
    if (!location) return;
    const quantityResidents = location.residents.length;
    const quantityPages = Math.ceil(quantityResidents / RESIDENTS_PER_PAGE);
    setLastPage(quantityPages);
    setCurrentPage(1);
  }, [location]);

  useEffect(() => {
    if (!location) return;
    const start = (currentPage - 1) * RESIDENTS_PER_PAGE;
    const end = start + RESIDENTS_PER_PAGE;
    const residentsFiltered = location.residents.slice(start, end);
    setResidentsFiltered(residentsFiltered);
  }, [location, currentPage]);

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
      <ResidentList location={location} residentsFiltered={residentsFiltered} />
      <RefreshButton />
      <ToTopButton />
      <ul className="pageSelector">
        {getAllPages().map((page) => (
          <li
            key={page}
            onClick={() => setCurrentPage(page)}
            className={currentPage === page ? "selected" : null}
          >
            {page}
          </li>
        ))}
      </ul>
      <ErrorMessages showError={showError} />
    </div>
  );
}

export default App;
