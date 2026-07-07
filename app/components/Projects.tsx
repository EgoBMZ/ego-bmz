'use client';

import { useEffect, useRef } from 'react';
import { useLang } from '../providers/LanguageProvider';

function ExternalLinkIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
      <polyline points="15 3 21 3 21 9"/>
      <line x1="10" y1="14" x2="21" y2="3"/>
    </svg>
  );
}

function ArrowRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
    </svg>
  );
}

export default function Projects() {
  const { lang, t } = useLang();
  const sectionRef = useRef<HTMLDivElement>(null);
  const proj = t.projects;

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
    <section id="projects" ref={sectionRef} className="py-24 md:py-32" style={{ background: 'var(--bg)' }}>
      <div className="section-container">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
          <div className="reveal">
            <span className="tag tag-accent mb-4 inline-flex">{proj.tag[lang]}</span>
            <h2 className="font-display font-bold text-4xl md:text-5xl leading-tight" style={{ color: 'var(--text-primary)' }}>
              {proj.heading[lang]}
            </h2>
          </div>
          <a href="#contact" className="btn-ghost text-sm self-start sm:self-auto reveal delay-100">
            {proj.ctaBtn[lang]} <ArrowRight />
          </a>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {proj.items.map((project, i) => (
            <article key={project.title} id={`proj-${i + 1}`} className="reveal group" style={{ animationDelay: `${i * 80}ms` }}>
              <div className="card h-full flex flex-col overflow-hidden" style={{ minHeight: '320px' }}>
                {/* Gradient header */}
                <div className="relative h-40 md:h-48 flex items-center justify-center overflow-hidden flex-shrink-0" style={{ background: project.gradient }}>
                  <div className="absolute inset-0 opacity-20" style={{ backgroundImage: `radial-gradient(circle at 20% 50%, rgba(255,255,255,0.3) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(0,0,0,0.2) 0%, transparent 50%)` }} />
                  <span className="relative text-6xl select-none transition-transform duration-500 group-hover:scale-110" role="img" aria-hidden="true">{project.emoji}</span>
                  {/* Type badge */}
                  <div className="absolute top-4 left-4">
                    <span className="font-mono text-xs px-3 py-1 rounded-full font-medium" style={{ background: 'rgba(255,255,255,0.2)', color: '#fff', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.25)' }}>
                      {project.type[lang]}
                    </span>
                  </div>
                  {/* Link */}
                  <a href="#" className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0" style={{ background: 'rgba(255,255,255,0.25)', color: '#fff', backdropFilter: 'blur(8px)' }} aria-label={`View ${project.title}`}>
                    <ExternalLinkIcon />
                  </a>
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 p-6 gap-4">
                  <div>
                    <h3 className="font-display font-bold text-xl mb-2 transition-colors duration-200 group-hover:text-[var(--accent)]" style={{ color: 'var(--text-primary)' }}>
                      {project.title}
                    </h3>
                    <p className="font-body text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                      {project.desc[lang]}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tags.map((tag) => <span key={tag} className="tag text-xs">{tag}</span>)}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* CTA block */}
        <div className="mt-12 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 reveal" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
          <div>
            <h3 className="font-display font-bold text-2xl md:text-3xl mb-2" style={{ color: 'var(--text-primary)' }}>{proj.ctaHeading[lang]}</h3>
            <p className="font-body text-sm" style={{ color: 'var(--text-muted)' }}>{proj.ctaDesc[lang]}</p>
          </div>
          <a href="#contact" className="btn-accent flex-shrink-0">
            {proj.ctaStart[lang]}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
