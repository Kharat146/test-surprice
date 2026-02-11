"use client";

import { useEffect, useState } from "react";

const emojis = ["❤️", "💖", "💕", "💗", "💓"];

export default function FloatingEmojis() {
    const [hearts, setHearts] = useState([]);

    useEffect(() => {
        const newHearts = Array.from({ length: 40 }).map((_, i) => ({
            id: i,
            left: Math.random() * 100, // %
            duration: 10 + Math.random() * 20, // s
            delay: Math.random() * 20, // s
            size: 10 + Math.random() * 20, // px
            color: `rgba(255, ${100 + Math.random() * 100}, ${150 + Math.random() * 100}, 0.6)` // soft pinks
        }));
        setHearts(newHearts);
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
            {hearts.map((item) => (
                <div
                    key={item.id}
                    className="floating-heart"
                    style={{
                        left: `${item.left}%`,
                        animationDuration: `${item.duration}s`,
                        animationDelay: `-${item.delay}s`, // start immediately at random offset
                        fontSize: `${item.size}px`,
                        color: item.color,
                        position: "fixed",
                        bottom: "-10vh"
                    }}
                >
                    ❤
                </div>
            ))}
        </div>
    );
}
