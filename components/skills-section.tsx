'use client'

import { motion, useInView } from 'framer-motion'
import {
  Code2,
  Database,
  Gamepad2,
  Network,
  Search,
} from 'lucide-react'
import { useRef, useState } from 'react'
import { skills } from '@/lib/portfolio-data'

const skillIcons = {
  frontend: Code2,
  backend: Network,
  database: Database,
  'data-search': Search,
  'interactive-learning': Gamepad2,
}

function LevelStars({ level, max, color }: { level: number; max: number; color: string }) {
  return (
    <div className="flex gap-1" aria-label={`Level ${level} of ${max}`}>
      {Array.from({ length: max }).map((_, i) => (
        <motion.div
          key={i}
          className="h-3.5 w-3.5 pixel-border"
          style={{ background: i < level ? color : 'transparent' }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.05 * i }}
        />
      ))}
    </div>
  )
}

export function SkillsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const [active, setActive] = useState<string | null>('frontend')

  return (
    <section id="skills" ref={ref} className="relative overflow-hidden px-4 py-20">
      <div className="absolute inset-0 pixel-dots opacity-25 pointer-events-none" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
          className="mb-12 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <div className="inline-flex items-center rounded-full border border-foreground/15 bg-card px-3 py-1.5 text-sm font-semibold text-muted-foreground">
              TECHNICAL RANGE
            </div>
            <h2 className="mt-4 text-3xl font-bold text-foreground sm:text-4xl">
              Skill Tree
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
              A practical stack shaped by software engineering coursework,
              public repositories, thesis development, and dashboard projects.
            </p>
          </div>
          <p className="text-sm font-semibold text-primary">
            Select a card to inspect
          </p>
        </motion.div>

        <div className="grid gap-4">
          {skills.map((skill, i) => {
            const isExpanded = active === skill.id
            const Icon = skillIcons[skill.id as keyof typeof skillIcons] ?? Code2

            return (
              <motion.div
                key={skill.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.08 + i * 0.08 }}
              >
                <motion.button
                  onClick={() => setActive(isExpanded ? null : skill.id)}
                  className={`w-full overflow-hidden text-left ${skill.cardBg} pixel-border-3 pixel-shadow`}
                  whileHover={{ y: -2 }}
                  aria-expanded={isExpanded}
                >
                  <div className={`${skill.headerBg} flex flex-col gap-3 border-b border-foreground/10 px-4 py-3 sm:flex-row sm:items-center sm:justify-between`}>
                    <div className="flex items-center gap-3">
                      <span
                        className="relative flex h-11 min-w-11 items-center justify-center rounded-xl border border-foreground/10 bg-card px-2 text-foreground shadow-sm"
                        aria-hidden="true"
                      >
                        <span className="absolute -bottom-1 -right-1 h-3 w-3 rounded-sm" style={{ background: skill.color }} />
                        <Icon size={20} />
                      </span>
                      <div>
                        <span className="text-sm font-bold text-foreground">{skill.label}</span>
                        <p className="mt-1 text-xs text-muted-foreground">{skill.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <LevelStars level={skill.level} max={skill.maxLevel} color={skill.color} />
                      <span className="text-xs font-semibold text-muted-foreground">
                        {skill.xp}/100
                      </span>
                    </div>
                  </div>

                  <motion.div
                    initial={false}
                    animate={{ height: isExpanded ? 'auto' : 0, opacity: isExpanded ? 1 : 0 }}
                    transition={{ duration: 0.25 }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div className="p-5">
                      <div className="flex flex-wrap gap-2">
                        {skill.tech.map((tech, techIndex) => (
                          <motion.span
                            key={tech}
                            initial={{ opacity: 0, y: 4 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: techIndex * 0.04 }}
                            className={`rounded-md border border-foreground/15 px-3 py-1.5 text-xs font-semibold text-foreground ${skill.badgeBg}`}
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </motion.button>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
