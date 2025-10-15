import { Link } from "react-router";
import "./About.css";
import martaImg from "../images/MARTA-logo.png";
import martaImg2 from "../images/Marta_atlanta_skyline.jpg";
import martaImg3 from "../images/MARTA_Rail_Map.png";

export default function About() {
  return (
    <div className="about-container">
      <div className="title">
        <h1>
          About <img src={martaImg} alt="MARTA logo" className="marta-logo" />
        </h1>
      </div>

      <Link to="/">
        <button className="back-btn">Back to Home</button>
      </Link>

      <div className="marta-content">
        <div className="marta-info">
          <p>
            The Metropolitan Atlanta Rapid Transit Authority (MARTA) is Atlanta’s primary public transit system, operating heavy rail, buses, and streetcars across Fulton, DeKalb, and Clayton counties. Its rail network covers about 48 miles with 38 stations on four lines (Red, Gold, Blue, Green). Trains run roughly 4:45 a.m.–1:00 a.m. with 10–20 minute intervals; MARTA operates ~350 electric railcars and supports nearly 25,000 jobs. Current efforts include station upgrades, new railcars, the Five Points redesign, and the MARTA Reach on-demand pilot. Despite aging infrastructure and reliability challenges, MARTA remains central to Atlanta’s mobility and sustainability goals.
          </p>

          <img src={martaImg2} alt="MARTA skyline" className="marta-logo2" />
        </div>

        <div className="marta-map-container">
          <h3 className="marta-map-header">MARTA Rail Map</h3>
          <img src={martaImg3} alt="MARTA map" className="marta-logo3" />
        </div>
      </div>
    </div>
  );
}
