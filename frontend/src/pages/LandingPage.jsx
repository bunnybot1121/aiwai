import React, { useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Check, Lock, ArrowRight, Activity, Users, FileText, Briefcase, Zap, Brain, MessageSquare, PlayCircle } from 'lucide-react';
import LandingPageNav from '../components/ui/LandingPageNav';
import TrueFocus from '../components/ui/TrueFocus';
import ScrollReveal from '../components/ui/ScrollReveal';
import FloatingSignals from '../components/ui/FloatingSignals';
import AnimatedSVGPath from '../components/ui/AnimatedSVGPath';

export default function LandingPage() {
    return (
        <div className="bg-[#FAFAFC] min-h-screen text-[#111318] selection:bg-[#5B4BDB] selection:text-white font-sans overflow-hidden relative">
            <AuroraBackground />
            <LandingPageNav />

            {/* SECTION 01 — HERO */}
            <HeroSection />

            {/* SECTION 02 — THE SIGNALS */}
            <SignalsSection />

            {/* SECTION 03 — WATCH */}
            <WatchSection />

            {/* SECTION 04 — PREDICT */}
            <PredictSection />

            {/* SECTION 05 — EXPLAIN */}
            <ExplainSection />

            {/* SECTION 06 — DECIDE */}
            <DecideSection />

            {/* SECTION 07 — LEARNING / MEMORY */}
            <MemorySection />

            {/* SECTION 08 — ACT */}
            <ActSection />

            {/* SECTION 09 — HUMAN GATE */}
            <HumanGateSection />

            {/* SECTION 11 — ROCKETRIDE */}
            <RocketRideSection />

            {/* SECTION 12 & 13 — CONTROL ROOM & CTA */}
            <ControlRoomSection />
        </div>
    );
}

// ---------------------------------------------------------
// SECTION COMPONENTS
// ---------------------------------------------------------

function AuroraBackground() {
    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
            <div className="aurora-blob w-[600px] h-[600px] bg-indigo-300/30 -top-[200px] -left-[200px]" style={{ animationDelay: '0s' }} />
            <div className="aurora-blob w-[500px] h-[500px] bg-purple-300/20 top-[20%] -right-[100px]" style={{ animationDelay: '2s' }} />
            <div className="aurora-blob w-[700px] h-[700px] bg-cyan-200/20 bottom-[-200px] left-[10%]" style={{ animationDelay: '4s' }} />
        </div>
    );
}

function HeroSection() {
    return (
        <section className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-4 pt-32 pb-20 z-10">
            
            {/* 3D Glass Image Asset */}
            <motion.div 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-[800px] opacity-40 mix-blend-multiply"
            >
                <img src="/images/hero_glass.png" alt="Abstract Glass Composition" className="w-full h-auto object-cover" />
            </motion.div>

            <ScrollReveal yOffset={40} duration={1}>
                <h1 className="text-4xl md:text-6xl lg:text-[80px] font-black tracking-tighter leading-[1.1] mb-8 text-[#111318] max-w-5xl mx-auto">
                    CHURN DOESN'T START<br />AT RENEWAL.
                </h1>
            </ScrollReveal>
            
            <div className="h-32 mb-8">
                <TrueFocus 
                    sentence="IT STARTS MUCH EARLIER."
                    borderColor="#F04438"
                    glowColor="rgba(240, 68, 56, 0.3)"
                    animationDuration={1.2}
                />
            </div>
            
            <ScrollReveal delay={2.5} yOffset={20}>
                <p className="text-xl md:text-2xl text-[#667085] font-medium">SaveFlow listens to the signals.</p>
            </ScrollReveal>
        </section>
    );
}

function SignalsSection() {
    const signalsData = [
        { label: "USAGE -31%", color: "bg-white text-[#F04438]" },
        { label: "LOGIN +12%", color: "bg-white text-[#12B76A]" },
        { label: "SUPPORT: 4 OPEN", color: "bg-white text-[#F79009]" },
        { label: "BILLING: 45 DAYS", color: "bg-white text-[#F04438]" },
        { label: "CHAMPION LEFT", color: "bg-white text-[#F04438]" },
        { label: "SESSION DROP", color: "bg-white text-[#F79009]" },
        { label: "FEATURE USED", color: "bg-white text-[#12B76A]" },
        { label: "SENTIMENT DOWN", color: "bg-white text-[#F79009]" },
        { label: "UPSELL CLICK", color: "bg-white text-[#12B76A]" },
        { label: "API LIMIT", color: "bg-white text-[#F79009]" },
    ];

    return (
        <section className="py-20 px-4 max-w-7xl mx-auto">
            <ScrollReveal className="text-center mb-10">
                <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-4">10,000 customers.<br/>Millions of signals.</h2>
                <p className="text-xl text-[#667085]">Your customers don't suddenly churn.<br/>The warning signs appear first.</p>
            </ScrollReveal>

            <FloatingSignals signals={signalsData} />
        </section>
    );
}

