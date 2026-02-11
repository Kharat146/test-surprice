"use client";

import { motion } from "framer-motion";

export default function QuestionCard({ question, options, onAnswer }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -30, scale: 0.95 }}
            transition={{
                type: "spring",
                stiffness: 300,
                damping: 25
            }}
            className="bg-white/90 backdrop-blur-xl rounded-[2rem] shadow-2xl p-8 md:p-10 w-full max-w-lg mx-4 border-2 border-pink-100 flex flex-col items-center"
        >
            {(() => {
                const emojiRegex = /(\p{Emoji_Presentation}|\p{Extended_Pictographic})+$/u;
                const match = question.match(emojiRegex);
                const text = match ? question.replace(emojiRegex, "") : question;
                const emoji = match ? match[0] : "";

                return (
                    <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center leading-snug">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600">
                            {text}
                        </span>
                        {emoji && <span className="inline-block ml-2 text-initial">{emoji}</span>}
                    </h2>
                );
            })()}
            <div className="space-y-4 w-full relative">
                {options.map((option, index) => {
                    // Identify special interaction buttons
                    const isTrap = option.includes("Clear All Data");
                    const isDodgy = option.includes("ride cancel");
                    const isReject = option.includes("Permanent reject") || option.includes("No comments");

                    return (
                        <motion.button
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            whileHover={
                                isTrap || isDodgy
                                    ? {
                                        x: (isDodgy ? Math.random() * 50 - 25 : [0, -5, 5, -5, 5, 0]),
                                        y: (isDodgy ? Math.random() * 50 - 25 : [0, -2, 2, -2, 2, 0]),
                                        transition: { duration: 0.3 }
                                    }
                                    : { scale: 1.03, y: -2, backgroundColor: "#fff0f5" }
                            }
                            whileTap={
                                isTrap || isDodgy
                                    ? {
                                        x: [0, -10, 10, -10, 10, 0], // Strong shake
                                        rotate: [0, -5, 5, -5, 5, 0],
                                        transition: { duration: 0.4 }
                                    }
                                    : { scale: 0.96 }
                            }
                            transition={{ delay: index * 0.1 }}
                            onClick={() => onAnswer(option)}
                            className={`w-full py-4 px-6 rounded-2xl text-lg font-medium transition-all duration-300 text-center relative ${isTrap || isDodgy || isReject
                                ? "border-2 border-slate-200 text-slate-500 bg-slate-50 hover:border-red-400 hover:text-red-500 hover:bg-red-50"
                                : "border-2 border-pink-200 text-slate-700 bg-white hover:border-pink-400 hover:shadow-lg hover:shadow-pink-200/50"
                                }`}
                        >
                            {option}
                        </motion.button>
                    );
                })}
            </div>
        </motion.div>
    );
}
