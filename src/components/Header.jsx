import  { useState } from 'react';
import { Link } from 'react-router-dom';
function Header() {
  const [selectedElement, setSelectedElement] = useState(null);
  return (
    <div>
        <h2 className="title">Which Element are you?</h2>
        <p className="subtitle">(Based on completely random things)</p>
        <Link to="/" className="home-link">Home</Link>
        <Link to="/Quiz" className="about-link">Quiz</Link>
    </div>
  );
}