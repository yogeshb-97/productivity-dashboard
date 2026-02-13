import { useState, useEffect } from 'react';
import { Quote } from 'lucide-react';

const quotes = [
    "The way to get started is to quit talking and begin doing.",
    "Your time is limited, so don't waste it living someone else's life.",
    "If you set your goals ridiculously high and it's a failure, you will fail above everyone else's success.",
    "Life is what happens when you're busy making other plans.",
    "The future belongs to those who believe in the beauty of their dreams.",
    "It is during our darkest moments that we must focus to see the light.",
    "Do not go where the path may lead, go instead where there is no path and leave a trail.",
    "You will face many defeats in life, but never let yourself be defeated."
];

const QuoteWidget = () => {
    const [index, setIndex] = useState(0);
    const [fade, setFade] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            setFade(false);
            setTimeout(() => {
                setIndex((prev) => (prev + 1) % quotes.length);
                setFade(true);
            }, 500); // Wait for fade out
        }, 20000); // 20 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative p-6 rounded-xl border border-[var(--border-subtle)] bg-gradient-to-r from-[var(--bg-panel)] to-transparent overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[var(--accent-primary)] to-transparent" />
            <Quote className="w-8 h-8 text-[var(--bg-hover)] absolute top-4 left-4" />

            <div className={`relative z-10 transition-opacity duration-500 ease-in-out ${fade ? 'opacity-100' : 'opacity-0'}`}>
                <p className="text-lg md:text-xl font-light italic text-[var(--text-secondary)] text-center px-4">
                    "{quotes[index]}"
                </p>
            </div>
        </div>
    );
};

export default QuoteWidget;
