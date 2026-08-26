'use client';

import { useEffect, useRef } from 'react';

const VantaWaves = () => {
    const vantaRef = useRef<HTMLDivElement>(null);
    const vantaEffect = useRef<any>(null);

    useEffect(() => {
        if (!vantaEffect.current && vantaRef.current) {
            // Dynamically import to avoid SSR issues
            // @ts-ignore
            import('vanta/dist/vanta.waves.min').then((VANTA) => {
                import('three').then((THREE) => {
                    vantaEffect.current = VANTA.default({
                        el: vantaRef.current,
                        THREE: THREE,
                        mouseControls: true,
                        touchControls: true,
                        gyroControls: false,
                        minHeight: 200.00,
                        minWidth: 200.00,
                        scale: 1.00,
                        scaleMobile: 1.00,
                        color: 0x40404, // Dark gray color
                        shininess: 5.00,
                        waveHeight: 15,
                        waveSpeed: 1,
                        zoom: 1
                    });
                });
            });
        }

        return () => {
            if (vantaEffect.current) {
                vantaEffect.current.destroy();
            }
        };
    }, []);

    return (
        <div
            ref={vantaRef}
            className="fixed inset-0 -z-10"
            style={{ width: '100vw', height: '100vh', pointerEvents: 'none' }}
        />
    );
};

export default VantaWaves;
