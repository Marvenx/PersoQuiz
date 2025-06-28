import { useState } from "react";
import { Link } from "react-router-dom";
export default function Header() {
  const [selectedElement, setSelectedElement] = useState(null);
  return (
    <div className="header">
      <h2 className="title">Which Element Are You?</h2>
      <p>(based on completely random things)</p>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/quiz">Quiz</Link>
      </div>
    </div>
  );
}
