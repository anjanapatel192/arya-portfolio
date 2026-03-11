import { useState, useEffect, useCallback } from "react";

const ACCENT = "#00f5d4";
const AMBER = "#fbbf24";
const BG = "#050c15";
const CARD = "#0a1628";
const BORDER = "#1a2e4a";

const skills = {
  "Languages": ["JavaScript", "TypeScript"],
  "Backend": ["Node.js", "Express.js", "Socket.io"],
  "Databases": ["MongoDB", "PostgreSQL", "DynamoDB", "Redis"],
  "Cloud & AWS": ["Lambda", "API Gateway", "S3", "SQS", "EventBridge", "AppSync", "Cognito"],
  "Messaging & Queuing": ["Apache Kafka", "BullMQ", "RedLock"],
  "Integrations": ["Stripe", "Firebase", "EzDRM", "Bitmovin", "OpenAI API"],
};

const experience = [
  {
    company: "IndiaNIC Infotech Limited",
    role: "Software Engineer",
    period: "Feb 2025 – Present",
    color: ACCENT,
    points: [
      "Architected AV Globale Real-Estate investment platform with PostgreSQL, Redis & Kafka",
      "Implemented ACID-compliant transaction workflows for high-value financial operations",
      "Built Maid serverless marketplace using AWS Lambda, AppSync, DynamoDB, SQS & EventBridge",
      "Leading gaming backend team with real-time architecture using Socket.IO & Redis",
    ],
  },
  {
    company: "Artoon Solutions Pvt. Ltd.",
    role: "Backend Developer",
    period: "Oct 2021 – Jan 2025",
    color: AMBER,
    points: [
      "Built real-time multiplayer games (Surflab Bingo, WinZO UNO) with Socket.IO & Redis",
      "Implemented AI bot logic, queue-based gameplay & server-side fraud prevention",
      "Built Joltspace video streaming platform with DRM (EzDRM), Bitmovin, Stripe & AWS S3",
      "Served as code reviewer enforcing production-grade standards across backend teams",
    ],
  },
];

const projects = [
  {
    name: "Maid",
    sub: "Serverless Home Services Platform",
    desc: "Fully serverless marketplace connecting customers with home service professionals. Features location-based search, Cognito auth, real-time chat, and SQS-powered background processing.",
    stack: ["AWS Lambda", "API Gateway", "AppSync", "DynamoDB", "Cognito", "SQS", "EventBridge"],
    icon: "⚡",
    color: ACCENT,
  },
  {
    name: "AV Globale",
    sub: "Digital Real-Estate Investment Platform",
    desc: "Investment platform for property share trading with real-time valuations. Kafka queues prevent overselling under high concurrency; full ACID compliance for financial operations.",
    stack: ["Node.js", "PostgreSQL", "Redis", "Apache Kafka", "Express.js"],
    icon: "🏛",
    color: "#a78bfa",
  },
  {
    name: "Joltspace",
    sub: "Secure Video Streaming Platform",
    desc: "Movie purchase & streaming platform with DRM content protection, encrypted cloud storage, Stripe payments, and background CSV processing.",
    stack: ["Node.js", "MongoDB", "AWS S3", "Bitmovin", "EzDRM", "Stripe"],
    icon: "🎬",
    color: AMBER,
  },
  {
    name: "WinZO UNO",
    sub: "Real-Time Multiplayer Card Game",
    desc: "Live multiplayer UNO with AI bot players, Redis-based animation queuing, server-side move validation, and anti-fraud WinZO platform integration.",
    stack: ["Node.js", "TypeScript", "Socket.IO", "MongoDB", "Redis"],
    icon: "🃏",
    color: "#f472b6",
  },
  {
    name: "Surflab BINGO",
    sub: "Multiplayer Real-Time Board Game",
    desc: "Scalable bingo supporting both synchronous and asynchronous modes. Features reconnection recovery, synchronized game state, and Socket.IO Redis adapter for broadcast scaling.",
    stack: ["Node.js", "TypeScript", "Socket.IO", "MongoDB", "Redis"],
    icon: "🎯",
    color: "#34d399",
  },
];

// Defined outside component so it's stable and won't cause useEffect dep warning
const SECTIONS = ["home", "about", "experience", "projects", "skills", "contact"];

function Cursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [trail, setTrail] = useState([]);

  useEffect(() => {
    const move = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
      setTrail((t) => [...t.slice(-8), { x: e.clientX, y: e.clientY, id: Date.now() }]);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <>
      {trail.map((p, i) => (
        <div
          key={p.id}
          style={{
            position: "fixed", left: p.x, top: p.y, width: 6, height: 6,
            borderRadius: "50%", background: ACCENT,
            opacity: ((i + 1) / trail.length) * 0.3,
            transform: "translate(-50%,-50%)",
            pointerEvents: "none", zIndex: 9998, transition: "opacity 0.3s",
          }}
        />
      ))}
      <div
        style={{
          position: "fixed", left: pos.x, top: pos.y,
          width: 20, height: 20, border: `1.5px solid ${ACCENT}`,
          borderRadius: "50%", transform: "translate(-50%,-50%)",
          pointerEvents: "none", zIndex: 9999,
          mixBlendMode: "screen", transition: "transform 0.1s",
        }}
      />
    </>
  );
}

// Fixed: added `speed` to dependency array
function TypeWriter({ text, speed = 60 }) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    let i = 0;
    const t = setInterval(() => {
      i += 1;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) clearInterval(t);
    }, speed);
    return () => clearInterval(t);
  }, [text, speed]);

  return (
    <span>
      {displayed}
      <span style={{ animation: "blink 1s infinite", color: ACCENT }}>▌</span>
    </span>
  );
}

function GlowBall({ style }) {
  return (
    <div
      style={{
        position: "absolute", borderRadius: "50%",
        filter: "blur(80px)", opacity: 0.12, pointerEvents: "none", ...style,
      }}
    />
  );
}

