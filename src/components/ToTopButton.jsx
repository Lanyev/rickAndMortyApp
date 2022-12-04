import React from "react";

function ToTopButton() {
  return (
    <button
      className="top-button"
      type="button"
      onClick={() => window.scrollTo(0, 0)}
    >
      ↑
    </button>
  );
}

export default ToTopButton;
