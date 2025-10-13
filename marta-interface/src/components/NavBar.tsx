import React from "react";
import "./NavBar.css";

interface NavBarProps {
  stations: string[];
  selectedStation: string | null;
  setSelectedStation: (station: string | null) => void;
}

export const NavBar = ({
  stations,
  selectedStation,
  setSelectedStation,
}: NavBarProps) => {
  return (
    <div className="navbar">
      {stations.map((station, index) => (
        <button
          key={index}
          className={`station-btn ${selectedStation === station ? "active" : ""}`}
          onClick={() =>
            setSelectedStation(selectedStation === station ? null : station)
          }
        >
          {station}
        </button>
      ))}
    </div>
  );
};
