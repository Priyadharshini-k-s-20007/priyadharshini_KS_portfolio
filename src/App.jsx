import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion'
import { Download, ChevronRight, ExternalLink, ArrowUp, Mail } from 'lucide-react'
import emailjs from '@emailjs/browser'

// ─── EmailJS Configuration ───────────────────────────────────────────────────
// 1. Go to https://www.emailjs.com/ and create a FREE account
// 2. Add an Email Service (Gmail, Outlook, etc.) → copy the Service ID
// 3. Create an Email Template with variables: {{from_name}}, {{from_email}}, {{message}}
//    → copy the Template ID
// 4. Go to Account → API Keys → copy your Public Key
// Then fill in the values below:
const EMAILJS_SERVICE_ID = 'service_jwcg65q'
const EMAILJS_TEMPLATE_ID = 'template_8wwtmw9'
const EMAILJS_PUBLIC_KEY = 'SyXkg3tokPXqXnRn0'
// ─────────────────────────────────────────────────────────────────────────────

function GithubIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  )
}

/* ─── DATA ─── */
const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Coding', href: '#coding' },
  { label: 'Contact', href: '#contact' },
]

const TYPING_WORDS = ['AI Engineer', 'MERN Developer', 'ML Enthusiast', 'Problem Solver', 'Data Scientist']

const SKILLS = {
  'Programming Languages': { icon: '{ }', items: ['C', 'C++', 'Python', 'Java', 'SQL'] },
  'Web Development': { icon: '<>', items: ['HTML5', 'CSS3', 'JavaScript', 'React', 'Node.js', 'Express', 'MongoDB'] },
  'AI & Machine Learning': { icon: '∿', items: ['TensorFlow', 'Scikit-learn', 'FastAPI', 'Pandas', 'NumPy', 'LSTM'] },
  'Tools & Platforms': { icon: '⌥', items: ['Git', 'GitHub', 'VS Code', 'Jupyter', 'Docker', 'Canva'] },
}

const PROJECTS = [
  {
    title: 'AEGIS Model Guard',
    type: 'Chrome Extension · AI Privacy',
    desc: 'An AI-powered Chrome extension that safeguards user privacy on AI platforms. Automatically detects sensitive data (API keys, emails, phone numbers, account numbers, names) and replaces them with secure placeholders before prompts are sent — then restores originals in AI responses seamlessly.',
    tech: ['Python', 'JavaScript', 'React', 'Node.js', 'Express.js', 'MongoDB', 'Chrome Extension API', 'JWT', 'Docker', 'GitHub Actions', 'MLOps'],
    github: 'https://github.com/SECE-24-28/aegismodelguard-ta-mlops-project.git',
    demo: '#',
    images: ['/projects/aegis/aegis1.png', '/projects/aegis/aegis2.png', '/projects/aegis/aegis3.png'],
  },
  {
    title: 'AI Aircraft Health Monitoring',
    type: 'ML / Full Stack',
    desc: 'An AI-powered predictive maintenance platform that estimates aircraft engine Remaining Useful Life (RUL) using LSTM deep learning. Analyzes engine sensor data and presents maintenance insights through an interactive dashboard, enabling proactive planning and reducing operational risks.',
    tech: ['Python', 'TensorFlow', 'FastAPI', 'React', 'Tailwind CSS', 'NumPy', 'Pandas', 'Matplotlib'],
    github: 'https://github.com/Priyadharshini-k-s-20007/AI_Aircraft_Predictive_Maintenance.git',
    demo: '#',
    images: ['/projects/aircraft/aircraft1.png', '/projects/aircraft/aircraft2.png', '/projects/aircraft/aircraft3.png'],
  },
  {
    title: 'SportsEase',
    type: 'Hackathon Winner · Full Stack',
    desc: 'A hackathon-winning athlete performance management platform that automates sports analytics and sponsorship indexing. Features secure media uploads, AI-assisted performance evaluation, athlete profiling, and dynamic updates to help coaches identify promising talent efficiently.',
    tech: ['React', 'Node.js', 'Express.js', 'MongoDB', 'Cloudinary', 'JWT', 'REST API'],
    github: 'https://github.com/Priyadharshini-k-s-20007/SportsEase.git',
    demo: '#',
    images: ['/projects/sportsease/sports1.png', '/projects/sportsease/sports2.png', '/projects/sportsease/sports3.png'],
  },
  {
    title: 'QuizCortex – Smart Quiz Book',
    type: 'Full Stack · EdTech',
    desc: 'A modern full-stack quiz management platform that lets users create, manage, and attempt quizzes through an intuitive interface. Features organized question management, secure authentication, responsive design, and real-time score tracking for an engaging learning experience.',
    tech: ['React', 'Node.js', 'Express.js', 'MongoDB', 'JWT', 'Tailwind CSS', 'REST API'],
    github: 'https://github.com/Priyadharshini-k-s-20007/MERN_FINAL_PROJECT_QUIZZ_APP.git',
    demo: '#',
    images: ['/projects/quizcortex/quiz1.png', '/projects/quizcortex/quiz2.png', '/projects/quizcortex/quiz3.png'],
  },
  {
    title: 'Temple Management System',
    type: 'Enterprise · Java',
    desc: 'A digital temple management system that streamlines daily operations through a centralized platform. Manages devotee records, donations, event scheduling, pooja bookings, and admin tasks — improving efficiency and reducing manual paperwork.',
    tech: ['Java', 'Spring Boot', 'MySQL', 'HTML', 'CSS', 'JavaScript', 'Bootstrap', 'JDBC'],
    github: 'https://github.com/Priyadharshini-k-s-20007',
    demo: '#',
    images: ['/projects/temple/temple1.png', '/projects/temple/temple2.png', '/projects/temple/temple3.png'],
  },
]

