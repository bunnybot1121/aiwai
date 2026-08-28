import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import "@designcodeio/threeui/style.css";
import { 
  Activity, Brain, Clock, ShieldAlert, LayoutDashboard 
} from 'lucide-react';

function createTopDockController(navElement, getConfig) {
  const items = Array.from(navElement.querySelectorAll("[data-dock-item]")).map((el) => ({
    element: el,
    baseWidth: 0,
    baseHeight: 0,
    value: 0,
    velocity: 0,
    target: 0
  }));

  let isPointerHovering = false;
  let isAnimating = false;
  let animId = 0;

  const clamp = (val, min, max) => Math.max(min, Math.min(max, val));

  const updateMeasurements = () => {
    for (const item of items) {
      item.element.style.width = "";
      item.element.style.height = "";
      item.element.style.transform = "";
      item.element.dataset.dockNear = "false";
    }
    for (const item of items) {
      const rect = item.element.getBoundingClientRect();
      item.baseWidth = rect.width;
      item.baseHeight = rect.height;
      item.value = 0;
      item.velocity = 0;
      item.target = 0;
    }
    navElement.dataset.dockState = "idle";
    navElement.dataset.dockMax = "0.00";
  };

  const handlePointerMove = (e) => {
    const cfg = getConfig();
    const rects = items.map((t) => t.element.getBoundingClientRect());
    for (let i = 0; i < items.length; i++) {
      const centerX = rects[i].left + rects[i].width * 0.5;
      const distRatio = clamp(1 - Math.abs(e.clientX - centerX) / Math.max(1, cfg.proximity), 0, 1);
      const target = distRatio * distRatio * (3 - 2 * distRatio);
      items[i].target = target;
      items[i].element.dataset.dockNear = target > 0.08 ? "true" : "false";
    }
    isPointerHovering = true;
    isAnimating = true;
    navElement.dataset.dockState = "active";
  };

  const resetTarget = () => {
    isPointerHovering = false;
    isAnimating = true;
    items.forEach((item) => {
      item.target = 0;
      item.element.dataset.dockNear = "false";
    });
  };

  const animateLoop = () => {
    if (isAnimating) {
      const cfg = getConfig();
      let active = false;
      let maxVal = 0;
      for (const item of items) {
        item.velocity += (item.target - item.value) * cfg.spring;
        item.velocity *= cfg.damping;
        item.value += item.velocity;

        if (Math.abs(item.target - item.value) < 0.001 && Math.abs(item.velocity) < 0.001) {
          item.value = item.target;
          item.velocity = 0;
        } else {
          active = true;
        }

        const v = clamp(item.value, 0, 1.08);
        const isLogo = item.element.classList.contains("animated-top-dock__logo");
        const wGrowth = isLogo ? cfg.widthGrowth * (14 / 17) : Math.min(cfg.widthGrowth, item.baseWidth * 0.24);
        const hGrowth = isLogo ? cfg.heightGrowth * (14 / 16) : cfg.heightGrowth;

        item.element.style.width = `${(item.baseWidth + wGrowth * v).toFixed(2)}px`;
        item.element.style.height = `${(item.baseHeight + hGrowth * v).toFixed(2)}px`;
        item.element.style.transform = `translateY(${(v * cfg.drop).toFixed(2)}px)`;
        maxVal = Math.max(maxVal, v);
      }
      navElement.dataset.dockMax = maxVal.toFixed(2);
      if (!active) {
        isAnimating = false;
        if (items.every((t) => t.target === 0)) {
          navElement.dataset.dockState = "idle";
        }
      }
    }
    animId = requestAnimationFrame(animateLoop);
  };

  updateMeasurements();
  navElement.addEventListener("pointermove", handlePointerMove);
  navElement.addEventListener("pointerleave", resetTarget);
  animId = requestAnimationFrame(animateLoop);

  return () => {
    cancelAnimationFrame(animId);
    navElement.removeEventListener("pointermove", handlePointerMove);
    navElement.removeEventListener("pointerleave", resetTarget);
  };
}

export default function LandingPageNav() {
  const navRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('watch');

  const config = {
    proximity: 140,
    spring: 0.18,
    damping: 0.70,
    widthGrowth: 22,
    heightGrowth: 18,
    drop: 4.0
  };

  useEffect(() => {
    const navEl = navRef.current;
    if (!navEl) return;
    const cleanup = createTopDockController(navEl, () => config);
    return cleanup;
  }, []);

  const items = [
    { 
      id: 'watch', 
      label: 'WATCH', 
      icon: <Activity className="w-4 h-4" />,
      action: () => scrollToSection('watch')
    },
    { 
      id: 'predict', 
      label: 'PREDICT', 
      icon: <Brain className="w-4 h-4" />,
      action: () => scrollToSection('predict')
    },
    { 
      id: 'explain', 
      label: 'EXPLAIN', 
      icon: <Clock className="w-4 h-4" />,
      action: () => scrollToSection('explain')
    },
    { 
      id: 'decide', 
      label: 'DECIDE', 
      icon: <ShieldAlert className="w-4 h-4" />,
      action: () => scrollToSection('decide')
    },
    { 
      id: 'control', 
      label: 'CONTROL', 
      icon: <LayoutDashboard className="w-4 h-4" />,
      action: () => navigate('/dashboard')
    }
  ];

  const scrollToSection = (id) => {
    setActiveTab(id);
    if (location.pathname !== '/') {
      navigate('/#' + id);
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <nav className="fixed top-4 left-0 right-0 z-[100] mx-auto flex items-center justify-center pointer-events-auto px-4">
      <div className="relative flex justify-center items-center">
        <nav
          ref={navRef}
          className="animated-top-dock__nav"
          aria-label="Revive AI Sable Dock"
          data-dock-state="idle"
          data-dock-max="0.00"
        >
          {/* Revive AI Logo */}
          <button
            className="animated-top-dock__item animated-top-dock__logo"
            data-dock-item
            type="button"
            aria-label="Revive Home"
            onClick={() => {
              setActiveTab('hero');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <div className="w-full h-full bg-[#E8E8E3] flex items-center justify-center font-extrabold text-xs text-[#111] font-mono">
              REV
            </div>
          </button>

          {/* Contextual Revive AI Tabs */}
          {items.map((item) => (
            <button
              key={item.id}
              className="animated-top-dock__item animated-top-dock__link"
              data-dock-item
              type="button"
              aria-pressed={activeTab === item.id}
              onClick={item.action}
            >
              <span className="animated-top-dock__icon" aria-hidden="true">
                {item.icon}
              </span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </nav>
  );
}
