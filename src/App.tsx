/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import endOf2025Photo from './assets/photos/endof2025.png';
import OakridgeTeam2025 from './assets/photos/2025OakridgeTeam.jpg';
import {
  Instagram,
  Twitter,
  Music,
  Camera,
  Globe,
  Volleyball,
  ArrowRight,
} from 'lucide-react';

const PASSIONS = [
  {
    id: "volleyball",
    title: "On the Court",
    category: "Athletics",
    Icon: Volleyball,
    color: "#e2437a",
    image: "https://picsum.photos/seed/terra-volley3/1200/1600",
    description: "Competing at the highest level with Gold Cal Jrs and High School Varsity. The court is where focus becomes instinct.",
    highlight:
      "Discipline on the court translates to precision in the studio. Whether I'm setting a perfect ball or mastering a new language, the goal is always excellence.",
    tags: ["Gold Cal Jrs", "Varsity", "Setter"],
    stats: [
      { label: "Rank (All)", value: "#12,358" },
      { label: "U15 Rank", value: "#2,040" },
      { label: "Elo Rating", value: "1,536" },
      { label: "Record", value: "14–9" },
      { label: "Win Rate", value: "61%" },
    ],
  },
  {
    id: "photography",
    title: "Through the Lens",
    category: "Photography",
    Icon: Camera,
    color: "#7c3aed",
    image: endOf2025Photo,
    description: "Slowing down to see the world with intention. Every frame a choice, every shot a story.",
    tags: ["Portrait", "Editorial", "Street"],
    gallery: [
      { id: "g1", src: endOf2025Photo,  label: "Editorial" },
      { id: "g2", src: OakridgeTeam2025, label: "Portrait" },
      { id: "g3", src: "https://picsum.photos/seed/terra-street7/800/1100",  label: "Street" },
      { id: "g4", src: "https://picsum.photos/seed/terra-golden5/800/1100",  label: "Golden Hour" },
    ],
  },
  {
    id: "music",
    title: "Sonic Worlds",
    category: "Music",
    Icon: Music,
    color: "#0d9488",
    image: "https://picsum.photos/seed/terra-sonic2/900/1200",
    description: "Composition and sound design as a second language — building worlds out of rhythm and texture.",
    tags: ["Composition", "Production", "Sound Design"],
  },
  {
    id: "languages",
    title: "Two Worlds",
    category: "Languages",
    Icon: Globe,
    color: "#ea7c17",
    image: "https://picsum.photos/seed/terra-europe/900/1200",
    description: "Italian and Spanish — two windows into culture, history, and a deeper kind of human connection.",
    tags: ["🇮🇹 Italian", "🇪🇸 Spanish"],
  },
];

const PHOTO_GALLERY = PASSIONS.find(p => p.id === 'photography')!.gallery!;

