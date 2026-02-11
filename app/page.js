"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import QuestionCard from "@/components/QuestionCard";
import Popup from "@/components/Popup";
import Toast from "@/components/Toast";
import BackgroundMusic from "@/components/BackgroundMusic";
import FloatingEmojis from "@/components/FloatingEmojis";
import { Heart } from "lucide-react";
import confetti from "canvas-confetti";
import ExclusiveIntro from "@/components/ExclusiveIntro";

// Updated questions with Marathi content
const questions = [
  {
    id: 1,
    question: "सांग ना खरं… माझी आठवण येते का की mobile च्या cache सोबत clear झाली? 😜",
    options: ["काहीही 😄", "🙈 थोडीशी येते", "🗑️ Clear All Data"],
  },
  {
    id: 2,
    question: "मी खरंच इतका boring होतो का… की आता फक्त ‘कामापुरता उपयोगी प्राणी’ आहे? 🥲😂",
    options: ["😂 नाही रे ड्रामा king", "😅 थोडासा होतास", "🤐 No comments (HR watching)"],
  },
  {
    id: 3,
    question: "जर पुन्हा ride ला गेलो… तर या वेळेला helmet घालून झोपणार का पुन्हा? 😂",
    options: ["उचलून ऑफिसच्या खिडकीतून बाहेर फेकावंसं वाटतं. 😄", "😴 पुन्हा झोपेन कदाचित", "🚫 ride cancel"],
  },
  {
    id: 4,
    question: "जर मी आता calls ignore करणं बंद केलं असेल… तर एक coffee deserve करतो का की अजून probation चालू आहे? ☕😜",
    options: ["😌 Coffee चालेल", "🤔 Attendance पाहून सांगते", "🚫 Permanent reject"],
  },
  {
    id: 5,
    question: "खरं सांग… अजून थोडासा chance आहे का… की मी आता officially ‘इतिहास’ आहे? 😄",
    options: ["🤍 थोडासा chance आहे", "🌿 बघू", "📚 इतिहासच आहेस"],
  }
];

