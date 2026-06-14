'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { portfolio } from '@/lib/portfolio-data'

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Journey', href: '#journey' },
  { label: 'Contact', href: '#contact' },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (href: string) => {
    setIsOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className="fixed left-0 right-0 top-0 z-50 px-4 pt-4"
      >
        <div
          className={`mx-auto flex max-w-6xl items-center justify-between rounded-lg border px-4 py-3 backdrop-blur-md transition-all ${
            scrolled
              ? 'border-foreground/15 bg-card/90 shadow-sm'
              : 'border-transparent bg-card/70'
          }`}
        >
          <button
            onClick={() => handleNavClick('#home')}
            className="flex items-center gap-3 text-left"
            aria-label="Go to top"
          >
            <span className="flex h-10 w-10 items-center justify-center overflow-visible rounded-md">
              <img
                src={portfolio.brand.logo}
                alt=""
                className="h-full w-full object-contain"
              />
            </span>
            <span className="hidden sm:block">
              <span className="block text-sm font-bold text-foreground">{portfolio.owner.shortName}</span>
              <span className="block text-xs text-muted-foreground">{portfolio.owner.role}</span>
            </span>
          </button>

          <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="rounded-md px-3 py-2 text-sm font-semibold text-muted-foreground transition hover:bg-muted hover:text-foreground"
              >
                {link.label}
              </button>
            ))}
          </nav>

          <button
            onClick={() => setIsOpen((value) => !value)}
            className="flex h-9 w-9 items-center justify-center rounded-md border border-foreground/15 bg-card text-foreground md:hidden"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.16 }}
            className="fixed left-4 right-4 top-20 z-40 rounded-lg border border-foreground/15 bg-card p-2 shadow-lg md:hidden"
          >
            <nav className="flex flex-col" aria-label="Mobile navigation">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="rounded-md px-4 py-3 text-left text-sm font-semibold text-muted-foreground hover:bg-muted hover:text-foreground"
                >
                  {link.label}
                </button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
