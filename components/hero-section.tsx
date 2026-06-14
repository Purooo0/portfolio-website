'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, GitBranch, Link, Mail, Sparkles } from 'lucide-react'
import { useEffect, useState } from 'react'
import { portfolio } from '@/lib/portfolio-data'

const roleItems = portfolio.hero.roles

const stats = [
  { label: 'Study', value: 'Computer Engineering' },
  { label: 'Status', value: 'Thesis Defended' },
  { label: 'Base', value: portfolio.owner.location },
]

function scrollToSection(href: string) {
  document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
}

function ProfilePhotoFrame() {
  return (
    <div className="relative w-fit">
      <div
        className="absolute -inset-2 rounded-xl bg-[linear-gradient(135deg,rgba(217,79,140,0.26),rgba(102,87,216,0.18),rgba(15,159,119,0.20))]"
        aria-hidden="true"
      />
      <div className="absolute -right-3 -top-3 grid grid-cols-2 gap-1" aria-hidden="true">
        <span className="h-3 w-3 rounded-sm bg-primary shadow-sm" />
        <span className="h-3 w-3 rounded-sm bg-secondary/80 shadow-sm" />
        <span className="h-3 w-3 rounded-sm bg-accent/80 shadow-sm" />
        <span className="h-3 w-3 rounded-sm bg-foreground/80 shadow-sm" />
      </div>
      <div className="absolute -bottom-3 -left-3 flex gap-1" aria-hidden="true">
        <span className="h-2.5 w-8 rounded-full bg-primary/70" />
        <span className="h-2.5 w-4 rounded-full bg-accent/70" />
      </div>
      <div className="relative h-36 w-36 overflow-hidden rounded-xl border border-foreground/15 bg-card p-1 shadow-[8px_8px_0_rgba(36,31,43,0.12)]">
        <img
          src={portfolio.brand.photo}
          alt={portfolio.owner.name}
          className="h-full w-full rounded-lg object-cover"
        />
      </div>
    </div>
  )
}

export function HeroSection() {
  const [roleIdx, setRoleIdx] = useState(0)

  useEffect(() => {
    const roleTimer = setInterval(
      () => setRoleIdx((index) => (index + 1) % roleItems.length),
      2600,
    )

    return () => clearInterval(roleTimer)
  }, [])

  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden px-4 pb-16 pt-32 sm:pt-36"
    >
      <div className="absolute inset-0 pixel-grid opacity-70" aria-hidden="true" />
      <div
        className="absolute left-1/2 top-16 h-56 w-56 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto grid min-h-[calc(100vh-12rem)] max-w-6xl items-center gap-10 lg:grid-cols-[1.08fr_0.92fr]">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="max-w-3xl"
        >
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-foreground/15 bg-card/80 px-3 py-1.5 text-sm text-muted-foreground shadow-sm backdrop-blur">
            <Sparkles size={15} className="text-primary" aria-hidden="true" />
            <span>{portfolio.brand.name} portfolio</span>
          </div>

          <h1 className="max-w-4xl text-[clamp(2.6rem,7vw,5.8rem)] font-bold leading-[0.98] text-foreground">
            Hi, I&apos;m{' '}
            <span className="text-shimmer">{portfolio.owner.shortName}</span>
          </h1>

          <div className="mt-5 flex min-h-8 items-center gap-3 text-base font-semibold text-secondary sm:text-lg">
            <span className="text-muted-foreground">Focus:</span>
            <AnimatePresence mode="wait">
              <motion.span
                key={roleIdx}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.22 }}
              >
                {roleItems[roleIdx]}
              </motion.span>
            </AnimatePresence>
          </div>

          <p className="mt-6 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
            {portfolio.hero.intro} {portfolio.hero.currentQuest}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <motion.button
              onClick={() => scrollToSection('#projects')}
              whileHover={{ y: -2 }}
              whileTap={{ y: 1 }}
              className="inline-flex items-center gap-2 rounded-md border border-foreground bg-foreground px-5 py-3 text-sm font-semibold text-background shadow-sm"
            >
              View Projects <ArrowRight size={16} aria-hidden="true" />
            </motion.button>
            <motion.button
              onClick={() => scrollToSection('#contact')}
              whileHover={{ y: -2 }}
              whileTap={{ y: 1 }}
              className="inline-flex items-center gap-2 rounded-md border border-foreground/20 bg-card px-5 py-3 text-sm font-semibold text-foreground shadow-sm"
            >
              <Mail size={16} aria-hidden="true" /> Contact Me
            </motion.button>
          </div>

          <div className="mt-8 grid max-w-xl grid-cols-3 gap-3">
            {stats.map((item) => (
              <div key={item.label} className="border-l border-foreground/15 pl-3">
                <p className="text-xs uppercase text-muted-foreground">{item.label}</p>
                <p className="mt-1 text-sm font-semibold text-foreground">{item.value}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.aside
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.12, ease: 'easeOut' }}
          className="relative"
          aria-label="Profile summary"
        >
          <div className="pixel-border-3 bg-card p-5 pixel-shadow">
            <div className="flex items-center justify-between border-b border-foreground/10 pb-4">
              <div>
                <p className="font-pixel text-[8px] text-primary">PROFILE</p>
                <p className="mt-2 text-xl font-bold">{portfolio.owner.name}</p>
              </div>
              <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
                Available
              </span>
            </div>

            <div className="grid gap-7 py-6 sm:grid-cols-[auto_1fr]">
              <ProfilePhotoFrame />
              <div className="flex flex-col justify-center">
                <p className="text-sm text-muted-foreground">Role</p>
                <p className="mt-1 text-2xl font-bold text-foreground">{portfolio.owner.role}</p>
                <p className="mt-4 text-sm leading-6 text-muted-foreground">
                  Building software projects across full-stack web development,
                  learning systems, dashboards, and applied data workflows.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {portfolio.profileHighlights.map((skill) => (
                <span
                  key={skill}
                  className="min-w-0 rounded-md border border-foreground/15 bg-background px-2.5 py-2 text-center text-xs font-semibold leading-tight text-foreground sm:text-[13px]"
                >
                  {skill}
                </span>
              ))}
            </div>

            <div className="mt-5 flex flex-wrap gap-2 border-t border-foreground/10 pt-5">
              <a
                href={portfolio.links.github}
                target={portfolio.links.github.startsWith('http') ? '_blank' : undefined}
                rel={portfolio.links.github.startsWith('http') ? 'noreferrer' : undefined}
                className="inline-flex items-center gap-2 rounded-md border border-foreground/15 px-3 py-2 text-sm font-semibold text-foreground"
              >
                <GitBranch size={15} aria-hidden="true" /> GitHub
              </a>
              <a
                href={`mailto:${portfolio.owner.email}`}
                className="inline-flex items-center gap-2 rounded-md border border-foreground/15 px-3 py-2 text-sm font-semibold text-foreground"
              >
                <Mail size={15} aria-hidden="true" /> Email
              </a>
              <a
                href={portfolio.links.linkedin}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-md border border-foreground/15 px-3 py-2 text-sm font-semibold text-foreground"
              >
                <Link size={15} aria-hidden="true" /> LinkedIn
              </a>
            </div>
          </div>
        </motion.aside>
      </div>
    </section>
  )
}
