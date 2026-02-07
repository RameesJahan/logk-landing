"use client"

import { useRef, useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const apps = [
  {
    title: "SOS Game",
    subtitle: "Classic Fun Game",
    description: "A fun game you can play with your friends and family. Experience classic gameplay with modern design.",
    icon: "🎮",
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.kaakkagames.SOSGame",
    color: "from-blue-500/20 to-cyan-500/20",
  },
  {
    title: "Pomodoro Timer",
    subtitle: "Productivity",
    description: "Boost your productivity using The Pomodoro Technique. Focus better, work smarter.",
    icon: "⏱️",
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.kaakkapps.pomodorotimer",
    color: "from-orange-500/20 to-red-500/20",
  },
]

export function AppsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current || !headerRef.current || !cardsRef.current) return

    const ctx = gsap.context(() => {
      // Header slide in from left
      gsap.from(headerRef.current, {
        x: -60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      })

      // Cards slide in
      const cards = cardsRef.current?.querySelectorAll("article")
      if (cards) {
        gsap.from(cards, {
          y: 60,
          opacity: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="apps" className="relative py-32 pl-6 md:pl-28 pr-6 md:pr-12 border-t border-border/30">
      {/* Section header */}
      <div ref={headerRef} className="mb-16">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">Featured / Apps</span>
        <h2 className="mt-4 font-[var(--font-bebas)] text-5xl md:text-7xl tracking-tight">OUR APPS</h2>
      </div>

      {/* Apps grid */}
      <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        {apps.map((app, index) => (
          <article
            key={index}
            className="group relative border border-border/40 p-8 md:p-12 flex flex-col justify-between transition-all duration-500 hover:border-accent/60 overflow-hidden"
          >
            {/* Background layer */}
            <div
              className={`absolute inset-0 bg-gradient-to-br ${app.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
            />

            {/* Content */}
            <div className="relative z-10">
              {/* Icon */}
              <div className="text-6xl mb-6">{app.icon}</div>

              {/* Titles */}
              <h3 className="font-[var(--font-bebas)] text-4xl md:text-5xl tracking-tight text-accent group-hover:text-accent transition-colors duration-300">
                {app.title}
              </h3>
              <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground mt-2">
                {app.subtitle}
              </p>

              {/* Description */}
              <p className="mt-6 font-mono text-sm text-muted-foreground leading-relaxed max-w-md">
                {app.description}
              </p>
            </div>

            {/* CTA Button */}
            <div className="relative z-10 mt-8">
              <a
                href={app.playStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 border border-accent/40 px-6 py-3 font-mono text-xs uppercase tracking-widest text-accent hover:border-accent hover:bg-accent/10 transition-all duration-200"
              >
                Download on Google Play
                <span>→</span>
              </a>
            </div>

            {/* Corner line */}
            <div className="absolute top-0 right-0 w-12 h-12 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="absolute top-0 right-0 w-full h-[1px] bg-accent" />
              <div className="absolute top-0 right-0 w-[1px] h-full bg-accent" />
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
