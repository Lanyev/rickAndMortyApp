import React from "react";

const Navbar = ({ brand }) => {
  return (
    <nav className="navbar">
      <div>
        <a>{brand}</a>
      </div>
    </nav>
  );
};

export default Navbar;