function WatchSection() {
    return (
        <section className="relative min-h-[120vh] px-4 max-w-7xl mx-auto flex items-start">
            <div className="sticky top-1/3 w-1/2 pr-12 space-y-6">
                <span className="text-xs font-mono font-bold text-[#5B4BDB] tracking-widest block">01 WATCH</span>
                <h2 className="text-5xl lg:text-7xl font-black tracking-tighter leading-tight">We watch<br/>everything<br/>that matters.</h2>
                <ul className="text-lg text-[#667085] space-y-2 font-medium">
                    <li className="flex items-center space-x-3"><Activity className="w-5 h-5 text-[#5B4BDB]"/> <span>Product usage</span></li>
                    <li className="flex items-center space-x-3"><FileText className="w-5 h-5 text-[#F79009]"/> <span>Billing & Invoices</span></li>
                    <li className="flex items-center space-x-3"><MessageSquare className="w-5 h-5 text-[#12B76A]"/> <span>Support tickets</span></li>
                    <li className="flex items-center space-x-3"><Users className="w-5 h-5 text-[#2E90FA]"/> <span>Relationships</span></li>
                </ul>
            </div>
            
            <div className="w-1/2 pt-[30vh] pb-[50vh]">
                <div className="relative h-[600px] w-full flex flex-col items-center justify-center glass-card rounded-3xl">
                    {/* Animated Network forming */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1 }}
                        viewport={{ once: false, amount: 0.5 }}
                        className="relative w-full h-full flex items-center justify-center"
                    >
                        <div className="w-24 h-24 rounded-full bg-[#111318] flex items-center justify-center z-10 shadow-xl">
                            <span className="text-white font-mono text-xs font-bold">CUST-001</span>
                        </div>
                        {/* Connecting lines */}
                        <svg className="absolute inset-0 w-full h-full" overflow="visible">
                            <motion.path d="M 100 100 Q 200 200 350 300" stroke="#5B4BDB" strokeWidth="2" strokeDasharray="5,5" fill="none" initial={{pathLength:0}} whileInView={{pathLength:1}} transition={{duration:1.5}} />
                            <motion.path d="M 600 100 Q 450 200 350 300" stroke="#F79009" strokeWidth="2" strokeDasharray="5,5" fill="none" initial={{pathLength:0}} whileInView={{pathLength:1}} transition={{duration:1.5, delay:0.2}} />
                            <motion.path d="M 100 500 Q 200 400 350 300" stroke="#F04438" strokeWidth="2" strokeDasharray="5,5" fill="none" initial={{pathLength:0}} whileInView={{pathLength:1}} transition={{duration:1.5, delay:0.4}} />
                            <motion.path d="M 600 500 Q 450 400 350 300" stroke="#2E90FA" strokeWidth="2" strokeDasharray="5,5" fill="none" initial={{pathLength:0}} whileInView={{pathLength:1}} transition={{duration:1.5, delay:0.6}} />
                        </svg>
                        
                        {/* Signal tags at ends */}
                        <div className="absolute top-[80px] left-[60px] bg-white px-3 py-1 rounded shadow-sm text-xs font-mono text-[#5B4BDB] font-bold">USAGE</div>
                        <div className="absolute top-[80px] right-[60px] bg-white px-3 py-1 rounded shadow-sm text-xs font-mono text-[#F79009] font-bold">BILLING</div>
                        <div className="absolute bottom-[80px] left-[60px] bg-white px-3 py-1 rounded shadow-sm text-xs font-mono text-[#F04438] font-bold">SUPPORT</div>
                        <div className="absolute bottom-[80px] right-[60px] bg-white px-3 py-1 rounded shadow-sm text-xs font-mono text-[#2E90FA] font-bold">CONTACT</div>
                    </motion.div>
                    
                    <p className="absolute bottom-10 text-center text-sm font-mono text-[#667085]">
                        One customer.<br/>Hundreds of signals.
                    </p>
                </div>
            </div>
        </section>
    );
}

