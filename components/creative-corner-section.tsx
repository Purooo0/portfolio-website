'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const tiles = [
  { label: 'DIGITAL ART',   icon: '♥', sub: 'Pixel illustrations & zines',    bg: 'bg-pink-200',   color: '#D94F8C', rotate: -3 },
  { label: 'UI CONCEPTS',   icon: '◈', sub: 'Unreleased mockups & ideas',      bg: 'bg-purple-200', color: '#6657D8', rotate: 2  },
  { label: 'JOURNALING',    icon: '★', sub: 'Reflections & notes',             bg: 'bg-orange-200', color: '#E8873D', rotate: -1.5 },
  { label: 'MUSIC FEELS',   icon: '♪', sub: 'Playlists that fuel the grind',   bg: 'bg-emerald-200',color: '#0F9F77', rotate: 3  },
  { label: 'GAME DEV',      icon: '♟', sub: 'Tiny experiments & prototypes',   bg: 'bg-blue-200',   color: '#60A5FA', rotate: -2 },
  { label: 'DEEP LEARNING', icon: '✦', sub: 'Courses, papers & rabbit holes',  bg: 'bg-yellow-200', color: '#FBBF24', rotate: 1.5 },
]

export function CreativeCornerSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="creative" ref={ref} className="py-20 px-4 relative overflow-hidden">
      {/* Animated pixel line top */}
      <div className="absolute top-0 left-0 w-full h-1 overflow-hidden" aria-hidden="true">
        <motion.div
          className="h-full"
          style={{
            background:
              'repeating-linear-gradient(90deg, #6657D8 0, #6657D8 8px, transparent 8px, transparent 16px)',
          }}
          animate={{ x: [0, 32] }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      {/* Background dot field */}
      <div className="absolute inset-0 pixel-dots opacity-25 pointer-events-none" aria-hidden="true" />

      {/* Floating corner asterisks */}
      {(
        [
          { symbol: '✦', color: '#D94F8C', top: '12%',  left: '3%',  right: undefined, bottom: undefined, delay: 0   },
          { symbol: '♥', color: '#6657D8', top: '20%',  right: '4%', left: undefined,  bottom: undefined, delay: 0.7 },
          { symbol: '◈', color: '#E8873D', bottom: '15%', left: '6%', top: undefined,  right: undefined,  delay: 1.2 },
        ] satisfies { symbol: string; color: string; top?: string; left?: string; right?: string; bottom?: string; delay: number }[]
      ).map((s, i) => (
        <motion.span
          key={i}
          className="absolute font-pixel text-[14px] pointer-events-none select-none"
          style={{ top: s.top, right: s.right, bottom: s.bottom, left: s.left, color: s.color }}
          animate={{ y: [0, -8, 0], rotate: [0, 6, -4, 0] }}
          transition={{ duration: 3 + i * 0.4, delay: s.delay, repeat: Infinity }}
          aria-hidden="true"
        >
          {s.symbol}
        </motion.span>
      ))}

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
          className="mb-12 text-center"
        >
          {/* Spinning diamond decoration */}
          <div className="flex justify-center mb-4" aria-hidden="true">
            <motion.div
              className="w-8 h-8 pixel-border-3 bg-primary pixel-shadow"
              animate={{ rotate: [0, 90, 180, 270, 360] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            />
          </div>

          <div className="inline-flex items-center gap-0 pixel-border-3 overflow-hidden pixel-shadow">
            <div className="bg-pink-300 px-3 py-2 flex gap-1" aria-hidden="true">
              <div className="w-3 h-3 pixel-border bg-[#FFFFFF]" />
              <div className="w-3 h-3 pixel-border bg-[#FFFFFF]" />
            </div>
            <div className="bg-foreground px-4 py-2">
              <span className="font-pixel text-[9px] text-background">EXTRAS.dat</span>
            </div>
          </div>
          <h2 className="font-pixel text-[14px] sm:text-[20px] text-foreground mt-4 leading-loose">
            CREATIVE CORNER
          </h2>
          <p className="font-pixel-body text-[12px] text-muted-foreground mt-1 max-w-sm mx-auto">
            Things I do beyond code — when the screen glows a little differently.
          </p>
        </motion.div>

        {/* Scattered tile grid — intentionally rotated and non-uniform */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
          {tiles.map((tile, i) => (
            <motion.div
              key={tile.label}
              initial={{ opacity: 0, scale: 0.7, rotate: tile.rotate * 2 }}
              animate={isInView ? { opacity: 1, scale: 1, rotate: tile.rotate } : {}}
              transition={{ duration: 0.45, delay: 0.08 + i * 0.08, type: 'spring', stiffness: 180 }}
              whileHover={{ scale: 1.08, rotate: 0, zIndex: 10 }}
              style={{ boxShadow: `4px 4px 0 #241F2B` }}
              className={`${tile.bg} pixel-border-3 p-4 flex flex-col items-center gap-2 cursor-default relative overflow-hidden`}
            >
              {/* Animated bounce icon */}
              <motion.span
                className="font-pixel text-[24px] text-foreground"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 1.6 + i * 0.2, delay: i * 0.3, repeat: Infinity, ease: 'easeInOut' }}
                aria-hidden="true"
              >
                {tile.icon}
              </motion.span>
              <span className="font-pixel text-[7px] text-foreground text-center leading-loose">
                {tile.label}
              </span>
              <span className="font-pixel-body text-[9px] text-muted-foreground text-center leading-snug">
                {tile.sub}
              </span>

              {/* Pulsing corner accent */}
              <motion.div
                className="absolute bottom-0 right-0 w-5 h-5 pixel-border"
                style={{ background: tile.color, borderColor: '#241F2B' }}
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2, delay: i * 0.3, repeat: Infinity }}
                aria-hidden="true"
              />
            </motion.div>
          ))}
        </div>

        {/* Animated bottom status bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7 }}
          className="mt-8 pixel-border-3 bg-foreground pixel-shadow px-5 py-3 flex items-center justify-between"
        >
          <motion.p
            animate={{ opacity: [1, 0.35, 1] }}
            transition={{ duration: 2.5, repeat: Infinity }}
            className="font-pixel text-[8px] text-primary"
          >
            &gt; CREATIVITY IS THE STAT THAT SCALES FOREVER_
          </motion.p>
          <div className="flex gap-1.5" aria-hidden="true">
            {['#D94F8C', '#6657D8', '#E8873D', '#0F9F77'].map((c, i) => (
              <motion.div
                key={i}
                className="w-3 h-3 pixel-border"
                style={{ background: c }}
                animate={{ scale: [1, 1.35, 1] }}
                transition={{ duration: 1, delay: i * 0.2, repeat: Infinity }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
