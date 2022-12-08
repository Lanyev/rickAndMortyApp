import React from "react";
import ResidentCard from "./ResidentCard";

export const ResidentList = ({ residentsFiltered }) => {
  return (
    <section className="location-residents">
      {residentsFiltered?.map((urlResident) => (
        <ResidentCard key={urlResident} urlResident={urlResident} />
      ))}
    </section>
  );
};

export default ResidentList;
