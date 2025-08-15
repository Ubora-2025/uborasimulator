import React, { useState, useEffect, useRef } from "react";
import questionsData from "../components/questions_comprehension_ecrite.json";
import html2canvas from "html2canvas";

const TOTAL_TIME = 60 * 60;

const StartReadingTestPrompt = ({ onStart }) => (
  <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 p-6">
    <div className="bg-white p-8 rounded-xl shadow-lg max-w-md text-center">
      <h2 className="text-2xl font-bold mb-6 text-blue-800">Prêt à commencer ?</h2>
      <p className="mb-6">
        Cliquez sur <strong>Commencer</strong> pour lancer l'épreuve de compréhension écrite.
      </p>
      <button
        onClick={onStart}
        className="bg-blue-600 text-white px-6 py-3 rounded-full text-lg hover:bg-blue-700 transition"
      >
        Commencer
      </button>
    </div>
  </div>
);

const Modal = ({ onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-xl shadow-xl text-center max-w-md w-full">
      <h2 className="text-xl font-bold mb-4 text-red-600">Temps écoulé</h2>
      <p className="mb-4">Votre devoir a été enregistré automatiquement.</p>
      <button
        onClick={onClose}
        className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition"
      >
        Fermer
      </button>
    </div>
  </div>
);

const EcritQuizzComponent = () => {
  const [testStarted, setTestStarted] = useState(() => sessionStorage.getItem("ce_testStarted") === "true");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(() => {
    const stored = sessionStorage.getItem("ce_currentIndex");
    return stored ? parseInt(stored, 10) : 0;
  });
  const [selectedAnswers, setSelectedAnswers] = useState(() => {
    const saved = sessionStorage.getItem("ce_selectedAnswers");
    return saved ? JSON.parse(saved) : {};
  });
  const [timeLeft, setTimeLeft] = useState(() => {
    const stored = sessionStorage.getItem("ce_timeLeft");
    return stored ? parseInt(stored, 10) : TOTAL_TIME;
  });
  const [modalOpen, setModalOpen] = useState(false);
  const canvasRef = useRef(null);

  const questions = questionsData;
  const currentQuestion = questions[currentQuestionIndex];

  // Forcer plein écran
  useEffect(() => {
    const requestFullscreen = () => {
      const el = document.documentElement;
      if (el.requestFullscreen) el.requestFullscreen();
      else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();
      else if (el.mozRequestFullScreen) el.mozRequestFullScreen();
      else if (el.msRequestFullscreen) el.msRequestFullscreen();
    };

    if (testStarted) {
      requestFullscreen();
    }

    const onFullScreenChange = () => {
      if (!document.fullscreenElement && testStarted) {
        requestFullscreen();
      }
    };

    document.addEventListener("fullscreenchange", onFullScreenChange);
    return () => document.removeEventListener("fullscreenchange", onFullScreenChange);
  }, [testStarted]);

  // Blocage raccourcis et rafraîchissement
  useEffect(() => {
    const preventReload = (e) => {
      e.preventDefault();
      e.returnValue = "";
    };

    const blockKeys = (e) => {
      const keys = ["F5", "F11", "Escape"];
      if (
        keys.includes(e.key) ||
        ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "r")
      ) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    window.addEventListener("beforeunload", preventReload);
    window.addEventListener("keydown", blockKeys, true);

    return () => {
      window.removeEventListener("beforeunload", preventReload);
      window.removeEventListener("keydown", blockKeys, true);
    };
  }, []);

  // Chronomètre
  useEffect(() => {
    if (!testStarted) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        const next = prev - 1;
        sessionStorage.setItem("ce_timeLeft", next);
        if (next <= 0) {
          clearInterval(timer);
          handleTestEnd();
          return 0;
        }
        return next;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [testStarted]);

  // Sauvegardes session
  useEffect(() => {
    if (testStarted) sessionStorage.setItem("ce_testStarted", "true");
  }, [testStarted]);

  useEffect(() => {
    sessionStorage.setItem("ce_selectedAnswers", JSON.stringify(selectedAnswers));
  }, [selectedAnswers]);

  useEffect(() => {
    sessionStorage.setItem("ce_currentIndex", currentQuestionIndex);
  }, [currentQuestionIndex]);

  // Canvas image (texte question)
  useEffect(() => {
    if (canvasRef.current) {
      html2canvas(canvasRef.current).then((canvas) => {
        const _ = canvas.toDataURL("image/png");
      });
    }
  }, [currentQuestionIndex]);

  const handleStartTest = () => {
    setTestStarted(true);
  };

  const handleTestEnd = () => {
    setModalOpen(true);
    sessionStorage.removeItem("ce_timeLeft");
    sessionStorage.removeItem("ce_testStarted");
    sessionStorage.removeItem("ce_selectedAnswers");
    sessionStorage.removeItem("ce_currentIndex");
    console.log("Réponses enregistrées :", selectedAnswers);
  };

  const handleOptionSelect = (letter) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: letter,
    }));
  };

  const handleNavigation = (direction) => {
    setCurrentQuestionIndex((prev) => {
      const nextIndex = prev + direction;
      if (nextIndex >= 0 && nextIndex < questions.length) return nextIndex;
      return prev;
    });
  };

  const jumpToQuestion = (index) => setCurrentQuestionIndex(index);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60).toString().padStart(2, "0");
    const secs = (seconds % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
  };

  if (!testStarted) return <StartReadingTestPrompt onStart={handleStartTest} />;

  return (
    <div className="min-h-screen bg-gray-100 p-6 font-sans relative flex flex-col items-center">
      {modalOpen && <Modal onClose={() => setModalOpen(false)} />}

      <h1 className="text-2xl font-bold text-center text-blue-800 mb-4">
        Épreuve de Compréhension Écrite
      </h1>

      <div className="bg-blue-100 text-blue-800 rounded-full px-6 py-2 text-lg font-semibold mb-6">
        Temps restant : {formatTime(timeLeft)}
      </div>

      <div className="w-full max-w-2xl bg-white rounded-xl p-4 shadow-md mb-6">
        <div className="flex flex-wrap gap-2 justify-center">
          {questions.map((_, num) => (
            <div
              key={num}
              onClick={() => jumpToQuestion(num)}
              className={`rounded-md w-10 h-10 flex items-center justify-center font-semibold text-sm transition-all duration-200 border cursor-pointer ${
                num === currentQuestionIndex
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-blue-800 border-blue-300 hover:bg-blue-100"
              }`}
            >
              {num + 1}
            </div>
          ))}
        </div>
      </div>

      <div className="w-full max-w-2xl bg-white rounded-xl p-6 shadow-md">
        <div className="text-md font-semibold mb-2 text-left">
          Question {currentQuestion.id}
        </div>

        <div
          ref={canvasRef}
          className="border border-gray-300 bg-gray-50 rounded-xl p-4 max-h-[400px] w-full overflow-y-auto text-black text-[14px] font-regular select-none mx-auto"
          style={{ maxWidth: "500px" }}
        >
          <div>{currentQuestion.text}</div>
          <div className="text-sm font-normal text-right mt-4">
            www.excellence-tcfcanada.com
          </div>
        </div>

        <div className="text-left font-semibold mt-6 mb-3 max-w-xl mx-auto">
          {currentQuestion.question}
        </div>

        <form className="space-y-3 max-w-xl mx-auto">
          {currentQuestion.options.map((optionText, index) => {
            const letter = String.fromCharCode(65 + index);
            const isSelected = selectedAnswers[currentQuestion.id] === letter;

            return (
              <label
                key={letter}
                htmlFor={`option-${letter}`}
                className={`flex items-center p-3 rounded-lg border cursor-pointer transition ${
                  isSelected
                    ? "bg-blue-200 border-blue-600"
                    : "bg-gray-50 border-gray-300"
                }`}
              >
                <input
                  id={`option-${letter}`}
                  type="radio"
                  name={`question-${currentQuestion.id}`}
                  value={letter}
                  checked={isSelected}
                  onChange={() => handleOptionSelect(letter)}
                  className="mr-3 accent-blue-600"
                />
                <span>
                  <strong>{letter}.</strong> {optionText}
                </span>
              </label>
            );
          })}
        </form>

        <div className="flex justify-between mt-6 max-w-xl mx-auto">
          <button
            onClick={() => handleNavigation(-1)}
            disabled={currentQuestionIndex === 0}
            className="bg-gray-300 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-400 disabled:opacity-50"
          >
            Précédent
          </button>

          <button
            onClick={() => handleNavigation(1)}
            disabled={currentQuestionIndex === questions.length - 1}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            Suivant
          </button>
        </div>
      </div>
    </div>
  );
};

export default EcritQuizzComponent;
