'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { portfolio, toolkit } from '@/lib/portfolio-data'

// Compact stat row used for profile details.
function StatLine({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="flex items-start gap-3 px-3 py-2.5 pixel-border bg-[#FFFFFF]">
      <span className="font-pixel text-[8px] mt-0.5" style={{ color }}>&gt;</span>
      <div>
        <span className="font-pixel-body text-[10px] text-muted-foreground">{label}: </span>
        <span className="font-pixel-body text-[10px] text-foreground">{value}</span>
      </div>
    </div>
  )
}

// Pulsing pixel dot
function PulseDot({ color }: { color: string }) {
  return (
    <motion.div
      className="w-3 h-3 pixel-border flex-shrink-0"
      style={{ background: color }}
      animate={{ scale: [1, 1.4, 1], opacity: [1, 0.6, 1] }}
      transition={{ duration: 1.5, repeat: Infinity }}
    />
  )
}

export function AboutSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="about" ref={ref} className="py-20 px-4 relative overflow-hidden">
      {/* Diagonal stripe accent — top-left corner */}
      <div className="absolute top-0 left-0 w-48 h-48 pointer-events-none overflow-hidden opacity-20" aria-hidden="true">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className="absolute bg-primary h-1"
            style={{
              width: `${(i + 1) * 20}px`,
              top: `${i * 18}px`,
              left: `-${i * 4}px`,
              transform: 'rotate(-30deg)',
              opacity: 0.5 + i * 0.05,
            }}
          />
        ))}
      </div>

      {/* Floating corner sprites */}
      {[
        { symbol: '♥', color: '#D94F8C', top: '10%', right: '5%', delay: 0 },
        { symbol: '★', color: '#6657D8', bottom: '15%', right: '8%', delay: 0.8 },
        { symbol: '◈', color: '#E8873D', bottom: '10%', left: '3%', delay: 0.4 },
      ].map((s, i) => (
        <motion.span
          key={i}
          className="absolute font-pixel text-[16px] pointer-events-none select-none"
          style={{ top: s.top, right: s.right, bottom: s.bottom, left: s.left, color: s.color }}
          animate={{ y: [0, -8, 0], rotate: [0, 5, -3, 0] }}
          transition={{ duration: 3, delay: s.delay, repeat: Infinity }}
          aria-hidden="true"
        >
          {s.symbol}
        </motion.span>
      ))}

      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
          className="mb-12"
        >
          {/* Pixel window header */}
          <div className="inline-flex items-center gap-0 pixel-border-3 overflow-hidden pixel-shadow">
            <div className="bg-primary px-3 py-2 flex gap-1" aria-hidden="true">
              <div className="w-3 h-3 pixel-border bg-[#FFFFFF]" />
              <div className="w-3 h-3 pixel-border bg-[#FFFFFF]" />
            </div>
            <div className="bg-foreground px-4 py-2">
              <span className="font-pixel text-[9px] text-background">ABOUT_ME.exe</span>
            </div>
          </div>
          <div className="flex items-end gap-4 mt-4">
            <h2 className="font-pixel text-[14px] sm:text-[20px] text-foreground leading-loose">
              A LITTLE ABOUT ME
            </h2>
            <motion.div
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.2, repeat: Infinity }}
              className="mb-1"
              aria-hidden="true"
            >
              <span className="font-pixel text-[12px] text-primary">►</span>
            </motion.div>
          </div>
        </motion.div>

        {/* Asymmetric 3-column layout */}
        <div className="grid lg:grid-cols-[1fr_auto_1fr] gap-6 items-start">

          {/* LEFT — bio + stats */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="flex flex-col gap-4"
          >
            {/* Bio note */}
            <div className="pixel-border-3 bg-[#FFFFFF] pixel-shadow overflow-hidden">
              <div className="bg-pink-200 px-4 py-2 pixel-border border-x-0 border-t-0 flex items-center gap-2">
                <motion.div className="w-2 h-2 bg-primary" animate={{ scale: [1,1.3,1] }} transition={{ duration: 1.2, repeat: Infinity }} />
                <span className="font-pixel text-[8px] text-foreground">PROFILE_NOTE.txt</span>
              </div>
              <div className="p-5">
                <p className="font-pixel-body text-[11px] text-foreground/80 leading-relaxed mb-3">
                  &ldquo;I&apos;m a curious builder who loves turning ideas into clear,
                  useful, and beautiful digital products.&rdquo;
                </p>
                <p className="font-sans text-foreground/60 text-sm leading-relaxed">
                  My projects span full-stack web apps, REST APIs, educational games,
                  search pipelines, Firebase dashboards, and Python-based analytics.
                </p>
              </div>
            </div>

            {/* Stat lines */}
            <div className="flex flex-col gap-1.5">
              <StatLine label="ROLE" value={portfolio.owner.role} color="#D94F8C" />
              <StatLine label="EDUCATION" value="Computer Engineering, Universitas Indonesia" color="#6657D8" />
              <StatLine label="FOCUS" value="Full-stack software + learning systems" color="#E8873D" />
              <StatLine label="STATUS" value="Open to work and projects" color="#0F9F77" />
            </div>
          </motion.div>

          {/* CENTER — vertical divider with animated dots */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
            className="hidden lg:flex flex-col items-center gap-3 py-4"
            aria-hidden="true"
          >
            {Array.from({ length: 8 }).map((_, i) => (
              <motion.div
                key={i}
                className="w-2 h-2 pixel-border"
                style={{ background: ['#D94F8C','#6657D8','#E8873D','#0F9F77'][i % 4] }}
                animate={{ scale: [1, 1.4, 1], opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1.6, delay: i * 0.18, repeat: Infinity }}
              />
            ))}
          </motion.div>

            {/* RIGHT - toolkit + quote */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.45, delay: 0.2 }}
            className="flex flex-col gap-4"
          >
            {/* Toolkit grid */}
            <div className="pixel-border-3 bg-[#FFFFFF] pixel-shadow overflow-hidden">
              <div className="bg-secondary px-4 py-2 pixel-border border-x-0 border-t-0 flex items-center justify-between">
                <span className="font-pixel text-[8px] text-foreground">TOOLKIT</span>
                <span className="font-pixel-body text-[9px] text-muted-foreground">{toolkit.length} tools</span>
              </div>
              <div className="p-4 grid grid-cols-3 sm:grid-cols-4 gap-2">
                {toolkit.map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.35 + i * 0.07 }}
                    whileHover={{ y: -2 }}
                    className={`${item.color} pixel-border pixel-shadow-sm p-2 flex flex-col items-center gap-1 cursor-default`}
                  >
                    <span className="font-pixel text-[9px] text-foreground" aria-hidden="true">{item.icon}</span>
                    <span className="font-pixel-body text-[8px] text-foreground text-center leading-tight">{item.label}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Pulsing live status card */}
            <div className="pixel-border-3 pixel-shadow overflow-hidden bg-foreground text-background">
              <div className="px-4 py-3 flex items-center gap-3">
                <PulseDot color="#0F9F77" />
                <div>
                  <p className="font-pixel text-[7px] text-background leading-loose">&gt; CURRENTLY BUILDING_</p>
                  <p className="font-pixel-body text-[10px] text-background/60 mt-0.5">
                    Building + Learning + Growing
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
