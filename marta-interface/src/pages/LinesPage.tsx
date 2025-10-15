import { useState, useEffect } from "react";
import { useParams, useSearchParams, Link } from "react-router";
import {TrainList} from "../components/TrainList";
import { NavBar } from "../components/NavBar";
import "./LinesPage.css";

export default function LinesPage() {
  // Track current line
  const [currLine, setCurrLine] = useState("gold"); // default line
  const [trainData, setTrainData] = useState<any[]>([]);
  const [stationData, setStationData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const [selectedStation, setSelectedStation] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    arriving: false,
    scheduled: false,
    direction: null as "N" | "S" | "E" | "W" | null,
  });


  useEffect(() => {
    setLoading(true);

    Promise.all([
      fetch(`https://midsem-bootcamp-api.onrender.com/arrivals/${currLine}`).then((res) => res.json()),
      fetch(`https://midsem-bootcamp-api.onrender.com/stations/${currLine}`).then((res) => res.json()),
    ])
      .then(([trains, stations]) => {
        setTrainData(trains);
        setStationData(stations);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setLoading(false);
      });
  }, [currLine]);


  return (
    <div className="lines-container">
      <h1>
        <Link to="/" className="home-btn">MARTA Train Tracker</Link>
      </h1>

      {/* Line Buttons */}
      <div className="line-buttons">
        {["gold", "red", "green", "blue"].map((line) => (
          <Link key={line} to={`/lines/${line}`}>
            <button 
              onClick={() => {
                setCurrLine(line);
                setSelectedStation(null);
                setFilters({ arriving: false, scheduled: false, direction: null });
              }}
              className={` line-button ${line}  ${currLine === line ? "active" : ""}`}
            >
              {line.charAt(0).toUpperCase() + line.slice(1)}
            </button>
          </Link>
        ))}
      </div>

      {loading ? (
        <p>Loading trains...</p>
      ) : (
        <div className="train-data">
          <NavBar
            stations={stationData}
            selectedStation={selectedStation}
            setSelectedStation={setSelectedStation}
          />
          <TrainList
            color={currLine}
            data={trainData}
            selectedStation={selectedStation}
            setSelectedStation={setSelectedStation}
            filters={filters}
            setFilters={setFilters}
          />
        </div>
      )}
    </div>

    

  );
}