export default function Home() {
  const musicRef = useRef(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(-1); // -1 for welcome screen
  const [answers, setAnswers] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const [showTrapPopup, setShowTrapPopup] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "" });
  const [isSaving, setIsSaving] = useState(false);
  const [finalResponse, setFinalResponse] = useState({ show: false, message: "", title: "" });
  const [showIntro, setShowIntro] = useState(true);

  const handleStart = () => {
    setCurrentQuestionIndex(0);
  };

  const showToastMessage = (message) => {
    setToast({ show: true, message });
    setTimeout(() => setToast({ show: false, message: "" }), 3000);
  };

  const advanceQuestion = (answer) => {
    const currentQuestion = questions[currentQuestionIndex];
    if (!currentQuestion) return; // Safety check

    // Only save if it's a real answer, but for traps we might just want to move on?
    const newAnswers = { ...answers, [currentQuestion.id]: answer || "Skipped/Trap" };
    setAnswers(newAnswers);

    if (currentQuestionIndex < questions.length - 1) {
      setTimeout(() => setCurrentQuestionIndex(currentQuestionIndex + 1), 500);
    } else {
      saveAnswers(newAnswers);
    }
  };

  const handleAnswer = async (answer) => {
    // Special Interaction Logic
    if (answer.includes("Clear All Data")) {
      setShowTrapPopup(true);
      return;
    }

    if (answer.includes("No comments (HR watching)")) {
      showToastMessage("HR ला सांगणार नाही promise 😌");
      setTimeout(() => advanceQuestion(answer), 1500);
      return;
    }

    if (answer.includes("ride cancel")) {
      showToastMessage("Petrol भरलंय आधीच 😤😂");
      setTimeout(() => advanceQuestion(answer), 1500);
      return;
    }

    if (answer.includes("Permanent reject")) {
      showToastMessage("इतकी strict manager कधी झालीस? 😂");
      setTimeout(() => advanceQuestion(answer), 1500);
      return;
    }

    if (answer.includes("इतिहासच आहेस")) {
      showToastMessage("इतिहासात नाव राहिलं तरी book बंद करू नकोस 😌");
      setTimeout(() => advanceQuestion(answer), 1500);
      return;
    }

    // Normal Flow
    advanceQuestion(answer);
  };

  const saveAnswers = async (finalAnswers) => {
    setIsSaving(true);
    try {
      const response = await fetch("/api/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers: finalAnswers }),
      });

      if (response.ok) {
        confetti({
          particleCount: 150,
          spread: 100,
          origin: { y: 0.6 },
          colors: ['#ec4899', '#a855f7', '#fb7185', '#ffffff'] // pinks and purples
        });
        setShowPopup(true);
      } else {
        console.error("Failed to save.");
        setShowPopup(true);
      }
    } catch (error) {
      console.error("Error saving:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const resetQuiz = () => {
    setAnswers({});
    setCurrentQuestionIndex(-1);
    setShowPopup(false);
  };

  const handleTrapResponse = () => {
    setShowTrapPopup(false);
    advanceQuestion("Trap: Clear All Data (Proceeded)"); // Move to next after trap interaction
  };

  return (
    <main className="min-h-[100dvh] w-full flex flex-col items-center justify-center p-6 relative overflow-hidden bg-gradient-to-br from-pink-200 via-purple-200 to-indigo-200 font-poppins selection:bg-pink-300 selection:text-pink-900">

      {/* Background Layer */}
      <FloatingEmojis />

      {/* Decorative Orbs */}
      <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-pink-400/20 rounded-full blur-[100px] animate-pulse pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] bg-purple-400/20 rounded-full blur-[100px] animate-pulse pointer-events-none delay-1000" />

      {/* Music Toggle */}
      <BackgroundMusic ref={musicRef} />

      {/* Main Content Area */}
      <div className="z-10 w-full flex justify-center items-center flex-grow">
        <AnimatePresence mode="wait">
          {showIntro && (
            <motion.div
              key="intro"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
              transition={{ duration: 0.8 }}
              className="w-full flex justify-center"
            >
              <ExclusiveIntro onStart={() => {
                if (musicRef.current) {
                  musicRef.current.unmuteAndPlay();
                }
                setShowIntro(false);
              }} />
            </motion.div>
          )}

          {!showIntro && currentQuestionIndex === -1 && (
            <motion.div
              key="welcome"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="text-center space-y-8 max-w-lg bg-white/40 backdrop-blur-md p-10 rounded-[2.5rem] shadow-xl border border-white/50"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                className="flex justify-center mb-6"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-pink-400 blur-xl opacity-50 rounded-full animate-pulse"></div>
                  <Heart className="relative text-pink-500 w-24 h-24 fill-pink-500 drop-shadow-lg animate-bounce-slow" />
                </div>
              </motion.div>

              <h1 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600 drop-shadow-sm tracking-tight leading-tight">
                lets Start's
              </h1>

              {/* <p className="text-lg md:text-xl text-slate-700/80 font-medium leading-relaxed max-w-sm mx-auto">
                Uncover your romantic style through a journey of sweet questions.
              </p> */}

              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 10px 30px -5px rgba(236, 72, 153, 0.5)" }}
                whileTap={{ scale: 0.95 }}
                onClick={handleStart}
                className="px-12 py-5 bg-gradient-to-r from-pink-500 via-rose-500 to-purple-500 text-white rounded-full font-bold text-xl shadow-2xl hover:shadow-pink-500/40 transition-all duration-300 ring-4 ring-pink-200/50"
              >
                Let's Start
              </motion.button>
            </motion.div>
          )}

          {!showIntro && currentQuestionIndex >= 0 && currentQuestionIndex < questions.length && (
            <QuestionCard
              key={questions[currentQuestionIndex].id}
              question={questions[currentQuestionIndex].question}
              options={questions[currentQuestionIndex].options}
              onAnswer={handleAnswer}
            />
          )}
        </AnimatePresence>
      </div>

      <Popup
        isOpen={showPopup}
        onClose={resetQuiz}
        message={`Feedback Important आहे 😌\nCall करून सांगशील तर जास्त genuine वाटेल 😄\n(Calls ignore नाही करणार promise)`}
        title="Love Journey Complete! 💖"
      >
        <div className="flex flex-col gap-3 mt-6 w-full">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setShowPopup(false);
              setFinalResponse({ show: true, title: "Yay! 🥰", message: "Thank you. And waiting..." });
              confetti({ particleCount: 150, spread: 100, origin: { y: 0.6 } });
            }}
            className="w-full py-3 bg-gradient-to-r from-green-400 to-emerald-500 text-white font-bold rounded-xl shadow-lg hover:shadow-green-300/50 transition-all duration-300 flex items-center justify-center gap-2"
          >
            📞 Call करेन
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setShowPopup(false);
              setFinalResponse({ show: true, title: "Cool! 😎", message: "Chalel nkki" });
            }}
            className="w-full py-3 bg-gradient-to-r from-pink-400 to-rose-400 text-white font-bold rounded-xl shadow-lg hover:shadow-pink-300/50 transition-all duration-300 flex items-center justify-center gap-2"
          >
            😂 Screenshot पाठवते
          </motion.button>
        </div>
      </Popup>

      <Popup
        isOpen={showTrapPopup}
        onClose={() => setShowTrapPopup(false)}
        message="Backup तरी ठेवलाय का? 😏"
        title="Oops!"
      >
        <div className="flex gap-4 justify-center mt-6">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleTrapResponse}
            className="px-6 py-2 bg-green-500 text-white rounded-xl font-bold"
          >
            Ho 😌
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleTrapResponse}
            className="px-6 py-2 bg-red-400 text-white rounded-xl font-bold"
          >
            Nahi 🙈
          </motion.button>
        </div>
      </Popup>

      <Popup
        isOpen={finalResponse.show}
        onClose={() => {
          setFinalResponse({ ...finalResponse, show: false });
          resetQuiz();
        }}
        message={finalResponse.message}
        title={finalResponse.title}
      />

      <Toast
        message={toast.message}
        isVisible={toast.show}
      />

      {/* Footer */}
      <div className="absolute bottom-6 text-slate-500/60 text-sm font-medium tracking-wider">
        Made with ❤️ & Next.js
      </div>
    </main>
  );
}
