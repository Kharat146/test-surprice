"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Popup from "./Popup";

export default function ExclusiveIntro({ onStart }) {
    const [showExitPopup, setShowExitPopup] = useState(false);

    return (
        <div className="relative z-10 w-full max-w-lg px-4">
            {/* Badge */}
            <motion.div
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="flex justify-center mb-6"
            >
                <div className="bg-red-100/80 backdrop-blur border border-red-200 text-red-600 px-4 py-1.5 rounded-full text-xs md:text-sm font-semibold shadow-sm flex items-center gap-2">
                    <span>🔐</span>
                    Strictly Private – Only for Abhilasha
                </div>
            </motion.div>

            {/* Main Glass Card */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="bg-white/30 backdrop-blur-xl rounded-[2rem] shadow-2xl p-8 md:p-12 border border-white/60 text-center relative overflow-hidden"
            >
                {/* Subtle shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-white/10 pointer-events-none" />

                <div className="space-y-6 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="space-y-4"
                    >
                        <p className="text-xl md:text-2xl font-bold text-slate-800 leading-relaxed">
                            हे फक्त Abhilasha साठी आहे.
                        </p>
                        <p className="text-lg md:text-xl text-slate-700 font-medium">
                            दुसऱ्यांनी बघू नका.
                        </p>
                        <p className="text-lg md:text-xl text-pink-600 font-semibold mt-2">
                            हा secret थोडा खास आहे 😌
                        </p>
                    </motion.div>

                    {/* Action Buttons */}
                    <div className="flex flex-col gap-4 mt-8">
                        <motion.button
                            whileHover={{ scale: 1.03, boxShadow: "0 0 20px rgba(236, 72, 153, 0.4)" }}
                            whileTap={{ scale: 0.97 }}
                            animate={{
                                scale: [1, 1.02, 1],
                                transition: { repeat: Infinity, duration: 2, ease: "easeInOut" }
                            }}
                            onClick={onStart}
                            className="w-full py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold rounded-2xl shadow-xl text-lg relative overflow-hidden group"
                        >
                            <span className="relative z-10">चला बघूया हा बावळट काय बोलतोय 😄</span>
                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 pointer-events-none" />
                        </motion.button>

                        <motion.button
                            whileHover={{ scale: 1.02, backgroundColor: "rgba(255, 255, 255, 0.5)" }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => setShowExitPopup(true)}
                            className="w-full py-4 bg-white/40 text-slate-600 font-semibold rounded-2xl border border-white/50 hover:bg-white/60 transition-all text-lg"
                        >
                            मी Abhilasha नाही 😅
                        </motion.button>
                    </div>
                </div>
            </motion.div>

            {/* Exit Popup */}
            <Popup
                isOpen={showExitPopup}
                onClose={() => setShowExitPopup(false)}
                title="Oops! 🤐"
                message={`अरे वा… curiosity भारी आहे तुमची 😂\nपण हा secret थोडा खास आहे.`}
            >
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                        // In a real app we might redirect or close tab, but for now just close popup
                        setShowExitPopup(false);
                        // Optionally could do window.close() but browsers block it usually
                    }}
                    className="mt-6 px-8 py-3 bg-gradient-to-r from-slate-700 to-slate-800 text-white font-bold rounded-full shadow-lg"
                >
                    ठीक आहे, बाहेर पडतो 😌
                </motion.button>
            </Popup>
        </div>
    );
}
