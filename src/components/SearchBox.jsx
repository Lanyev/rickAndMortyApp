import React from "react";

const SearchBox = ({ setBuscrar }) => {
  return (
    <>
      <form className="">
        <input
          onChange={(e) => {
            setBuscrar(e.target.value);
          }}
          type="text"
          placeholder="Buscar personaje por nombre"
          className="form-control col-xs-2"
        />
      </form>
    </>
  );
};

export default SearchBox;
