import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/Images/favicon.svg";

// Icons
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { LuMail, LuMapPin, LuZap, LuHeart } from "react-icons/lu";
import { FaFireFlameSimple } from "react-icons/fa6";

const links = {
  Product: [
    { label: "Dashboard", path: "/dashboard" },
    { label: "My Resumes", path: "/dashboard/all_resume" },
    { label: "ATS Review", path: "/dashboard/review" },
    { label: "About", path: "/dashboard/about" },
  ],
  Company: [
    { label: "About Us", path: "/dashboard/about" },
    { label: "Privacy Policy", path: "/privacy" },
    { label: "Terms of Service", path: "/terms" },
    { label: "Contact", path: "/contact" },
  ],
  Resources: [
    { label: "Resume Tips", path: "/blog" },
    { label: "ATS Guide", path: "/ats-guide" },
    { label: "Career Blog", path: "/blog" },
    { label: "Help Center", path: "/help" },
  ],
};

const socials = [
  { icon: <FaGithub size={18} />, href: "https://github.com/Dev-akash77", label: "GitHub" },
  { icon: <FaLinkedin size={18} />, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: <FaTwitter size={18} />, href: "https://twitter.com", label: "Twitter" },
  { icon: <LuMail size={18} />, href: "mailto:hello@resumepilot.in", label: "Email" },
];