const ACHIEVEMENTS = [
  { icon: '🥈', label: '2nd Place', title: 'Paper Presentation', detail: 'AI-based privacy protection at national symposium', year: '2024' },
  { icon: '🏆', label: 'Finalist', title: 'Selfie Hackathon', detail: 'Reached finals among 200+ teams with innovative AI solution', year: '2024' },
  { icon: '⭐', label: 'Shortlisted', title: 'India Innovates', detail: 'Shortlisted among top innovators nationally for AEGIS', year: '2023' },
]

const CODING_PROFILES = [
  { platform: 'LeetCode', stat: '90+', desc: 'Problems Solved', href: 'https://leetcode.com/u/jBtTInzdg8/' },
  { platform: 'Skillrack', stat: '900+', desc: 'Problems Solved', href: '#' },
  { platform: 'HackerRank', stat: '3★', desc: 'Python · SQL · C', href: '#' },
  { platform: 'CodeChef', stat: 'Bronze', desc: 'Badge Holder', href: '#' },
]

const EDUCATION = [
  { institution: 'Sri Eshwar College of Engineering', degree: 'B.Tech — AI & Data Science', grade: 'CGPA: 8.14', year: '2022–2026' },
  { institution: 'Ponnu Matric HSS', degree: 'Higher Secondary (12th)', grade: '93.5%', year: '2021–2022' },
  { institution: 'Brindavan Matric', degree: 'Secondary Education (10th)', grade: '95.6%', year: '2019–2020' },
]

const CERTIFICATIONS = [
  { title: 'Generative AI Fundamentals', issuer: 'IBM' },
  { title: 'Python (Basic & Intermediate)', issuer: 'HackerRank' },
  { title: 'SQL (Basic & Intermediate)', issuer: 'HackerRank' },
  { title: 'Data Structures & Algorithms', issuer: 'Udemy' },
  { title: 'C Programming', issuer: 'Great Learning' },
  { title: 'C++ Programming', issuer: 'IIT Bombay (NPTEL)' },
  { title: 'Machine Learning Foundations', issuer: 'Coursera' },
]

const STATS = [
  { value: '8.14', label: 'CGPA' },
  { value: '3+', label: 'Hackathons' },
  { value: '3+', label: 'Projects' },
  { value: '90+', label: 'LeetCode' },
  { value: '900+', label: 'Skillrack' },
]

