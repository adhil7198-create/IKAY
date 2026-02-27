import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SparklesCore } from "./Sparkles";

interface SplashScreenProps {
    onFinish: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
            setTimeout(onFinish, 1000); // Wait for fade out animation
        }, 3500);

        return () => clearTimeout(timer);
    }, [onFinish]);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                    className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center overflow-hidden"
                >
                    {/* Sparkles Background */}
                    <div className="absolute inset-0 w-full h-full">
                        <SparklesCore
                            id="tsparticlesfullpage"
                            background="transparent"
                            minSize={0.4}
                            maxSize={1.2}
                            particleDensity={400}
                            className="w-full h-full"
                            particleColor="#FFFFFF"
                            speed={2}
                        />
                    </div>

                    {/* Logo Container */}
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{
                            duration: 2,
                            ease: [0.22, 1, 0.36, 1],
                            delay: 0.5
                        }}
                        className="relative z-10 w-full max-w-[320px] px-6 flex items-center justify-center min-h-[150px]"
                    >
                        <img
                            src="/images/logo_v2.png"
                            alt="IKAY Logo"
                            className="w-full h-auto object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                        />

                        {/* Ambient Light Effect */}
                        <div className="absolute inset-x-0 top-0 bg-gradient-to-r from-transparent via-white/10 to-transparent h-[2px] w-full blur-sm" />
                        <div className="absolute inset-x-0 top-0 bg-gradient-to-r from-transparent via-white/5 to-transparent h-px w-full" />
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-r from-transparent via-white/10 to-transparent h-[2px] w-full blur-sm" />
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-r from-transparent via-white/5 to-transparent h-px w-full" />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.8, duration: 1 }}
                        className="relative z-10 mt-8"
                    >
                        <p className="text-white/40 text-sm tracking-[0.3em] uppercase font-light">
                            Elevating Streetwear
                        </p>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default SplashScreen;
