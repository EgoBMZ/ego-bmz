'use client';

import { useEffect, useRef, useState } from 'react';
import { useLang } from '../providers/LanguageProvider';

const STEP_ICONS = [
  <svg key="search" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
  <svg key="edit" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>,
  <svg key="code" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>,
  <svg key="pulse" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
];

export default function Process() {
  const { lang, t } = useLang();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const proc = t.process;

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const reveals = el.querySelectorAll<HTMLElement>('.reveal');
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } }); },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    reveals.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="process" ref={sectionRef} className="py-24 md:py-32" style={{ background: 'var(--surface-alt)' }}>
      <div className="section-container">
        {/* Header */}
        <div className="mb-16 reveal">
          <span className="tag tag-accent mb-4 inline-flex">{proc.tag[lang]}</span>
          <h2 className="font-display font-bold text-4xl md:text-5xl leading-tight" style={{ color: 'var(--text-primary)' }}>
            {proc.heading[lang]}
          </h2>
        </div>

        {/* Desktop interactive tabs */}
        <div className="hidden md:block">
          <div className="flex gap-2 mb-10 reveal">
            {proc.steps.map((step, i) => (
              <button
                key={step.num}
                id={`process-tab-${i}`}
                onClick={() => setActiveStep(i)}
                className="flex-1 flex flex-col items-center gap-2 py-4 px-2 rounded-2xl border transition-all duration-300 text-center"
                style={{
                  background: activeStep === i ? 'var(--accent)' : 'var(--surface)',
                  borderColor: activeStep === i ? 'var(--accent)' : 'var(--border)',
                  color: activeStep === i ? '#fff' : 'var(--text-muted)',
                }}
              >
                <span className="font-mono text-xs font-medium" style={{ color: activeStep === i ? 'rgba(255,255,255,0.7)' : 'var(--text-faint)' }}>{step.num}</span>
                <div style={{ color: activeStep === i ? '#fff' : 'var(--text-muted)' }}>{STEP_ICONS[i]}</div>
                <span className="font-display font-semibold text-sm leading-tight">{step.title[lang]}</span>
              </button>
            ))}
          </div>

          {/* Active step detail */}
          <div key={`${activeStep}-${lang}`} className="rounded-3xl p-10 animate-scale-in" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
            <div className="grid grid-cols-2 gap-12 items-center">
              <div>
                <div className="font-mono text-7xl font-bold mb-4 select-none" style={{ color: 'var(--border-strong)' }}>{proc.steps[activeStep].num}</div>
                <h3 className="font-display font-bold text-2xl mb-4" style={{ color: 'var(--text-primary)' }}>{proc.steps[activeStep].title[lang]}</h3>
                <p className="font-body leading-relaxed mb-6" style={{ color: 'var(--text-muted)' }}>{proc.steps[activeStep].desc[lang]}</p>
                <div className="flex flex-wrap gap-2">
                  {proc.steps[activeStep].tags[lang].map((tag: string) => (
                    <span key={tag} className="tag tag-accent text-xs">{tag}</span>
                  ))}
                </div>
              </div>

              <div className="relative h-56 rounded-2xl flex items-center justify-center overflow-hidden" style={{ background: 'var(--accent-dim)' }}>
                <div className="w-24 h-24 rounded-3xl flex items-center justify-center" style={{ background: 'var(--accent)', color: '#fff' }}>
                  <span style={{ transform: 'scale(2)' }}>{STEP_ICONS[activeStep]}</span>
                </div>
                <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full opacity-30" style={{ background: 'var(--accent)' }} />
                <div className="absolute -bottom-8 -left-8 w-24 h-24 rounded-full opacity-20" style={{ background: 'var(--accent-soft)' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Mobile stacked cards */}
        <div className="md:hidden flex flex-col gap-4">
          {proc.steps.map((step, i) => (
            <div key={step.num} className="reveal card p-6" style={{ animationDelay: `${i * 100}ms` }}>
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'var(--accent)', color: '#fff' }}>
                  {STEP_ICONS[i]}
                </div>
                <div>
                  <div className="font-mono text-xs mb-1" style={{ color: 'var(--text-faint)' }}>{step.num}</div>
                  <h3 className="font-display font-bold text-lg mb-2" style={{ color: 'var(--text-primary)' }}>{step.title[lang]}</h3>
                  <p className="font-body text-sm leading-relaxed mb-4" style={{ color: 'var(--text-muted)' }}>{step.desc[lang]}</p>
                  <div className="flex flex-wrap gap-2">
                    {step.tags[lang].map((tag: string) => <span key={tag} className="tag tag-accent text-xs">{tag}</span>)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
