import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import questionsData from "../components/questions_comprehension_orale.json";

const TOTAL_TIME = 35 * 60;

const OralQuizzComponent = () => {
  const [testStarted, setTestStarted] = useState(() => sessionStorage.getItem("oral_testStarted") === "true");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(() => {
    const stored = sessionStorage.getItem("oral_questionIndex");
    return stored ? parseInt(stored, 10) : 0;
  });
  const [selectedAnswers, setSelectedAnswers] = useState(() => {
    const saved = sessionStorage.getItem("oral_selectedAnswers");
    return saved ? JSON.parse(saved) : {};
  });
  const [timeLeft, setTimeLeft] = useState(() => {
    const stored = sessionStorage.getItem("oral_timeLeft");
    return stored ? parseInt(stored, 10) : TOTAL_TIME;
  });
  const [modalOpen, setModalOpen] = useState(false);
  const audioRef = useRef(null);
  const audioReady = useRef(false);

  const questions = questionsData;
  const currentQuestion = questions[currentQuestionIndex];

  useEffect(() => {
    const preventReload = (e) => {
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", preventReload);

    const blockKeys = (e) => {
      const blocked = ["F5", "F11", "Escape"];
      if (
        blocked.includes(e.key) ||
        ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "r")
      ) {
        e.preventDefault();
        e.stopPropagation();
      }
    };
    window.addEventListener("keydown", blockKeys, true);

    return () => {
      window.removeEventListener("beforeunload", preventReload);
      window.removeEventListener("keydown", blockKeys, true);
    };
  }, []);

  useEffect(() => {
    if (!testStarted) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        const next = prev - 1;
        sessionStorage.setItem("oral_timeLeft", next);
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

  useEffect(() => {
    if (testStarted) sessionStorage.setItem("oral_testStarted", "true");
  }, [testStarted]);

  useEffect(() => {
    sessionStorage.setItem("oral_selectedAnswers", JSON.stringify(selectedAnswers));
  }, [selectedAnswers]);

  useEffect(() => {
    sessionStorage.setItem("oral_questionIndex", currentQuestionIndex);
  }, [currentQuestionIndex]);

  useEffect(() => {
    if (!testStarted) return;
    const elem = document.documentElement;
    if (!document.fullscreenElement && elem.requestFullscreen) {
      elem.requestFullscreen().catch(() => {});
    }
    const onFullScreenExit = () => {
      if (!document.fullscreenElement) {
        elem.requestFullscreen().catch(() => {});
      }
    };
    document.addEventListener("fullscreenchange", onFullScreenExit);
    return () => document.removeEventListener("fullscreenchange", onFullScreenExit);
  }, [testStarted]);

  useEffect(() => {
    if (testStarted && audioRef.current && audioReady.current) {
      audioRef.current.play().catch(() => {});
    }
  }, [currentQuestionIndex, testStarted]);

  const handleStartTest = () => {
    setTestStarted(true);
    setTimeout(() => {
      audioReady.current = true;
      audioRef.current?.play().catch(() => {});
    }, 500);
  };

  const handleAudioEnded = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setTimeout(() => setCurrentQuestionIndex((i) => i + 1), 2000);
    } else {
      handleTestEnd();
    }
  };

  const handleTestEnd = () => {
    setModalOpen(true);
    sessionStorage.removeItem("oral_timeLeft");
    sessionStorage.removeItem("oral_testStarted");
    sessionStorage.removeItem("oral_selectedAnswers");
    sessionStorage.removeItem("oral_questionIndex");
    saveResults();
  };

  const saveResults = async () => {
    const scoreCO = calculateScoreCO();
    const correctAnswers = calculateCorrectAnswers();
    const totalPoints = calculateTotalPoints();

    try {
      const response = await axios.post("/api/saveResultsCO", {
        candidateId: "12345", // Remplacer par l'ID réel du candidat
        scoreCO,
        correctAnswers,
        totalPoints,
        totalQuestions: questionsData.length,
      });
      console.log(response.data);
    } catch (err) {
      console.error("Erreur lors de l'enregistrement des résultats.", err);
    }
  };

  const calculateScoreCO = () => {
    let score = 0;
    const points = [
      { start: 0, end: 3, points: 3 },
      { start: 4, end: 9, points: 9 },
      { start: 10, end: 19, points: 15 },
      { start: 20, end: 29, points: 21 },
      { start: 30, end: 34, points: 26 },
      { start: 35, end: 38, points: 33 },
    ];

    questionsData.forEach((question, index) => {
      if (selectedAnswers[question.id] === question.correctAnswer) {
        const pointCategory = points.find(
          (range) => index >= range.start && index <= range.end
        );
        score += pointCategory ? pointCategory.points : 0;
      }
    });
    return score;
  };

  const calculateCorrectAnswers = () => {
    return Object.keys(selectedAnswers).filter(
      (key) => selectedAnswers[key] === questionsData[key].correctAnswer
    ).length;
  };

  const calculateTotalPoints = () => {
    let totalPoints = 0;
    const points = [
      { start: 0, end: 3, points: 3 },
      { start: 4, end: 9, points: 9 },
      { start: 10, end: 19, points: 15 },
      { start: 20, end: 29, points: 21 },
      { start: 30, end: 34, points: 26 },
      { start: 35, end: 38, points: 33 },
    ];

    questionsData.forEach((question, index) => {
      const pointCategory = points.find(
        (range) => index >= range.start && index <= range.end
      );
      totalPoints += pointCategory ? pointCategory.points : 0;
    });
    return totalPoints;
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    navigate("/transition-page"); // Redirige vers la page de transition
  };

  if (!testStarted) return <StartOralTestPrompt onStart={handleStartTest} />;

  return (
    <div className="min-h-screen bg-gray-100 p-6 font-sans relative flex flex-col items-center">
      {modalOpen && <Modal onClose={handleCloseModal} />}
      <h1 className="text-2xl font-bold text-center text-blue-800 mb-4">
        Épreuve de Compréhension Orale
      </h1>
      <div className="bg-blue-100 text-blue-800 rounded-full px-6 py-2 text-lg font-semibold mb-6">
        Temps restant : {formatTime(timeLeft)}
      </div>
      <div className="w-full max-w-2xl bg-white rounded-xl p-4 shadow-md mb-6">
        <div className="flex flex-wrap gap-2 justify-center">
          {questions.map((_, num) => (
            <div
              key={num}
              className={`rounded-md w-10 h-10 flex items-center justify-center font-semibold text-sm transition-all duration-200 border cursor-default ${
                num === currentQuestionIndex
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-blue-800 border-blue-300"
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
        {currentQuestion.image && (
          <img
            src={`/assets/${currentQuestion.image}`}
            alt={`Illustration question ${currentQuestion.id}`}
            className="mb-4 max-h-64 mx-auto"
          />
        )}
        <audio
          ref={audioRef}
          src={currentQuestion.audio}
          controls
          className="w-full mb-4 pointer-events-none opacity-60"
          onEnded={handleAudioEnded}
        />
        <p className="mb-4 text-center text-gray-700 font-medium">
          Écoutez l'enregistrement audio et choisissez la bonne réponse.
        </p>
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
                  {letter}{optionText}
                </span>
              </label>
            );
          })}
        </form>
      </div>
    </div>
  );
};

export default OralQuizzComponent;
