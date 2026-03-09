import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BetaSubscriptionButton } from "./BetaSubscriptionButton";

export const FloatingFooter = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Show only if scrolled past 200px and not at the very bottom
            const scrolled = window.scrollY > 200;
            const bottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100;

            // Only show on mobile/compact screens (< 768px for example) if needed logic matches design
            // For now, we follow logic: show if scrolled and not at bottom
            setIsVisible(scrolled && !bottom);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Only render on mobile via CSS media queries logic usually, 
    // but here we control visibility with JS. 
    // Optimization: Add 'md:hidden' class to parent to strictly enforce mobile only.

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    className="fixed bottom-0 left-0 right-0 z-40 p-4 bg-white/80 backdrop-blur-md border-t border-border-light md:hidden flex justify-center pb-8"
                >
                    {/* Simplified Button for floating footer */}
                    <div>
                        <BetaSubscriptionButton />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
