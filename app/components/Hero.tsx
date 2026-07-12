'use client';

import { useEffect, useRef } from 'react';
import { useLang } from '../providers/LanguageProvider';

const TECH_TAGS = [
  'React Native', 'Expo', 'Next.js', 'TypeScript',
  'React', 'Node.js', 'Tailwind', 'Zustand', 'Firebase', 'GraphQL',
];

function ArrowUpRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" />
    </svg>
  );
}

function CodeBracket() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
    </svg>
  );
}

export default function Hero() {
  const { lang, t } = useLang();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let animId: number;
    const particles: { x: number; y: number; vx: number; vy: number; r: number; alpha: number }[] = [];

    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    const init = () => {
      particles.length = 0;
      for (let i = 0; i < 65; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.45,
          vy: (Math.random() - 0.5) * 0.45,
          r: Math.random() * 3 + 1.2,
          alpha: Math.random() * 0.4 + 0.15
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of particles) {
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(232, 93, 61, ${p.alpha})`; ctx.fill();
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
      }
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x, dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 140) {
            ctx.beginPath(); ctx.moveTo(particles[i].x, particles[i].y); ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(232, 93, 61, ${0.15 * (1 - dist / 140)})`; ctx.lineWidth = 1; ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(draw);
    };

    resize(); init(); draw();
    const ro = new ResizeObserver(() => { resize(); init(); });
    ro.observe(canvas);
    return () => { cancelAnimationFrame(animId); ro.disconnect(); };
  }, []);

  const h = t.hero;

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden pt-16" style={{ background: 'var(--bg)' }}>
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true" />

      {/* Orbs */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/4 -right-32 w-96 h-96 rounded-full blur-3xl opacity-20 animate-float" style={{ background: 'var(--accent)' }} />
        <div className="absolute bottom-1/4 -left-32 w-72 h-72 rounded-full blur-3xl opacity-10 animate-float" style={{ background: 'var(--accent-soft)', animationDelay: '2s' }} />
      </div>

      <div className="section-container relative z-10 w-full pt-20 pb-36 md:pt-32 md:pb-48">
        <div className="max-w-4xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 mb-8 animate-fade-in-up">
            <span className="tag tag-accent">
              <span className="w-1.5 h-1.5 rounded-full animate-pulse-glow inline-block" style={{ background: 'var(--accent)' }} />
              {h.badge[lang]}
            </span>
          </div>

          {/* Headline */}
          <h1
            className="font-display font-bold leading-[1.05] tracking-tight mb-6 animate-fade-in-up delay-100"
            style={{ color: 'var(--text-primary)', fontSize: 'clamp(2.5rem, 7vw, 5.5rem)' }}
          >
            {h.heading1[lang]}{' '}
            <br className="hidden sm:block" />
            <span className="gradient-text">{h.heading2[lang]}</span>
          </h1>

          {/* Sub */}
          <p className="text-lg md:text-xl leading-relaxed mb-4 max-w-2xl animate-fade-in-up delay-200" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-inter)' }}>
            {h.sub1[lang]}{' '}
            <span style={{ color: 'var(--accent)', fontWeight: 600 }}>React Native</span>,{' '}
            <span style={{ color: 'var(--accent)', fontWeight: 600 }}>Expo</span>{' '}
            {h.sub2[lang]}{' '}
            <span style={{ color: 'var(--accent)', fontWeight: 600 }}>Next.js</span>
            {h.sub3[lang]}
          </p>

          {/* Code pill */}
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl mb-10 animate-fade-in-up delay-300"
            style={{ background: 'var(--surface)', border: '1px solid var(--border)', fontFamily: 'JetBrains Mono, monospace', fontSize: '13px', color: 'var(--text-muted)' }}
          >
            <CodeBracket />
            <span style={{ color: 'var(--accent)' }}>const</span>{' '}
            <span style={{ color: 'var(--text-primary)' }}>dev</span>{' '}
            <span style={{ color: 'var(--text-muted)' }}>=</span>{' '}
            <span style={{ color: 'var(--accent-soft)' }}>&quot;EgoBMZ&quot;</span>
            <span className="cursor-dot" />
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-4 mb-16 animate-fade-in-up delay-400">
            <a href="#projects" className="btn-primary">{h.cta1[lang]}<ArrowUpRight /></a>
            <a href="#contact" className="btn-ghost">{h.cta2[lang]}</a>

            {/* Social links inline */}
            <div className="flex items-center gap-2 ml-2 sm:mt-0 mt-3">
              <a
                href="https://www.linkedin.com/in/egobmz/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-11 h-11 rounded-full border border-[var(--border)] flex items-center justify-center transition-all duration-300 hover:bg-[var(--surface-alt)] hover:text-[var(--accent)] hover:scale-110"
                style={{ color: 'var(--text-muted)', background: 'var(--surface)' }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a
                href="https://github.com/EgoBMZ"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="w-11 h-11 rounded-full border border-[var(--border)] flex items-center justify-center transition-all duration-300 hover:bg-[var(--surface-alt)] hover:text-[var(--accent)] hover:scale-110"
                style={{ color: 'var(--text-muted)', background: 'var(--surface)' }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-6 md:gap-8 pt-8 pb-8 md:pb-0 lg:mb-10 animate-fade-in-up delay-500" style={{ borderTop: '1px solid var(--border)' }}>
            {[
              { num: h.stat1num[lang], label: h.stat1label[lang] },
              { num: h.stat2num[lang], label: h.stat2label[lang] },
              { num: h.stat3num[lang], label: h.stat3label[lang] },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="font-display font-bold text-2xl md:text-3xl mb-1" style={{ color: 'var(--text-primary)' }}>{stat.num}</div>
                <div className="font-body text-xs md:text-sm" style={{ color: 'var(--text-muted)' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Marquee */}
      <div className="absolute bottom-0 left-0 right-0 py-4 overflow-hidden mt-50" style={{ borderTop: '1px solid var(--border)', background: 'var(--surface-alt)' }}>
        <div className="flex gap-6 animate-marquee">
          {[...TECH_TAGS, ...TECH_TAGS].map((tag, i) => (
            <span key={i} className="flex-none font-mono text-xs px-4 py-1.5 rounded-full whitespace-nowrap" style={{ background: 'var(--surface)', color: 'var(--text-muted)', border: '1px solid var(--border)' }}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
