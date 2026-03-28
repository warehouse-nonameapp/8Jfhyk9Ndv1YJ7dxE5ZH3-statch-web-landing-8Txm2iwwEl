import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BetaSubscriptionButton } from "./BetaSubscriptionButton";

export const FloatingFooter = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const heroCta = document.getElementById("hero-cta-anchor");
        const featuresBanner = document.getElementById("features-banner-anchor");
        const ctaCta = document.getElementById("cta-anchor");
        const mainFooter = document.getElementById("main-footer");

        let heroHidden = false;
        let featuresBannerVisible = false;
        let ctaVisible = false;
        let footerVisible = false;

        const update = () => {
            setIsVisible(heroHidden && !featuresBannerVisible && !ctaVisible && !footerVisible);
        };

        const heroObserver = new IntersectionObserver(
            ([entry]) => { heroHidden = !entry.isIntersecting; update(); },
            { threshold: 0 }
        );

        const featuresBannerObserver = new IntersectionObserver(
            ([entry]) => { featuresBannerVisible = entry.isIntersecting; update(); },
            { threshold: 0 }
        );

        const ctaObserver = new IntersectionObserver(
            ([entry]) => { ctaVisible = entry.isIntersecting; update(); },
            { threshold: 0 }
        );

        const footerObserver = new IntersectionObserver(
            ([entry]) => { footerVisible = entry.isIntersecting; update(); },
            { threshold: 0 }
        );

        if (heroCta) heroObserver.observe(heroCta);
        if (featuresBanner) featuresBannerObserver.observe(featuresBanner);
        if (ctaCta) ctaObserver.observe(ctaCta);
        if (mainFooter) footerObserver.observe(mainFooter);

        return () => {
            heroObserver.disconnect();
            featuresBannerObserver.disconnect();
            ctaObserver.disconnect();
            footerObserver.disconnect();
        };
    }, []);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                    className="fixed bottom-0 left-0 right-0 z-40 md:hidden"
                    style={{
                        borderRadius: "12px 12px 0 0",
                        background: "linear-gradient(180deg, rgba(242, 246, 255, 0.80) 0%, #F2F6FF 100%)",
                        backdropFilter: "blur(2px)",
                        WebkitBackdropFilter: "blur(2px)",
                    }}
                >
                    <div className="flex items-center justify-center px-5 py-4">
                        <BetaSubscriptionButton className="!py-3 !px-6 whitespace-nowrap" />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
