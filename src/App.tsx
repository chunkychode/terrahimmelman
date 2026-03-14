/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, useSpring, useTransform, useInView } from 'motion/react';
import { 
  Instagram, 
  Twitter, 
  Github, 
  Mail, 
  Volleyball, 
  Music, 
  Languages, 
  Trophy, 
  Activity, 
  Target, 
  Zap, 
  Globe,
  ArrowUpRight,
  ExternalLink,
  Menu,
  X,
  ArrowRight,
  Hash,
  TrendingUp,
  TrendingDown,
  Minus
} from 'lucide-react';

const Counter = ({ value, prefix = "", suffix = "", decimals = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  
  const spring = useSpring(0, {
    mass: 1,
    stiffness: 70,
    damping: 20,
  });

  const display = useTransform(spring, (current) => {
    const formatted = current.toLocaleString(undefined, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
    return `${prefix}${formatted}${suffix}`;
  });

  useEffect(() => {
    if (isInView) {
      const timeout = setTimeout(() => spring.set(value), 200);
      return () => clearTimeout(timeout);
    }
  }, [isInView, value, spring]);

  return (
    <motion.span 
      ref={ref}
      initial={{ opacity: 0, filter: "blur(4px)" }}
      animate={isInView ? { opacity: 1, filter: "blur(0px)" } : {}}
      transition={{ duration: 0.5 }}
    >
      {display}
    </motion.span>
  );
};

const SEASON_STATS = [
  { label: "Rank (All)", value: 12358, prefix: "#", trend: "up", icon: Hash },
  { label: "Rank (U15)", value: 2040, prefix: "#", trend: "up", icon: Target },
  { label: "Elo Rating", value: 1536, trend: "stable", icon: Zap },
  { label: "Record", value: "14-9", isStatic: true, trend: "positive", icon: Trophy },
  { label: "Win %", value: 61, suffix: "%", trend: "positive", icon: Activity },
];

const INITIAL_PROJECTS = [
  {
    id: "00",
    title: "Main Performance",
    category: "Athletics",
    tags: ["Varsity", "Setter"],
    image: "https://picsum.photos/seed/terra-volleyball/1200/1600",
    description: "The core of my athletic journey. High-stakes competition and elite performance."
  },
  {
    id: "01",
    title: "Court Vision",
    category: "Athletics",
    tags: ["Gold Cal", "Setter"],
    image: "https://picsum.photos/seed/court/800/500",
    description: "Strategic analysis and high-speed decision making on the court."
  },
  {
    id: "02",
    title: "Polyglot Hub",
    category: "Linguistics",
    tags: ["French", "Japanese"],
    image: "https://picsum.photos/seed/lang/800/500",
    description: "Exploring the intersection of culture and communication."
  },
  {
    id: "03",
    title: "Sonic Waves",
    category: "Creative",
    tags: ["Ableton", "Audio"],
    image: "https://picsum.photos/seed/music-prod/800/500",
    description: "Experimental sound design and digital audio production."
  }
];

export default function App() {
  const [activeProject, setActiveProject] = useState(INITIAL_PROJECTS[0]);
  const [otherProjects, setOtherProjects] = useState(INITIAL_PROJECTS.slice(1));

  const handleSwap = (clickedProject) => {
    const prevActive = activeProject;
    setActiveProject(clickedProject);
    setOtherProjects(prev => {
      const filtered = prev.filter(p => p.id !== clickedProject.id);
      return [prevActive, ...filtered].sort((a, b) => a.id.localeCompare(b.id));
    });
  };

  return (
    <div className="min-h-screen bg-paper text-ink font-sans selection:bg-accent/20 selection:text-accent relative">
      <div className="fixed inset-0 bg-dots pointer-events-none opacity-50" />
      
      <main className="split-pane">
        {/* Left Pane: Identity & Stats */}
        <div className="relative p-8 md:p-16 lg:p-24 flex flex-col justify-between h-full bg-paper z-10">
          <header className="flex justify-between items-center mb-16">
            <div className="font-serif italic font-black text-3xl tracking-tighter text-accent">T.H.</div>
            <div className="flex gap-8">
              <Instagram className="w-5 h-5 text-slate-400 hover:text-accent transition-all cursor-pointer" />
              <Twitter className="w-5 h-5 text-slate-400 hover:text-accent transition-all cursor-pointer" />
            </div>
          </header>

          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-center gap-4 mb-8">
                <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full font-mono text-[10px] uppercase tracking-widest font-bold">Class of 2026</span>
                <div className="h-px w-8 bg-slate-200" />
                <span className="font-mono text-[10px] uppercase tracking-widest text-slate-400">Setter / Opposite</span>
              </div>

              <h1 className="text-huge font-black uppercase mb-10">
                Terra <br />
                <span className="font-serif italic font-normal text-accent/80">Himmelman</span>
              </h1>

              <p className="text-xl md:text-2xl leading-relaxed text-slate-500 mb-16 max-w-lg font-light">
                Elite athlete competing with Gold Cal Jrs and High School Varsity. 
                Driven by precision on the court and curiosity in linguistics and sound.
              </p>

              {/* Enhanced Stats Bento Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {SEASON_STATS.map((stat, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    whileHover={{ y: -5, scale: 1.02 }}
                    className="stat-card group"
                  >
                    <div className="relative z-10">
                      <div className="flex justify-between items-start mb-6">
                        <div className="p-2 rounded-xl bg-slate-50 text-slate-400 group-hover:bg-accent/10 group-hover:text-accent transition-colors">
                          {stat.icon && <stat.icon className="w-4 h-4" />}
                        </div>
                        <div className="flex items-center gap-1.5">
                          {stat.trend === 'up' || stat.trend === 'positive' ? (
                            <TrendingUp className="w-3 h-3 text-emerald-500" />
                          ) : stat.trend === 'stable' ? (
                            <Minus className="w-3 h-3 text-slate-300" />
                          ) : (
                            <TrendingDown className="w-3 h-3 text-rose-500" />
                          )}
                        </div>
                      </div>
                      <div className="font-black text-3xl tracking-tighter mb-1 text-slate-900">
                        {stat.isStatic ? stat.value : <Counter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />}
                      </div>
                      <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-slate-400 font-bold">{stat.label}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          <footer className="mt-20 flex justify-between items-end">
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-slate-300 font-bold">
              © 2026 • Performance Portfolio
            </div>
            <button className="group flex items-center gap-3 font-bold uppercase text-xs tracking-widest text-slate-900 hover:text-accent transition-all">
              Contact <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </footer>
        </div>

        {/* Right Pane: Visuals & Secondary Content */}
        <div className="relative h-[60vh] lg:h-full bg-slate-950 overflow-y-auto scrollbar-hide">
          {/* Hero Image */}
          <div className="h-full relative group overflow-hidden">
            <motion.img 
              key={activeProject.id}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 0.6, scale: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              src={activeProject.image} 
              alt={activeProject.title} 
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:opacity-80 transition-all duration-[2s] ease-out"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/20 to-slate-950" />
            
            {/* Overlay Content */}
            <div className="absolute bottom-0 left-0 p-8 md:p-16 lg:p-24 w-full">
              <div className="flex justify-between items-end">
                <div className="flex flex-col gap-8">
                  <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/40 font-bold">Featured Drops</div>
                  <div className="flex gap-6">
                    {otherProjects.map((p) => (
                      <motion.div 
                        key={p.id} 
                        layoutId={p.id}
                        whileHover={{ y: -10 }}
                        onClick={() => handleSwap(p)}
                        className="group/item cursor-pointer"
                      >
                        <div className="w-28 h-40 rounded-2xl overflow-hidden mb-4 border border-white/10 shadow-2xl shadow-black/50">
                          <img src={p.image} alt={p.title} className="w-full h-full object-cover opacity-40 group-hover/item:opacity-100 group-hover/item:scale-110 transition-all duration-700" referrerPolicy="no-referrer" />
                        </div>
                        <div className="text-[10px] font-bold uppercase tracking-widest text-white/40 group-hover/item:text-white transition-colors">{p.title}</div>
                      </motion.div>
                    ))}
                  </div>
                </div>
                <div className="rail-text">Scroll for Details</div>
              </div>
            </div>
          </div>

          {/* Additional Content */}
          <div className="p-8 md:p-16 lg:p-24 bg-slate-950 text-white">
            <div className="max-w-xl">
              <motion.section
                key={activeProject.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent mb-4 font-bold">{activeProject.category}</div>
                <h3 className="font-serif italic text-4xl mb-8 text-accent/80">{activeProject.title}</h3>
                <p className="text-white/50 text-lg leading-relaxed mb-12 font-light">
                  {activeProject.description}
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {activeProject.tags.map((tag, i) => (
                    <div key={i} className="p-6 rounded-3xl bg-white/5 border border-white/5">
                      <div className="text-xl font-bold tracking-tight">{tag}</div>
                    </div>
                  ))}
                </div>
              </motion.section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