function PredictSection() {
    return (
        <section className="py-32 px-4 max-w-5xl mx-auto text-center space-y-16">
            <ScrollReveal>
                <span className="text-xs font-mono font-bold text-[#5B4BDB] tracking-widest block mb-4">02 PREDICT</span>
                <p className="text-xl text-[#667085] font-medium max-w-2xl mx-auto">
                    The scattered signals collapse into a single risk score via RocketRide's multi-agent analysis.
                </p>
            </ScrollReveal>

            <div className="relative h-[400px] w-full max-w-3xl mx-auto glass-card rounded-3xl p-8 flex items-center justify-center overflow-hidden">
                <div className="absolute left-8 flex flex-col justify-between h-64 w-32 space-y-4">
                    <AgentBlock name="Usage" color="text-[#5B4BDB]" border="border-[#5B4BDB]/20" bg="bg-[#5B4BDB]/5" />
                    <AgentBlock name="Billing" color="text-[#F79009]" border="border-[#F79009]/20" bg="bg-[#F79009]/5" />
                    <AgentBlock name="Support" color="text-[#F04438]" border="border-[#F04438]/20" bg="bg-[#F04438]/5" />
                    <AgentBlock name="Contact" color="text-[#2E90FA]" border="border-[#2E90FA]/20" bg="bg-[#2E90FA]/5" />
                </div>

                <div className="absolute inset-0">
                    <AnimatedSVGPath pathD="M 160 90 L 300 90 L 400 200" strokeWidth={2} stroke="#5B4BDB" className="w-full h-full" />
                    <AnimatedSVGPath pathD="M 160 160 L 250 160 L 400 200" strokeWidth={2} stroke="#F79009" className="w-full h-full" />
                    <AnimatedSVGPath pathD="M 160 240 L 250 240 L 400 200" strokeWidth={2} stroke="#F04438" className="w-full h-full" />
                    <AnimatedSVGPath pathD="M 160 310 L 300 310 L 400 200" strokeWidth={2} stroke="#2E90FA" className="w-full h-full" />
                </div>

                <ScrollReveal delay={0.5} className="z-10 ml-64 bg-white p-8 rounded-full shadow-[0_0_50px_rgba(240,68,56,0.15)] border-4 border-[#F04438]/10">
                    <span className="block text-[80px] font-black text-[#F04438] leading-none tracking-tighter">94%</span>
                    <span className="block text-xs font-mono font-bold text-[#F04438] mt-2 tracking-widest uppercase">Churn Risk</span>
                </ScrollReveal>
            </div>
        </section>
    );
}

function AgentBlock({ name, color, border, bg }) {
    return (
        <div className={`p-3 rounded-lg border ${border} ${bg} flex items-center justify-center z-10`}>
            <span className={`text-xs font-mono font-bold ${color}`}>{name} Agent</span>
        </div>
    );
}

function ExplainSection() {
    return (
        <section className="py-32 px-4 max-w-4xl mx-auto">
            <ScrollReveal className="text-center mb-16">
                <span className="text-xs font-mono font-bold text-[#5B4BDB] tracking-widest block mb-4">03 EXPLAIN</span>
                <h2 className="text-5xl lg:text-7xl font-black tracking-tighter mb-6">A number isn't enough.<br/>We show you why.</h2>
            </ScrollReveal>

            <div className="glass-card rounded-3xl p-10">
                <div className="flex items-center justify-between border-b border-black/10 pb-6 mb-8">
                    <div>
                        <h3 className="text-3xl font-black text-[#111318]">ACME CORP</h3>
                        <p className="text-[#667085] font-mono text-sm mt-1">Enterprise Plan • $221k ARR</p>
                    </div>
                    <div className="text-right">
                        <span className="block text-4xl font-black text-[#F04438]">94%</span>
                        <span className="text-xs font-mono font-bold text-[#F04438] uppercase">Churn Risk</span>
                    </div>
                </div>

                <div className="relative border-l-2 border-[#F2F4F7] ml-4 space-y-10 py-4">
                    <TimelineNode day="30 DAYS AGO" title="Healthy" color="bg-[#12B76A]" delay={0.1} />
                    <TimelineNode day="21 DAYS AGO" title="Usage declined 31%" color="bg-[#F79009]" delay={0.3} />
                    <TimelineNode day="14 DAYS AGO" title="Support sentiment dropped" color="bg-[#F79009]" delay={0.5} />
                    <TimelineNode day="7 DAYS AGO" title="Invoice overdue" color="bg-[#F04438]" delay={0.7} />
                    <TimelineNode day="3 DAYS AGO" title="Champion departed" color="bg-[#F04438]" delay={0.9} />
                    <TimelineNode day="TODAY" title="94% Critical Risk" color="bg-[#F04438]" delay={1.1} isLast />
                </div>
            </div>
        </section>
    );
}

