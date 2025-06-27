import Header from "./components/Header";
import Question from "./components/Question";
import Results from "./components/Results";
import UserForm from "./components/UserForm";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { UserProvider } from "./components/UserContext";
import "./App.css";

function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [element, setElement] = useState(null);
  const [userName, setUserName] = useState("");
  const [artwork, setArtwork] = useState(null);
  const [loading, setLoading] = useState(false);

  function handleAnswer(answer) {
    setAnswers([...answers, answer]);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  }

  function handleUserFormSubmit(name) {
    setUserName(name);
    setAnswers([]);
    setCurrentQuestionIndex(0);
    setElement(null);
    setArtwork(null);
  }

  function determineElement(answers) {
    const counts = {};
    answers.forEach(function (answer) {
      const element = elements[answer];
      counts[element] = (counts[element] || 0) + 1;
    });
    return Object.keys(counts).reduce(function (a, b) {
      return counts[a] > counts[b] ? a : b;
    });
  }

  async function fetchArtwork(keyword) {
    setLoading(true);
    try {
      const response = await fetch(
        `https://collectionapi.metmuseum.org/public/collection/v1/search?q=${keyword}&hasImages=true`
      );
      const data = await response.json();

      if (data.total > 0) {
        const randomIndex = Math.floor(Math.random() * data.objectIDs.length);
        const artworkId = data.objectIDs[randomIndex];

        const artworkResponse = await fetch(
          `https://collectionapi.metmuseum.org/public/collection/v1/objects/${artworkId}`
        );
        const artworkData = await artworkResponse.json();

        if (artworkData.primaryImage) {
          setArtwork({
            title: artworkData.title,
            primaryImage: artworkData.primaryImage,
            artistDisplayName:
              artworkData.artistDisplayName || "Unknown Artist",
            objectDate: artworkData.objectDate || "Unknown Date",
          });
        } else {
          setArtwork(null);
        }
      } else {
        setArtwork(null);
      }
    } catch (error) {
      console.error("Error fetching artwork:", error);
      setArtwork(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(
    function () {
      if (currentQuestionIndex === questions.length) {
        const selectedElement = determineElement(answers);
        setElement(selectedElement);
        fetchArtwork(keywords[selectedElement]);
      }
    },
    [currentQuestionIndex]
  );

  const questions = [
    {
      question: "What's your favorite color?",
      options: ["Red 🔴", "Blue 🔵", "Green 🟢", "Yellow 🟡"],
    },
    {
      question: "Pick a natural scene:",
      options: ["Volcano 🌋", "Ocean 🌊", "Forest 🌲", "Sky ☁️"],
    },
    {
      question: "Choose a quality:",
      options: ["Passion ❤️", "Calm 💧", "Strength 🪨", "Freedom 🕊️"],
    },
  ];

  const keywords = {
    Fire: "fire",
    Water: "water",
    Earth: "landscape",
    Air: "sky",
  };

  const elements = {
  "Red 🔴": "Fire",
  "Blue 🔵": "Water",
  "Green 🟢": "Earth",
  "Yellow 🟡": "Air",

  "Volcano 🌋": "Fire",
  "Ocean 🌊": "Water",
  "Forest 🌲": "Earth",
  "Sky ☁️": "Air",

  "Passion ❤️": "Fire",
  "Calm 💧": "Water",
  "Strength 🪨": "Earth",
  "Freedom 🕊️": "Air",
};


  return (
    <UserProvider value={{ name: userName, setName: setUserName }}>
      <Header />
      <Routes>
        <Route
          path="/"
          element={<UserForm onSubmit={handleUserFormSubmit} />}
        />
        <Route
          path="/quiz"
          element={
            currentQuestionIndex < questions.length ? (
              <Question
                question={questions[currentQuestionIndex].question}
                options={questions[currentQuestionIndex].options}
                onAnswer={handleAnswer}
              />
            ) : (
              <Results element={element} artwork={artwork} loading={loading} />
            )
          }
        />
      </Routes>

      <footer className="footer">
        <p>Made with ❤️ by Marven</p>
      </footer>
    </UserProvider>
  );
}

export default App;
