'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { milestones } from '@/lib/portfolio-data'

export function JourneySection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="journey" ref={ref} className="py-20 px-4 relative overflow-hidden">
      {/* Background animated pixel grid */}
      <div className="absolute inset-0 pixel-grid opacity-40 pointer-events-none" aria-hidden="true" />

      {/* Diagonal stripe top-right */}
      <div className="absolute top-0 right-0 w-40 h-40 pointer-events-none overflow-hidden opacity-15" aria-hidden="true">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="absolute bg-secondary h-1"
            style={{ width: `${(i + 1) * 20}px`, top: `${i * 18}px`, right: 0, transform: 'rotate(30deg)' }}
          />
        ))}
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
          className="mb-12 text-center"
        >
          <div className="inline-flex items-center gap-0 pixel-border-3 overflow-hidden pixel-shadow">
            <div className="bg-primary px-3 py-2 flex gap-1" aria-hidden="true">
              <div className="w-3 h-3 pixel-border bg-[#FFFFFF]" />
              <div className="w-3 h-3 pixel-border bg-[#FFFFFF]" />
            </div>
            <div className="bg-foreground px-4 py-2">
              <span className="font-pixel text-[9px] text-background">EDUCATION.log</span>
            </div>
          </div>
          <h2 className="font-pixel text-[14px] sm:text-[20px] text-foreground mt-4 leading-loose">
            EDUCATION & JOURNEY
          </h2>
          <p className="font-pixel-body text-[12px] text-muted-foreground mt-1">
            A timeline of curiosity, building, and learning.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Center line - animated dashed */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px pointer-events-none hidden md:block" aria-hidden="true">
            <motion.div
              className="absolute inset-0"
              style={{
                background: 'repeating-linear-gradient(180deg, #D94F8C 0, #D94F8C 8px, transparent 8px, transparent 16px)',
              }}
              animate={{ backgroundPositionY: ['0px', '16px'] }}
              transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
            />
          </div>

          <div className="flex flex-col gap-6">
            {milestones.map((item, i) => {
              const isLeft = i % 2 === 0
              return (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.45, delay: 0.12 + i * 0.13 }}
                  className="flex items-center gap-4"
                >
                  {/* Left card or spacer */}
                  {isLeft ? (
                    <div className="flex-1">
                      <MilestoneCard item={item} i={i} isInView={isInView} />
                    </div>
                  ) : (
                    <div className="flex-1 hidden md:block" aria-hidden="true" />
                  )}

                  {/* Center node */}
                  <div className="hidden md:flex flex-col items-center gap-1 flex-shrink-0 relative z-10">
                    <motion.div
                      className="w-8 h-8 pixel-border-3 pixel-shadow flex items-center justify-center"
                      style={{ background: item.color }}
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, delay: i * 0.3, repeat: Infinity }}
                    >
                      <span className="font-pixel text-[10px] text-foreground" aria-hidden="true">{item.icon}</span>
                    </motion.div>
                    <span className="font-pixel text-[7px] text-foreground">{item.year}</span>
                  </div>

                  {/* Right card or spacer */}
                  {!isLeft ? (
                    <div className="flex-1">
                      <MilestoneCard item={item} i={i} isInView={isInView} />
                    </div>
                  ) : (
                    <div className="flex-1 hidden md:block" aria-hidden="true" />
                  )}
                </motion.div>
              )
            })}
          </div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.9 }}
          className="text-center font-pixel text-[8px] text-primary mt-10 leading-loose"
        >
          &gt; STILL BUILDING, STILL LEARNING_
        </motion.p>
      </div>
    </section>
  )
}

function MilestoneCard({ item, i, isInView }: {
  item: (typeof milestones)[0]
  i: number
  isInView: boolean
}) {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      className={`pixel-border-3 pixel-shadow overflow-hidden ${item.cardBg}`}
    >
      {/* Title bar */}
      <div className={`${item.accentBg} px-4 py-2 pixel-border border-x-0 border-t-0 flex items-center justify-between`}>
        <div className="flex items-center gap-2">
          <span className="font-pixel text-[10px] text-foreground md:hidden" aria-hidden="true">{item.icon}</span>
          <span className="font-pixel text-[8px] text-foreground">{item.year} — {item.title}</span>
        </div>
        <motion.span
          className="font-pixel-body text-[9px] text-foreground px-2 py-0.5 pixel-border bg-[#FFFFFF]"
          animate={isInView ? { opacity: [0, 1] } : {}}
          transition={{ delay: 0.5 + i * 0.15 }}
        >
          {item.exp}
        </motion.span>
      </div>

      <div className="p-4 flex flex-col gap-2">
        <p className="font-pixel-body text-[11px] text-muted-foreground leading-relaxed">
          {item.description}
        </p>
        {/* Achievement badge */}
        <div className="flex items-center gap-2 mt-1">
          <span className="font-pixel text-[8px]" style={{ color: item.color }} aria-hidden="true">★</span>
          <span className="font-pixel-body text-[9px] text-foreground px-2 py-0.5 pixel-border"
            style={{ borderColor: item.color, background: `${item.color}22` }}>
            {item.achievement}
          </span>
        </div>
      </div>
    </motion.div>
  )
}
