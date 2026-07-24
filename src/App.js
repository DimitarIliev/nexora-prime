import { useState, useEffect, useRef } from "react";

const FORMSPREE_ID = "xdavnoeo";

const COLORS = {
  primary: "#217274",
  dark: "#153f40",
  darker: "#0d2829",
  mid: "#2d9395",
  light: "#4db8ba",
  pale: "#a8dfe0",
  ghost: "#e8f7f7",
  white: "#ffffff",
  text: "#1a1a2e",
  muted: "#5a7a7b",
};

const NAV_LINKS = ["About", "Services", "Why Us", "Contact"];

const SERVICES = [
  {
    icon: "☁️",
    title: "Azure Cloud Architecture",
    desc: "Design and implement scalable, resilient cloud infrastructure tailored to your business. From lift-and-shift migrations to cloud-native greenfield builds.",
    tags: ["Azure Landing Zones", "Hybrid Cloud", "Cost Optimization"],
  },
  {
    icon: "🤖",
    title: "AI & Machine Learning",
    desc: "Unlock the power of intelligent automation. We integrate Azure OpenAI, Cognitive Services, and custom ML pipelines into your existing workflows.",
    tags: ["Azure OpenAI", "MLOps", "Copilot Studio"],
  },
  {
    icon: "🔒",
    title: "Security & Compliance",
    desc: "Zero-trust architecture, identity governance, and compliance frameworks. Build on Azure with confidence — from Entra ID to Microsoft Defender.",
    tags: ["Zero Trust", "Entra ID", "Compliance"],
  },
  {
    icon: "⚡",
    title: "DevOps & Automation",
    desc: "Streamline delivery with Azure DevOps, GitHub Actions, and Infrastructure as Code. Faster releases, fewer incidents, full auditability.",
    tags: ["CI/CD", "Terraform", "Azure DevOps"],
  },
  {
    icon: "📊",
    title: "Data & Analytics",
    desc: "Transform raw data into business intelligence with Azure Synapse, Fabric, and Power BI. Real-time dashboards and data lakehouse architectures.",
    tags: ["Azure Fabric", "Power BI", "Synapse"],
  },
  {
    icon: "🛡️",
    title: "Managed Services",
    desc: "Ongoing platform management, monitoring, and incident response. We become your extended cloud operations team — 24/7 peace of mind.",
    tags: ["Monitoring", "SLA Management", "FinOps"],
  },
];

const WHY_US = [
  { num: "12+", label: "Years of Combined Cloud Experience" },
  { num: "100%", label: "Focus on Azure & AI — Nothing Else" },
  { num: "Fast", label: "From Discovery to First Deployment" },
  { num: "∞", label: "Curiosity for What's Next in AI" },
];

function useScrollSpy() {
  const [active, setActive] = useState("About");
  useEffect(() => {
    const handler = () => {
      const sections = ["about", "services", "why-us", "contact"];
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActive(sections[i].replace("-", " ").replace(/\b\w/g, (c) => c.toUpperCase()));
          break;
        }
      }
    };
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);
  return active;
}

function useInView(ref) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref]);
  return visible;
}

