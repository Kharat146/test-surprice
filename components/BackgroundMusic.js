"use client";

import { useState, useRef, useEffect, forwardRef, useImperativeHandle } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { motion } from "framer-motion";

const BackgroundMusic = forwardRef((props, ref) => {
    const [isMuted, setIsMuted] = useState(true);
    const audioRef = useRef(null);

    useImperativeHandle(ref, () => ({
        unmuteAndPlay: () => {
            if (audioRef.current) {
                fadeInVolume();
                audioRef.current.play().catch(e => console.log(e));
                setIsMuted(false);
            }
        }
    }));

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = 0.5; // Default volume
            const playPromise = audioRef.current.play();
            if (playPromise !== undefined) {
                playPromise.catch((error) => {
                    console.log("Autoplay prevented:", error);
                });
            }
        }
    }, []);

    const fadeInVolume = () => {
        if (!audioRef.current) return;
        audioRef.current.muted = false;
        audioRef.current.volume = 0;

        let vol = 0;
        const interval = setInterval(() => {
            if (vol < 0.5) {
                vol += 0.05;
                audioRef.current.volume = Math.min(vol, 0.5);
            } else {
                clearInterval(interval);
            }
        }, 100); // 1s fade in
    };

    const toggleMute = () => {
        if (audioRef.current) {
            if (isMuted) {
                fadeInVolume();
                audioRef.current.play().catch(e => console.log(e));
                setIsMuted(false);
            } else {
                audioRef.current.muted = true;
                setIsMuted(true);
            }
        }
    };

    return (
        <motion.div
            className="fixed top-4 right-4 z-50"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
        >
            <audio ref={audioRef} src="/music/romantic_piano.mp3" loop muted autoPlay playsInline />
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleMute}
                className={`p-3 rounded-full shadow-lg border-2 transition-all duration-300 ${!isMuted
                    ? "bg-pink-500 text-white border-pink-400 shadow-pink-500/40"
                    : "bg-white/80 backdrop-blur-sm text-slate-500 border-slate-200 hover:bg-white"
                    }`}
                aria-label={isMuted ? "Unmute Music" : "Mute Music"}
            >
                {!isMuted ? <Volume2 size={24} /> : <VolumeX size={24} />}
            </motion.button>
        </motion.div>
    );
});

BackgroundMusic.displayName = "BackgroundMusic";

export default BackgroundMusic;
