import React from "react";
import { useSearchParams } from "react-router-dom";
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
  const [searchParams, setSearchParams] = useSearchParams();

  const handleClick = (station: string | null) => {
    // Update local state
    setSelectedStation(station);

    // Update URL query parameter
    const newParams = new URLSearchParams(searchParams);
    if (station) {
      newParams.set("station", station);
    } else {
      newParams.delete("station"); // remove station param for "All Stations"
    }
    setSearchParams(newParams);
  };

  return (
    <div className="navbar">
      {/* All Stations button */}
      <button
        className={`station-btn ${selectedStation === null ? "active" : ""}`}
        onClick={() => handleClick(null)}
      >
        All Stations
      </button>

      {/* Individual station buttons */}
      {stations.map((station, index) => (
        <button
          key={index}
          className={`station-btn ${selectedStation === station ? "active" : ""}`}
          onClick={() => handleClick(station)}
        >
          {station}
        </button>
      ))}
    </div>
  );
};