/* ─── ANIMATIONS ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.08, ease: [0.25, 0.1, 0.25, 1.0] },
  }),
}
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.07 } } }

/* ─── HOOKS ─── */
function useTyping(words) {
  const [idx, setIdx] = useState(0)
  const [text, setText] = useState('')
  const [deleting, setDeleting] = useState(false)
  useEffect(() => {
    const word = words[idx]
    const speed = deleting ? 40 : 80
    const timeout = setTimeout(() => {
      if (!deleting && text === word) {
        setTimeout(() => setDeleting(true), 1400)
        return
      }
      if (deleting && text === '') {
        setDeleting(false)
        setIdx(i => (i + 1) % words.length)
        return
      }
      setText(prev => deleting ? prev.slice(0, -1) : word.slice(0, prev.length + 1))
    }, speed)
    return () => clearTimeout(timeout)
  }, [text, deleting, idx, words])
  return text
}

function useScroll2() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])
  return scrolled
}

/* ─── PROJECT CAROUSEL ─── */
function ProjectCarousel({ images }) {
  const [current, setCurrent] = useState(0)
  const [hovered, setHovered] = useState(false)
  const timerRef = useRef(null)
  const total = images.length

  const goTo = (idx) => {
    setCurrent(((idx % total) + total) % total)
  }

  useEffect(() => {
    if (hovered) return
    timerRef.current = setInterval(() => {
      setCurrent(c => (c + 1) % total)
    }, 3500)
    return () => clearInterval(timerRef.current)
  }, [hovered, total])

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        width: '100%',
        height: 250,
        background: '#F8F5F0',
        overflow: 'hidden',
        borderBottom: '1px solid var(--border)',
        flexShrink: 0,
      }}
    >
      {/* Slides */}
      <div
        style={{
          display: 'flex',
          width: `${total * 100}%`,
          height: '100%',
          transform: `translateX(-${(current / total) * 100}%)`,
          transition: 'transform 500ms ease',
        }}
      >
        {images.map((src, i) => (
          <div
            key={i}
            style={{
              width: `${100 / total}%`,
              height: '100%',
              flexShrink: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: '#F8F5F0',
            }}
          >
            <img
              src={src}
              alt={`Screenshot ${i + 1}`}
              loading="lazy"
              style={{
                maxWidth: '100%',
                maxHeight: '100%',
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                objectPosition: 'center',
                display: 'block',
              }}
            />
          </div>
        ))}
      </div>

      {/* Left Arrow */}
      <button
        onClick={() => goTo(current - 1)}
        aria-label="Previous"
        style={{
          position: 'absolute', left: 10, top: '50%',
          transform: 'translateY(-50%)',
          background: 'rgba(247,241,232,0.88)',
          border: '1px solid var(--border)',
          borderRadius: '50%',
          width: 32, height: 32,
          cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.25s ease',
          zIndex: 2,
          color: 'var(--text-primary)',
          fontSize: 16, lineHeight: 1,
        }}
      >
        ‹
      </button>

      {/* Right Arrow */}
      <button
        onClick={() => goTo(current + 1)}
        aria-label="Next"
        style={{
          position: 'absolute', right: 10, top: '50%',
          transform: 'translateY(-50%)',
          background: 'rgba(247,241,232,0.88)',
          border: '1px solid var(--border)',
          borderRadius: '50%',
          width: 32, height: 32,
          cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.25s ease',
          zIndex: 2,
          color: 'var(--text-primary)',
          fontSize: 16, lineHeight: 1,
        }}
      >
        ›
      </button>

      {/* Dots */}
      <div
        style={{
          position: 'absolute', bottom: 8, left: 0, right: 0,
          display: 'flex', justifyContent: 'center', gap: 6,
          zIndex: 2,
        }}
      >
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            style={{
              width: i === current ? 18 : 7,
              height: 7,
              borderRadius: 4,
              border: 'none',
              background: i === current ? 'var(--accent)' : 'rgba(138,90,45,0.25)',
              cursor: 'pointer',
              padding: 0,
              transition: 'all 0.3s ease',
            }}
          />
        ))}
      </div>
    </div>
  )
}

/* ─── SECTION HEADER ─── */
function SectionHeader({ tag, title, subtitle, centered = true }) {
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      style={{ marginBottom: 64, textAlign: centered ? 'center' : 'left' }}
    >
      <motion.span variants={fadeUp} className="section-tag">{tag}</motion.span>
      <motion.h2 variants={fadeUp} style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(32px,5vw,52px)', fontWeight: 600, lineHeight: 1.15, marginBottom: 16, color: 'var(--text-primary)' }}>{title}</motion.h2>
      {subtitle && <motion.p variants={fadeUp} style={{ fontSize: 16, color: 'var(--text-secondary)', maxWidth: 540, margin: centered ? '0 auto' : undefined, lineHeight: 1.7 }}>{subtitle}</motion.p>}
    </motion.div>
  )
}

