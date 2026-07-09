'use client';

import { useEffect, useRef } from 'react';
import { useLang } from '../providers/LanguageProvider';

const STACK_BASE = [
  { name: 'React Native', category: 'Mobile', color: '#61DAFB', size: 'large', icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8"><path d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38a2.167 2.167 0 0 0-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44a23.479 23.479 0 0 0-3.107-.534A23.331 23.331 0 0 0 12 9.5a23.514 23.514 0 0 0-1.337-1.838c1.269-1.204 2.51-1.86 3.354-1.86zm-7.962.489c.778 0 2.008.631 3.249 1.82a23.218 23.218 0 0 0-2.144 2.653 23.6 23.6 0 0 0-3.132.533 14.87 14.87 0 0 1-.248-1.417c-.23-1.878.054-3.32.724-3.699.19-.112.378-.167.55-.167v-.023zm.049 2.987a.25.25 0 0 0-.25.251c0 .138.112.25.25.25a.25.25 0 0 0 .25-.25.25.25 0 0 0-.25-.251zm6.868 0a.25.25 0 0 0-.25.251.25.25 0 0 0 .25.25.25.25 0 0 0 .25-.25.25.25 0 0 0-.25-.251z"/></svg> },
  { name: 'Expo', category: 'Mobile', color: '#000020', size: 'small', icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8"><path d="M0 21.3934L11.8767 2l11.8768 19.3934H0zm12.0975-13.428c-.0744-.1193-.2148-.1193-.2892 0L3.5 21.3934h16.6206L12.0975 7.9654z"/></svg> },
  { name: 'Reanimated', category: 'Mobile', color: '#0055FF', size: 'small', icon: <img src="https://avatars.githubusercontent.com/u/6932462?v=4" alt="Reanimated Logo" className="w-8 h-8 object-contain rounded-lg" style={{ filter: 'grayscale(1) brightness(2)' }} /> },
  { name: 'Next.js', category: 'Web', color: '#000000', size: 'large', icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8"><path d="M11.572 0c-.176 0-.31.001-.358.007a19.76 19.76 0 0 1-.364.033C7.443.346 4.25 2.185 2.228 5.012a11.875 11.875 0 0 0-2.119 5.243c-.096.659-.108.854-.108 1.747s.012 1.089.108 1.748c.652 4.506 3.86 8.292 8.209 9.695.779.25 1.6.422 2.534.525.363.04 1.935.04 2.299 0 1.611-.178 2.977-.577 4.323-1.264.207-.106.247-.134.219-.158-.02-.013-.9-1.193-1.955-2.62l-1.919-2.592-2.404-3.558a338.739 338.739 0 0 0-2.422-3.556c-.009-.002-.018 1.579-.023 3.51-.007 3.38-.01 3.515-.052 3.595a.426.426 0 0 1-.206.214c-.075.037-.14.044-.495.044H7.81l-.108-.068a.438.438 0 0 1-.157-.171l-.05-.106.006-4.703.007-4.705.072-.092a.645.645 0 0 1 .174-.143c.096-.047.134-.051.54-.051.478 0 .558.018.682.154.035.038 1.337 1.999 2.895 4.361a10760.433 10760.433 0 0 0 4.735 7.17l1.9 2.879.096-.063a12.317 12.317 0 0 0 2.466-2.163 11.944 11.944 0 0 0 2.824-6.134c.096-.66.108-.854.108-1.748 0-.893-.012-1.088-.108-1.747-.652-4.506-3.859-8.292-8.208-9.695a12.597 12.597 0 0 0-2.499-.523A33.119 33.119 0 0 0 11.573 0zm4.069 7.217c.347 0 .408.005.486.047a.473.473 0 0 1 .237.277c.018.06.023 1.365.018 4.304l-.006 4.218-.744-1.14-.746-1.14v-3.066c0-1.982.01-3.097.023-3.15a.478.478 0 0 1 .233-.296c.096-.05.13-.054.5-.054z"/></svg> },
  { name: 'TypeScript', category: 'Language', color: '#3178C6', size: 'small', icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8"><path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z"/></svg> },
  { name: 'React', category: 'Web', color: '#61DAFB', size: 'small', icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8"><path d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38a2.167 2.167 0 0 0-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44a23.479 23.479 0 0 0-3.107-.534A23.331 23.331 0 0 0 12 9.5a23.514 23.514 0 0 0-1.337-1.838c1.269-1.204 2.51-1.86 3.354-1.86zm-7.962.489c.778 0 2.008.631 3.249 1.82a23.218 23.218 0 0 0-2.144 2.653 23.6 23.6 0 0 0-3.132.533 14.87 14.87 0 0 1-.248-1.417c-.23-1.878.054-3.32.724-3.699.19-.112.378-.167.55-.167v-.023zm.049 2.987a.25.25 0 0 0-.25.251c0 .138.112.25.25.25a.25.25 0 0 0 .25-.25.25.25 0 0 0-.25-.251zm6.868 0a.25.25 0 0 0-.25.251.25.25 0 0 0 .25.25.25.25 0 0 0 .25-.25.25.25 0 0 0-.25-.251z"/></svg> },
  { name: 'Node.js', category: 'Backend', color: '#339933', size: 'small', icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8"><path d="M11.998,24c-0.321,0-0.641-0.084-0.922-0.247l-2.936-1.737c-0.438-0.245-0.224-0.332-0.08-0.383c0.585-0.203,0.703-0.25,1.328-0.604c0.065-0.037,0.151-0.023,0.218,0.017l2.256,1.339c0.082,0.045,0.197,0.045,0.272,0l8.795-5.076c0.082-0.047,0.134-0.141,0.134-0.238V6.921c0-0.099-0.053-0.192-0.137-0.242l-8.791-5.072c-0.081-0.047-0.189-0.047-0.271,0L3.075,6.68C2.99,6.729,2.936,6.825,2.936,6.921v10.15c0,0.097,0.054,0.189,0.139,0.235l2.409,1.392c1.307,0.654,2.108-0.116,2.108-0.89V7.787c0-0.142,0.114-0.253,0.256-0.253h1.115c0.139,0,0.255,0.112,0.255,0.253v10.021c0,1.745-0.95,2.745-2.604,2.745c-0.508,0-0.909,0-2.026-0.551L2.28,18.675c-0.57-0.329-0.922-0.945-0.922-1.604V6.921c0-0.659,0.353-1.275,0.922-1.603l8.795-5.082c0.557-0.315,1.296-0.315,1.848,0l8.794,5.082c0.57,0.329,0.924,0.944,0.924,1.603v10.15c0,0.659-0.354,1.273-0.924,1.604l-8.794,5.078C12.643,23.916,12.324,24,11.998,24z M19.099,13.993c0-1.9-1.284-2.406-3.987-2.763c-2.731-0.361-3.009-0.548-3.009-1.187c0-0.528,0.235-1.233,2.258-1.233c1.807,0,2.473,0.389,2.747,1.607c0.024,0.115,0.129,0.199,0.247,0.199h1.141c0.071,0,0.138-0.031,0.186-0.081c0.048-0.054,0.074-0.123,0.067-0.196c-0.177-2.098-1.571-3.076-4.388-3.076c-2.508,0-4.004,1.058-4.004,2.833c0,1.925,1.488,2.457,3.895,2.695c2.88,0.282,3.103,0.703,3.103,1.269c0,0.983-0.789,1.402-2.642,1.402c-2.327,0-2.839-0.584-3.011-1.742c-0.02-0.124-0.126-0.215-0.253-0.215h-1.137c-0.141,0-0.254,0.112-0.254,0.253c0,1.482,0.806,3.248,4.655,3.248C17.501,17.007,19.099,15.91,19.099,13.993z"/></svg> },
  { name: 'Firebase', category: 'Backend', color: '#FFCA28', size: 'small', icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8"><path d="M3.89 15.672L6.255.461A.542.542 0 0 1 7.27.288l2.543 4.771zm16.794 3.692l-2.25-14a.54.54 0 0 0-.919-.295L3.316 19.365l7.856 4.427a1.621 1.621 0 0 0 1.588 0zM14.3 7.147l-1.818-3.482a.542.542 0 0 0-.96 0L3.53 17.984z"/></svg> },
  { name: 'Tailwind CSS', category: 'Styling', color: '#06B6D4', size: 'small', icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8"><path d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624C10.337,13.382,8.976,12,6.001,12z"/></svg> },
  { name: 'Zustand', category: 'State', color: '#443E38', size: 'small', icon: <img src="/zustand.svg" alt="Zustand Logo" className="w-8 h-8 object-contain" /> },
];

export default function Skills() {
  const { lang, t } = useLang();
  const sectionRef = useRef<HTMLDivElement>(null);
  const sk = t.skills;

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

  const categories = Array.from(new Set(STACK_BASE.map(t => t.category)));

  return (
    <section id="stack" ref={sectionRef} className="py-24 md:py-32" style={{ background: 'var(--surface-alt)' }}>
      <div className="section-container">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
          <div className="reveal">
            <span className="tag tag-accent mb-4 inline-flex">{sk.tag[lang]}</span>
            <h2 className="font-display font-bold text-4xl md:text-5xl leading-tight" style={{ color: 'var(--text-primary)' }}>
              {sk.heading[lang]}
            </h2>
          </div>
          <p className="max-w-xs font-body text-sm leading-relaxed reveal delay-100" style={{ color: 'var(--text-muted)' }}>
            {sk.sub[lang]}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {STACK_BASE.map((tech, i) => (
            <div
              key={tech.name}
              className={`reveal card group cursor-default ${tech.size === 'large' ? 'col-span-2 md:col-span-2' : ''}`}
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div className="p-6 h-full flex flex-col gap-4">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110" style={{ background: `${tech.color}18`, color: tech.color }}>
                  {tech.icon}
                </div>
                <div className="flex-1">
                  <div className="font-display font-semibold text-base mb-1" style={{ color: 'var(--text-primary)' }}>{tech.name}</div>
                  <p className="font-body text-sm" style={{ color: 'var(--text-muted)' }}>
                    {sk.descs[tech.name as keyof typeof sk.descs]?.[lang] || ''}
                  </p>
                </div>
                <span className="tag self-start text-xs">
                  {sk.cats[tech.category as keyof typeof sk.cats][lang]}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Banner CTA below bento grid */}
        <div
          className="mt-12 rounded-3xl p-6 md:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 reveal delay-300"
          style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-[var(--accent)]"
              style={{ background: 'var(--accent-dim)' }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                <polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
            </div>
            <div>
              <h4 className="font-display font-bold text-lg leading-tight mb-1" style={{ color: 'var(--text-primary)' }}>
                {lang === 'es' ? '¿Buscas un stack diferente?' : 'Looking for a different stack?'}
              </h4>
              <p className="font-body text-xs" style={{ color: 'var(--text-muted)' }}>
                {lang === 'es' ? 'Trabajo también con otras tecnologías web y móviles. Hablemos de tu proyecto.' : 'I also work with other mobile and web tech. Let\'s chat about your project.'}
              </p>
            </div>
          </div>
          <a href="#contact" className="btn-accent text-sm py-2.5 px-5 self-stretch sm:self-auto justify-center">
            {lang === 'es' ? 'Pregúntame' : 'Ask me anything'}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"/>
              <polyline points="12 5 19 12 12 19"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