function SkillBar({ label, items, color }) {
  return (
    <div style={{ marginBottom: 20 }}>
      {/* Fixed: comment-like text wrapped in braces */}
      <div style={{ color: color || ACCENT, fontSize: 11, letterSpacing: 3, textTransform: "uppercase", marginBottom: 10, fontFamily: "'DM Mono', monospace" }}>
        {`// ${label}`}
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {items.map((s) => (
          <span
            key={s}
            style={{
              padding: "5px 12px", borderRadius: 4,
              border: `1px solid ${(color || ACCENT)}33`,
              background: `${(color || ACCENT)}11`,
              color: "#cbd5e1", fontSize: 12,
              fontFamily: "'DM Mono', monospace",
              transition: "all 0.2s", cursor: "default",
            }}
            onMouseEnter={(e) => {
              e.target.style.background = `${color || ACCENT}22`;
              e.target.style.borderColor = color || ACCENT;
              e.target.style.color = color || ACCENT;
            }}
            onMouseLeave={(e) => {
              e.target.style.background = `${color || ACCENT}11`;
              e.target.style.borderColor = `${color || ACCENT}33`;
              e.target.style.color = "#cbd5e1";
            }}
          >
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}

function ProjectCard({ project, i }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: CARD, border: `1px solid ${hovered ? project.color : BORDER}`,
        borderRadius: 12, padding: "28px 28px 24px",
        transition: "all 0.3s cubic-bezier(.4,0,.2,1)",
        transform: hovered ? "translateY(-6px)" : "none",
        boxShadow: hovered ? `0 20px 40px ${project.color}22` : "none",
        cursor: "default", position: "relative", overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute", top: 0, right: 0, width: 120, height: 120,
          background: `radial-gradient(circle, ${project.color}18 0%, transparent 70%)`,
          pointerEvents: "none",
        }}
      />
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
        <span style={{ fontSize: 28 }}>{project.icon}</span>
        <div>
          <div style={{ color: project.color, fontFamily: "'DM Mono', monospace", fontSize: 13, letterSpacing: 2 }}>
            {String(i + 1).padStart(2, "0")}.
          </div>
          <div style={{ color: "#f1f5f9", fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 700 }}>
            {project.name}
          </div>
        </div>
      </div>
      <div style={{ color: project.color, fontSize: 11, letterSpacing: 2, textTransform: "uppercase", marginBottom: 10, fontFamily: "'DM Mono', monospace" }}>
        {project.sub}
      </div>
      <p style={{ color: "#94a3b8", fontSize: 14, lineHeight: 1.7, marginBottom: 18 }}>{project.desc}</p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {project.stack.map((s) => (
          <span
            key={s}
            style={{
              padding: "3px 10px", borderRadius: 20,
              background: `${project.color}15`,
              border: `1px solid ${project.color}30`,
              color: project.color, fontSize: 11,
              fontFamily: "'DM Mono', monospace",
            }}
          >
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}

function SectionHeader({ number, title, center }) {
  return (
    <div style={{ marginBottom: 60, textAlign: center ? "center" : "left" }}>
      <div style={{ fontFamily: "'DM Mono', monospace", color: ACCENT, fontSize: 12, letterSpacing: 4, marginBottom: 8 }}>
        {number} ——
      </div>
      <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(36px, 5vw, 56px)", color: "#f1f5f9", fontWeight: 700 }}>
        {title}
      </h2>
    </div>
  );
}

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);

  const downloadResume = () => {
    const a = document.createElement("a");
    a.href = process.env.PUBLIC_URL + "/Arya_Patel_Resume.pdf";
    a.download = "Arya_Patel_Resume.pdf";
    a.click();
  };

  const scrollTo = useCallback((id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  }, []);

  // Fixed: SECTIONS is module-level constant, stable reference, no dep warning
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActiveSection(e.target.id)),
      { threshold: 0.4 }
    );
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <div style={{ background: BG, minHeight: "100vh", color: "#e2e8f0", fontFamily: "'Inter', sans-serif", position: "relative", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;900&family=DM+Mono:wght@300;400;500&family=Outfit:wght@300;400;500;600&display=swap');
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} }
        @keyframes pulse { 0%,100%{opacity:0.6} 50%{opacity:1} }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: ${BG}; }
        ::-webkit-scrollbar-thumb { background: ${ACCENT}44; border-radius: 2px; }
        html { scroll-behavior: smooth; }
        .hamburger { display: none; }
        .nav-resume-btn { display: block; }
        .floating-badges { display: flex; }
        @media (max-width: 768px) {
          .nav-links { display: none !important; }
          .nav-links.open { display: flex !important; flex-direction: column; position: fixed; top: 64px; left: 0; right: 0; background: #050c15ee; padding: 24px; gap: 16px; backdrop-filter: blur(20px); z-index: 999; }
          .grid-2 { grid-template-columns: 1fr !important; }
          .floating-badges { display: none !important; }
          .hamburger { display: block !important; }
          .nav-resume-btn { display: none !important; }
        }
      `}</style>

      <Cursor />

      <GlowBall style={{ width: 600, height: 600, background: ACCENT, top: -200, left: -200 }} />
      <GlowBall style={{ width: 500, height: 500, background: "#7c3aed", top: 300, right: -100 }} />
      <GlowBall style={{ width: 400, height: 400, background: AMBER, bottom: 200, left: "40%" }} />

      <div style={{
        position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0,
        backgroundImage: `linear-gradient(${BORDER}44 1px, transparent 1px), linear-gradient(90deg, ${BORDER}44 1px, transparent 1px)`,
        backgroundSize: "60px 60px", opacity: 0.3,
      }} />

      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
        backdropFilter: "blur(20px)", background: `${BG}cc`,
        borderBottom: `1px solid ${BORDER}`,
        padding: "0 5%",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        height: 64,
      }}>
        <div style={{ fontFamily: "'DM Mono', monospace", color: ACCENT, fontSize: 16, letterSpacing: 2 }}>
          AP<span style={{ color: "#475569" }}>.dev</span>
        </div>
        <div className="nav-links" style={{ display: "flex", gap: 32, alignItems: "center" }}>
          {SECTIONS.map((s) => (
            <button
              key={s}
              onClick={() => scrollTo(s)}
              style={{
                background: "none", border: "none", cursor: "pointer",
                color: activeSection === s ? ACCENT : "#64748b",
                fontSize: 12, letterSpacing: 2, textTransform: "uppercase",
                fontFamily: "'DM Mono', monospace", transition: "color 0.2s",
                borderBottom: activeSection === s ? `1px solid ${ACCENT}` : "1px solid transparent",
                paddingBottom: 2,
              }}
            >
              {s}
            </button>
          ))}
        </div>
        <button
          className="nav-resume-btn"
          onClick={downloadResume}
          style={{
            padding: "8px 18px", borderRadius: 6,
            border: `1px solid ${ACCENT}`,
            background: "transparent", color: ACCENT,
            fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: 1,
            cursor: "pointer", transition: "all 0.3s",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = `${ACCENT}22`; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
        >
          ↓ RESUME
        </button>
        <button
          className="hamburger"
          onClick={() => setMenuOpen((m) => !m)}
          style={{
            background: "none", border: `1px solid ${BORDER}`,
            color: ACCENT, padding: "6px 12px", borderRadius: 6, cursor: "pointer",
            fontFamily: "'DM Mono', monospace", fontSize: 12,
          }}
        >
          ☰ Menu
        </button>
      </nav>

      {menuOpen && (
        <div className="nav-links open">
          {SECTIONS.map((s) => (
            <button
              key={s}
              onClick={() => scrollTo(s)}
              style={{
                background: "none", border: "none", cursor: "pointer",
                color: activeSection === s ? ACCENT : "#94a3b8",
                fontSize: 14, letterSpacing: 2, textTransform: "uppercase",
                fontFamily: "'DM Mono', monospace", textAlign: "left",
              }}
            >
              {s}
            </button>
          ))}
          <button
            onClick={downloadResume}
            style={{
              background: "none", border: `1px solid ${ACCENT}`,
              color: ACCENT, padding: "8px 16px", borderRadius: 6, cursor: "pointer",
              fontFamily: "'DM Mono', monospace", fontSize: 12, textAlign: "left",
            }}
          >
            ↓ RESUME
          </button>
        </div>
      )}

      {/* HERO */}
      <section id="home" style={{ minHeight: "100vh", display: "flex", alignItems: "center", padding: "100px 5% 60px", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 1100, width: "100%", margin: "0 auto", animation: "fadeUp 1s ease both" }}>
          <div style={{ fontFamily: "'DM Mono', monospace", color: ACCENT, fontSize: 13, letterSpacing: 3, marginBottom: 20, display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ width: 40, height: 1, background: ACCENT, display: "inline-block" }} />
            BACKEND ENGINEER · 4+ YEARS
          </div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(52px, 9vw, 110px)", lineHeight: 1.0, fontWeight: 900, marginBottom: 20 }}>
            <span style={{ color: "#f1f5f9" }}>Arya</span>
            <br />
            <span style={{ WebkitTextStroke: `2px ${ACCENT}`, color: "transparent" }}>Patel</span>
          </h1>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "clamp(14px, 2vw, 18px)", color: "#64748b", marginBottom: 36, height: 28 }}>
            <TypeWriter text="Building scalable systems that power millions of users." />
          </div>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <button
              onClick={() => scrollTo("projects")}
              style={{
                padding: "14px 32px", borderRadius: 6, border: "none",
                background: ACCENT, color: BG, fontWeight: 700,
                fontFamily: "'DM Mono', monospace", fontSize: 13, letterSpacing: 2,
                cursor: "pointer", transition: "all 0.2s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "none"; }}
            >
              VIEW PROJECTS →
            </button>
            <button
              onClick={() => scrollTo("contact")}
              style={{
                padding: "14px 32px", borderRadius: 6,
                border: `1px solid ${BORDER}`,
                background: "transparent", color: "#94a3b8",
                fontFamily: "'DM Mono', monospace", fontSize: 13, letterSpacing: 2,
                cursor: "pointer", transition: "all 0.2s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = ACCENT; e.currentTarget.style.color = ACCENT; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = BORDER; e.currentTarget.style.color = "#94a3b8"; }}
            >
              GET IN TOUCH
            </button>
            <button
              onClick={downloadResume}
              style={{
                padding: "14px 32px", borderRadius: 6,
                border: `1px solid ${AMBER}55`,
                background: `${AMBER}11`, color: AMBER,
                fontFamily: "'DM Mono', monospace", fontSize: 13, letterSpacing: 2,
                cursor: "pointer", transition: "all 0.3s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = `${AMBER}22`; e.currentTarget.style.borderColor = AMBER; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = `${AMBER}11`; e.currentTarget.style.borderColor = `${AMBER}55`; }}
            >
              ↓ DOWNLOAD RESUME
            </button>
          </div>

        </div>

        <div
          className="floating-badges"
          style={{
            position: "absolute", right: "5%", top: "50%", transform: "translateY(-50%)",
            animation: "float 5s ease-in-out infinite",
            flexDirection: "column", gap: 12, opacity: 0.7,
          }}
        >
          {["Node.js", "AWS", "Kafka", "Redis", "Socket.IO"].map((t) => (
            <div
              key={t}
              style={{
                padding: "8px 16px", border: `1px solid ${BORDER}`,
                borderRadius: 6, fontFamily: "'DM Mono', monospace", fontSize: 11,
                color: "#475569", background: CARD,
              }}
            >
              {t}
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" style={{ padding: "100px 5%", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <SectionHeader number="01" title="About Me" />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }} className="grid-2">
            <div>
              <p style={{ color: "#94a3b8", lineHeight: 1.9, fontSize: 16, marginBottom: 20, fontFamily: "'Outfit', sans-serif" }}>
                Backend Engineer with <span style={{ color: ACCENT }}>4+ years</span> of experience designing and building scalable, high-performance applications using Node.js and modern cloud technologies.
              </p>
              <p style={{ color: "#94a3b8", lineHeight: 1.9, fontSize: 16, marginBottom: 20, fontFamily: "'Outfit', sans-serif" }}>
                I specialize in <span style={{ color: AMBER }}>real-time systems</span>, distributed architectures, and secure transaction processing across gaming, fintech, and streaming platforms.
              </p>
              <p style={{ color: "#94a3b8", lineHeight: 1.9, fontSize: 16, fontFamily: "'Outfit', sans-serif" }}>
                Based in <span style={{ color: "#a78bfa" }}>Ahmedabad, India</span> — passionate about solving complex backend challenges and delivering reliable, business-driven solutions.
              </p>
              <div style={{ marginTop: 32 }}>
                <a
                  href="mailto:aryapatel2403@gmail.com"
                  style={{
                    padding: "10px 20px", borderRadius: 6,
                    border: `1px solid ${ACCENT}`,
                    color: ACCENT, textDecoration: "none",
                    fontFamily: "'DM Mono', monospace", fontSize: 12, letterSpacing: 1,
                  }}
                >
                  ✉ EMAIL ME
                </a>
              </div>
            </div>
            <div>
              <div style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 12, padding: 28, fontFamily: "'DM Mono', monospace", fontSize: 13, lineHeight: 2.2 }}>
                <div style={{ color: "#475569", marginBottom: 12 }}>{`// profile.json`}</div>
                <div><span style={{ color: "#64748b" }}>{"{"}</span></div>
                <div style={{ paddingLeft: 20 }}>
                  <div><span style={{ color: AMBER }}>"name"</span><span style={{ color: "#64748b" }}>: </span><span style={{ color: "#86efac" }}>"Arya Patel"</span>,</div>
                  <div><span style={{ color: AMBER }}>"role"</span><span style={{ color: "#64748b" }}>: </span><span style={{ color: "#86efac" }}>"Backend Engineer"</span>,</div>
                  <div><span style={{ color: AMBER }}>"exp"</span><span style={{ color: "#64748b" }}>: </span><span style={{ color: "#7dd3fc" }}>"4+ years"</span>,</div>
                  <div><span style={{ color: AMBER }}>"phone"</span><span style={{ color: "#64748b" }}>: </span><span style={{ color: "#86efac" }}>"9724007778"</span>,</div>
                  <div><span style={{ color: AMBER }}>"education"</span><span style={{ color: "#64748b" }}>: </span><span style={{ color: "#86efac" }}>"B.E. IT · 8.4 CGPA"</span>,</div>
                  <div><span style={{ color: AMBER }}>"focus"</span><span style={{ color: "#64748b" }}>: [</span></div>
                  <div style={{ paddingLeft: 20 }}>
                    <div style={{ color: ACCENT }}>"Scalability"</div>
                    <div style={{ color: ACCENT }}>"Real-Time Systems"</div>
                    <div style={{ color: ACCENT }}>"Distributed Arch"</div>
                  </div>
                  <div style={{ color: "#64748b" }}>]</div>
                </div>
                <div><span style={{ color: "#64748b" }}>{"}"}</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" style={{ padding: "100px 5%", position: "relative", zIndex: 1, background: `${CARD}44` }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <SectionHeader number="02" title="Experience" />
          <div style={{ position: "relative", paddingLeft: 32 }}>
            <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 1, background: `linear-gradient(to bottom, ${ACCENT}, ${AMBER}, transparent)` }} />
            {experience.map((job, i) => (
              <div key={i} style={{ marginBottom: 60, position: "relative", animation: "fadeUp 0.8s ease both", animationDelay: `${i * 0.2}s` }}>
                <div style={{
                  position: "absolute", left: -39, top: 4,
                  width: 16, height: 16, borderRadius: "50%",
                  background: job.color, border: `3px solid ${BG}`,
                  boxShadow: `0 0 20px ${job.color}88`,
                }} />
                <div style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 12, padding: 32, borderLeft: `3px solid ${job.color}` }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12, marginBottom: 20 }}>
                    <div>
                      <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, color: "#f1f5f9", marginBottom: 4 }}>{job.role}</h3>
                      <div style={{ color: job.color, fontFamily: "'DM Mono', monospace", fontSize: 13, letterSpacing: 1 }}>{job.company}</div>
                    </div>
                    <div style={{ padding: "6px 16px", borderRadius: 20, background: `${job.color}15`, border: `1px solid ${job.color}33`, color: job.color, fontFamily: "'DM Mono', monospace", fontSize: 12 }}>
                      {job.period}
                    </div>
                  </div>
                  <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
                    {job.points.map((p, j) => (
                      <li key={j} style={{ display: "flex", gap: 12, color: "#94a3b8", fontSize: 14, lineHeight: 1.7, fontFamily: "'Outfit', sans-serif" }}>
                        <span style={{ color: job.color, flexShrink: 0, marginTop: 3 }}>▸</span>
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" style={{ padding: "100px 5%", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <SectionHeader number="03" title="Projects" />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 24 }}>
            {projects.map((p, i) => <ProjectCard key={i} project={p} i={i} />)}
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" style={{ padding: "100px 5%", position: "relative", zIndex: 1, background: `${CARD}44` }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <SectionHeader number="04" title="Skills" />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 32 }}>
            {Object.entries(skills).map(([cat, items], i) => {
              const colors = [ACCENT, AMBER, "#a78bfa", "#f472b6", "#34d399", "#7dd3fc"];
              return (
                <div key={cat} style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 12, padding: 24 }}>
                  <SkillBar label={cat} items={items} color={colors[i % colors.length]} />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ padding: "100px 5% 80px", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
          <SectionHeader number="05" title="Contact" center />
          {/* Fixed: comment-like text in JSX wrapped in braces */}
          <p style={{ color: "#64748b", fontFamily: "'DM Mono', monospace", fontSize: 13, letterSpacing: 2, marginBottom: 40 }}>
            {`// Let's build something remarkable together`}
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: 20, flexWrap: "wrap" }}>
            {[
              { label: "aryapatel2403@gmail.com", icon: "✉", href: "mailto:aryapatel2403@gmail.com", color: ACCENT },
              { label: "9724007778", icon: "📞", href: "tel:9724007778", color: AMBER },
              { label: "LinkedIn", icon: "🔗", href: "https://www.linkedin.com/in/arya-patel20/", color: "#7dd3fc" },
            ].map((c) => (
              <a
                key={c.label}
                href={c.href}
                style={{
                  display: "flex", alignItems: "center", gap: 10,
                  padding: "14px 24px", borderRadius: 8,
                  border: `1px solid ${c.color}33`,
                  background: `${c.color}0a`,
                  color: c.color, textDecoration: "none",
                  fontFamily: "'DM Mono', monospace", fontSize: 13,
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = c.color; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = `${c.color}33`; }}
              >
                <span>{c.icon}</span> {c.label}
              </a>
            ))}
          </div>
          <div style={{ marginTop: 36 }}>
            <button
              onClick={downloadResume}
              style={{
                padding: "16px 40px", borderRadius: 8,
                border: `1px solid ${AMBER}`,
                background: "transparent", color: AMBER,
                fontFamily: "'DM Mono', monospace", fontSize: 14, letterSpacing: 2,
                cursor: "pointer", transition: "all 0.3s",
                display: "inline-flex", alignItems: "center", gap: 10,
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = `${AMBER}15`; e.currentTarget.style.boxShadow = `0 0 30px ${AMBER}33`; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.boxShadow = "none"; }}
            >
              <span style={{ fontSize: 18 }}>↓</span>
              DOWNLOAD MY RESUME
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: `1px solid ${BORDER}`, padding: "24px 5%", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12, position: "relative", zIndex: 1 }}>
        <div style={{ fontFamily: "'DM Mono', monospace", color: "#334155", fontSize: 12 }}>
          © 2025 Arya Patel · Built with React
        </div>
        <div style={{ fontFamily: "'DM Mono', monospace", color: ACCENT, fontSize: 12, animation: "pulse 2s infinite" }}>
          ● Available for opportunities
        </div>
      </footer>
    </div>
  );
}