/* ─── DIVIDER ─── */
function Divider() {
  return <div style={{ height: 1, background: 'var(--border)', maxWidth: 120, margin: '0 auto', opacity: 0.7 }} />
}

/* ─── NAVBAR ─── */
function Navbar() {
  const scrolled = useScroll2()
  return (
    <motion.nav
      className={`navbar${scrolled ? ' scrolled' : ''}`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1.0] }}
    >
      <div className="navbar-inner">
        <div className="nav-logo" style={{ color: 'var(--text-primary)' }}>PKS</div>
        {NAV_LINKS.map(l => (
          <a key={l.label} href={l.href} className="nav-link">{l.label}</a>
        ))}
        <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ padding: '8px 20px', fontSize: 13, marginLeft: 8 }}>View Resume</a>
      </div>
    </motion.nav>
  )
}

/* ─── HERO PORTRAIT ─── */
function HeroPortrait() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1.0] }}
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <div style={{
        width: 380,
        height: 480,
        borderRadius: 28,
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
        boxShadow: '0 20px 60px rgba(90,55,30,0.08)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Warm decorative top strip */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: 'linear-gradient(90deg, var(--accent), var(--accent-hover))', zIndex: 2 }} />

        {/* Profile photo — black & white */}
        <img
          src="/profile.jpg"
          alt="Priyadharshini K S"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: '50% 28%',
            display: 'block',
            filter: 'grayscale(100%)',
          }}
        />

        {/* Bottom name overlay */}
        <div style={{
          position: 'absolute',
          bottom: 0, left: 0, right: 0,
          padding: '32px 24px 24px',
          background: 'linear-gradient(to top, rgba(247,241,232,0.97) 60%, transparent)',
          zIndex: 2,
        }}>
          <div style={{
            fontFamily: 'var(--font-heading)',
            color: 'var(--text-primary)',
            fontSize: 16,
            fontWeight: 600,
            letterSpacing: '0.02em',
          }}>
            Priyadharshini K S
          </div>
          <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 4, fontWeight: 500 }}>
            AI &amp; Data Science · SECE
          </div>
        </div>

        {/* Corner accent */}
        <div style={{
          position: 'absolute', bottom: 28, right: 28,
          width: 32, height: 32, borderRadius: 8,
          background: 'linear-gradient(135deg, var(--accent), var(--accent-hover))',
          opacity: 0.15,
          zIndex: 3,
        }} />
      </div>
    </motion.div>
  )
}

/* ─── HERO ─── */
function HeroSection() {
  const typedText = useTyping(TYPING_WORDS)
  return (
    <section style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', paddingTop: 120 }} id="hero">
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
          {/* Left: Text */}
          <motion.div variants={stagger} initial="hidden" animate="visible">
            <motion.p variants={fadeUp} style={{ fontSize: 13, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 20 }}>
              Portfolio · AI & Full Stack
            </motion.p>
            <motion.h1 variants={fadeUp} style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(42px, 6vw, 72px)', fontWeight: 600, lineHeight: 1.1, marginBottom: 24, color: 'var(--text-primary)' }}>
              Hello, I'm<br />
              <span style={{ color: 'var(--accent)' }}>Priyadharshini K S</span>
            </motion.h1>
            <motion.div variants={fadeUp} style={{ fontSize: 'clamp(18px,2.5vw,26px)', fontWeight: 500, color: 'var(--text-secondary)', marginBottom: 28, minHeight: 36, display: 'flex', alignItems: 'center', gap: 4 }}>
              <span style={{ color: 'var(--accent)', fontFamily: 'var(--font-heading)', fontStyle: 'italic' }}>{typedText}</span>
              <span style={{ display: 'inline-block', width: 2, height: '1.1em', background: 'var(--accent)', borderRadius: 2, animation: 'blink 0.9s infinite', verticalAlign: 'middle' }} />
            </motion.div>
            <motion.p variants={fadeUp} style={{ fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 40, maxWidth: 460 }}>
              An AI & Data Science student passionate about building intelligent systems and full-stack applications. Turning complex problems into elegant, scalable solutions.
            </motion.p>
            <motion.div variants={fadeUp} style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="btn-primary">
                View Resume
              </a>
              <a href="/resume.pdf" download className="btn-secondary" style={{ padding: '14px 20px' }}>
                <Download size={16} />
              </a>
              <a href="#projects" className="btn-secondary">
                Work <ChevronRight size={14} />
              </a>
            </motion.div>
          </motion.div>

          {/* Right: Portrait */}
          <HeroPortrait />
        </div>
      </div>
      <style>{`@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0}}`}</style>
    </section>
  )
}

