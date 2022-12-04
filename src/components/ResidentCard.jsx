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
          <div className={`circle ${resident?.status}`}></div>
          <span className="status-text">{resident?.status}</span>
        </div>
      </header>
      <section className="resident-card">
        <h2>{resident?.name}</h2>
        <ul>
          <li>
            <span className="info-1"> Species: </span>{" "}
            <p>{resident?.species}</p>
          </li>
          <li>
            <span className="info-1"> Origin: </span>{" "}
            <p>{resident?.origin.name}</p>
          </li>
          <li>
            <span className="info-1">Episodes where appear: </span>
            <p>{resident?.episode.length} </p>
          </li>
        </ul>
      </section>
    </article>
  );
};

export default ResidentCard;
