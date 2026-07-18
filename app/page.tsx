import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Process from './components/Process';
import Contact from './components/Contact';
import Footer from './components/Footer';

import { getProjects } from './lib/projects';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const projects = await getProjects();
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects projects={projects} />
        <Process />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
