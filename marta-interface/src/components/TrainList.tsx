import React from "react";
import { Train } from "./Train";
import "./TrainList.css";

interface TrainListProps {
  color: string;
  data: any[];
  selectedStation: string | null;
  filters: {
    arriving: boolean;
    scheduled: boolean;
    direction: "N" | "S" | "E" | "W" | null;
  };
  setFilters: React.Dispatch<
    React.SetStateAction<{
      arriving: boolean;
      scheduled: boolean;
      direction: "N" | "S" | "E" | "W" | null;
    }>
  >;
}

export const TrainList = ({
  color,
  data,
  selectedStation,
  filters,
  setFilters,
}: TrainListProps) => {
  const toggleFilter = (key: "arriving" | "scheduled") => {
    setFilters((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleDirection = (dir: "N" | "S" | "E" | "W") => {
    setFilters((prev) => ({
      ...prev,
      direction: prev.direction === dir ? null : dir,
    }));
  };
  const stationNameMap: Record<string, string> = {
    "LAKEWOOD STATION": "Lakewood/Ft. McPherson",
  };

  const normalizeStationName = (s: string | null | undefined) => {
    if (!s) return "";

    // Use the mapping if available
    if (stationNameMap[s]) return stationNameMap[s].toUpperCase();

    return s
      .toString()
      .trim()
      .replace(/\s+station$/i, "")
      .replace(/\s+/g, " ")
      .toUpperCase();
  };


  const isEastWest = ["green", "blue"].includes(color.toLowerCase());

  let filteredData = data;

  // filter by station
  const normalizedSelected = normalizeStationName(selectedStation);

if (normalizedSelected) {
    filteredData = filteredData.filter((t) =>
        normalizeStationName(t.STATION) === normalizedSelected
    );
    }

  // filter by status
  if (filters.arriving) {
    filteredData = filteredData.filter((t) => t.WAITING_TIME === "Arriving");
  }
  if (filters.scheduled) {
    filteredData = filteredData.filter((t) => t.WAITING_TIME !== "Arriving");
  }

  // filter by direction
  if (filters.direction) {
    filteredData = filteredData.filter((t) => t.DIRECTION === filters.direction);
  }

  return (
    <div>
      {/* Filter buttons */}
      <div className="filter-buttons">
        <button
          className={filters.arriving ? "active" : ""}
          onClick={() => toggleFilter("arriving")}
        >
          Arriving
        </button>
        <button
          className={filters.scheduled ? "active" : ""}
          onClick={() => toggleFilter("scheduled")}
        >
          Scheduled
        </button>
        <button
          className={filters.direction === (isEastWest ? "E" : "N") ? "active" : ""}
          onClick={() => toggleDirection(isEastWest ? "E" : "N")}
        >
          {isEastWest ? "Eastbound" : "Northbound"}
        </button>
        <button
          className={filters.direction === (isEastWest ? "W" : "S") ? "active" : ""}
          onClick={() => toggleDirection(isEastWest ? "W" : "S")}
        >
          {isEastWest ? "Westbound" : "Southbound"}
        </button>
      </div>

      {/* Train list */}
      {filteredData.length === 0 ? (
        <p>No Current Trains Match Filters</p>
      ) : (
        filteredData.map((train, index) => <Train key={index} train={train} />)
      )}
    </div>
  );
};