const Footer = () => {
  const navigate = useNavigate();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');

        .footer-root {
          font-family: 'DM Sans', sans-serif;
          background: #0a0f1e;
          color: #e2e8f0;
          position: relative;
          overflow: hidden;
        }

        /* background grid texture */
        .footer-root::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(37,99,235,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(37,99,235,0.04) 1px, transparent 1px);
          background-size: 48px 48px;
          pointer-events: none;
        }

        /* top glow */
        .footer-glow {
          position: absolute;
          top: -120px;
          left: 50%;
          transform: translateX(-50%);
          width: 700px;
          height: 280px;
          background: radial-gradient(ellipse at center, rgba(37,99,235,0.18) 0%, transparent 70%);
          pointer-events: none;
        }

        .footer-inner {
          position: relative;
          z-index: 1;
          max-width: 1200px;
          margin: 0 auto;
          padding: 4rem 2rem 0;
        }

        /* ── top section ── */
        .footer-top {
          display: grid;
          grid-template-columns: 1.6fr repeat(3, 1fr);
          gap: 3rem;
          padding-bottom: 3rem;
          border-bottom: 1px solid rgba(255,255,255,0.07);
        }

        @media (max-width: 900px) {
          .footer-top { grid-template-columns: 1fr 1fr; gap: 2.5rem; }
          .footer-brand { grid-column: 1 / -1; }
        }

        @media (max-width: 520px) {
          .footer-top { grid-template-columns: 1fr; }
          .footer-brand { grid-column: auto; }
        }

        /* brand col */
        .footer-brand {}

        .brand-logo {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          cursor: pointer;
          width: fit-content;
          margin-bottom: 1rem;
        }

        .brand-logo h2 {
          font-size: 1.5rem;
          font-weight: 700;
          color: #fff;
          margin: 0;
          letter-spacing: -0.02em;
        }

        .brand-logo h2 span { color: #3b82f6; }

        .brand-tagline {
          font-family: 'Instrument Serif', serif;
          font-style: italic;
          font-size: 1rem;
          color: #94a3b8;
          line-height: 1.6;
          margin-bottom: 1.4rem;
          max-width: 240px;
        }

        /* newsletter / cta strip */
        .footer-cta {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(37,99,235,0.12);
          border: 1px solid rgba(59,130,246,0.25);
          border-radius: 12px;
          padding: 0.6rem 0.8rem 0.6rem 1rem;
          margin-bottom: 1.6rem;
        }

        .footer-cta-text {
          font-size: 0.78rem;
          color: #93c5fd;
          font-weight: 500;
          flex: 1;
        }

        .footer-cta-btn {
          background: #2563eb;
          color: #fff;
          border: none;
          border-radius: 8px;
          padding: 0.4rem 0.85rem;
          font-size: 0.75rem;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.18s;
          white-space: nowrap;
        }
        .footer-cta-btn:hover { background: #1d4ed8; }

        /* socials */
        .footer-socials {
          display: flex;
          gap: 0.6rem;
        }

        .social-btn {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.08);
          color: #94a3b8;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          text-decoration: none;
          transition: background 0.18s, color 0.18s, border-color 0.18s, transform 0.18s;
        }
        .social-btn:hover {
          background: rgba(59,130,246,0.18);
          border-color: rgba(59,130,246,0.4);
          color: #60a5fa;
          transform: translateY(-2px);
        }

        /* link columns */
        .footer-col-title {
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #475569;
          margin-bottom: 1.1rem;
        }

        .footer-links {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
        }

        .footer-links li a,
        .footer-links li button {
          font-size: 0.875rem;
          color: #94a3b8;
          text-decoration: none;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
          font-family: inherit;
          transition: color 0.18s, transform 0.18s;
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
        }
        .footer-links li a:hover,
        .footer-links li button:hover {
          color: #e2e8f0;
        }

        /* ── middle strip ── */
        .footer-mid {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          padding: 1.5rem 0;
          border-bottom: 1px solid rgba(255,255,255,0.07);
        }

        .footer-meta-item {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.78rem;
          color: #475569;
        }

        .footer-meta-item svg { color: #3b82f6; flex-shrink: 0; }

        .stack-pills {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
        }

        .stack-pill {
          font-size: 0.68rem;
          color: #475569;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 999px;
          padding: 0.2rem 0.6rem;
          font-weight: 500;
        }

        /* ── bottom bar ── */
        .footer-bottom {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-between;
          gap: 0.75rem;
          padding: 1.2rem 0 1.5rem;
        }

        .footer-copy {
          font-size: 0.78rem;
          color: #334155;
          display: flex;
          align-items: center;
          gap: 0.35rem;
          flex-wrap: wrap;
        }

        .footer-copy .heart { color: #ef4444; }
        .footer-copy .codlence { color: #3b82f6; font-weight: 600; }

        .footer-legal {
          display: flex;
          gap: 1.2rem;
        }

        .footer-legal a {
          font-size: 0.75rem;
          color: #334155;
          text-decoration: none;
          transition: color 0.18s;
        }
        .footer-legal a:hover { color: #94a3b8; }

        /* ── big serif word watermark ── */
        .footer-watermark {
          font-family: 'Instrument Serif', serif;
          font-size: clamp(4rem, 12vw, 9rem);
          font-style: italic;
          color: rgba(255,255,255,0.025);
          text-align: center;
          line-height: 1;
          padding: 0.5rem 0 1rem;
          user-select: none;
          letter-spacing: -0.03em;
          pointer-events: none;
        }
      `}</style>

      <footer className="footer-root">
        <div className="footer-glow" />

        <div className="footer-inner">

          {/* ── TOP ── */}
          <div className="footer-top">

            {/* Brand */}
            <div className="footer-brand">
              <div className="brand-logo" onClick={() => navigate("/")}>
                <img src={logo} alt="logo" width={30} />
                <h2>Resume<span>Pilot</span></h2>
              </div>

              <p className="brand-tagline">
                AI-crafted résumés for India's next generation of professionals.
              </p>

              <div className="footer-cta">
                <span className="footer-cta-text">
                  <LuZap size={11} style={{ display:"inline", marginRight:4 }} />
                  Free credits to get started
                </span>
                <button className="footer-cta-btn" onClick={() => navigate("/auth")}>
                  Try Now
                </button>
              </div>

              <div className="footer-socials">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="social-btn"
                    aria-label={s.label}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Link columns */}
            {Object.entries(links).map(([heading, items]) => (
              <div key={heading}>
                <p className="footer-col-title">{heading}</p>
                <ul className="footer-links">
                  {items.map((item) => (
                    <li key={item.label}>
                      <button onClick={() => navigate(item.path)}>
                        {item.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* ── MIDDLE ── */}
          <div className="footer-mid">
            <div className="footer-meta-item">
              <LuMapPin size={13} />
              <span>Kalna, West Bengal, India</span>
            </div>

            <div className="footer-meta-item">
              <LuMail size={13} />
              <span>hello@resumepilot.in</span>
            </div>

            <div className="footer-meta-item">
              <FaFireFlameSimple size={12} />
              <span>Powered by Gemini AI</span>
            </div>

            <div className="stack-pills">
              {["React", "Node.js", "MongoDB", "RabbitMQ", "Docker", "Redis"].map((t) => (
                <span key={t} className="stack-pill">{t}</span>
              ))}
            </div>
          </div>

          {/* ── BOTTOM ── */}
          <div className="footer-bottom">
            <p className="footer-copy">
              © {new Date().getFullYear()} ResumePilot. Made with
              <LuHeart size={12} className="heart" fill="currentColor" />
              by
              <span className="codlence">Akash Biswas, Rahul Biswas, Tuhin Sekh</span>
              · All rights reserved.
            </p>

            <nav className="footer-legal">
              <a href="/privacy">Privacy</a>
              <a href="/terms">Terms</a>
              <a href="/help">Help</a>
            </nav>
          </div>
        </div>

        {/* watermark */}
        <div className="footer-watermark">ResumePilot</div>
      </footer>
    </>
  );
};

export default Footer;