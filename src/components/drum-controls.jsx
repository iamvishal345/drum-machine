import React from "react";

const DrumControls = ({
  display,
  drumStatus,
  handleDrumStatus,
  volume,
  handleVolumeChange,
}) => {
  return (
    <div className="control-container">
      <div
        className={`control ${drumStatus ? "on" : ""}`}
        onClick={handleDrumStatus}
      >
        {drumStatus ? "ON" : "OFF"}
      </div>
      <p id="display">{display}</p>
      <div className="volume-slider">
        <input
          type="range"
          name="volume-slider"
          id="volume-slider"
          min="0"
          max="100"
          disabled={!drumStatus}
          value={volume}
          onChange={handleVolumeChange}
        />
      </div>
    </div>
  );
};

export default DrumControls;