function TimelineNode({ day, title, color, delay, isLast }) {
    return (
        <ScrollReveal delay={delay} yOffset={20} className="relative pl-8">
            <div className={`absolute -left-[9px] top-1.5 w-4 h-4 rounded-full border-4 border-white ${color} shadow-sm`} />
            <span className="text-xs font-mono font-bold text-[#98A2B3] tracking-widest block mb-1">{day}</span>
            <span className={`text-xl font-bold ${isLast ? 'text-[#F04438]' : 'text-[#111318]'}`}>{title}</span>
        </ScrollReveal>
    );
}

function DecideSection() {
    return (
        <section className="py-32 px-4 max-w-5xl mx-auto text-center">
            <ScrollReveal>
                <span className="text-xs font-mono font-bold text-[#5B4BDB] tracking-widest block mb-4">04 DECIDE</span>
                <h2 className="text-5xl lg:text-7xl font-black tracking-tighter mb-16">So what should we do?</h2>
            </ScrollReveal>

            <div className="h-[400px] relative flex items-center justify-center">
                {/* Floating Options */}
                <motion.div 
                    initial={{ opacity: 1, y: -50 }}
                    whileInView={{ opacity: 0, y: -100 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    viewport={{ once: false, amount: 0.8 }}
                    className="absolute top-10 left-1/4 px-6 py-3 rounded-xl glass-card text-[#98A2B3] font-bold line-through"
                >
                    MONITOR
                </motion.div>

                <motion.div 
                    initial={{ opacity: 1, y: 50 }}
                    whileInView={{ opacity: 0.2, y: 100 }}
                    transition={{ duration: 1, delay: 0.8 }}
                    viewport={{ once: false, amount: 0.8 }}
                    className="absolute bottom-10 right-1/4 px-6 py-3 rounded-xl glass-card text-[#667085] font-bold"
                >
                    CSM OUTREACH
                </motion.div>

                {/* The Winner */}
                <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 1.2, type: 'spring' }}
                    viewport={{ once: false, amount: 0.8 }}
                    className="z-10 bg-[#5B4BDB] text-white p-8 rounded-2xl shadow-[0_20px_50px_rgba(91,75,219,0.3)] holo-border flex flex-col items-center max-w-sm"
                >
                    <span className="text-xs font-mono font-bold text-white/70 tracking-widest block mb-2">RECOMMENDED PLAYBOOK</span>
                    <h3 className="text-2xl font-black mb-4">EXECUTIVE RESCUE</h3>
                    <div className="w-full h-px bg-white/20 mb-4" />
                    <ul className="text-sm font-medium text-white/90 text-left w-full space-y-2">
                        <li>• Current risk context</li>
                        <li>• Customer MRR tier</li>
                        <li>• Historical outcome matching</li>
                    </ul>
                </motion.div>
            </div>
        </section>
    );
}

