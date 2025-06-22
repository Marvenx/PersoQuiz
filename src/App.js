import Header from "./components/Header";
import Question from "./components/Question";
import Resuslts from "./components/Results";

import "./App.css";

function App() {
  return (
    <div>
      <Header />
      <div className="container">
        <Question />
        <Resuslts />
      </div>
      <footer className="footer">
        <p>Made with ❤️ by Your Name</p>
      </footer>
    </div>
  );
}

export default App;
