import { Link } from "react-router";
import "./Home.css";
import stationImg from "../images/College_Park_MARTA_Station.jpg";

export default function Home() {
  const lines = ["gold", "red", "green", "blue"];

  return (
    <div className="home-container">
      
      <header className="home-header">
        <h1>MARTA</h1>
        <div className="home-about-link">
          <Link to="/about">
            <button className="about-marta">About MARTA</button>
          </Link>
        </div>
      </header>

      <div className="home-main-content">
        <div className="home-line-buttons">
          <h2 className="home-select-line-heading">View Routes Schedule</h2>
          {lines.map((line) => (
            <Link key={line} to={`/lines/${line}`}>
              <button className={`home-line-btn `}>
                {line.toUpperCase()} Line
              </button>
            </Link>
          ))}
        </div>
        <div className="home-image-container">
          <img src={stationImg} alt="College Park MARTA Station" />
        </div>
      </div>

    </div>
  );
}
