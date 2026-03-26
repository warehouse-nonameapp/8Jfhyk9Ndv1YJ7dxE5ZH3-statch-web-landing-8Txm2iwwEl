import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BetaSubscriptionButton } from "./BetaSubscriptionButton";

export const FloatingFooter = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const heroCta = document.getElementById("hero-cta-anchor");
        const featuresBanner = document.getElementById("features-banner-anchor");
        const ctaCta = document.getElementById("cta-anchor");

        let heroHidden = false;
        let featuresBannerVisible = false;
        let ctaVisible = false;

        const update = () => {
            setIsVisible(heroHidden && !featuresBannerVisible && !ctaVisible);
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

        if (heroCta) heroObserver.observe(heroCta);
        if (featuresBanner) featuresBannerObserver.observe(featuresBanner);
        if (ctaCta) ctaObserver.observe(ctaCta);

        return () => {
            heroObserver.disconnect();
            featuresBannerObserver.disconnect();
            ctaObserver.disconnect();
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
                    <div className="flex items-center justify-between px-5 py-4">
                        {/* Logo */}
                        <div className="flex items-center gap-2 shrink-0">
                            <img
                                src={`${import.meta.env.BASE_URL}assets/ic_statch_icon.svg`}
                                alt="Statch Icon"
                                width={20}
                                height={20}
                                draggable={false}
                            />
                            <img
                                src={`${import.meta.env.BASE_URL}assets/ic_statch_name.svg`}
                                alt="Statch"
                                style={{ width: 64, height: 17.64 }}
                                draggable={false}
                            />
                        </div>

                        {/* Button */}
                        <BetaSubscriptionButton className="!py-3 !px-6 whitespace-nowrap shrink-0" />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
