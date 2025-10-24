import { useState, useEffect } from "react";
import { useParams, Link } from "react-router";
import { TrainList } from "../components/TrainList";
import { NavBar } from "../components/NavBar";
import {defaultStations} from "../data/stations";
import "./LinesPage.css";

type Line = "green" | "blue" | "gold" | "red";

export default function LinesPage() {
  const { line } = useParams<{ line: Line }>();

  const currLine = (line as Line) || "gold";
  
  
  const [trainData, setTrainData] = useState<any[]>([]);
  const [stationData, setStationData] = useState<string[]>(defaultStations[currLine] || []);
  const [loading, setLoading] = useState(false);

  const [selectedStation, setSelectedStation] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    arriving: false,
    scheduled: false,
    direction: null as "N" | "S" | "E" | "W" | null,
  });

  const isEastWest = ["green", "blue"].includes(currLine);

  // Fetch train & station data whenever currLine (URL param) changes
  useEffect(() => {
    setLoading(true);
    setSelectedStation(null);
    setFilters({ arriving: false, scheduled: false, direction: null });
    setStationData(defaultStations[currLine] || []); // fallback while fetching

    Promise.all([
      fetch(`https://midsem-bootcamp-api.onrender.com/arrivals/${currLine}`).then((res) => res.json()),
      fetch(`https://midsem-bootcamp-api.onrender.com/stations/${currLine}`).then((res) => res.json()),
    ])
      .then(([trains, stations]) => {
        setTrainData(trains);
        if (stations?.length) setStationData(stations);
      })
      .catch((err) => console.error("Fetch error:", err))
      .finally(() => setLoading(false));
  }, [currLine]); // currLine comes directly from URL param

  // Filter togglers
  const toggleFilter = (key: "arriving" | "scheduled") => {
    setFilters((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleDirection = (dir: "N" | "S" | "E" | "W") => {
    setFilters((prev) => ({
      ...prev,
      direction: prev.direction === dir ? null : dir,
    }));
  };

  return (
    <div className="lines-container">
      <h1>
        <Link to="/" className="home-btn">MARTA Train Tracker</Link>
      </h1>

      <div className="train-data">
        {/* Line buttons */}
        <div className="line-buttons">
          {(["gold", "red", "green", "blue"] as Line[]).map((lineOption) => (
            <Link key={lineOption} to={`/lines/${lineOption}`}>
              <button
                className={`line-button ${lineOption} ${currLine === lineOption ? "active" : ""}`}
              >
                {lineOption.charAt(0).toUpperCase() + lineOption.slice(1)}
              </button>
            </Link>
          ))}
        </div>

        {/* Current Line */}
        <div className="curr-line">{currLine.charAt(0).toUpperCase() + currLine.slice(1)}</div>

        <div className="train-station-list">
          <NavBar
            stations={stationData}
            selectedStation={selectedStation}
            setSelectedStation={setSelectedStation}
          />

          <div className="train-list-column">
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

            {loading ? (
              <p>Loading trains...</p>
            ) : (
              <TrainList
                color={currLine}
                data={trainData}
                selectedStation={selectedStation}
                setSelectedStation={setSelectedStation}
                filters={filters}
                setFilters={setFilters}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}