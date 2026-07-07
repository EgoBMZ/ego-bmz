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
      <line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/>
    </svg>
  );
}

function CodeBracket() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
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
      for (let i = 0; i < 40; i++) {
        particles.push({ x: Math.random() * canvas.width, y: Math.random() * canvas.height, vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4, r: Math.random() * 2 + 1, alpha: Math.random() * 0.3 + 0.05 });
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
          if (dist < 120) {
            ctx.beginPath(); ctx.moveTo(particles[i].x, particles[i].y); ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(232, 93, 61, ${0.08 * (1 - dist / 120)})`; ctx.lineWidth = 1; ctx.stroke();
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
        <div className="absolute top-1/4 -right-32 w-96 h-96 rounded-full blur-3xl opacity-20" style={{ background: 'var(--accent)' }} />
        <div className="absolute bottom-1/4 -left-32 w-72 h-72 rounded-full blur-3xl opacity-10" style={{ background: 'var(--accent-soft)' }} />
      </div>

      <div className="section-container relative z-10 w-full py-20 md:py-32">
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
          <div className="flex flex-wrap gap-4 mb-16 animate-fade-in-up delay-400">
            <a href="#projects" className="btn-primary">{h.cta1[lang]}<ArrowUpRight /></a>
            <a href="#contact" className="btn-ghost">{h.cta2[lang]}</a>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-8 pt-8 animate-fade-in-up delay-500" style={{ borderTop: '1px solid var(--border)' }}>
            {[
              { num: h.stat1num[lang], label: h.stat1label[lang] },
              { num: h.stat2num[lang], label: h.stat2label[lang] },
              { num: h.stat3num[lang], label: h.stat3label[lang] },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="font-display font-bold text-3xl mb-1" style={{ color: 'var(--text-primary)' }}>{stat.num}</div>
                <div className="font-body text-sm" style={{ color: 'var(--text-muted)' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Marquee */}
      <div className="absolute bottom-0 left-0 right-0 py-4 overflow-hidden" style={{ borderTop: '1px solid var(--border)', background: 'var(--surface-alt)' }}>
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
