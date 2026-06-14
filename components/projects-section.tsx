'use client'

import { motion, useInView } from 'framer-motion'
import {
  Activity,
  BarChart3,
  Database,
  ExternalLink,
  Gamepad2,
  GraduationCap,
  Search,
  Server,
} from 'lucide-react'
import { useRef } from 'react'
import { projects } from '@/lib/portfolio-data'

const projectIcons = {
  'cyber-game': GraduationCap,
  gizibox: Activity,
  'search-engine': Search,
  'sales-pipeline': BarChart3,
  'backend-evermos': Server,
  'quake-rangers': Gamepad2,
  spotlite: Database,
}

export function ProjectsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="projects" ref={ref} className="relative overflow-hidden px-4 py-20">
      <div className="absolute left-0 top-0 h-1 w-full overflow-hidden" aria-hidden="true">
        <motion.div
          className="h-full"
          style={{ background: 'repeating-linear-gradient(90deg, #D94F8C 0, #D94F8C 8px, transparent 8px, transparent 16px)' }}
          animate={{ x: [0, -32] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
          className="mb-12"
        >
          <div className="inline-flex items-center rounded-full border border-foreground/15 bg-card px-3 py-1.5 text-sm font-semibold text-muted-foreground">
            PUBLIC GITHUB PROJECTS
          </div>
          <h2 className="mt-4 text-3xl font-bold text-foreground sm:text-4xl">
            Featured Work
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
            A curated view of software projects across full-stack development,
            learning systems, APIs, search, dashboards, and data workflows.
          </p>
        </motion.div>

        <div className="grid gap-5 md:grid-cols-2">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function ProjectCard({
  project,
  index,
  isInView,
}: {
  project: (typeof projects)[number]
  index: number
  isInView: boolean
}) {
  const Icon = projectIcons[project.id as keyof typeof projectIcons] ?? Database

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: 0.07 * index }}
      className={`flex min-h-[300px] flex-col overflow-hidden ${project.cardBg} pixel-border-3 pixel-shadow`}
    >
      <div className={`${project.headerBg} flex items-start justify-between gap-3 border-b border-foreground/10 px-4 py-3`}>
                <div className="flex items-center gap-3">
                  <span className="relative flex h-12 min-w-12 items-center justify-center rounded-xl border border-foreground/10 bg-card shadow-sm" aria-hidden="true">
                    <span className="absolute -right-1 -top-1 h-3 w-3 rounded-sm" style={{ background: project.color }} />
                    <Icon size={22} className="text-foreground" />
                  </span>
                  <div>
                    <h3 className="text-sm font-bold text-foreground">{project.title}</h3>
                    <p className="mt-1 text-xs font-semibold text-muted-foreground">{project.category}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className={`rounded-md px-2 py-1 text-[10px] font-bold ${project.diffColor}`}>
                    {project.difficulty}
                  </span>
                  <span className="text-xs font-semibold text-muted-foreground">{project.year}</span>
                </div>
              </div>

              <div className="flex flex-1 flex-col gap-4 p-5">
                <div className="flex items-center gap-2">
                  <span className={`rounded-md border border-foreground/10 px-2.5 py-1 text-xs font-semibold ${project.badgeBg}`}>
                    {project.status}
                  </span>
                </div>

                <p className="text-sm leading-7 text-muted-foreground">
                  {project.description}
                </p>

                <div className="mt-auto flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md border border-foreground/15 bg-background px-2.5 py-1 text-xs font-semibold text-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <a
                  href={project.href}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 inline-flex w-fit items-center gap-2 rounded-md border border-foreground bg-foreground px-4 py-2 text-sm font-semibold text-background"
                >
                  Open Repository <ExternalLink size={14} aria-hidden="true" />
                </a>
              </div>
    </motion.article>
  )
}