function FadeIn({ children, delay = 0, style = {} }) {
  const ref = useRef(null);
  const visible = useInView(ref);
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export default function NexoraPrime() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const active = useScrollSpy();
  const [formData, setFormData] = useState({ name: "", email: "", company: "", message: "" });
  const [formStatus, setFormStatus] = useState("idle"); // idle | sending | success | error

  const handleSubmit = async () => {
    if (!formData.email) return;
    setFormStatus("sending");
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setFormStatus("success");
        setFormData({ name: "", email: "", company: "", message: "" });
      } else {
        setFormStatus("error");
      }
    } catch {
      setFormStatus("error");
    }
  };

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollTo = (id) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div style={{ fontFamily: "'Sora', sans-serif", background: COLORS.white, color: COLORS.text, overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;600;700;800&family=DM+Serif+Display:ital@0;1&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { overflow-x: hidden; }
        ::selection { background: ${COLORS.pale}; color: ${COLORS.darker}; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: ${COLORS.ghost}; }
        ::-webkit-scrollbar-thumb { background: ${COLORS.mid}; border-radius: 3px; }

        .mobile-menu-btn {
          display: none;
        }

        .nav-desktop {
          display: flex;
          gap: 2.5rem;
          align-items: center;
        }

        .nav-mobile {
          display: none;
        }

        .logo-mark {
          width: 100px;
          height: 100px;
        }

        .hero-side-card {
          width: 380px;
          max-width: 100%;
        }

        @media (max-width: 768px) {
          nav {
            padding: 0 1rem !important;
          }

          .nav-desktop {
            display: none !important;
          }

          .mobile-menu-btn {
            display: flex;
            align-items: center;
            justify-content: center;
            background: none;
            border: none;
            color: white;
            font-size: 1.8rem;
            cursor: pointer;
          }

          .nav-mobile {
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
            position: absolute;
            top: 68px;
            left: 0;
            right: 0;
            background: ${COLORS.darker};
            padding: 1rem;
            box-shadow: 0 10px 30px rgba(0,0,0,0.25);
          }

          .nav-mobile .nav-link {
            width: 100%;
            text-align: left;
            padding: 0.75rem 0;
          }

          .nav-mobile .cta-btn {
            width: 100%;
            justify-content: center;
            margin-top: 0.5rem;
          }

          .logo-mark {
            width: 40px;
            height: 40px;
          }

          section {
            padding-left: 1.25rem !important;
            padding-right: 1.25rem !important;
          }

          #about, #services, #why-us, #contact {
            padding-top: 4rem !important;
            padding-bottom: 4rem !important;
          }

          .hero-grid {
            gap: 2.5rem !important;
          }

          .hero-side-card {
            width: 100% !important;
            padding: 1.75rem !important;
          }

          .about-card {
            padding: 2rem !important;
            min-height: unset !important;
          }

          .contact-info-card,
          .contact-form-card {
            padding: 2rem !important;
          }

          .contact-person-row {
            flex-wrap: wrap;
          }

          .person-photo {
            width: 72px !important;
            height: 72px !important;
          }

          .footer-grid {
            text-align: center;
            justify-content: center !important;
          }

          .footer-links {
            justify-content: center;
            flex-wrap: wrap;
            gap: 1.25rem !important;
          }
        }

        @media (max-width: 480px) {
          .stats-grid {
            grid-template-columns: 1fr !important;
          }

          .stat-card {
            padding: 1.75rem 1.25rem !important;
          }

          h1, h2, h3 {
            word-break: break-word;
          }
        }

        .nav-link {
          position: relative;
          cursor: pointer;
          color: ${COLORS.white};
          font-size: 0.88rem;
          font-weight: 500;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          padding: 6px 0;
          transition: color 0.2s;
          background: none;
          border: none;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0;
          width: 0; height: 2px;
          background: ${COLORS.light};
          transition: width 0.3s;
        }
        .nav-link:hover::after, .nav-link.active::after { width: 100%; }
        .nav-link.active { color: ${COLORS.pale}; }

        .service-card {
          background: ${COLORS.white};
          border: 1px solid ${COLORS.ghost};
          border-radius: 16px;
          padding: 2rem;
          transition: transform 0.3s, box-shadow 0.3s, border-color 0.3s;
        }
        .service-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 60px rgba(33,114,116,0.12);
          border-color: ${COLORS.pale};
        }

        .stat-card {
          text-align: center;
          padding: 2.5rem 1.5rem;
          border-radius: 16px;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.15);
          backdrop-filter: blur(8px);
          transition: transform 0.3s;
        }
        .stat-card:hover { transform: scale(1.04); }

        .cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 0.85rem 2rem;
          border-radius: 50px;
          font-family: 'Sora', sans-serif;
          font-size: 0.9rem;
          font-weight: 600;
          letter-spacing: 0.02em;
          cursor: pointer;
          transition: all 0.25s;
          border: 2px solid transparent;
        }
        .cta-primary {
          background: ${COLORS.white};
          color: ${COLORS.dark};
          border-color: ${COLORS.white};
        }
        .cta-primary:hover {
          background: transparent;
          color: ${COLORS.white};
        }
        .cta-outline {
          background: transparent;
          color: ${COLORS.white};
          border-color: rgba(255,255,255,0.5);
        }
        .cta-outline:hover {
          background: rgba(255,255,255,0.1);
          border-color: ${COLORS.white};
        }
        .cta-teal {
          background: ${COLORS.primary};
          color: ${COLORS.white};
          border-color: ${COLORS.primary};
        }
        .cta-teal:hover {
          background: ${COLORS.dark};
          border-color: ${COLORS.dark};
        }
        .cta-teal:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .tag {
          display: inline-block;
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.04em;
          padding: 3px 10px;
          border-radius: 20px;
          background: ${COLORS.ghost};
          color: ${COLORS.primary};
          margin: 3px 3px 3px 0;
        }

        @media (max-width: 768px) {
          .hero-grid { flex-direction: column !important; }
          .services-grid { grid-template-columns: 1fr !important; }
          .stats-grid { grid-template-columns: 1fr 1fr !important; }
          .footer-grid { flex-direction: column !important; gap: 2rem !important; }
          .about-grid { grid-template-columns: 1fr !important; }
          .contact-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled ? COLORS.darker : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        transition: "background 0.4s, box-shadow 0.4s",
        boxShadow: scrolled ? "0 2px 30px rgba(0,0,0,0.25)" : "none",
        padding: "0 2rem",
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 68 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            <img src="/favicon.ico" alt="Nexora Prime" className="logo-mark" style={{ borderRadius: "10px", objectFit: "contain" }} />
            <span style={{ color: COLORS.white, fontWeight: 700, fontSize: "1.1rem", letterSpacing: "-0.01em" }}>
              Nexora<span style={{ color: COLORS.pale, fontFamily: "'DM Serif Display', serif", fontStyle: "italic" }}>Prime</span>
            </span>
          </div>
          <>
            <div className="nav-desktop">
              {NAV_LINKS.map((link) => (
                <button
                  key={link}
                  className={`nav-link${active === link ? " active" : ""}`}
                  onClick={() => scrollTo(link.toLowerCase().replace(" ", "-"))}
                >
                  {link}
                </button>
              ))}

              <button
                className="cta-btn cta-primary"
                style={{ padding: "0.55rem 1.3rem", fontSize: "0.82rem" }}
                onClick={() => scrollTo("contact")}
              >
                Get in Touch →
              </button>
            </div>

            <button
              className="mobile-menu-btn"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? "✕" : "☰"}
            </button>

            {menuOpen && (
              <div className="nav-mobile">
                {NAV_LINKS.map((link) => (
                  <button
                    key={link}
                    className={`nav-link${active === link ? " active" : ""}`}
                    onClick={() => scrollTo(link.toLowerCase().replace(" ", "-"))}
                  >
                    {link}
                  </button>
                ))}

                <button
                  className="cta-btn cta-primary"
                  onClick={() => scrollTo("contact")}
                >
                  Get in Touch →
                </button>
              </div>
            )}
          </>
        </div>
      </nav>

      {/* HERO */}
      <section style={{
        minHeight: "100vh",
        background: `linear-gradient(150deg, ${COLORS.darker} 0%, ${COLORS.dark} 40%, ${COLORS.primary} 100%)`,
        position: "relative",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        padding: "0 2rem",
      }}>
        <div style={{ position: "absolute", inset: 0, opacity: 0.06 }}>
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        <div style={{ position: "absolute", top: "10%", right: "5%", width: 500, height: 500, borderRadius: "50%", background: `radial-gradient(circle, ${COLORS.mid}44 0%, transparent 70%)`, pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "-10%", left: "-5%", width: 400, height: 400, borderRadius: "50%", background: `radial-gradient(circle, ${COLORS.dark}88 0%, transparent 70%)`, pointerEvents: "none" }} />

        <div style={{ maxWidth: 1200, margin: "0 auto", width: "100%", paddingTop: "6rem", paddingBottom: "4rem" }}>
          <div className="hero-grid" style={{ display: "flex", alignItems: "center", gap: "4rem" }}>
            <div style={{ flex: 1 }}>
              <div style={{
                display: "inline-block",
                background: "rgba(255,255,255,0.1)",
                border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: 50, padding: "6px 16px",
                color: COLORS.pale, fontSize: "0.78rem",
                fontWeight: 600, letterSpacing: "0.08em",
                textTransform: "uppercase", marginBottom: "1.5rem",
                animation: "fadeUp 0.8s ease both",
              }}>
                ✦ Azure & AI Consulting
              </div>
              <h1 style={{
                fontFamily: "'DM Serif Display', serif",
                fontSize: "clamp(2.4rem, 5.5vw, 4.5rem)",
                lineHeight: 1.1,
                color: COLORS.white,
                marginBottom: "1.5rem",
                animation: "fadeUp 0.9s ease 0.1s both",
              }}>
                Cloud Intelligence<br />
                <span style={{ color: COLORS.pale, fontStyle: "italic" }}>Built for Scale</span>
              </h1>
              <p style={{
                color: "rgba(255,255,255,0.72)",
                fontSize: "1.1rem", lineHeight: 1.7, maxWidth: 520,
                marginBottom: "2.5rem",
                animation: "fadeUp 0.9s ease 0.2s both",
              }}>
                Nexora Prime helps businesses harness the full potential of Microsoft Azure and artificial intelligence — from architecture design to production deployment and beyond.
              </p>
              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", animation: "fadeUp 0.9s ease 0.3s both" }}>
                <button className="cta-btn cta-primary" onClick={() => scrollTo("services")}>Explore Services →</button>
                <button className="cta-btn cta-outline" onClick={() => scrollTo("contact")}>Talk to Us</button>
              </div>

            </div>

            <div style={{ flex: "0 0 400px", display: "flex", justifyContent: "center", maxWidth: "100%", animation: "fadeUp 0.9s ease 0.35s both" }}>
              <div className="hero-side-card" style={{
                borderRadius: "30px",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.12)",
                backdropFilter: "blur(16px)",
                padding: "2.5rem",
                display: "flex", flexDirection: "column", gap: "1rem",
                position: "relative", overflow: "hidden",
              }}>
                <div style={{ position: "absolute", top: -60, right: -60, width: 200, height: 200, borderRadius: "50%", background: `radial-gradient(circle, ${COLORS.light}22 0%, transparent 70%)` }} />
                <div style={{ fontSize: "0.7rem", color: COLORS.pale, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.5rem" }}>What we bring to the table</div>
                {[
                  { icon: "☁️", title: "Azure Architecture", desc: "Cloud-native solutions designed to scale with your ambitions." },
                  { icon: "🤖", title: "AI Integration", desc: "Practical AI that solves real problems, not demos." },
                  { icon: "⚡", title: "Fast Delivery", desc: "From first call to first deployment — no long runways." },
                  { icon: "🤝", title: "Honest Advice", desc: "We tell you what you need, not what costs the most." },
                ].map(({ icon, title, desc }) => (
                  <div key={title} style={{
                    display: "flex", gap: "0.85rem", alignItems: "flex-start",
                    padding: "0.85rem", borderRadius: 12,
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}>
                    <span style={{ fontSize: "1.3rem", flexShrink: 0, marginTop: 2 }}>{icon}</span>
                    <div>
                      <div style={{ color: COLORS.white, fontWeight: 600, fontSize: "0.88rem", marginBottom: 3 }}>{title}</div>
                      <div style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.78rem", lineHeight: 1.5 }}>{desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div style={{ position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 6, opacity: 0.5, animation: "bounce 2s infinite" }}>
          <div style={{ width: 1, height: 40, background: "white" }} />
          <span style={{ color: "white", fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase" }}>Scroll</span>
        </div>
        <style>{`
          @keyframes fadeUp { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:none; } }
          @keyframes bounce { 0%,100%{transform:translateX(-50%) translateY(0)} 50%{transform:translateX(-50%) translateY(-8px)} }
        `}</style>
      </section>

      {/* ABOUT */}
      <section id="about" style={{ padding: "7rem 2rem", background: COLORS.white }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="about-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "center" }}>
            <FadeIn>
              <div className="about-card" style={{
                borderRadius: 24, overflow: "hidden", position: "relative",
                background: `linear-gradient(135deg, ${COLORS.darker} 0%, ${COLORS.primary} 100%)`,
                padding: "3rem", minHeight: 380,
                display: "flex", flexDirection: "column", justifyContent: "flex-end",
              }}>
                <div style={{ position: "absolute", top: 30, right: 30 }}>
                  {[80, 56, 32].map((s, i) => (
                    <div key={i} style={{
                      position: "absolute", width: s, height: s, borderRadius: "50%",
                      border: `1px solid rgba(255,255,255,${0.08 + i * 0.06})`,
                      top: -s / 2, right: -s / 2,
                    }} />
                  ))}
                </div>
                <div style={{ fontSize: "3.5rem", marginBottom: "1rem" }}>🌐</div>
                <h3 style={{ color: COLORS.white, fontFamily: "'DM Serif Display', serif", fontSize: "1.8rem", lineHeight: 1.2, marginBottom: "0.75rem" }}>
                  Your trusted partner<br /><em>in the cloud era</em>
                </h3>
                <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.9rem", lineHeight: 1.6 }}>
                  Founded on the belief that technology should accelerate your vision, not complicate it.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.15}>
              <div>
                <div style={{ color: COLORS.primary, fontWeight: 700, fontSize: "0.78rem", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "1rem" }}>About Nexora Prime</div>
                <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(2rem, 3.5vw, 2.8rem)", lineHeight: 1.15, marginBottom: "1.5rem", color: COLORS.text }}>
                  We speak<br /><span style={{ color: COLORS.primary }}>cloud fluently</span>
                </h2>
                <p style={{ color: COLORS.muted, lineHeight: 1.8, marginBottom: "1.2rem", fontSize: "0.97rem" }}>
                  Nexora Prime is a specialist Azure and AI consulting firm. We help organizations design, build, and operate cloud solutions that are secure, intelligent, and built to grow with you.
                </p>
                <p style={{ color: COLORS.muted, lineHeight: 1.8, marginBottom: "2rem", fontSize: "0.97rem" }}>
                  Our team combines deep Microsoft expertise with real-world engineering experience. We've delivered solutions across finance, healthcare, and retail — each one grounded in your business goals, not just technical specs.
                </p>
                <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
                  {["Azure Certified", "AI-First Approach", "Agile Delivery"].map((item) => (
                    <div key={item} style={{ display: "flex", alignItems: "center", gap: 8, color: COLORS.text, fontSize: "0.88rem", fontWeight: 500 }}>
                      <span style={{ width: 22, height: 22, borderRadius: "50%", background: COLORS.ghost, display: "flex", alignItems: "center", justifyContent: "center", color: COLORS.primary, fontSize: "0.7rem", fontWeight: 700 }}>✓</span>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" style={{ padding: "7rem 2rem", background: COLORS.ghost }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: "4rem" }}>
              <div style={{ color: COLORS.primary, fontWeight: 700, fontSize: "0.78rem", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "1rem" }}>What We Do</div>
              <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(2rem, 3.5vw, 2.8rem)", color: COLORS.text, lineHeight: 1.2, marginBottom: "1rem" }}>
                Full-spectrum<br /><span style={{ color: COLORS.primary }}>Azure & AI services</span>
              </h2>
              <p style={{ color: COLORS.muted, maxWidth: 540, margin: "0 auto", lineHeight: 1.7, fontSize: "0.97rem" }}>
                From initial strategy to production operations, we cover every layer of your cloud journey.
              </p>
            </div>
          </FadeIn>
          <div className="services-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem" }}>
            {SERVICES.map((s, i) => (
              <FadeIn key={s.title} delay={i * 0.08}>
                <div className="service-card">
                  <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>{s.icon}</div>
                  <h3 style={{ fontSize: "1.05rem", fontWeight: 700, marginBottom: "0.75rem", color: COLORS.text }}>{s.title}</h3>
                  <p style={{ color: COLORS.muted, fontSize: "0.88rem", lineHeight: 1.7, marginBottom: "1.25rem" }}>{s.desc}</p>

                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section id="why-us" style={{
        padding: "7rem 2rem",
        background: `linear-gradient(135deg, ${COLORS.darker} 0%, ${COLORS.primary} 100%)`,
        position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", inset: 0, opacity: 0.04 }}>
          <svg width="100%" height="100%"><defs><pattern id="dots" width="30" height="30" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.5" fill="white" /></pattern></defs><rect width="100%" height="100%" fill="url(#dots)" /></svg>
        </div>
        <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative" }}>
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: "4rem" }}>
              <div style={{ color: COLORS.pale, fontWeight: 700, fontSize: "0.78rem", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "1rem" }}>Why Nexora Prime</div>
              <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(2rem, 3.5vw, 2.8rem)", color: COLORS.white, lineHeight: 1.2 }}>
                Numbers that speak<br /><em style={{ color: COLORS.pale }}>for themselves</em>
              </h2>
            </div>
          </FadeIn>
          <div className="stats-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1.5rem", marginBottom: "5rem" }}>
            {WHY_US.map((s, i) => (
              <FadeIn key={s.num} delay={i * 0.1}>
                <div className="stat-card">
                  <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: "3.2rem", color: COLORS.pale, lineHeight: 1, marginBottom: "0.5rem" }}>{s.num}</div>
                  <div style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.88rem", lineHeight: 1.4 }}>{s.label}</div>
                </div>
              </FadeIn>
            ))}
          </div>
          <FadeIn>
            <div className="services-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem" }}>
              {[
                { icon: "🎯", title: "Outcome-Driven", desc: "We measure success by your business results — not compute hours or ticket counts." },
                { icon: "🤝", title: "Long-Term Partnership", desc: "We stay with you post-launch. Our engagement model is designed for continuity, not handoffs." },
                { icon: "🧪", title: "Continuous Innovation", desc: "We stay at the frontier of Azure and AI so you benefit from what's new — without the risk." },
              ].map((p, i) => (
                <FadeIn key={p.title} delay={0.1 + i * 0.1}>
                  <div style={{ padding: "2rem", borderRadius: 16, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)" }}>
                    <div style={{ fontSize: "1.8rem", marginBottom: "0.75rem" }}>{p.icon}</div>
                    <h4 style={{ color: COLORS.white, fontWeight: 700, marginBottom: "0.5rem", fontSize: "1rem" }}>{p.title}</h4>
                    <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.87rem", lineHeight: 1.6 }}>{p.desc}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ padding: "7rem 2rem", background: COLORS.white }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: "4rem" }}>
              <div style={{ color: COLORS.primary, fontWeight: 700, fontSize: "0.78rem", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "1rem" }}>Contact</div>
              <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(2rem, 3.5vw, 2.8rem)", color: COLORS.text, lineHeight: 1.2, marginBottom: "1rem" }}>
                Let's start a<br /><span style={{ color: COLORS.primary }}>conversation</span>
              </h2>
              <p style={{ color: COLORS.muted, maxWidth: 480, margin: "0 auto", lineHeight: 1.7 }}>
                Whether you're planning a cloud migration, an AI initiative, or just exploring options — we're happy to talk.
              </p>
            </div>
          </FadeIn>

          <div className="contact-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem", alignItems: "start" }}>
            {/* Left — contact info */}
            <FadeIn>
              <div className="contact-info-card" style={{
                borderRadius: 24,
                background: `linear-gradient(135deg, ${COLORS.darker}, ${COLORS.primary})`,
                padding: "3rem", color: COLORS.white,
              }}>
                <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.7rem", marginBottom: "1.5rem" }}>Get in touch</h3>
                <p style={{ color: "rgba(255,255,255,0.7)", lineHeight: 1.7, marginBottom: "2.5rem", fontSize: "0.92rem" }}>
                  Reach us directly by email. We typically respond within one business day and are happy to schedule a free discovery call.
                </p>
                <div
                  className="contact-person-row"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1.25rem",
                    marginBottom: "2rem",
                  }}
                >
                  <img
                    src="/AI Enchanced.png"
                    alt="Dimitar Iliev"
                    className="person-photo"
                    style={{
                      width: 100,
                      height: 100,
                      borderRadius: "50%",
                      objectFit: "cover",
                      border: "3px solid rgba(255,255,255,0.15)",
                    }}
                  />

                  <div>
                    <div
                      style={{
                        color: COLORS.white,
                        fontSize: "1.15rem",
                        fontWeight: 700,
                        marginBottom: 4,
                      }}
                    >
                      Dimitar Iliev
                    </div>

                    <div
                      style={{
                        color: COLORS.pale,
                        fontSize: "0.9rem",
                        fontWeight: 600,
                      }}
                    >
                      Founder & CEO
                    </div>
                  </div>
                </div>
                <div style={{ marginTop: "2.5rem", paddingTop: "2rem", borderTop: "1px solid rgba(255,255,255,0.12)" }}>
                  <div style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.72rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.75rem" }}>Response time</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#4ade80", display: "block", boxShadow: "0 0 6px #4ade8088" }} />
                    <span style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.88rem" }}>Usually within 24 hours</span>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Right — Formspree form */}
            <FadeIn delay={0.15}>
              <div className="contact-form-card" style={{ background: COLORS.ghost, borderRadius: 24, padding: "3rem" }}>
                <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.4rem", color: COLORS.text, marginBottom: "0.5rem" }}>Start a project</h3>
                <p style={{ color: COLORS.muted, fontSize: "0.88rem", marginBottom: "2rem" }}>Tell us about your project and we'll get back to you.</p>

                {formStatus === "success" ? (
                  <div style={{ textAlign: "center", padding: "3rem 1rem" }}>
                    <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>✅</div>
                    <h4 style={{ color: COLORS.text, marginBottom: "0.5rem", fontSize: "1.1rem" }}>Message sent!</h4>
                    <p style={{ color: COLORS.muted, fontSize: "0.88rem" }}>We'll get back to you within 24 hours.</p>
                    <button
                      onClick={() => setFormStatus("idle")}
                      style={{ marginTop: "1.5rem", background: "none", border: "none", color: COLORS.primary, fontWeight: 600, cursor: "pointer", fontSize: "0.88rem" }}
                    >Send another message</button>
                  </div>
                ) : (
                  <>
                    {[
                      { label: "Your name", name: "name", type: "text", placeholder: "Jane Smith" },
                      { label: "Your email", name: "email", type: "email", placeholder: "jane@company.com" },
                      { label: "Company", name: "company", type: "text", placeholder: "Company name" },
                    ].map(({ label, name, type, placeholder }) => (
                      <div key={name} style={{ marginBottom: "1.25rem" }}>
                        <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: COLORS.text, marginBottom: 6, letterSpacing: "0.02em" }}>{label}</label>
                        <input
                          type={type}
                          name={name}
                          placeholder={placeholder}
                          value={formData[name]}
                          onChange={(e) => setFormData({ ...formData, [name]: e.target.value })}
                          style={{
                            width: "100%", padding: "0.75rem 1rem",
                            border: `1.5px solid ${COLORS.pale}`, borderRadius: 10,
                            fontFamily: "'Sora', sans-serif", fontSize: "0.9rem",
                            background: COLORS.white, color: COLORS.text, outline: "none",
                            transition: "border-color 0.2s",
                          }}
                          onFocus={(e) => e.target.style.borderColor = COLORS.primary}
                          onBlur={(e) => e.target.style.borderColor = COLORS.pale}
                        />
                      </div>
                    ))}
                    <div style={{ marginBottom: "2rem" }}>
                      <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: COLORS.text, marginBottom: 6 }}>Message</label>
                      <textarea
                        name="message"
                        rows={4}
                        placeholder="Tell us about your project, goals, or questions..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        style={{
                          width: "100%", padding: "0.75rem 1rem",
                          border: `1.5px solid ${COLORS.pale}`, borderRadius: 10,
                          fontFamily: "'Sora', sans-serif", fontSize: "0.9rem",
                          background: COLORS.white, color: COLORS.text,
                          outline: "none", resize: "vertical",
                          transition: "border-color 0.2s",
                        }}
                        onFocus={(e) => e.target.style.borderColor = COLORS.primary}
                        onBlur={(e) => e.target.style.borderColor = COLORS.pale}
                      />
                    </div>
                    <button
                      onClick={handleSubmit}
                      disabled={formStatus === "sending" || !formData.email}
                      className="cta-btn cta-teal"
                      style={{ width: "100%", justifyContent: "center" }}
                    >
                      {formStatus === "sending" ? "Sending..." : "Send Message →"}
                    </button>
                    {formStatus === "error" && (
                      <p style={{ color: "#e05252", fontSize: "0.8rem", textAlign: "center", marginTop: "1rem" }}>
                        Something went wrong. Please email us directly.
                      </p>
                    )}
                  </>
                )}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: COLORS.darker, padding: "3rem 2rem", color: "rgba(255,255,255,0.5)", fontSize: "0.85rem" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="footer-grid" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <img src="/favicon.ico" alt="Nexora Prime" className="logo-mark" style={{ borderRadius: "10px", objectFit: "contain" }} />
              <span style={{ color: COLORS.white, fontWeight: 700 }}>Nexora<span style={{ fontFamily: "'DM Serif Display', serif", fontStyle: "italic", color: COLORS.pale }}>Prime</span></span>
            </div>
            <div>© {new Date().getFullYear()} Nexora Prime. All rights reserved.</div>
            <div className="footer-links" style={{ display: "flex", gap: "2rem" }}>
              {NAV_LINKS.map((l) => (
                <button key={l} onClick={() => scrollTo(l.toLowerCase().replace(" ", "-"))}
                  style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.45)", fontSize: "0.82rem", transition: "color 0.2s" }}
                  onMouseOver={(e) => e.target.style.color = COLORS.pale}
                  onMouseOut={(e) => e.target.style.color = "rgba(255,255,255,0.45)"}
                >{l}</button>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}