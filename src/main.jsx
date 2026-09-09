import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { motion, AnimatePresence } from 'framer-motion';
import './styles.css';
import avatar from './assets/srikari-avatar.png';

const roles = ['Full Stack Developer', 'Data Analyst', 'IoT Enthusiast'];
const fullName = 'SRI SAI PRASANNA SRIKARI GARIKAPATI';
const linkedin = 'https://www.linkedin.com/in/srikari-garikapati-9a6509291/';
const github = 'https://github.com/garikapatisrikari';

function TypingRole() {
  const [role, setRole] = useState(0);
  const [text, setText] = useState('');
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const current = roles[role];
    const timer = setTimeout(() => {
      if (!deleting && text === current) setDeleting(true);
      else if (deleting && text === '') { setDeleting(false); setRole((r) => (r + 1) % roles.length); }
      else setText(deleting ? current.slice(0, text.length - 1) : current.slice(0, text.length + 1));
    }, text === current && !deleting ? 1300 : deleting ? 45 : 75);
    return () => clearTimeout(timer);
  }, [text, deleting, role]);
  return <>{text}<span className="typing-caret">|</span></>;
}

function App() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [loaded, setLoaded] = useState(false);
  const [active, setActive] = useState('home');
  const particles = useMemo(() => Array.from({ length: 48 }, (_, i) => i), []);

  useEffect(() => {
    const onMove = (e) => {
      setMouse({ x: e.clientX, y: e.clientY });
      document.documentElement.style.setProperty('--mx', `${e.clientX}px`);
      document.documentElement.style.setProperty('--my', `${e.clientY}px`);
    };
    window.addEventListener('mousemove', onMove);
    const t = setTimeout(() => setLoaded(true), 850);
    return () => { window.removeEventListener('mousemove', onMove); clearTimeout(t); };
  }, []);

  useEffect(() => {
    const sections = [...document.querySelectorAll('main section[id]')];
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActive(entry.target.id);
          entry.target.classList.add('is-visible');
        }
      });
    }, { threshold: 0.22 });
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [loaded]);

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  return <div className="site">
    <AnimatePresence>{!loaded && <motion.div className="preloader" initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .7 }}>
      <div className="loader-mark">S<span>♡</span></div><div className="loader-name">SRIKARI</div><div className="loader-line"><span /></div><small>ENTERING DIGITAL SPACE</small>
    </motion.div>}</AnimatePresence>

    <div className="cursor-glow" />
    <div className="cursor-ring" />
    <div className="grid-bg" />
    <div className="aurora aurora-one" /><div className="aurora aurora-two" /><div className="aurora aurora-three" />
    <div className="particles" aria-hidden="true">{particles.map((p) => <i key={p} style={{ '--i': p }} />)}</div>

    <header className="nav">
      <button className="brand" onClick={() => scrollTo('home')} aria-label={fullName}><strong>SRIKARI</strong><span>♡</span><small>{fullName}</small></button>
      <nav>{['home','about','skills','projects','experience','contact'].map((x) => <button className={active === x ? 'active' : ''} key={x} onClick={() => scrollTo(x)}>{x}</button>)}</nav>
      <button className="connect" onClick={() => scrollTo('contact')}>Let's Connect <span>↗</span></button>
    </header>

    <main>
      <section id="home" className="hero section">
        <div className="hero-copy">
          <motion.div className="eyebrow" initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: .95, duration: .7 }}><span>✦</span> BUILD · ANALYZE · CREATE</motion.div>
          <motion.p className="hello" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.08 }}>Hi, I'm</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 40, filter: 'blur(16px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0)' }} transition={{ delay: 1.15, duration: 1 }}>SRIKARI<span className="caret">.</span></motion.h1>
          <motion.div className="role-wrap" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.55 }}><TypingRole /></motion.div>
          <motion.p className="intro" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.75 }}>I turn ideas into digital experiences<br />and data into meaningful insights.</motion.p>
          <motion.div className="actions" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.9 }}>
            <button className="primary magnetic" onClick={() => scrollTo('projects')}>Explore My Work <span>→</span></button>
            <a className="secondary" href="/resume.pdf">↓&nbsp; Download Resume</a>
          </motion.div>
          <motion.div className="socials" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.05 }}>
            <a href={linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">in</a>
            <a href={github} target="_blank" rel="noreferrer" aria-label="GitHub">GH</a>
            <a href="mailto:garikapatisrikari@gmail.com" aria-label="Email">@</a>
          </motion.div>
          <div className="hero-stats"><span><b>05</b> PROJECTS</span><span><b>04</b> INTERNSHIPS</span><span><b>8.05</b> CGPA</span></div>
        </div>

        <motion.div className="avatar-stage" initial={{ opacity: 0, scale: .82, y: 45 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 1.3, delay: .35, ease: 'easeOut' }} style={{ transform: `perspective(1300px) rotateY(${(mouse.x - window.innerWidth / 2) * .007}deg) rotateX(${-(mouse.y - window.innerHeight / 2) * .005}deg) translate3d(${(mouse.x - window.innerWidth / 2) * .014}px, ${(mouse.y - window.innerHeight / 2) * .009}px,0)` }}>
          <div className="avatar-aura" /><div className="halo" /><div className="orbit orbit-a" /><div className="orbit orbit-b" /><div className="orbit-dot dot-a" /><div className="orbit-dot dot-b" />
          <div className="avatar-glass" /><img src={avatar} alt="AI-styled portrait of Srikari at a tech workspace" />
          <div className="float-tag tag-one">FULL STACK</div><div className="float-tag tag-two">DATA · AI</div><div className="float-tag tag-three">IoT</div>
          <div className="tech-pill pill-react">REACT</div><div className="tech-pill pill-python">PYTHON</div><div className="tech-pill pill-sql">SQL</div><div className="tech-pill pill-cloud">AWS</div>
          <div className="code-card code-one"><span>const</span> idea = <b>true</b>;</div><div className="code-card code-two"><span>build(</span>impact<span>);</span></div>
        </motion.div>
        <motion.button className="scroll-cue" onClick={() => scrollTo('about')} animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}><span>SCROLL TO EXPLORE</span> ↓</motion.button>
      </section>

      <section id="about" className="section split reveal-section"><div><span className="section-no">02</span><h2>More than just code.</h2><p>I'm a Computer Science (IoT) undergraduate who enjoys building practical solutions, working with people, and turning ideas into real-world impact.</p><p className="muted">Curious. Creative. Consistent.</p></div><motion.div whileHover={{ rotateY: -9, rotateX: 6, y: -10 }} className="glass-card mini-card"><span>8.05</span><small>Current CGPA</small><hr /><span>2023 — 2027</span><small>B.Tech · CSE (IoT)</small><div className="card-glow" /></motion.div></section>

      <section id="skills" className="section reveal-section"><span className="section-no">03</span><h2>Tools I work with.</h2><p className="section-lead">A growing toolkit across development, analytics, cloud and intelligent applications.</p><div className="skill-grid">{['Python','JavaScript','React.js','Node.js','FastAPI','SQL','Machine Learning','Excel','AWS','Linux','Git','GitHub'].map((s, i) => <motion.div whileHover={{ y: -10, scale: 1.045, rotateX: 6, rotateY: -6 }} className="skill" key={s}><span>0{i + 1}</span><b>{s}</b><i /></motion.div>)}</div></section>

      <section id="projects" className="section reveal-section"><span className="section-no">04</span><h2>Featured projects.</h2><p className="section-lead">Real problems, practical builds, and a little AI magic.</p><div className="project-grid">{[
        ['AI-Generated Classroom Timetable','AI-based clash-free timetable generation using academic and resource constraints.','SIH'],
        ['Personalized Networking Assistant','AI-powered networking assistant with personalized conversation generation and profile management.','FastAPI · Streamlit'],
        ['Resolve-Now','Complaint management platform with secure authentication and REST APIs.','MERN'],
        ['AI-Powered Music Recognition','Application designed to recognize songs through humming with a responsive interface.','AI'],
        ['Iris Flower Classification','Compared Logistic Regression, KNN and Decision Tree models for classification.','ML']
      ].map(([title, desc, badge], i) => <motion.article whileHover={{ y: -12, rotateX: 3, rotateY: -2 }} className="project" key={title}><div className="project-top"><span>0{i + 1}</span><b>{badge}</b></div><div className="project-shine" /><h3>{title}</h3><p>{desc}</p><button onClick={() => alert('Add your project GitHub/live-demo URL here.')}>View Project <span>↗</span></button></motion.article>)}</div></section>

      <section id="experience" className="section split reveal-section"><div><span className="section-no">05</span><h2>Learning. Building. Growing.</h2><div className="timeline">{['Smartbridge · MERN Stack Developer Intern','AWS Cloud Computing & DevOps Intern','Data Analytics Intern','Google Cloud Generative AI'].map((x, i) => <motion.div className="timeline-item" key={x} whileHover={{ x: 10 }}><span>0{i + 1}</span><p>{x}</p><i /></motion.div>)}</div></div><motion.div className="quote-card" animate={{ rotate: [0, 1, -1, 0] }} transition={{ duration: 6, repeat: Infinity }}>“Build<br />Learn<br />Grow<br />Repeat <em>♡</em></motion.div></section>

      <section id="contact" className="section contact reveal-section"><span className="section-no">06</span><h2>Have an idea?</h2><h3>Let's build it together.</h3><p>I'm always open to meaningful projects, collaborations and opportunities.</p><div className="contact-links"><a href="mailto:garikapatisrikari@gmail.com">@ Email ↗</a><a href={linkedin} target="_blank" rel="noreferrer">in LinkedIn ↗</a><a href={github} target="_blank" rel="noreferrer">GH GitHub ↗</a></div></section>
    </main>
    <footer><span>{fullName} ♡</span><small>Full Stack Developer · Data Analyst · IoT Enthusiast</small></footer>
  </div>;
}
createRoot(document.getElementById('root')).render(<App />);