/* ─── ABOUT ─── */
function AboutSection() {
  return (
    <section className="section" id="about" style={{ background: 'var(--bg-2)' }}>
      <div className="container">
        <SectionHeader
          tag="About Me"
          title={<>Who I <em>Am</em></>}
          subtitle="A curious mind at the intersection of intelligence and elegance."
        />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center', marginTop: 48 }}>
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <motion.p variants={fadeUp} style={{ fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.9, marginBottom: 20 }}>
              I'm <strong style={{ color: 'var(--text-primary)' }}>Priyadharshini K S</strong>, a B.Tech student in Artificial Intelligence & Data Science at Sri Eshwar College of Engineering, Coimbatore. I build meaningful products at the intersection of machine learning and modern web development.
            </motion.p>
            <motion.p variants={fadeUp} style={{ fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.9 }}>
              From developing AI-powered Chrome extensions to predictive analytics dashboards, I bring together creativity and engineering to solve real-world problems. I value clean code, thoughtful design, and impactful outcomes.
            </motion.p>
          </motion.div>
          {/* Stats */}
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {STATS.map((s, i) => (
              <motion.div key={s.label} variants={fadeUp} custom={i}
                className="editorial-card"
                style={{ padding: '28px 24px', textAlign: 'center', gridColumn: i === 4 ? '1 / -1' : undefined }}>
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: 36, fontWeight: 700, color: 'var(--accent)', marginBottom: 8, letterSpacing: '-0.02em' }}>{s.value}</div>
                <div style={{ fontSize: 13, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-secondary)' }}>{s.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/* ─── SKILLS ─── */
function SkillsSection() {
  return (
    <section className="section" id="skills">
      <div className="container">
        <SectionHeader tag="Expertise" title={<>Skills & <em>Tools</em></>} subtitle="A curated toolkit built through projects, study, and real-world application." />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
          {Object.entries(SKILLS).map(([category, { icon, items }], ci) => (
            <motion.div key={category} className="editorial-card"
              style={{ padding: '32px' }}
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: ci * 0.1, ease: [0.25, 0.1, 0.25, 1.0] }}
              viewport={{ once: true }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
                <span style={{ fontFamily: 'monospace', fontSize: 18, color: 'var(--accent)', fontWeight: 700 }}>{icon}</span>
                <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>{category}</span>
              </div>
              <div style={{ borderTop: '1px solid var(--border)', paddingTop: 20, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {items.map(item => (
                  <span key={item} style={{
                    fontSize: 13, fontWeight: 500, padding: '6px 14px',
                    background: 'var(--bg-2)', border: '1px solid var(--border)',
                    borderRadius: 100, color: 'var(--text-secondary)',
                    transition: 'all 0.25s ease',
                    cursor: 'default'
                  }}
                    onMouseEnter={e => { e.target.style.borderColor = 'var(--accent)'; e.target.style.color = 'var(--accent)'; e.target.style.background = 'rgba(138,90,45,0.06)' }}
                    onMouseLeave={e => { e.target.style.borderColor = 'var(--border)'; e.target.style.color = 'var(--text-secondary)'; e.target.style.background = 'var(--bg-2)' }}
                  >{item}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── PROJECTS ─── */
function ProjectCard({ project, index }) {
  return (
    <motion.div
      className="editorial-card"
      style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1.0] }}
      viewport={{ once: true }}
    >
      {/* Project image carousel */}
      <div style={{ position: 'relative', flexShrink: 0 }}>
        <ProjectCarousel images={project.images} />
        {/* type badge */}
        <span style={{
          position: 'absolute', top: 12, right: 12, fontSize: 11, fontWeight: 600,
          letterSpacing: '0.1em', textTransform: 'uppercase', padding: '4px 12px',
          background: 'rgba(247,241,232,0.92)', border: '1px solid var(--border)',
          borderRadius: 100, color: 'var(--text-secondary)', zIndex: 3,
          backdropFilter: 'blur(4px)',
        }}>{project.type}</span>
      </div>
      {/* Content */}
      <div style={{ padding: '28px', flex: 1, display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 20, fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1.3 }}>{project.title}</h3>
          <a href={project.github} target="_blank" rel="noopener noreferrer"
            style={{ color: 'var(--text-secondary)', flexShrink: 0, marginLeft: 12, transition: 'color 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}>
            <GithubIcon size={18} />
          </a>
        </div>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{project.desc}</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 'auto' }}>
          {project.tech.map(t => (
            <span key={t} style={{ fontSize: 12, padding: '3px 10px', background: 'rgba(138,90,45,0.07)', border: '1px solid rgba(138,90,45,0.15)', borderRadius: 100, color: 'var(--accent)', fontWeight: 500 }}>{t}</span>
          ))}
        </div>
        <a href={project.demo} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 500, color: 'var(--accent)', marginTop: 4 }}>
          <ExternalLink size={13} /> View Project
        </a>
      </div>
    </motion.div>
  )
}

function ProjectsSection() {
  return (
    <section className="section" id="projects" style={{ background: 'var(--bg-2)' }}>
      <div className="container">
        <SectionHeader tag="Featured Work" title={<>Selected <em>Projects</em></>} subtitle="A collection of work that reflects my passion for intelligent systems and thoughtful engineering." />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
          {PROJECTS.slice(0, 4).map((p, i) => <ProjectCard key={p.title} project={p} index={i} />)}
        </div>
        {/* 5th project centered */}
        <div style={{ maxWidth: 540, margin: '24px auto 0' }}>
          <ProjectCard project={PROJECTS[4]} index={4} />
        </div>
      </div>
    </section>
  )
}

/* ─── ACHIEVEMENTS ─── */
function AchievementsSection() {
  return (
    <section className="section" id="achievements">
      <div className="container">
        <SectionHeader tag="Recognition" title={<>Awards & <em>Achievements</em></>} subtitle="Milestones that mark my journey in innovation and technology." />
        <div style={{ maxWidth: 680, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 20 }}>
          {ACHIEVEMENTS.map((a, i) => (
            <motion.div key={a.title}
              className="editorial-card"
              style={{ padding: '28px 32px', display: 'flex', gap: 24, alignItems: 'flex-start' }}
              initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }} viewport={{ once: true }}>
              <div style={{ fontSize: 32, flexShrink: 0 }}>{a.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--accent)' }}>{a.label}</span>
                  <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{a.year}</span>
                </div>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 18, fontWeight: 600, marginBottom: 6 }}>{a.title}</h3>
                <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{a.detail}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── CODING PROFILES ─── */
function CodingSection() {
  return (
    <section className="section" id="coding" style={{ background: 'var(--bg-2)' }}>
      <div className="container">
        <SectionHeader tag="Platforms" title={<>Coding <em>Profiles</em></>} subtitle="Consistent practice on competitive platforms to sharpen algorithmic thinking." />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
          {CODING_PROFILES.map((p, i) => (
            <motion.a key={p.platform} href={p.href} target="_blank" rel="noopener noreferrer"
              className="editorial-card"
              style={{ padding: '28px 24px', textAlign: 'center', display: 'block' }}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.08 }} viewport={{ once: true }}>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: 32, fontWeight: 700, color: 'var(--accent)', marginBottom: 8 }}>{p.stat}</div>
              <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4, color: 'var(--text-primary)' }}>{p.platform}</div>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{p.desc}</div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── EDUCATION ─── */
function EducationSection() {
  return (
    <section className="section" id="education">
      <div className="container">
        <SectionHeader tag="Education" title={<><em>Academic</em> Journey</>} subtitle="The foundation of curiosity and discipline that shapes my thinking." />
        <div style={{ maxWidth: 680, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 20 }}>
          {EDUCATION.map((e, i) => (
            <motion.div key={e.institution}
              className="editorial-card"
              style={{ padding: '28px 32px', display: 'flex', gap: 24, position: 'relative', overflow: 'hidden' }}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }} viewport={{ once: true }}>
              <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 3, background: i === 0 ? 'var(--accent)' : 'var(--border)', borderRadius: '0 2px 2px 0' }} />
              <div style={{ flex: 1, paddingLeft: 8 }}>
                <div style={{ fontSize: 12, color: 'var(--accent)', fontWeight: 600, letterSpacing: '0.08em', marginBottom: 6 }}>{e.year}</div>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 17, fontWeight: 600, marginBottom: 4 }}>{e.institution}</h3>
                <p style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 10 }}>{e.degree}</p>
                <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--accent)', background: 'rgba(138,90,45,0.08)', border: '1px solid rgba(138,90,45,0.15)', padding: '3px 12px', borderRadius: 100 }}>
                  {e.grade}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── CERTIFICATIONS ─── */
function CertificationsSection() {
  return (
    <section className="section" id="certifications" style={{ background: 'var(--bg-2)' }}>
      <div className="container">
        <SectionHeader tag="Certifications" title={<>Credentials & <em>Learning</em></>} subtitle="Verified skills from globally recognized platforms and institutions." />
        <motion.div
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 16 }}
          variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          {CERTIFICATIONS.map((c, i) => (
            <motion.div key={c.title} className="editorial-card" variants={fadeUp} custom={i}
              style={{ padding: '22px 20px' }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 6, lineHeight: 1.4 }}>{c.title}</div>
              <div style={{ fontSize: 12, color: 'var(--accent)', fontWeight: 500 }}>{c.issuer}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

/* ─── CONTACT ─── */
function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')
  const formRef = useRef(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    // Guard: remind user to configure EmailJS keys
    if (
      EMAILJS_SERVICE_ID === 'YOUR_SERVICE_ID' ||
      EMAILJS_TEMPLATE_ID === 'YOUR_TEMPLATE_ID' ||
      EMAILJS_PUBLIC_KEY === 'YOUR_PUBLIC_KEY'
    ) {
      setError('Please configure your EmailJS credentials in App.jsx (see comments at the top of the file).')
      return
    }

    setSending(true)
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          name: form.name,
          email: form.email,
          message: form.message,
          title: 'Portfolio Contact',
          to_name: 'Priyadharshini',
        },
        EMAILJS_PUBLIC_KEY
      )
      setSent(true)
      setForm({ name: '', email: '', message: '' })
      setTimeout(() => setSent(false), 4000)
    } catch (err) {
      console.error('EmailJS error:', err)
      setError('Failed to send message. Please try again or email me directly.')
    } finally {
      setSending(false)
    }
  }

  return (
    <section className="section" id="contact">
      <div className="container">
        <SectionHeader tag="Get In Touch" title={<>Let's <em>Connect</em></>} subtitle="Open for opportunities, collaborations, and meaningful conversations." />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, maxWidth: 920, margin: '0 auto' }}>
          {/* Contact Info */}
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }} viewport={{ once: true }}
            style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 22, fontWeight: 600, marginBottom: 8 }}>Reach Out</h3>
            {[
              { label: 'Email', value: 'priyadharashini.ks2024aids@sece.ac.in', href: 'mailto:priyadharashini.ks2024aids@sece.ac.in' },
              { label: 'LinkedIn', value: 'Priyadharshini K S', href: 'https://www.linkedin.com/in/priyadharshini-k-s-23a243324' },
              { label: 'GitHub', value: 'Priyadharshini-k-s-20007', href: 'https://github.com/Priyadharshini-k-s-20007' },
              { label: 'LeetCode', value: 'jBtTInzdg8', href: 'https://leetcode.com/u/jBtTInzdg8/' },
            ].map(item => (
              <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer"
                className="editorial-card"
                style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 2 }}>
                <span style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--accent)' }}>{item.label}</span>
                <span style={{ fontSize: 14, color: 'var(--text-secondary)', fontWeight: 500 }}>{item.value}</span>
              </a>
            ))}
          </motion.div>

          {/* Form */}
          <motion.form onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }} viewport={{ once: true }}
            style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 22, fontWeight: 600, marginBottom: 8 }}>Send a Message</h3>
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-secondary)', marginBottom: 8, display: 'block' }}>Name</label>
              <input className="form-input" type="text" placeholder="Your name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required />
            </div>
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-secondary)', marginBottom: 8, display: 'block' }}>Email</label>
              <input className="form-input" type="email" placeholder="your@email.com" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} required />
            </div>
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-secondary)', marginBottom: 8, display: 'block' }}>Message</label>
              <textarea className="form-textarea" placeholder="Tell me about your project..." value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} required />
            </div>
            <button type="submit" className="btn-primary" disabled={sending} style={{ justifyContent: 'center', gap: 8 }}>
              <Mail size={15} />
              {sending ? 'Sending…' : sent ? '✓ Message Sent!' : 'Send Message'}
            </button>
            {error && (
              <p style={{ fontSize: 13, color: '#c0392b', background: 'rgba(192,57,43,0.07)', border: '1px solid rgba(192,57,43,0.2)', borderRadius: 10, padding: '10px 16px', lineHeight: 1.6 }}>
                ⚠ {error}
              </p>
            )}
            {sent && (
              <p style={{ fontSize: 13, color: '#27ae60', background: 'rgba(39,174,96,0.07)', border: '1px solid rgba(39,174,96,0.2)', borderRadius: 10, padding: '10px 16px' }}>
                ✓ Your message has been sent! I'll get back to you soon.
              </p>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  )
}

