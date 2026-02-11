"use client";

import { motion, AnimatePresence } from "framer-motion";

export default function Toast({ message, isVisible, onClose }) {
    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: 50, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.9 }}
                    className="fixed bottom-20 left-1/2 transform -translate-x-1/2 z-50 px-6 py-3 bg-slate-800/90 text-white rounded-full shadow-2xl backdrop-blur-md border border-slate-700 flex items-center gap-3 min-w-max"
                >
                    <span className="text-xl">💬</span>
                    <p className="font-medium text-sm md:text-base">{message}</p>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
