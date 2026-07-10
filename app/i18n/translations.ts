export type Lang = 'es' | 'en';

export const translations = {
  nav: {
    about: { es: 'Sobre mí', en: 'About' },
    stack: { es: 'Stack', en: 'Stack' },
    projects: { es: 'Proyectos', en: 'Projects' },
    process: { es: 'Proceso', en: 'Process' },
    contact: { es: 'Contacto', en: 'Contact' },
    cta: { es: 'Hablemos', en: "Let's talk" },
    ctaMobile: { es: 'Construyamos juntos', en: "Let's build together" },
  },

  hero: {
    badge: { es: 'Disponible para trabajar', en: 'Available for work' },
    heading1: { es: 'Desarrollador', en: 'Mobile & Web' },
    heading2: { es: 'Móvil y Web.', en: 'developer.' },
    sub1: { es: 'Creo apps rápidas, hermosas y listas para producción con', en: 'I build fast, beautiful, production-ready apps with' },
    sub2: { es: 'y', en: 'and' },
    sub3: { es: '. De la idea al App Store — código limpio, UI pixel-perfect.', en: '. From idea to the App Store — clean code, pixel-perfect UI.' },
    cta1: { es: 'Ver mi trabajo', en: 'See my work' },
    cta2: { es: 'Contáctame', en: 'Get in touch' },
    stat1num: { es: '3+', en: '3+' },
    stat1label: { es: 'Años de experiencia', en: 'Years experience' },
    stat2num: { es: '15+', en: '15+' },
    stat2label: { es: 'Apps publicadas', en: 'Apps shipped' },
    stat3num: { es: '100%', en: '100%' },
    stat3label: { es: 'Pasión por el oficio', en: 'Passion for craft' },
  },

  about: {
    tag: { es: 'Sobre mí', en: 'About me' },
    mono: { es: 'egobmz.dev', en: 'egobmz.dev' },
    role: { es: 'Desarrollador de Software', en: 'Software Developer' },
    based: { es: 'Latinoamérica · Remoto', en: 'Latin America · Remote-first' },
    chip1: { es: 'Arquitectura Limpia', en: 'Clean Architecture' },
    chip2: { es: 'Rendimiento', en: 'Performance' },
    chip3: { es: 'Offline-first', en: 'Offline-first' },
    chip4: { es: 'CI/CD', en: 'CI/CD' },
    chip5: { es: 'Animaciones', en: 'Animations' },
    chip6: { es: 'Accesibilidad', en: 'Accessibility' },
    heading: { es: '¡Hola! Soy Diego', en: "Hi! I'm Diego" },
    headingEnd: { es: ' —o simplemente Ego—, y creo apps que', en: ' —or just Ego— and I build apps that' },
    headingHighlight: { es: 'la gente ama.', en: 'people love.' },
    p1: {
      es: 'Soy desarrollador de software enfocado en crear experiencias móviles y web de alta calidad. Con React Native + Expo construyo apps multiplataforma que se sienten nativas en iOS y Android, y con Next.js creo productos web rápidos y optimizados para SEO.',
      en: "I'm a software developer focused on crafting high-quality mobile and web experiences. With React Native + Expo, I build cross-platform apps that feel native on both iOS and Android, and with Next.js I create fast, SEO-friendly web products.",
    },
    p2: {
      es: 'Me importa profundamente la',
      en: 'I care deeply about',
    },
    p2b: {
      es: 'arquitectura limpia',
      en: 'clean architecture',
    },
    p2c: {
      es: 'animaciones fluidas',
      en: 'smooth animations',
    },
    p2d: {
      es: 'rendimiento',
      en: 'performance',
    },
    p2end: {
      es: '— porque las grandes apps no solo funcionan, deleitan.',
      en: "— because great apps aren't just functional, they're delightful.",
    },
    p3: {
      es: 'Tanto si empezamos desde cero como si mejoramos un proyecto existente, traigo el mismo nivel de craft y atención al detalle a cada línea de código.',
      en: "Whether starting from zero or levelling up an existing project, I bring the same level of craft and attention to detail to every line of code.",
    },
    card1title: { es: 'Móvil', en: 'Mobile' },
    card1desc: { es: 'React Native & Expo — iOS & Android', en: 'React Native & Expo — iOS & Android' },
    card2title: { es: 'Web', en: 'Web' },
    card2desc: { es: 'React & Next.js — Full stack', en: 'React & Next.js — Full stack' },
  },

  skills: {
    tag: { es: 'Tecnologías', en: 'Tech Stack' },
    heading: { es: 'Herramientas que domino', en: 'Tools I master' },
    sub: { es: 'Un conjunto curado de tecnologías modernas que uso para crear productos listos para producción.', en: 'A curated set of modern technologies I use to build production-ready products.' },
    cats: {
      Mobile: { es: 'Móvil', en: 'Mobile' },
      Web: { es: 'Web', en: 'Web' },
      Language: { es: 'Lenguaje', en: 'Language' },
      Backend: { es: 'Backend', en: 'Backend' },
      Styling: { es: 'Estilos', en: 'Styling' },
      State: { es: 'Estado', en: 'State' },
    },
    descs: {
      'React Native': { es: 'Apps nativas multiplataforma', en: 'Cross-platform native apps' },
      'Expo': { es: 'Flujo de desarrollo ágil', en: 'Streamlined dev workflow' },
      'Next.js': { es: 'Framework React full-stack', en: 'Full-stack React framework' },
      'TypeScript': { es: 'JavaScript tipado a escala', en: 'Typed JavaScript at scale' },
      'React': { es: 'Librería de componentes UI', en: 'UI component library' },
      'Node.js': { es: 'JavaScript del lado servidor', en: 'Server-side JavaScript' },
      'Firebase': { es: 'BD en tiempo real y Auth', en: 'Realtime DB & Auth' },
      'Tailwind CSS': { es: 'CSS orientado a utilidades', en: 'Utility-first CSS' },
      'Zustand': { es: 'Gestión de estado minimalista', en: 'Bear-necessities state mgmt' },
      'Reanimated': { es: 'Animaciones a 60fps en móvil', en: '60fps mobile animations' },
    },
  },

  projects: {
    tag: { es: 'Proyectos', en: 'Projects' },
    heading: { es: 'Trabajo selecto', en: 'Selected work' },
    viewAll: { es: 'Ver todos los proyectos', en: 'View all projects' },
    filters: {
      all: { es: 'Todos', en: 'All' },
      mobile: { es: 'Móvil', en: 'Mobile' },
      web: { es: 'Web', en: 'Web' },
    },
    ctaBtn: { es: 'Hablemos', en: "Let's talk" },
    ctaHeading: { es: '¿Te gusta lo que ves?', en: 'Like what you see?' },
    ctaDesc: { es: 'Si te gusta mi trabajo o quieres hacer algo increíble en conjunto, escríbeme.', en: "If you like my work or want to build something amazing together, let's talk." },
    ctaStart: { es: 'Contáctame', en: 'Get in touch' },
    links: {
      live: { es: 'Ver App en vivo', en: 'Live App' },
      repo: { es: 'Repositorio', en: 'Repository' },
      video: { es: 'Video Demo', en: 'Video Demo' },
    },
    moreProjects: { es: 'Más Proyectos', en: 'More Projects' },
    items: [
      {
        id: 'fit-track',
        title: 'FitTrack Pro',
        type: { es: 'Móvil', en: 'Mobile' },
        desc: { es: 'App de fitness multiplataforma con registro de entrenamientos en tiempo real, gráficas de progreso y arquitectura offline-first.', en: 'Cross-platform fitness tracker with real-time workout logging, progress charts, and offline-first architecture.' },
        tags: ['React Native', 'Expo', 'Firebase', 'Zustand'],
        gradient: 'linear-gradient(135deg, #E85D3D 0%, #FF8A70 100%)',
        emoji: '💪',
        liveUrl: '#',
        repoUrl: '#',
        videoUrl: '#',
        isFeatured: true,
        longDesc_es: [
          'Este proyecto fue desarrollado con un enfoque en alto rendimiento y arquitectura limpia. El objetivo principal fue crear una experiencia de usuario fluida, que se sintiera nativa.',
          'Se utilizaron las mejores prácticas de la industria, integrando CI/CD para despliegues automatizados y pruebas continuas. La UI fue diseñada de cero enfocándose en micro-interacciones.'
        ],
        longDesc_en: [
          'This project was developed focusing on high performance and clean architecture. The main goal was to create a seamless user experience that felt native.',
          'Industry best practices were used, integrating CI/CD for automated deployments and continuous testing. The UI was designed from scratch focusing on micro-interactions.'
        ],
      },
      {
        id: 'shopwave',
        title: 'ShopWave',
        type: { es: 'Web + Móvil', en: 'Web + Mobile' },
        desc: { es: 'Plataforma e-commerce completa con tienda en Next.js, app Expo y capa de datos TypeScript compartida.', en: 'Full e-commerce platform with Next.js storefront, Expo mobile app, and shared TypeScript data layer.' },
        tags: ['Next.js', 'React Native', 'TypeScript', 'GraphQL'],
        gradient: 'linear-gradient(135deg, #3178C6 0%, #61DAFB 100%)',
        emoji: '🛒',
        liveUrl: '#',
        repoUrl: '#',
        videoUrl: '#',
        isFeatured: true,
        longDesc_es: [
          'Este proyecto fue desarrollado con un enfoque en alto rendimiento y arquitectura limpia. El objetivo principal fue crear una experiencia de usuario fluida, que se sintiera nativa.',
          'Se utilizaron las mejores prácticas de la industria, integrando CI/CD para despliegues automatizados y pruebas continuas. La UI fue diseñada de cero enfocándose en micro-interacciones.'
        ],
        longDesc_en: [
          'This project was developed focusing on high performance and clean architecture. The main goal was to create a seamless user experience that felt native.',
          'Industry best practices were used, integrating CI/CD for automated deployments and continuous testing. The UI was designed from scratch focusing on micro-interactions.'
        ],
      },
      {
        id: 'pulse-dashboard',
        title: 'Pulse Dashboard',
        type: { es: 'Web', en: 'Web' },
        desc: { es: 'Dashboard SaaS con Next.js App Router, gráficas en tiempo real y modo oscuro completo.', en: 'SaaS analytics dashboard built with Next.js App Router, featuring real-time charts and dark mode.' },
        tags: ['Next.js', 'TypeScript', 'Tailwind', 'Recharts'],
        gradient: 'linear-gradient(135deg, #7C3AED 0%, #A78BFA 100%)',
        emoji: '📊',
        liveUrl: '#',
        repoUrl: '#',
        videoUrl: '#',
        isFeatured: true,
        longDesc_es: [
          'Este proyecto fue desarrollado con un enfoque en alto rendimiento y arquitectura limpia. El objetivo principal fue crear una experiencia de usuario fluida, que se sintiera nativa.',
          'Se utilizaron las mejores prácticas de la industria, integrando CI/CD para despliegues automatizados y pruebas continuas. La UI fue diseñada de cero enfocándose en micro-interacciones.'
        ],
        longDesc_en: [
          'This project was developed focusing on high performance and clean architecture. The main goal was to create a seamless user experience that felt native.',
          'Industry best practices were used, integrating CI/CD for automated deployments and continuous testing. The UI was designed from scratch focusing on micro-interactions.'
        ],
      },
      {
        id: 'nomad-chat',
        title: 'Nomad Chat',
        type: { es: 'Móvil', en: 'Mobile' },
        desc: { es: 'App de mensajería en tiempo real con cifrado extremo a extremo, notificaciones push y compartición de medios.', en: 'Real-time messaging app with end-to-end encryption, push notifications and media sharing.' },
        tags: ['React Native', 'Expo', 'Firebase', 'Node.js'],
        gradient: 'linear-gradient(135deg, #059669 0%, #34D399 100%)',
        emoji: '💬',
        liveUrl: '#',
        repoUrl: '#',
        videoUrl: '#',
        isFeatured: true,
        longDesc_es: [
          'Este proyecto fue desarrollado con un enfoque en alto rendimiento y arquitectura limpia. El objetivo principal fue crear una experiencia de usuario fluida, que se sintiera nativa.',
          'Se utilizaron las mejores prácticas de la industria, integrando CI/CD para despliegues automatizados y pruebas continuas. La UI fue diseñada de cero enfocándose en micro-interacciones.'
        ],
        longDesc_en: [
          'This project was developed focusing on high performance and clean architecture. The main goal was to create a seamless user experience that felt native.',
          'Industry best practices were used, integrating CI/CD for automated deployments and continuous testing. The UI was designed from scratch focusing on micro-interactions.'
        ],
      },
    ],
  },

  process: {
    tag: { es: 'Proceso', en: 'Process' },
    heading: { es: 'Cómo trabajo', en: 'How I work' },
    steps: [
      {
        num: '01',
        title: { es: 'Ingeniería de Requerimientos y Viabilidad', en: 'Requirements Engineering & Feasibility' },
        desc: { es: 'Antes de escribir una sola línea de código, analizo la viabilidad técnica de tu idea para reducir costes de desarrollo. Traduzco tu visión en un plan técnico sólido, mapeando flujos lógicos que evitan sorpresas y garantizan que el producto final aporte valor real a tu negocio.', en: 'Before writing a single line of code, I analyze your idea\'s technical feasibility to reduce development costs. I translate your vision into a solid technical plan, mapping logical flows that prevent surprises and ensure the final product delivers real business value.' },
        tags: { es: ['Viabilidad', 'Planificación', 'Mitigación de Riesgos'], en: ['Feasibility', 'Planning', 'Risk Mitigation'] },
      },
      {
        num: '02',
        title: { es: 'Diseño UX/UI de Alta Conversión', en: 'High-Conversion UI/UX Design' },
        desc: { es: 'Diseño interfaces intuitivas y limpias enfocadas en retener usuarios y guiar la conversión. Te entrego un prototipo interactivo de alta fidelidad para que veas, pruebes y valides la experiencia exacta de tu aplicación antes de iniciar la fase de desarrollo, ahorrando tiempo y presupuesto.', en: 'I design intuitive and clean interfaces focused on retaining users and driving conversions. I deliver a high-fidelity interactive prototype so you can see, test, and validate the exact experience of your app before development starts, saving time and budget.' },
        tags: { es: ['UI/UX', 'Conversión', 'Prototipos Interactivos'], en: ['UI/UX', 'Conversion', 'Interactive Prototypes'] },
      },
      {
        num: '03',
        title: { es: 'Arquitectura Robusta y Desarrollo Ágil', en: 'Robust Architecture & Agile Dev' },
        desc: { es: 'Desarrollo tu producto usando Next.js y React Native bajo estándares de código limpio y tipado estricto (TypeScript). Esto asegura que tu aplicación sea ultrarrápida, segura y fácil de escalar en el futuro. Hago entregas periódicas e integraciones constantes para que valides el avance real.', en: 'I build your product using Next.js and React Native under clean code standards and strict typing (TypeScript). This ensures your app is blazing fast, secure, and easy to scale in the future. I perform periodic deliveries and constant integrations so you validate real progress.' },
        tags: { es: ['React Native', 'Next.js', 'Código Limpio', 'Escalabilidad'], en: ['React Native', 'Next.js', 'Clean Code', 'Scalability'] },
      },
      {
        num: '04',
        title: { es: 'Lanzamiento a Producción y Optimización', en: 'Production Launch & Optimization' },
        desc: { es: 'Me encargo de todo el proceso de publicación: subida a tiendas (App Store, Google Play), configuración de servidores y despliegue en Vercel. Una vez en el mercado, implemento analíticas para rastrear el comportamiento del usuario, optimizar el rendimiento y asegurar el éxito continuo de tu producto.', en: 'I handle the entire release process: app store submissions (App Store, Google Play), server configuration, and Vercel deployment. Once live, I implement analytics to track user behavior, optimize performance, and ensure the ongoing success of your product.' },
        tags: { es: ['CI/CD', 'App Stores', 'Analytics', 'Rendimiento'], en: ['CI/CD', 'App Stores', 'Analytics', 'Performance'] },
      },
    ],
  },

  contact: {
    badge: { es: 'Disponible para nuevos proyectos', en: 'Available for new projects' },
    heading1: { es: 'Construyamos algo', en: "Let's build something" },
    heading2: { es: 'increíble', en: 'great' },
    heading3: { es: 'juntos.', en: 'together.' },
    sub: { es: '¿Tienes una idea de app móvil? ¿Necesitas un producto web ultrarrápido? ¿Buscas un experto en React Native? Escríbeme — respondo en menos de 24h.', en: "Have a mobile app idea? Need a blazing-fast web product? Looking for a React Native expert? Drop me a message — I reply within 24 hours." },
    copy: { es: 'Copiar', en: 'Copy' },
    copied: { es: '¡Copiado!', en: 'Copied!' },
    sendBtn: { es: 'Enviar email', en: 'Send email' },
    findMe: { es: 'Encuéntrame en', en: 'Find me on' },
  },

  footer: {
    built: { es: 'Construido con', en: 'Built with' },
    using: { es: 'usando Next.js & Tailwind CSS.', en: 'using Next.js & Tailwind CSS.' },
    links: {
      about: { es: 'Sobre mí', en: 'About' },
      stack: { es: 'Stack', en: 'Stack' },
      projects: { es: 'Proyectos', en: 'Projects' },
      contact: { es: 'Contacto', en: 'Contact' },
    },
  },
} as const;

export type Translations = typeof translations;
