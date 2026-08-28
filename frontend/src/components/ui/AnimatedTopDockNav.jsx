import React from 'react';
import { AnimatedTopDock } from "@designcodeio/threeui";
import "@designcodeio/threeui/style.css";

export default function AnimatedTopDockNav() {
  return (
    <div className="fixed top-4 left-0 right-0 z-[100] mx-auto flex items-center justify-center pointer-events-auto">
      <div className="shader-frame relative max-w-full flex justify-center items-center">
        <AnimatedTopDock
          variant="sable"
          proximity={122}
          spring={0.19}
          damping={0.70}
          widthGrowth={17}
          heightGrowth={16}
          drop={3.5}
        />
      </div>
    </div>
  );
}
