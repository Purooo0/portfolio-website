'use client'

import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Mail, Send, Link, GitBranch } from 'lucide-react'
import { portfolio } from '@/lib/portfolio-data'

const socialLinks = [
  { Icon: Mail,      label: 'EMAIL',    href: `mailto:${portfolio.owner.email}`, bg: 'bg-pink-100',   color: '#D94F8C' },
  { Icon: Link,      label: 'LINKEDIN', href: portfolio.links.linkedin,          bg: 'bg-purple-100', color: '#6657D8' },
  { Icon: GitBranch, label: 'GITHUB',   href: portfolio.links.github,            bg: 'bg-orange-100', color: '#E8873D' },
]

// Scanline animated input
function PixelInput({
  id, label, type = 'text', placeholder, value, onChange, required,
}: {
  id: string; label: string; type?: string; placeholder: string
  value: string; onChange: (v: string) => void; required?: boolean
}) {
  return (
    <div>
      <label htmlFor={id} className="block font-pixel text-[8px] text-foreground mb-2 leading-loose">
        {label}
      </label>
      <motion.input
        id={id}
        type={type}
        required={required}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        whileFocus={{ boxShadow: '3px 3px 0 #D94F8C' }}
        className="w-full px-3 py-2.5 pixel-border bg-background text-foreground font-pixel-body text-[11px] placeholder:text-muted-foreground/50 focus:outline-none transition-all"
        style={{ boxShadow: '3px 3px 0 #241F2B' }}
      />
    </div>
  )
}

