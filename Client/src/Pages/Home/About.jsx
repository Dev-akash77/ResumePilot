import React, { useEffect, useRef } from "react";
import { FaFireFlameSimple } from "react-icons/fa6";
import {
  LuBrain,
  LuZap,
  LuShield,
  LuUsers,
  LuFileText,
  LuStar,
  LuRocket,
  LuSparkles,
} from "react-icons/lu";

/* ── tiny hook: intersection observer for reveal animations ── */
const useReveal = () => {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("revealed");
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
};

/* ── reusable reveal wrapper ── */
const Reveal = ({ children, delay = 0, className = "" }) => {
  const ref = useReveal();
  return (
    <div
      ref={ref}
      className={`reveal-block ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

/* ── data ── */
const features = [
  {
    icon: <LuBrain size={22} />,
    title: "Gemini-Powered AI",
    desc: "Our LLM engine reads your background and writes résumé content that sounds genuinely human — not templated.",
  },
  {
    icon: <LuZap size={22} />,
    title: "Instant Generation",
    desc: "From blank form to polished PDF in under 60 seconds. No dragging, no formatting, no fuss.",
  },
  {
    icon: <LuFileText size={22} />,
    title: "ATS-Optimised",
    desc: "Clean structure and keyword density tuned so your résumé clears automated screening before a human ever sees it.",
  },
  {
    icon: <LuShield size={22} />,
    title: "Secure & Private",
    desc: "Your data lives in isolated microservices behind JWT auth. We don't train on your résumé — ever.",
  },
  {
    icon: <LuUsers size={22} />,
    title: "Built for Freshers",
    desc: "Designed specifically for Indian college students and recent graduates entering the job market.",
  },
  {
    icon: <LuStar size={22} />,
    title: "Credit-Based Freedom",
    desc: "Start free, upgrade when you need more. No subscriptions forced on you before you see real value.",
  },
];

const stats = [
  { value: "60s", label: "Avg. generation time" },
  { value: "6", label: "Microservices powering it" },
  { value: "ATS", label: "Optimised output" },
  { value: "Free", label: "To start, always" },
];

const stack = [
  "React", "Redux", "Tailwind CSS", "Framer Motion",
  "Node.js", "Express", "MongoDB", "PostgreSQL",
  "RabbitMQ", "Redis", "Docker", "Gemini LLM", "Razorpay",
];

/* ══════════════════════════════════════════════ */
const About = () => {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:wght@300;400;500;600&display=swap');

        .about-root {
          font-family: 'DM Sans', sans-serif;
          color: #1a1a2e;
          background: #f8f9fc;
          min-height: 100%;
          overflow-x: hidden;
        }

        /* reveal animation */
        .reveal-block {
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.65s ease, transform 0.65s ease;
        }
        .reveal-block.revealed {
          opacity: 1;
          transform: translateY(0);
        }

        /* hero gradient blob */
        .hero-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(90px);
          pointer-events: none;
        }

        /* feature card */
        .feat-card {
          background: #fff;
          border: 1px solid #e8eaf0;
          border-radius: 16px;
          padding: 1.5rem;
          transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
        }
        .feat-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 32px rgba(59,130,246,0.10);
          border-color: #bfdbfe;
        }

        /* stat pill */
        .stat-pill {
          background: #fff;
          border: 1px solid #e8eaf0;
          border-radius: 999px;
          padding: 1rem 2rem;
          text-align: center;
          min-width: 130px;
        }

        /* tech badge */
        .tech-badge {
          background: #eff6ff;
          color: #2563eb;
          border: 1px solid #bfdbfe;
          border-radius: 999px;
          padding: 0.35rem 0.9rem;
          font-size: 0.78rem;
          font-weight: 500;
          letter-spacing: 0.01em;
          white-space: nowrap;
        }

        .serif { font-family: 'Instrument Serif', serif; }

        .blue-text { color: #2563eb; }
        .muted { color: #6b7280; }

        .cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: #2563eb;
          color: #fff;
          font-weight: 600;
          font-size: 0.95rem;
          padding: 0.75rem 1.75rem;
          border-radius: 999px;
          border: none;
          cursor: pointer;
          transition: background 0.2s, transform 0.2s, box-shadow 0.2s;
          box-shadow: 0 4px 14px rgba(37,99,235,0.25);
        }
        .cta-btn:hover {
          background: #1d4ed8;
          transform: translateY(-2px);
          box-shadow: 0 8px 22px rgba(37,99,235,0.30);
        }

        .divider-line {
          height: 1px;
          background: linear-gradient(to right, transparent, #e2e8f0, transparent);
          margin: 0 auto;
          max-width: 640px;
        }
      `}</style>

      <div className="about-root w-full pb-24">

        {/* ── HERO ── */}
        <section className="relative px-6 pt-16 pb-20 text-center overflow-hidden">
          {/* blobs */}
          <div className="hero-blob" style={{ width:500, height:500, background:"rgba(59,130,246,0.08)", top:-120, left:"50%", transform:"translateX(-60%)" }} />
          <div className="hero-blob" style={{ width:300, height:300, background:"rgba(147,197,253,0.12)", bottom:-60, right:"10%" }} />

          <Reveal>
            <span className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-600 border border-blue-100 rounded-full px-4 py-1 text-sm font-medium mb-6">
              <LuSparkles size={13} /> AI-Powered Resume Platform
            </span>
          </Reveal>

          <Reveal delay={100}>
            <h1 className="serif text-5xl sm:text-6xl font-normal leading-tight max-w-3xl mx-auto mb-5">
              Your résumé,{" "}
              <span className="blue-text italic">written by AI.</span>
              <br />Owned by you.
            </h1>
          </Reveal>

          <Reveal delay={200}>
            <p className="muted text-lg max-w-xl mx-auto leading-relaxed mb-8">
              ResumePilot is a microservices-based SaaS platform that helps Indian college
              freshers craft ATS-optimised, professionally written résumés — powered by
              Google Gemini — in under a minute.
            </p>
          </Reveal>

          <Reveal delay={300}>
            <div className="flex flex-wrap justify-center gap-3">
              <button className="cta-btn">
                <LuRocket size={16} /> Build My Résumé
              </button>
              <button style={{ background:"transparent", border:"1.5px solid #e2e8f0", color:"#374151", borderRadius:999, padding:"0.75rem 1.75rem", fontWeight:600, fontSize:"0.95rem", cursor:"pointer" }}>
                See How It Works
              </button>
            </div>
          </Reveal>
        </section>

        <div className="divider-line" />

        {/* ── STATS ── */}
        <section className="px-6 py-14">
          <Reveal>
            <div className="flex flex-wrap justify-center gap-4 max-w-2xl mx-auto">
              {stats.map((s) => (
                <div key={s.label} className="stat-pill">
                  <p className="serif text-3xl blue-text">{s.value}</p>
                  <p className="muted text-xs mt-0.5 font-medium tracking-wide uppercase">{s.label}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        <div className="divider-line" />

        {/* ── WHAT IS IT ── */}
        <section className="px-6 py-16 max-w-4xl mx-auto">
          <Reveal>
            <p className="text-xs font-semibold tracking-widest text-blue-500 uppercase mb-3 text-center">The Problem</p>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="serif text-4xl text-center font-normal mb-6 leading-snug">
              Freshers deserve better than<br /><span className="blue-text italic">copy-paste templates.</span>
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="muted text-base leading-relaxed text-center max-w-2xl mx-auto">
              Most résumé builders give you a blank canvas and wish you luck. ResumePilot is
              different — it reads your academic background, projects, and skills, then writes
              compelling bullet points for you. The output is structured for ATS scanners,
              looks clean on paper, and actually reflects who you are.
            </p>
          </Reveal>
        </section>

        <div className="divider-line" />

        {/* ── FEATURES ── */}
        <section className="px-6 py-16 max-w-5xl mx-auto">
          <Reveal>
            <p className="text-xs font-semibold tracking-widest text-blue-500 uppercase mb-3 text-center">Features</p>
            <h2 className="serif text-4xl text-center font-normal mb-10">
              Everything you need, <span className="blue-text italic">nothing you don't.</span>
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f, i) => (
              <Reveal key={f.title} delay={i * 70}>
                <div className="feat-card h-full">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
                    {f.icon}
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-1.5">{f.title}</h3>
                  <p className="muted text-sm leading-relaxed">{f.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <div className="divider-line" />

        {/* ── TECH STACK ── */}
        <section className="px-6 py-16 max-w-3xl mx-auto text-center">
          <Reveal>
            <p className="text-xs font-semibold tracking-widest text-blue-500 uppercase mb-3">Tech Stack</p>
            <h2 className="serif text-4xl font-normal mb-3">
              Built on <span className="blue-text italic">solid ground.</span>
            </h2>
            <p className="muted text-sm mb-8">
              6 independent microservices talking over RabbitMQ, all containerised with Docker.
            </p>
          </Reveal>
          <Reveal delay={100}>
            <div className="flex flex-wrap justify-center gap-2.5">
              {stack.map((t) => (
                <span key={t} className="tech-badge">{t}</span>
              ))}
            </div>
          </Reveal>
        </section>

        <div className="divider-line" />

        {/* ── MISSION / FOUNDER NOTE ── */}
        <section className="px-6 py-16 max-w-3xl mx-auto">
          <Reveal>
            <div className="bg-white border border-gray-100 rounded-2xl p-8 sm:p-10 text-center shadow-sm">
              <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center mx-auto mb-5 text-lg font-bold">
                A
              </div>
              <p className="serif text-2xl italic text-gray-700 leading-relaxed mb-5">
                "I built ResumePilot because I watched classmates get filtered out before
                a recruiter even read their name. The problem wasn't their skills — it was
                how they presented them."
              </p>
              <div>
                <p className="font-semibold text-gray-800">Akash Biswas</p>
                <p className="muted text-sm flex items-center justify-center gap-1.5 mt-0.5">
                  <FaFireFlameSimple className="text-blue-500" size={12} />
                  Co-founder, Codlence Planing · BTech CSE, MAKAUT
                </p>
              </div>
            </div>
          </Reveal>
        </section>

        {/* ── CTA BOTTOM ── */}
        <section className="px-6 pb-4 text-center">
          <Reveal>
            <h2 className="serif text-4xl font-normal mb-3">
              Ready to <span className="blue-text italic">land that role?</span>
            </h2>
            <p className="muted text-base mb-7">Free to start. No credit card needed.</p>
            <button className="cta-btn" style={{ fontSize:"1rem", padding:"0.85rem 2rem" }}>
              <LuRocket size={17} /> Get Started — It's Free
            </button>
          </Reveal>
        </section>

      </div>
    </>
  );
};

export default About;