/* ─── FOOTER ─── */
function Footer() {
  return (
    <footer style={{ background: 'var(--bg-2)', borderTop: '1px solid var(--border)', padding: '40px 0' }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
        <span style={{ fontFamily: 'var(--font-heading)', fontSize: 16, fontWeight: 600, color: 'var(--text-primary)' }}>Priyadharshini K S</span>
        <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>© 2024 · Crafted with care</span>
        <div style={{ display: 'flex', gap: 16 }}>
          <a href="https://github.com/Priyadharshini-k-s-20007" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-secondary)', transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'} onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}><GithubIcon size={18} /></a>
          <a href="https://www.linkedin.com/in/priyadharshini-k-s-23a243324" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-secondary)', fontSize: 13, fontWeight: 500, transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'} onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}>LinkedIn</a>
        </div>
      </div>
    </footer>
  )
}

/* ─── SCROLL PROGRESS ─── */
function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })
  return (
    <motion.div
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, height: 2,
        background: 'var(--accent)', transformOrigin: '0%',
        scaleX, zIndex: 9999,
      }}
    />
  )
}

/* ─── BACK TO TOP ─── */
function BackToTop() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const fn = () => setShow(window.scrollY > 400)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])
  return (
    <AnimatePresence>
      {show && (
        <motion.button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          style={{
            position: 'fixed', bottom: 32, right: 32, width: 44, height: 44,
            background: 'var(--accent)', border: 'none', borderRadius: '50%',
            color: 'white', cursor: 'pointer', zIndex: 1000,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 16px rgba(90,55,30,0.2)'
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          whileHover={{ background: 'var(--accent-hover)', transform: 'translateY(-2px)' }}
        >
          <ArrowUp size={18} />
        </motion.button>
      )}
    </AnimatePresence>
  )
}

/* ─── LOADING ─── */
function LoadingScreen({ onDone }) {
  useEffect(() => { const t = setTimeout(onDone, 1800); return () => clearTimeout(t) }, [onDone])
  return (
    <motion.div className="loading-screen" exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
      <div className="loading-logo" style={{ color: 'var(--text-primary)' }}>P K S</div>
      <div className="loading-bar"><div className="loading-fill" /></div>
      <p style={{ fontSize: 12, color: 'var(--text-secondary)', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 600 }}>Loading portfolio…</p>
    </motion.div>
  )
}

/* ─── APP ─── */
export default function App() {
  const [loading, setLoading] = useState(true)
  return (
    <AnimatePresence mode="wait">
      {loading ? (
        <LoadingScreen key="loading" onDone={() => setLoading(false)} />
      ) : (
        <motion.div key="app" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
          <ScrollProgress />
          <Navbar />
          <HeroSection />
          <AboutSection />
          <SkillsSection />
          <ProjectsSection />
          <AchievementsSection />
          <CodingSection />
          <EducationSection />
          <CertificationsSection />
          <ContactSection />
          <Footer />
          <BackToTop />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
