import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';

export default function LandingPageNav() {
    const { scrollY } = useScroll();
    const [hidden, setHidden] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious();
        if (latest > 100 && latest > previous) {
            setHidden(true); // hide when scrolling down past 100px
        } else {
            setHidden(false); // show when scrolling up
        }
        setScrolled(latest > 50);
    });

    return (
        <motion.nav
            variants={{
                visible: { y: 0 },
                hidden: { y: "-150%" }
            }}
            animate={hidden ? "hidden" : "visible"}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className={`fixed top-4 left-0 right-0 z-[100] mx-auto max-w-5xl px-4 sm:px-6 transition-all duration-300 ${scrolled ? 'py-0' : 'py-2'}`}
        >
            <div className={`flex items-center justify-between rounded-full px-6 py-3 transition-all duration-300 ${scrolled ? 'bg-white/80 backdrop-blur-md border border-[#E6E8EC] shadow-sm' : 'bg-transparent border border-transparent'}`}>
                
                {/* Brand */}
                <div className="flex items-center space-x-2">
                    <span className="w-5 h-5 rounded-[4px] bg-[#5B4BDB] shadow-[0_0_15px_rgba(91,75,219,0.3)]"></span>
                    <span className="font-bold text-[#111318] tracking-tight text-lg">SaveFlow AI</span>
                </div>

                {/* Center Links (Desktop) */}
                <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-[#667085]">
                    <a href="#product" className="hover:text-[#111318] transition-colors">Product</a>
                    <a href="#how-it-works" className="hover:text-[#111318] transition-colors">How it works</a>
                    <a href="#insights" className="hover:text-[#111318] transition-colors">Insights</a>
                </div>

                {/* Right Actions */}
                <div className="flex items-center space-x-4">
                    <span className="hidden sm:inline text-sm font-medium text-[#667085] cursor-pointer hover:text-[#111318] transition-colors">
                        Sign in
                    </span>
                    <NavLink
                        to="/dashboard"
                        className="px-5 py-2.5 rounded-full bg-[#111318] hover:bg-[#2A2F3D] text-white font-semibold text-xs shadow-subtle transition-all"
                    >
                        Launch Control Room →
                    </NavLink>
                </div>

            </div>
        </motion.nav>
    );
}
