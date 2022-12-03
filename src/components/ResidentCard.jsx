import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";

const ResidentCard = ({ urlResident }) => {
  const [resident, setResident] = useState();
  useEffect(() => {
    axios
      .get(urlResident)
      .then((res) => setResident(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <article className="card">
      <header className="resident-card-header">
        <img src={resident?.image} alt={resident?.name} />
        <div>
          <div className="circle"></div>
          <span>{resident?.status}</span>
        </div>
      </header>
      <section className="resident-card">
        <h2>{resident?.name}</h2>
        <ul>
          <li>
            <span> Species: {resident?.species}</span>
          </li>
          <li>
            <span> Origin: {resident?.origin.name} </span>
          </li>
          <li>
            <span>Episodes where appear {resident?.episode.length} </span>
          </li>
        </ul>
      </section>
    </article>
  );
};

export default ResidentCard;
