'use client'

import { motion } from 'framer-motion'
import { portfolio } from '@/lib/portfolio-data'

const TICKER = ['BUILT WITH CARE', 'ALWAYS LEARNING', 'PIXEL BY PIXEL', 'KEEP CREATING']

export function Footer() {
  return (
    <footer className="pixel-border border-x-0 border-b-0 bg-foreground text-background overflow-hidden">
      {/* Scrolling ticker */}
      <div className="py-2 overflow-hidden border-b-2 border-background/10" aria-hidden="true">
        <div className="flex animate-marquee">
          {[...Array(2)].map((_, rep) => (
            <div key={rep} className="flex gap-0 flex-shrink-0">
              {TICKER.map((t) => (
                <span key={t + rep} className="font-pixel text-[7px] text-primary px-6 py-0.5 border-r-2 border-background/20 whitespace-nowrap">
                  ♥ {t}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Main footer row */}
      <div className="py-5 px-4 max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <motion.div
            className="w-10 h-10 overflow-visible rounded-md flex items-center justify-center"
            animate={{ rotate: [0, 5, -4, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <img src={portfolio.brand.logo} alt="" className="h-full w-full object-contain" />
          </motion.div>
          <span className="font-pixel text-[9px] text-background">
            {portfolio.brand.name}
          </span>
        </div>

        <motion.p
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="font-pixel-body text-[10px] text-background/60 text-center"
        >
          BUILT WITH CARE &amp; CURIOSITY
        </motion.p>

        <div className="flex items-center gap-2">
          <p className="font-pixel-body text-[10px] text-background/60">
            &copy; {new Date().getFullYear()} {portfolio.owner.name}
          </p>
          {/* Animated pixel dots */}
          <div className="flex gap-1" aria-hidden="true">
            {['#D94F8C', '#6657D8', '#E8873D'].map((c, i) => (
              <motion.div
                key={i}
                className="w-2 h-2 pixel-border"
                style={{ background: c }}
                animate={{ scale: [1, 1.4, 1] }}
                transition={{ duration: 1.2, delay: i * 0.25, repeat: Infinity }}
              />
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