export function ContactSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSending(true)
    const subject = encodeURIComponent(`Portfolio message from ${form.name}`)
    const body = encodeURIComponent(`${form.message}\n\nFrom: ${form.name}\nEmail: ${form.email}`)
    window.location.href = `mailto:${portfolio.owner.email}?subject=${subject}&body=${body}`
    await new Promise((r) => setTimeout(r, 500))
    setSending(false)
    setSent(true)
  }

  return (
    <section id="contact" ref={ref} className="py-20 px-4 relative overflow-hidden">
      {/* Animated pixel rain bg */}
      <div className="absolute inset-0 pixel-grid opacity-50 pointer-events-none" aria-hidden="true" />

      {/* Floating symbols */}
      {(['♥', '★', '◈', '✦'] as const).map((sym, i) => (
        <motion.span
          key={i}
          className="absolute font-pixel text-[11px] pointer-events-none select-none"
          style={{
            left: `${15 + i * 22}%`,
            top: `${8 + i * 12}%`,
            color: ['#D94F8C', '#6657D8', '#E8873D', '#0F9F77'][i],
          }}
          animate={{ y: [0, -12, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2.5 + i * 0.4, delay: i * 0.5, repeat: Infinity }}
          aria-hidden="true"
        >
          {sym}
        </motion.span>
      ))}

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-0 pixel-border-3 overflow-hidden pixel-shadow">
            <div className="bg-primary px-3 py-2 flex gap-1" aria-hidden="true">
              <div className="w-3 h-3 pixel-border bg-[#FFFFFF]" />
              <div className="w-3 h-3 pixel-border bg-[#FFFFFF]" />
            </div>
            <div className="bg-foreground px-4 py-2">
              <span className="font-pixel text-[9px] text-background">SEND_MSG.exe</span>
            </div>
          </div>
          <h2 className="font-pixel text-[14px] sm:text-[20px] text-foreground mt-4 leading-loose">
            LET&apos;S BUILD TOGETHER.
          </h2>
          <p className="font-pixel-body text-[12px] text-muted-foreground mt-1 max-w-xs mx-auto leading-relaxed">
            Open to entry-level opportunities, software projects, research collaboration, and thoughtful work.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 items-start">
          {/* LEFT — social links + lore text */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="flex flex-col gap-4"
          >
            {/* Contact note */}
            <div className="pixel-border-3 bg-[#FFFFFF] pixel-shadow overflow-hidden">
              <div className="bg-primary px-4 py-2 pixel-border border-x-0 border-t-0 flex items-center gap-2">
                <motion.div
                  className="w-2 h-2 bg-[#0F9F77]"
                  animate={{ scale: [1, 1.4, 1] }}
                  transition={{ duration: 1.2, repeat: Infinity }}
                />
                <span className="font-pixel text-[8px] text-foreground">CONTACT_NOTE.txt</span>
              </div>
              <div className="p-5">
                <p className="font-pixel text-[8px] text-foreground leading-loose mb-2">
                  SAY HELLO ♥
                </p>
                <p className="font-pixel-body text-[11px] text-muted-foreground leading-relaxed">
                  Whether you have a project idea, want to collaborate,
                  or want to discuss an opportunity, I&apos;m always happy to connect.
                </p>
              </div>
            </div>

            {/* Social link buttons */}
            <div className="flex flex-col gap-2">
              {socialLinks.map(({ Icon, label, href, bg, color }, i) => (
                <motion.a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noreferrer' : undefined}
                  initial={{ opacity: 0, x: -12 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.25 + i * 0.08 }}
                  whileHover={{ x: 4, boxShadow: `4px 4px 0 ${color}` }}
                  className={`flex items-center gap-3 px-4 py-3 pixel-border-3 font-pixel-body text-[11px] text-foreground ${bg}`}
                  style={{ boxShadow: '4px 4px 0 #241F2B' }}
                >
                  <Icon size={14} aria-hidden="true" />
                  &gt; {label}
                </motion.a>
              ))}
            </div>

            {/* Status badge */}
            <div className="pixel-border-3 bg-foreground pixel-shadow px-4 py-3 flex items-center gap-3">
              <motion.div
                className="w-3 h-3 pixel-border bg-[#0F9F77] flex-shrink-0"
                animate={{ scale: [1, 1.4, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              <p className="font-pixel-body text-[10px] text-background/80">
                CURRENTLY OPEN FOR NEW PROJECTS
              </p>
            </div>
          </motion.div>

          {/* RIGHT — contact form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.45, delay: 0.2 }}
          >
            <div className="pixel-border-3 bg-[#FFFFFF] pixel-shadow overflow-hidden">
              <div className="bg-secondary px-4 py-2 pixel-border border-x-0 border-t-0 flex items-center justify-between">
                <span className="font-pixel text-[8px] text-foreground">NEW_MESSAGE.txt</span>
                <motion.span
                  className="font-pixel text-[9px] text-foreground"
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  _
                </motion.span>
              </div>

              <div className="p-5">
                <AnimatePresence mode="wait">
                  {sent ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex flex-col items-center justify-center gap-4 py-10"
                    >
                      <motion.div
                        className="pixel-border-3 bg-primary w-20 h-20 flex items-center justify-center pixel-shadow"
                        animate={{ scale: [1, 1.15, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <span className="font-pixel text-[24px] text-foreground" aria-hidden="true">♥</span>
                      </motion.div>
                      <h3 className="font-pixel text-[9px] text-foreground leading-loose">MSG SENT!</h3>
                      <p className="font-pixel-body text-[11px] text-muted-foreground text-center">
                        Thank you! I&apos;ll get back to you soon.
                      </p>
                      {/* Bouncing XP reward */}
                      <motion.div
                        className="px-3 py-1.5 pixel-border bg-[#0F9F77] pixel-shadow-sm"
                        animate={{ y: [0, -4, 0] }}
                        transition={{ duration: 1.2, repeat: Infinity }}
                      >
                        <span className="font-pixel text-[8px] text-foreground">+50 XP EARNED</span>
                      </motion.div>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      onSubmit={handleSubmit}
                      className="flex flex-col gap-4"
                      aria-label="Contact form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <PixelInput
                        id="name"
                        label="NAME:"
                        placeholder="Your name here..."
                        value={form.name}
                        onChange={(v) => setForm({ ...form, name: v })}
                        required
                      />
                      <PixelInput
                        id="email"
                        label="EMAIL:"
                        type="email"
                        placeholder="your@email.com"
                        value={form.email}
                        onChange={(v) => setForm({ ...form, email: v })}
                        required
                      />
                      <div>
                        <label htmlFor="message" className="block font-pixel text-[8px] text-foreground mb-2 leading-loose">
                          MESSAGE:
                        </label>
                        <motion.textarea
                          id="message"
                          required
                          rows={4}
                          placeholder="Your message here..."
                          value={form.message}
                          onChange={(e) => setForm({ ...form, message: e.target.value })}
                          whileFocus={{ boxShadow: '3px 3px 0 #D94F8C' }}
                          className="w-full px-3 py-2.5 pixel-border bg-background text-foreground font-pixel-body text-[11px] placeholder:text-muted-foreground/50 focus:outline-none resize-none"
                          style={{ boxShadow: '3px 3px 0 #241F2B' }}
                        />
                      </div>

                      <motion.button
                        type="submit"
                        disabled={sending}
                        whileHover={{ x: 2, y: -2 }}
                        whileTap={{ x: 3, y: 3, boxShadow: '1px 1px 0px #241F2B' }}
                        className="flex items-center justify-center gap-2 px-6 py-3 pixel-border-3 bg-foreground text-background font-pixel-body text-[11px] pixel-shadow pixel-btn disabled:opacity-60"
                      >
                        {sending ? (
                          <>
                            <motion.span
                              animate={{ rotate: 360 }}
                              transition={{ duration: 0.6, repeat: Infinity, ease: 'linear' }}
                              className="inline-block"
                              aria-hidden="true"
                            >
                              ◈
                            </motion.span>
                            SENDING...
                          </>
                        ) : (
                          <>
                            <Send size={13} aria-hidden="true" />
                            SEND MESSAGE
                          </>
                        )}
                      </motion.button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
