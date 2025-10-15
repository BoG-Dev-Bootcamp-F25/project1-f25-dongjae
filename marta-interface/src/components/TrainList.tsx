import React, { useEffect } from "react";
import { useSearchParams } from "react-router";
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
  setSelectedStation: React.Dispatch<React.SetStateAction<string | null>>;
}

export const TrainList = ({
  color,
  data,
  selectedStation,
  filters,
  setFilters,
  setSelectedStation,
}: TrainListProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Normalize station names
  const stationNameMap: Record<string, string> = {
    "LAKEWOOD STATION": "Lakewood/Ft. McPherson",
  };

  const normalizeStationName = (s: string | null | undefined) => {
    if (!s) return "";
    if (stationNameMap[s]) return stationNameMap[s].toUpperCase();
    return s
      .toString()
      .trim()
      .replace(/\s+station$/i, "")
      .replace(/\s+/g, " ")
      .toUpperCase();
  };

  const isEastWest = ["green", "blue"].includes(color.toLowerCase());

  // Initialize filters & station from URL on mount
  useEffect(() => {
    const arriving = searchParams.get("arriving") === "true";
    const scheduled = searchParams.get("scheduled") === "true";
    const direction = searchParams.get("direction") as "N" | "S" | "E" | "W" | null;
    const station = searchParams.get("station");

    setFilters({
      arriving,
      scheduled,
      direction: direction ?? null,
    });
    setSelectedStation(station ?? null);
  }, []);

  // Update URL when filters or station change
  useEffect(() => {
    const params = Object.fromEntries([...searchParams]);

    // Filters
    if (filters.arriving) params.arriving = "true";
    else delete params.arriving;

    if (filters.scheduled) params.scheduled = "true";
    else delete params.scheduled;

    if (filters.direction) params.direction = filters.direction;
    else delete params.direction;

    // Station
    if (selectedStation) params.station = selectedStation;
    else delete params.station;

    setSearchParams(params);
  }, [filters, selectedStation, searchParams, setSearchParams]);

  // Toggle filters
  const toggleFilter = (key: "arriving" | "scheduled") => {
    setFilters((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleDirection = (dir: "N" | "S" | "E" | "W") => {
    setFilters((prev) => ({
      ...prev,
      direction: prev.direction === dir ? null : dir,
    }));
  };

  // Filter trains
  let filteredData = data;

  const normalizedSelected = normalizeStationName(selectedStation);
  if (normalizedSelected) {
    filteredData = filteredData.filter(
      (t) => normalizeStationName(t.STATION) === normalizedSelected
    );
  }

  if (filters.arriving || filters.scheduled) {
    filteredData = filteredData.filter((t) => {
      const isArriving = t.WAITING_TIME === "Arriving";
      if (filters.arriving && isArriving) return true;
      if (filters.scheduled && !isArriving) return true;
      return false;
    });
  }

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
