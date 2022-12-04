import React from "react";

function RefreshButton() {
  return (
    <button
      className="refresh-button"
      type="button"
      onClick={() => window.location.reload()}
    >
      ⟳
    </button>
  );
}

export default RefreshButton;
