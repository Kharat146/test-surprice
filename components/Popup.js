"use client";

import { motion, AnimatePresence } from "framer-motion";

export default function Popup({ isOpen, onClose, message, title = "A message for you ❤️", children }) {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm"
                >
                    <motion.div
                        initial={{ scale: 0.9, y: 20 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.9, y: 20 }}
                        transition={{ type: "spring", damping: 20, stiffness: 300 }}
                        className="relative bg-white/90 backdrop-blur-xl rounded-3xl p-8 max-w-sm w-full shadow-2xl border-4 border-pink-200 text-center"
                    >
                        <h3 className="text-2xl font-bold text-pink-500 mb-4">{title}</h3>
                        <p className="text-lg text-slate-600 mb-8 leading-relaxed whitespace-pre-line">{message}</p>
                        {children ? children : (
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={onClose}
                                className="px-8 py-3 bg-gradient-to-r from-pink-400 to-rose-400 text-white font-bold rounded-full shadow-lg hover:shadow-pink-300/50 transition-all duration-300"
                            >
                                Okay!
                            </motion.button>
                        )}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
