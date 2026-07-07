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
                {/* Online indicator */}
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full animate-pulse-glow" style={{ background: '#22c55e' }} />
                  <span className="font-mono text-xs" style={{ color: 'var(--text-muted)' }}>
                    {lang === 'es' ? 'disponible' : 'available'}
                  </span>
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

            {/* Cards */}
            <div className="grid grid-cols-2 gap-4 mt-10 reveal delay-200">
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
