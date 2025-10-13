import { useState, useEffect } from "react";
import {TrainList} from "../components/TrainList";

export default function LinesPage() {
  // Track current line
  const [currLine, setCurrLine] = useState("gold"); // default line
  const [trainData, setTrainData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true); // start loading
    fetch(`https://midsem-bootcamp-api.onrender.com/arrivals/${currLine}`)
      .then((res) => res.json())
      .then((data) => {
        setTrainData(data); // update state with fetched trains
        setLoading(false); // stop loading
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setLoading(false);
      });
  }, [currLine]);

  return (
    <div className="container">
    <h1>MARTA Train Tracker</h1>

    {/* Line Buttons */}
    <div className="line-buttons">
        {["gold", "red", "green", "blue"].map((line) => (
        <button
            key={line}
            onClick={() => setCurrLine(line)}
            className={`line-button ${currLine === line ? "active" : ""}`}
        >
            {line.charAt(0).toUpperCase() + line.slice(1)}
        </button>
        ))}
    </div>


    {loading ? (
        <p>Loading trains...</p>
    ) : (
        <>
            <p>{trainData.length} trains loaded for {currLine} line</p>
            <TrainList color={currLine} data={trainData} />
        </>
    )}
    </div>
    

  );
}