function MemorySection() {
    return (
        <section className="py-20 px-4 max-w-5xl mx-auto">
            <ScrollReveal className="text-center mb-16">
                <span className="text-xs font-mono font-bold text-[#5B4BDB] tracking-widest block mb-4">LEARNING / MEMORY</span>
                <h2 className="text-4xl font-black tracking-tighter mb-4">SaveFlow doesn't just predict.<br/>It remembers what worked.</h2>
            </ScrollReveal>

            <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
                <div className="space-y-4">
                    <MemoryNode name="NOVA" score="87%" status="Churned" color="border-[#F04438] text-[#F04438]" delay={0.2} />
                    <MemoryNode name="ORBIT" score="93%" status="Saved" color="border-[#12B76A] text-[#12B76A]" delay={0.4} />
                    <MemoryNode name="PIXCEL" score="89%" status="Saved" color="border-[#12B76A] text-[#12B76A]" delay={0.6} />
                </div>
                
                <div className="hidden md:block w-32 h-px bg-[#E6E8EC] relative">
                    <motion.div 
                        initial={{ scaleX: 0, transformOrigin: 'left' }}
                        whileInView={{ scaleX: 1 }}
                        transition={{ duration: 1, delay: 0.8 }}
                        className="absolute inset-0 bg-gradient-to-r from-[#5B4BDB] to-[#F04438] origin-left"
                    />
                </div>

                <ScrollReveal delay={1} className="p-8 rounded-3xl glass-card text-center holo-border">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#5B4BDB] to-[#F04438] shadow-[0_0_30px_rgba(91,75,219,0.5)] mx-auto mb-4 flex items-center justify-center">
                        <Brain className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="font-bold text-lg text-[#111318] mb-1">Vector Memory</h4>
                    <p className="text-sm text-[#667085]">Compounding outcomes<br/>feed the AI engine.</p>
                </ScrollReveal>
            </div>
        </section>
    );
}

function MemoryNode({ name, score, status, color, delay }) {
    return (
        <ScrollReveal delay={delay} xOffset={-20} className={`w-56 p-4 rounded-xl soft-ui flex items-center justify-between ${color}`}>
            <div>
                <span className="block font-black text-[#111318]">{name}</span>
                <span className="text-xs font-mono">{score} risk</span>
            </div>
            <span className="text-xs font-bold uppercase">{status}</span>
        </ScrollReveal>
    );
}

function ActSection() {
    return (
        <section className="py-32 px-4 max-w-4xl mx-auto">
            <ScrollReveal className="text-center mb-16">
                <span className="text-xs font-mono font-bold text-[#5B4BDB] tracking-widest block mb-4">05 ACT</span>
                <h2 className="text-5xl lg:text-7xl font-black tracking-tighter mb-4">Knowing what to do<br/>isn't enough.</h2>
            </ScrollReveal>

            <div className="space-y-4 max-w-md mx-auto font-mono text-sm">
                <ActionItem text="CSM TASK CREATED" delay={0.2} success />
                <ActionItem text="OUTREACH PREPARED" delay={0.6} success />
                <ActionItem text="MEETING SCHEDULED" delay={1.0} success />
                
                <ScrollReveal delay={1.6} yOffset={20} className="mt-8 pt-8 border-t border-[#E6E8EC]">
                    <div className="p-6 rounded-xl bg-[#FFF4ED] border border-[#FFD8B5] flex flex-col items-center text-center space-y-4">
                        <div className="w-12 h-12 rounded-full bg-[#F79009] flex items-center justify-center">
                            <Lock className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <span className="block font-black text-xl text-[#B54708]">15% DISCOUNT</span>
                            <span className="text-xs font-bold text-[#B54708] mt-1 block">HIGH-IMPACT ACTION STOPPED</span>
                        </div>
                        <span className="inline-block px-3 py-1 bg-white rounded text-[10px] font-bold text-[#F79009] border border-[#FFD8B5]">
                            HUMAN APPROVAL REQUIRED
                        </span>
                    </div>
                </ScrollReveal>
            </div>
        </section>
    );
}

function ActionItem({ text, delay, success }) {
    return (
        <ScrollReveal delay={delay} className="flex items-center justify-between p-4 rounded-xl glass-card text-[#111318]">
            <span className="font-bold text-[#111318]">{text}</span>
            {success && <Check className="w-5 h-5 text-[#12B76A]" />}
        </ScrollReveal>
    );
}

