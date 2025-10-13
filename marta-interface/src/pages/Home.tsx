// src/pages/Home.tsx
import { Link } from "react-router";
import "./Home.css"; // optional for styling

export default function Home() {
  const lines = ["gold", "red", "green", "blue"];

  return (
    <div className="home-container">
      <h1>MARTA Home</h1>

      <div className="line-buttons">
        {lines.map((line) => (
          <Link key={line} to={`/lines/${line}`}>
            <button className={`line-btn ${line}`}>{line.toUpperCase()} Line</button>
          </Link>
        ))}
      </div>

      <div className="about-link">
        <Link to="/about">
          <button>About MARTA</button>
        </Link>
      </div>
    </div>
  );
}
