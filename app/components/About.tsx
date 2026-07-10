'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { useLang } from '../providers/LanguageProvider';

const AVATAR_URL = 'https://avatars.githubusercontent.com/u/297014950?v=4';

export default function About() {
  const { lang, t } = useLang();
  const sectionRef = useRef<HTMLDivElement>(null);
  const a = t.about;

  const CHIPS = [a.chip1[lang], a.chip2[lang], a.chip3[lang], a.chip4[lang], a.chip5[lang], a.chip6[lang]];

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const reveals = el.querySelectorAll<HTMLElement>('.reveal');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );
    reveals.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-24 md:py-32" style={{ background: 'var(--bg)' }}>
      <div className="section-container">
        {/* Label */}
        <div className="reveal mb-16">
          <span className="tag tag-accent mb-4 inline-flex">{a.tag[lang]}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          {/* Left card */}
          <div className="lg:col-span-5 reveal">
            <div
              className="relative rounded-3xl overflow-hidden flex flex-col justify-end p-8"
              style={{ background: 'var(--surface)', minHeight: '420px' }}
            >
              {/* Gradient bg */}
              <div
                className="absolute inset-0"
                style={{ background: `radial-gradient(ellipse at 30% 20%, rgba(232,93,61,0.18) 0%, transparent 60%), var(--surface)` }}
              />

              {/* Profile photo */}
              <div className="absolute top-8 left-1/2 -translate-x-1/2 lg:left-auto lg:translate-x-0 lg:right-8 flex flex-col items-center lg:items-end gap-2">
                <div
                  className="relative w-24 h-24 rounded-2xl overflow-hidden ring-4 ring-[var(--accent)] ring-offset-2 ring-offset-[var(--surface)]"
                  style={{ boxShadow: '0 8px 24px rgba(232,93,61,0.25)' }}
                >
                  <Image
                    src={AVATAR_URL}
                    alt="EgoBMZ — GitHub profile photo"
                    fill
                    className="object-cover"
                    sizes="96px"
                    priority
                  />
                </div>
                {/* Online indicator & quick links */}
                <div className="flex flex-col items-center lg:items-end gap-2 mt-2">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full animate-pulse-glow" style={{ background: '#22c55e' }} />
                    <span className="font-mono text-xs uppercase tracking-wider" style={{ color: 'var(--text-muted)', fontSize: '10px' }}>
                      {lang === 'es' ? 'disponible' : 'available'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <a href="https://www.linkedin.com/in/egobmz/" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--accent)] hover:scale-110 transition-all p-1 text-[var(--text-muted)]" aria-label="LinkedIn">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </a>
                    <span className="text-[var(--border)] text-xs">|</span>
                    <a href="https://github.com/EgoBMZ" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--accent)] hover:scale-110 transition-all p-1 text-[var(--text-muted)]" aria-label="GitHub">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>

              {/* Big monogram */}
              <div
                className="absolute top-8 left-8 font-display font-bold select-none pointer-events-none leading-none"
                style={{ fontSize: '90px', color: 'var(--border-strong)', letterSpacing: '-0.04em' }}
              >
                EG
              </div>

              {/* Bottom content */}
              <div className="relative z-10 mt-32 lg:mt-0">
                <div className="font-mono text-xs mb-3" style={{ color: 'var(--accent)' }}>{a.mono[lang]}</div>
                <h2 className="font-display font-bold text-3xl mb-2" style={{ color: 'var(--text-primary)' }}>{a.role[lang]}</h2>
                <p className="font-body text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>{a.based[lang]}</p>
                <div className="flex flex-wrap gap-2 mt-5">
                  {CHIPS.map((s) => <span key={s} className="tag text-xs">{s}</span>)}
                </div>
              </div>
            </div>
          </div>

          {/* Right content */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <h2
              className="font-display font-bold text-4xl md:text-5xl leading-tight mb-8 reveal"
              style={{ color: 'var(--text-primary)' }}
            >
              {a.heading[lang]}{' '}
              <span className="gradient-text">EgoBMZ</span>
              {a.headingEnd[lang]}{' '}
              <br className="hidden md:block" />
              <span className="highlight">{a.headingHighlight[lang]}</span>
            </h2>

            <div className="space-y-5 font-body text-base leading-relaxed reveal delay-100" style={{ color: 'var(--text-muted)' }}>
              <p>{a.p1[lang]}</p>
              <p>
                {a.p2[lang]}{' '}
                <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{a.p2b[lang]}</span>,{' '}
                <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{a.p2c[lang]}</span>{' '}
                {lang === 'es' ? 'y' : 'and'}{' '}
                <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{a.p2d[lang]}</span>{' '}
                {a.p2end[lang]}
              </p>
              <p>{a.p3[lang]}</p>
            </div>

            {/* Direct CTA button */}
            <div className="mt-6 flex flex-wrap items-center gap-4 reveal delay-150">
              <a href="#contact" className="btn-accent text-sm py-2.5 px-5">
                {lang === 'es' ? 'Trabajemos juntos' : 'Let\'s collaborate'}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="7" y1="17" x2="17" y2="7"/>
                  <polyline points="7 7 17 7 17 17"/>
                </svg>
              </a>
              <a href="#projects" className="btn-ghost text-sm py-2.5 px-5">
                {lang === 'es' ? 'Ver portafolio' : 'View portfolio'}
              </a>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-2 gap-4 mt-8 reveal delay-200">
              {[
                {
                  icon: (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/>
                    </svg>
                  ),
                  title: a.card1title[lang],
                  desc: a.card1desc[lang],
                },
                {
                  icon: (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
                    </svg>
                  ),
                  title: a.card2title[lang],
                  desc: a.card2desc[lang],
                },
              ].map((item) => (
                <div key={item.title} className="card p-5 flex flex-col gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'var(--accent-dim)', color: 'var(--accent)' }}>
                    {item.icon}
                  </div>
                  <div>
                    <div className="font-display font-semibold text-base mb-1" style={{ color: 'var(--text-primary)' }}>{item.title}</div>
                    <div className="font-body text-sm" style={{ color: 'var(--text-muted)' }}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