function HumanGateSection() {
    // Interactive transition
    const [approved, setApproved] = useState(false);

    return (
        <section className={`py-40 px-4 transition-colors duration-1000 ${approved ? 'bg-[#FAFAFC]' : 'bg-[#090A0B]'}`}>
            <div className="max-w-4xl mx-auto text-center">
                
                {!approved ? (
                    <motion.div initial={{opacity:1}} exit={{opacity:0}} className="space-y-16">
                        <div>
                            <span className="text-xs font-mono font-bold text-[#F04438] tracking-widest block mb-6">06 HUMAN GATE</span>
                            <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-white leading-tight">
                                THE AI KNOWS<br/>WHAT IT WANTS TO DO.<br/>
                                <span className="text-[#98A2B3]">BUT YOU HAVE<br/>THE FINAL SAY.</span>
                            </h2>
                        </div>

                        <div className="max-w-md mx-auto p-8 rounded-2xl bg-[#18181B] border border-[#27272A] shadow-2xl text-left space-y-6">
                            <div className="flex justify-between items-start border-b border-[#27272A] pb-4">
                                <div>
                                    <h3 className="text-2xl font-black text-white">ACME CORP</h3>
                                    <span className="text-xs font-mono text-[#98A2B3]">₹18.4L ARR</span>
                                </div>
                                <div className="text-right">
                                    <span className="block text-3xl font-black text-[#F04438]">94%</span>
                                    <span className="text-[10px] font-mono font-bold text-[#F04438] uppercase">Churn Risk</span>
                                </div>
                            </div>

                            <div>
                                <span className="text-xs font-mono font-bold text-[#5B4BDB] block mb-1">RECOMMENDED ACTION</span>
                                <p className="text-lg font-bold text-white">15% Retention Offer</p>
                                <p className="text-xs text-[#98A2B3] mt-1">Confidence: 93%</p>
                            </div>

                            <div className="grid grid-cols-2 gap-4 pt-4">
                                <button className="py-3 rounded-lg border border-[#3F3F46] text-[#A1A1AA] font-bold text-sm hover:bg-[#27272A] transition-colors">
                                    REJECT
                                </button>
                                <button 
                                    onClick={() => setApproved(true)}
                                    className="py-3 rounded-lg bg-[#5B4BDB] text-white font-bold text-sm hover:bg-[#4C38CA] transition-colors shadow-[0_0_20px_rgba(91,75,219,0.4)]"
                                >
                                    APPROVE
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }} 
                        animate={{ opacity: 1, scale: 1 }} 
                        transition={{ duration: 0.8 }}
                        className="py-20"
                    >
                        {/* SECTION 10 — LEARN (Revealed on click) */}
                        <div className="space-y-12">
                            <span className="text-xs font-mono font-bold text-[#12B76A] tracking-widest block">07 LEARN</span>
                            
                            <div className="flex flex-col items-center justify-center space-y-6 font-mono text-sm font-bold text-[#111318]">
                                <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{delay:0.2}} className="px-6 py-3 bg-white border border-[#E6E8EC] rounded-full shadow-sm">
                                    INTERVENTION EXECUTED
                                </motion.div>
                                <div className="h-8 w-px bg-[#E6E8EC]"></div>
                                <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{delay:0.8}} className="px-6 py-3 bg-[#ECFDF3] border border-[#A6F4C5] text-[#027A48] rounded-full shadow-sm">
                                    CUSTOMER SAVED
                                </motion.div>
                                <div className="h-8 w-px bg-[#E6E8EC]"></div>
                                <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{delay:1.4}} className="px-6 py-3 bg-white border border-[#E6E8EC] rounded-full shadow-sm">
                                    OUTCOME RECORDED
                                </motion.div>
                                <div className="h-8 w-px bg-[#E6E8EC]"></div>
                                <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{delay:2.0}} className="px-6 py-3 bg-[#F5F3FF] border border-[#D9D6FE] text-[#5B4BDB] rounded-full shadow-sm flex items-center space-x-2">
                                    <Brain className="w-4 h-4"/> <span>MEMORY UPDATED</span>
                                </motion.div>
                            </div>

                            <motion.h2 
                                initial={{opacity:0}} animate={{opacity:1}} transition={{delay:3.0}}
                                className="text-4xl md:text-6xl font-black tracking-tighter text-[#111318] pt-12"
                            >
                                NEXT TIME,<br/>SAVEFLOW KNOWS MORE.
                            </motion.h2>
                        </div>
                    </motion.div>
                )}

            </div>
        </section>
    );
}

