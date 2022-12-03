import axios from "axios";
import { useEffect, useState } from "react";
import getRandomNumber from "../utils/getRandomNumber";
import "./App.css";
import ResidentCard from "./components/ResidentCard";
import Navbar from "./components/Navbar";
import ResidentList from "./components/ResidentList";
// import LocationInfo from "./LocationInfo";

function App() {
  const [location, setLocation] = useState();
  const getDataDimension = (idDimension) => {
    const URL = `https://rickandmortyapi.com/api/location/${idDimension}`;
    axios
      .get(URL)
      .then((res) => setLocation(res.data))
      .catch((err) => {
        alert("Dimension not found");
        console.log(err);
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

  return (
    <div className="App">
      <Navbar brand={"Rick and Morty Dimension"} />
      <form className="search" onSubmit={handleSubmit}>
        <input id="searchValue" type="text" />
        <button type="submit">Search</button>
      </form>
      {/* <LocationInfo location={location} /> */}
      <ResidentList location={location} />
    </div>
  );
}

export default App;