export default function App() {
  const [active, setActive] = useState(PASSIONS[0]);
  const ActiveIcon = active.Icon;

  const [photoMain, setPhotoMain] = useState(PHOTO_GALLERY[0]);
  const [photoRest, setPhotoRest] = useState(PHOTO_GALLERY.slice(1));

  const handlePhotoSwap = (clicked: typeof PHOTO_GALLERY[0]) => {
    const prevMain = photoMain;
    setPhotoMain(clicked);
    setPhotoRest(cur => [prevMain, ...cur.filter(p => p.id !== clicked.id)]);
  };

  return (
    <div className="min-h-screen bg-paper text-ink font-sans relative">
      <div className="fixed inset-0 bg-dots pointer-events-none" />

      <main className="split-pane">
        {/* ── Left Pane ── */}
        <div className="relative flex flex-col h-full bg-paper z-10 overflow-y-auto">
          <div className="p-8 md:p-12 lg:p-16 flex flex-col flex-1 min-h-full">

            <header className="flex justify-between items-center mb-12">
              <span
                className="font-serif italic font-black text-2xl tracking-tighter transition-colors duration-700"
                style={{ color: active.color }}
              >
                T.H.
              </span>
              <div className="flex gap-5">
                <Instagram className="w-4 h-4 text-slate-300 hover:text-slate-600 transition-colors cursor-pointer" />
                <Twitter className="w-4 h-4 text-slate-300 hover:text-slate-600 transition-colors cursor-pointer" />
              </div>
            </header>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="mb-10"
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-400 font-bold">Class of 2026</span>
                <div className="h-px w-6 bg-slate-200" />
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-400 font-bold">Setter / Opposite</span>
              </div>
              <h1 className="text-huge font-black uppercase mb-5">
                Terra <br />
                <span
                  className="font-serif italic font-normal transition-colors duration-700"
                  style={{ color: active.color }}
                >
                  Himmelman
                </span>
              </h1>
              <p className="text-sm text-slate-400 font-light tracking-wide">
                Athlete · Linguist · Photographer · Musician
              </p>
            </motion.div>

            {/* Passion Cards */}
            <div className="flex flex-col gap-2.5 flex-1">
              {PASSIONS.map((passion, i) => {
                const Icon = passion.Icon;
                const isActive = active.id === passion.id;
                return (
                  <motion.button
                    key={passion.id}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 + i * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    onClick={() => setActive(passion)}
                    className="passion-card text-left"
                    style={isActive ? {
                      borderColor: passion.color + '50',
                      backgroundColor: passion.color + '08',
                    } : {}}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className="p-2.5 rounded-xl flex-shrink-0 transition-all duration-300"
                        style={{
                          backgroundColor: isActive ? passion.color + '18' : '#f1f5f9',
                          color: isActive ? passion.color : '#94a3b8',
                        }}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-baseline justify-between gap-2 mb-1">
                          <span className={`font-semibold text-sm tracking-tight transition-colors ${isActive ? 'text-slate-900' : 'text-slate-500'}`}>
                            {passion.title}
                          </span>
                          <span
                            className="font-mono text-[9px] uppercase tracking-widest font-bold flex-shrink-0 transition-colors duration-300"
                            style={{ color: isActive ? passion.color : '#cbd5e1' }}
                          >
                            {passion.category}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 font-mono leading-relaxed">
                          {passion.tags.join(' · ')}
                        </p>
                        <AnimatePresence>
                          {isActive && passion.stats && (
                            <motion.div
                              initial={{ opacity: 0, height: 0, marginTop: 0 }}
                              animate={{ opacity: 1, height: 'auto', marginTop: 12 }}
                              exit={{ opacity: 0, height: 0, marginTop: 0 }}
                              transition={{ duration: 0.3 }}
                              className="flex gap-6 pt-3 border-t border-slate-100 overflow-hidden"
                            >
                              {passion.stats.map((s, j) => (
                                <div key={j}>
                                  <div className="font-black text-sm tracking-tight text-slate-900">{s.value}</div>
                                  <div className="font-mono text-[9px] uppercase tracking-widest text-slate-400 mt-0.5">{s.label}</div>
                                </div>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </div>

            <motion.blockquote
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 1 }}
              className="my-8 pl-4 border-l-2 transition-colors duration-700"
              style={{ borderColor: active.color + '70' }}
            >
              <p className="font-serif italic text-sm leading-relaxed text-slate-500">
                "Discipline on the court translates to precision in everything I do. The goal is always excellence."
              </p>
            </motion.blockquote>

            <footer className="flex justify-between items-center pt-5 border-t border-slate-100">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-300 font-bold">
                © 2026 Terra Himmelman
              </span>
              <button className="group flex items-center gap-1.5 font-bold uppercase text-[10px] tracking-widest text-slate-400 hover:text-slate-800 transition-colors">
                Contact <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </footer>

          </div>
        </div>

        {/* ── Right Pane ── */}
        <div className="relative h-[60vh] lg:h-full bg-slate-950 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id === 'photography' ? `photo-${photoMain.id}` : active.id}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7 }}
            >
              <motion.img
                initial={{ scale: 1.06 }}
                animate={{ scale: 1 }}
                transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
                src={active.id === 'photography' ? photoMain.src : active.image}
                alt={active.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-slate-900/10" />
              <motion.div
                className="absolute inset-0 mix-blend-color"
                style={{ backgroundColor: active.color }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.2 }}
              />
            </motion.div>
          </AnimatePresence>

          <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12 lg:p-16 pointer-events-none">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id + '-text'}
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              >
                <div
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-5 pointer-events-auto"
                  style={{
                    backgroundColor: active.color + '25',
                    border: `1px solid ${active.color}55`,
                  }}
                >
                  <ActiveIcon className="w-3 h-3" style={{ color: active.color }} />
                  <span
                    className="font-mono text-[10px] uppercase tracking-widest font-bold"
                    style={{ color: active.color }}
                  >
                    {active.category}
                  </span>
                </div>
                <h2 className="font-serif italic text-5xl md:text-6xl text-white mb-4 leading-[1.05]">
                  {active.title}
                </h2>
                <p className="text-white/60 text-sm md:text-base leading-relaxed mb-8 max-w-sm font-light">
                  {active.description}
                </p>
                {active.highlight && (
                  <div
                    className="mb-8 max-w-md rounded-2xl border px-4 py-4 backdrop-blur-sm"
                    style={{
                      borderColor: active.color + '66',
                      backgroundColor: active.color + '20',
                    }}
                  >
                    <p className="font-serif italic text-white/90 text-sm md:text-base leading-relaxed">
                      {active.highlight}
                    </p>
                  </div>
                )}
                {active.id === 'photography' ? (
                  <div className="flex gap-3 pointer-events-auto">
                    {photoRest.map((photo) => (
                      <motion.div
                        key={photo.id}
                        layoutId={photo.id}
                        whileHover={{ y: -8, scale: 1.04 }}
                        onClick={() => handlePhotoSwap(photo)}
                        className="cursor-pointer group/thumb"
                      >
                        <div className="w-20 h-28 rounded-xl overflow-hidden border border-white/10 shadow-xl shadow-black/50">
                          <img
                            src={photo.src}
                            alt={photo.label}
                            className="w-full h-full object-cover opacity-50 group-hover/thumb:opacity-100 group-hover/thumb:scale-110 transition-all duration-500"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <div className="mt-2 text-[9px] font-bold uppercase tracking-widest text-white/30 group-hover/thumb:text-white/80 transition-colors text-center">
                          {photo.label}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-2 pointer-events-auto">
                    {active.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-3 py-1.5 rounded-full text-[11px] font-semibold tracking-wide text-white/60 border border-white/10 backdrop-blur-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </main>
    </div>
  );
}
