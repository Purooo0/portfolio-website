'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const values = [
  {
    icon: '◈',
    title: 'CLARITY',
    description: 'Making complex ideas easier to understand through structure and visual hierarchy.',
    headerBg: 'bg-pink-300',
    cardBg: 'bg-pink-50',
    color: '#D94F8C',
    number: '01',
    quote: '"Simplicity is the ultimate sophistication."',
  },
  {
    icon: '♥',
    title: 'CARE',
    description: 'Paying attention to small details that make the final result feel polished.',
    headerBg: 'bg-purple-300',
    cardBg: 'bg-purple-50',
    color: '#6657D8',
    number: '02',
    quote: '"Details are not details — they make the design."',
  },
  {
    icon: '★',
    title: 'CREATIVITY',
    description: 'Making digital products feel expressive, interactive, and memorable.',
    headerBg: 'bg-orange-300',
    cardBg: 'bg-orange-50',
    color: '#E8873D',
    number: '03',
    quote: '"Creativity is intelligence having fun."',
  },
]

export function ValuesSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="values" ref={ref} className="py-20 px-4 relative overflow-hidden">
      {/* Animated moving dashes top */}
      <div className="absolute top-0 left-0 w-full h-1 overflow-hidden" aria-hidden="true">
        <motion.div
          className="h-full"
          style={{
            background:
              'repeating-linear-gradient(90deg, #E8873D 0, #E8873D 8px, transparent 8px, transparent 16px)',
          }}
          animate={{ x: [0, -32] }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      {/* Pixel grid bg */}
      <div className="absolute inset-0 pixel-grid opacity-30 pointer-events-none" aria-hidden="true" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
          className="mb-12 text-center"
        >
          <div className="inline-flex items-center gap-0 pixel-border-3 overflow-hidden pixel-shadow">
            <div className="bg-secondary px-3 py-2 flex gap-1" aria-hidden="true">
              <div className="w-3 h-3 pixel-border bg-[#FFFFFF]" />
              <div className="w-3 h-3 pixel-border bg-[#FFFFFF]" />
            </div>
            <div className="bg-foreground px-4 py-2">
              <span className="font-pixel text-[9px] text-background">VALUES.cfg</span>
            </div>
          </div>
          <h2 className="font-pixel text-[14px] sm:text-[20px] text-foreground mt-4 leading-loose">
            WHAT I BRING
          </h2>
        </motion.div>

        {/* 3 value cards — each one slightly offset vertically */}
        <div className="grid sm:grid-cols-3 gap-5 items-start">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 20 + i * 8 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: 0.1 + i * 0.12 }}
              whileHover={{ y: -5 }}
              // Stagger vertical position for a cascading shelf feel
              style={{ marginTop: i === 1 ? '1.5rem' : 0 }}
              className={`pixel-border-3 pixel-shadow flex flex-col overflow-hidden ${v.cardBg}`}
            >
              {/* Title bar */}
              <div className={`${v.headerBg} px-4 py-2.5 pixel-border border-x-0 border-t-0 flex items-center justify-between`}>
                <div className="flex items-center gap-2">
                  <motion.span
                    className="font-pixel text-[14px] text-foreground"
                    animate={{ rotate: [0, 8, -6, 0] }}
                    transition={{ duration: 3, delay: i * 0.5, repeat: Infinity }}
                    aria-hidden="true"
                  >
                    {v.icon}
                  </motion.span>
                  <span className="font-pixel text-[9px] text-foreground">{v.title}</span>
                </div>
                <span className="font-pixel text-[8px]" style={{ color: v.color }}>{v.number}</span>
              </div>

              <div className="p-5 flex flex-col gap-4">
                <p className="font-pixel-body text-[11px] text-muted-foreground leading-relaxed">
                  {v.description}
                </p>

                {/* Animated fill bar */}
                <div className="h-2 pixel-border bg-[#ECEEF6] overflow-hidden" aria-hidden="true">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={isInView ? { width: '100%' } : {}}
                    transition={{ duration: 1.2, delay: 0.5 + i * 0.18 }}
                    className={`h-full ${v.headerBg}`}
                  />
                </div>

                {/* Quote */}
                <div className="pixel-border bg-[#FFFFFF] px-3 py-2">
                  <p className="font-pixel-body text-[9px] text-muted-foreground leading-relaxed italic">
                    {v.quote}
                  </p>
                </div>

                {/* Pixel ornament row */}
                <div className="flex gap-1 justify-end" aria-hidden="true">
                  {[...Array(4)].map((_, k) => (
                    <motion.div
                      key={k}
                      className="w-2 h-2 pixel-border"
                      style={{ background: v.color, opacity: 0.3 + k * 0.2 }}
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ duration: 1.4, delay: k * 0.2, repeat: Infinity }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