function RocketRideSection() {
    return (
        <section className="relative py-32 px-4 min-h-screen flex items-center justify-center overflow-hidden z-10">
            {/* Generated Image Background for Engine */}
            <div className="absolute inset-0 z-0">
                <img src="/images/engine_glass.png" alt="RocketRide Engine" className="w-full h-full object-cover opacity-[0.15] mix-blend-multiply" />
            </div>
            
            <div className="max-w-5xl mx-auto relative z-10 w-full">
                <ScrollReveal className="mb-16 text-center">
                    <span className="text-xs font-mono font-bold text-[#5B4BDB] tracking-widest block mb-4 uppercase">The Engine</span>
                    <h2 className="text-4xl lg:text-6xl font-black tracking-tighter mb-4">Powered by RocketRide.</h2>
                    <p className="text-[#667085] text-xl">Not just an API call. A full autonomous graph performing work.</p>
                </ScrollReveal>

                {/* Interactive DAG mockup */}
                <div className="p-8 rounded-3xl glass-card overflow-x-auto holo-border shadow-2xl">
                    <div className="flex items-center justify-between mb-8 pb-4 border-b border-black/10">
                        <span className="font-mono text-sm font-bold text-[#111318]">master_churn.pipe</span>
                        <span className="flex items-center space-x-2 text-xs font-mono text-[#12B76A] bg-[#ECFDF3] px-3 py-1 rounded-full shadow-sm">
                            <span className="w-2 h-2 rounded-full bg-[#12B76A] animate-pulse"></span>
                            <span>Active</span>
                        </span>
                    </div>

                    <div className="flex items-center space-x-8 min-w-[800px] text-xs font-mono font-bold">
                        <div className="p-4 soft-ui rounded-xl text-[#98A2B3]">INPUT</div>
                        <ArrowRight className="w-4 h-4 text-[#98A2B3]" />
                        
                        <div className="flex flex-col space-y-4">
                            <div className="p-4 soft-ui rounded-xl text-[#5B4BDB]">Usage Agent</div>
                            <div className="p-4 soft-ui rounded-xl text-[#F79009]">Billing Agent</div>
                            <div className="p-4 soft-ui rounded-xl text-[#F04438]">Support Agent</div>
                        </div>

                        <ArrowRight className="w-4 h-4 text-[#98A2B3]" />
                        <div className="p-5 bg-gradient-to-r from-[#111318] to-[#2A2F3D] text-white rounded-xl shadow-lg holo-border">Churn Agent</div>
                        <ArrowRight className="w-4 h-4 text-[#98A2B3]" />
                        <div className="p-4 soft-ui rounded-xl flex items-center text-[#111318]"><Brain className="w-4 h-4 mr-2 text-[#5B4BDB]"/>Memory</div>
                        <ArrowRight className="w-4 h-4 text-[#98A2B3]" />
                        <div className="p-4 soft-ui rounded-xl text-[#F04438]">Policy Gate</div>
                        <ArrowRight className="w-4 h-4 text-[#98A2B3]" />
                        <div className="p-4 soft-ui rounded-xl text-[#111318]">Action</div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function ControlRoomSection() {
    return (
        <section className="py-32 px-4 max-w-4xl mx-auto text-center space-y-16">
            <ScrollReveal>
                <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-[#111318] leading-tight">
                    Everything you've seen<br/>comes together here.
                </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.3} className="space-y-8 z-10">
                <div className="p-2 rounded-3xl glass-card shadow-2xl holo-border relative">
                    <div className="absolute inset-0 bg-white/40 rounded-3xl backdrop-blur-3xl z-[-1]"></div>
                    <div className="bg-white/60 rounded-2xl p-8 border border-white/40 h-64 flex flex-col items-center justify-center text-[#111318] shadow-inner">
                        <Activity className="w-12 h-12 mb-4 opacity-50 text-[#5B4BDB]" />
                        <p className="font-mono text-sm">NovaCloud Control Room Preview</p>
                    </div>
                </div>

                <div className="pt-16 pb-8">
                    <h3 className="text-3xl font-black mb-8">THE SIGNALS ARE ALREADY THERE.<br/>ARE YOU LISTENING?</h3>
                    <NavLink
                        to="/dashboard"
                        className="inline-block px-10 py-5 rounded-full bg-[#111318] hover:bg-[#2A2F3D] text-white font-bold text-sm shadow-xl transition-transform hover:scale-105 active:scale-95"
                    >
                        Enter NovaCloud Control Room →
                    </NavLink>
                    <p className="text-xs font-mono text-[#667085] mt-6">Powered by RocketRide.</p>
                </div>
            </ScrollReveal>
        </section>
    );
}
