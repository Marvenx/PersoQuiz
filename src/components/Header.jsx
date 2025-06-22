import { useState } from "react";
import { Link } from "react-router-dom";
export default function Header() {
  const [selectedElement, setSelectedElement] = useState(null);
  return (
    <div>
      <h2 className="title">Which Element are you?</h2>
      <p className="subtitle">(Based on completely random things)</p>
      <Link to="/">Home </Link>
      <Link to="/Quiz">Quiz</Link>
    </div>
  );
}
