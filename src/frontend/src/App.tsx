import {
  BookOpen,
  ChevronDown,
  Facebook,
  Globe,
  GraduationCap,
  HandshakeIcon,
  Heart,
  Instagram,
  Linkedin,
  Mail,
  Megaphone,
  Menu,
  Mic,
  Phone,
  Scale,
  Shield,
  Star,
  Twitter,
  Users,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

// =====================
// SCROLL ANIMATION HOOK
// =====================
function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
    );

    const elements = document.querySelectorAll(".fade-up");
    for (const el of elements) {
      observer.observe(el);
    }

    return () => observer.disconnect();
  }, []);
}

// =====================
// LOADING SCREEN
// =====================
function LoadingScreen({ onDone }: { onDone: () => void }) {
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setFading(true), 2000);
    const doneTimer = setTimeout(() => onDone(), 2800);
    return () => {
      clearTimeout(timer);
      clearTimeout(doneTimer);
    };
  }, [onDone]);

  return (
    <div className={`loading-screen ${fading ? "fade-out" : ""}`}>
      <div className="seal-pulse">
        <div className="seal-spin">
          <img
            src="/assets/generated/diplomatic-seal-transparent.dim_400x400.png"
            alt="Diplomatic Seal"
            className="w-32 h-32 opacity-90"
          />
        </div>
      </div>
      <div className="mt-8 text-center">
        <p
          className="font-serif text-xl tracking-widest"
          style={{ color: "var(--gold)" }}
        >
          H.E. DR. BHAVIN R. HARIYANI
        </p>
        <p
          className="text-xs tracking-[0.3em] mt-2 uppercase"
          style={{ color: "var(--text-muted-dark)" }}
        >
          Peace Ambassador · Diplomat · Philanthropist
        </p>
      </div>
      <div className="gold-rule mt-8 w-24" />
    </div>
  );
}

// =====================
// NAVIGATION
// =====================
const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Designations", href: "#designations" },
  { label: "Diplomacy", href: "#diplomacy" },
  { label: "Awards", href: "#awards" },
  { label: "Contact", href: "#contact" },
];

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [navHidden, setNavHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setScrolled(currentY > 50);
      setNavHidden(currentY > lastScrollY.current && currentY > 150);
      lastScrollY.current = currentY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          navHidden ? "nav-hidden" : "nav-visible"
        } ${
          scrolled
            ? "bg-[#0B0B0C]/95 backdrop-blur-md border-b border-white/5 shadow-lg"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <span
              className="font-serif text-2xl font-bold gold-shimmer"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              BRH
            </span>
            <div className="hidden sm:block">
              <p
                className="text-xs tracking-[0.2em] uppercase"
                style={{ color: "var(--text-muted-dark)" }}
              >
                H.E. Dr. Bhavin R. Hariyani
              </p>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                type="button"
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                data-ocid={`nav.${link.label.toLowerCase()}.link`}
                className="text-xs tracking-[0.15em] uppercase transition-colors duration-200 hover:text-white"
                style={{ color: "var(--text-muted-dark)" }}
              >
                {link.label}
              </button>
            ))}
            <button
              type="button"
              onClick={() => handleNavClick("#contact")}
              data-ocid="nav.contact.button"
              className="px-5 py-2 rounded-full text-xs tracking-[0.15em] uppercase font-medium transition-all duration-200 hover:shadow-gold-sm"
              style={{
                background: "var(--gold)",
                color: "#0B0B0C",
              }}
            >
              Contact
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="lg:hidden p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            data-ocid="nav.menu.toggle"
            style={{ color: "var(--gold)" }}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setMenuOpen(false)}
          onKeyDown={() => setMenuOpen(false)}
          role="button"
          tabIndex={-1}
          aria-label="Close menu"
        />
      )}

      {/* Mobile Menu */}
      <div className={`mobile-menu z-50 pt-20 px-8 ${menuOpen ? "open" : ""}`}>
        <div className="flex flex-col gap-6">
          {navLinks.map((link) => (
            <button
              type="button"
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className="text-left text-sm tracking-[0.2em] uppercase transition-colors duration-200 hover:text-white"
              style={{ color: "var(--text-muted-dark)" }}
            >
              {link.label}
            </button>
          ))}
          <div className="gold-rule" />
          <button
            type="button"
            onClick={() => handleNavClick("#contact")}
            className="px-5 py-3 rounded-full text-xs tracking-[0.2em] uppercase font-medium"
            style={{ background: "var(--gold)", color: "#0B0B0C" }}
          >
            Contact
          </button>
        </div>
      </div>
    </>
  );
}

// =====================
// HERO SECTION
// =====================
function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="/assets/generated/hero-bg.dim_1920x1080.jpg"
          alt="Hero Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/70 to-black/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 py-32">
        <div className="max-w-3xl">
          {/* Gold rule */}
          <div className="hero-line-1 flex items-center gap-4 mb-8">
            <div className="gold-rule flex-1 max-w-[80px]" />
            <span
              className="text-xs tracking-[0.3em] uppercase"
              style={{ color: "var(--gold)" }}
            >
              Official Portfolio
            </span>
          </div>

          {/* Designation badge */}
          <div className="hero-line-2 mb-4">
            <span
              className="text-xs tracking-[0.25em] uppercase font-medium"
              style={{ color: "var(--gold)" }}
            >
              His Excellency
            </span>
          </div>

          {/* Name */}
          <h1
            className="hero-line-3 font-serif font-bold leading-tight mb-4"
            style={{
              fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
              color: "var(--text-light)",
              fontFamily: "'Playfair Display', serif",
            }}
          >
            Dr. Bhavin R.
            <br />
            <span className="gold-shimmer">Hariyani</span>
          </h1>

          {/* Subtitle */}
          <p
            className="hero-line-4 text-xs sm:text-sm tracking-[0.2em] uppercase mb-4 font-medium"
            style={{ color: "var(--gold)" }}
          >
            Peace
            Ambassador&nbsp;&nbsp;|&nbsp;&nbsp;Diplomat&nbsp;&nbsp;|&nbsp;&nbsp;Social
            Leader
          </p>

          {/* Tagline */}
          <p
            className="hero-line-4 font-serif italic text-lg sm:text-xl mb-10"
            style={{ color: "var(--text-muted-dark)" }}
          >
            &ldquo;Driven by service, integrity, and global impact&rdquo;
          </p>

          {/* CTA Panel */}
          <div className="hero-line-5">
            <div className="glass inline-flex flex-wrap gap-4 p-5 rounded-2xl">
              <button
                type="button"
                data-ocid="hero.view_profile.button"
                onClick={() =>
                  document
                    .getElementById("about")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="px-7 py-3 rounded-full text-sm tracking-[0.1em] font-medium uppercase transition-all duration-300 hover:shadow-gold-glow hover:scale-105"
                style={{ background: "var(--gold)", color: "#0B0B0C" }}
              >
                View Profile
              </button>
              <button
                type="button"
                data-ocid="hero.contact.button"
                onClick={() =>
                  document
                    .getElementById("contact")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="px-7 py-3 rounded-full text-sm tracking-[0.1em] font-medium uppercase border transition-all duration-300 hover:border-gold hover:text-white"
                style={{
                  borderColor: "var(--gold)",
                  color: "var(--text-light)",
                }}
              >
                Contact
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 scroll-bounce">
        <span
          className="text-xs tracking-[0.2em] uppercase"
          style={{ color: "var(--text-muted-dark)" }}
        >
          Scroll
        </span>
        <ChevronDown size={16} style={{ color: "var(--gold)" }} />
      </div>
    </section>
  );
}

// =====================
// ABOUT SECTION
// =====================
function AboutSection() {
  const pillars = [
    { label: "Discipline", icon: Shield },
    { label: "Long-Term Vision", icon: Globe },
    { label: "Integrity", icon: Scale },
    { label: "Impact", icon: Users },
  ];

  return (
    <section id="about" style={{ background: "var(--light-bg)" }}>
      <div className="section-container">
        <div
          className="grid lg:grid-cols-5 gap-0 items-stretch rounded-2xl overflow-hidden"
          style={{ boxShadow: "0 8px 60px rgba(0,0,0,0.18)" }}
        >
          {/* Left: Portrait only — plain dark panel */}
          <div
            className="fade-up relative flex items-stretch lg:col-span-2"
            style={{
              background: "#0a0a0a",
              minHeight: "360px",
              maxHeight: "400px",
            }}
          >
            <div
              className="absolute inset-0 m-4 rounded-xl overflow-hidden"
              style={{ border: "2px solid rgba(200,162,74,0.55)" }}
            >
              <img
                src="/assets/uploads/internet_20260220_102735_18-019d3acb-3616-74a4-8342-9f3c4b31a52d-3.jpeg"
                alt="H.E. Dr. Bhavin R. Hariyani"
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>

          {/* Right: Text content */}
          <div
            className="fade-up fade-up-delay-2 p-10 lg:p-14 flex flex-col justify-center lg:col-span-3"
            style={{ background: "var(--light-bg)" }}
          >
            <p
              className="text-xs tracking-[0.3em] uppercase mb-3 font-medium"
              style={{ color: "var(--gold)" }}
            >
              Biography
            </p>
            <h2
              className="font-serif text-4xl md:text-5xl font-bold leading-tight mb-6"
              style={{
                color: "var(--text-dark)",
                fontFamily: "'Playfair Display', serif",
              }}
            >
              About His
              <br />
              <span style={{ color: "var(--gold)" }}>Excellency</span>
            </h2>
            <div className="gold-rule" style={{ margin: "0 0 0 0" }} />

            <div className="space-y-5 mt-8">
              <p
                className="text-base leading-relaxed"
                style={{ color: "var(--text-muted-light)" }}
              >
                H.E. Dr. Bhavin Rameshchandra Hariyani is a distinguished Peace
                Ambassador, Diplomat, Philanthropist, and Social Justice Leader
                whose life&rsquo;s work has been dedicated to the service of
                humanity. With decades of experience in diplomacy, social
                reform, and international cooperation, he has emerged as a
                powerful voice for peace and equality on the global stage.
              </p>
              <p
                className="text-base leading-relaxed"
                style={{ color: "var(--text-muted-light)" }}
              >
                Born with an unwavering conviction in the principles of justice,
                integrity, and compassion, Dr. Hariyani has built a legacy that
                transcends borders. His diplomatic engagements span multiple
                continents, and his work with international bodies reflects a
                deep commitment to the United Nations&rsquo; Sustainable
                Development Goals (SDGs).
              </p>
              <p
                className="text-base leading-relaxed"
                style={{ color: "var(--text-muted-light)" }}
              >
                His philosophy is grounded in four pillars: discipline,
                long-term vision, uncompromising integrity, and measurable
                impact. Whether addressing world leaders at international forums
                or working directly with communities in need, he brings the same
                tireless dedication to every endeavor.
              </p>
            </div>

            {/* Philosophy Pillars */}
            <div className="grid grid-cols-2 gap-4 mt-8">
              {pillars.map((p, i) => {
                const Icon = p.icon;
                return (
                  <div
                    key={p.label}
                    className={`fade-up fade-up-delay-${i + 3} card-hover p-5 rounded-xl text-center`}
                    style={{
                      background: "#fff",
                      border: "1px solid rgba(200,162,74,0.3)",
                      boxShadow: "0 2px 20px rgba(0,0,0,0.06)",
                    }}
                  >
                    <Icon
                      size={24}
                      className="mx-auto mb-3"
                      style={{ color: "var(--gold)" }}
                    />
                    <p
                      className="text-sm font-semibold tracking-wide"
                      style={{ color: "var(--text-dark)" }}
                    >
                      {p.label}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// =====================
// DESIGNATIONS SECTION
// =====================
const designations = [
  { title: "His Excellency Ambassador", org: "Diplomat – India Chapter" },
  { title: "Chairman", org: "Social Justice" },
  { title: "Chairman", org: "Event Management Association of India" },
  { title: "Founder & Managing Trustee", org: "SASEU" },
  { title: "Founder", org: "Mirambika Global Technology & Solution Pvt. Ltd." },
  { title: "Founder", org: "Hariyani Brothers Pvt. Ltd." },
  {
    title: "National Vice President",
    org: "Consumer Protection Council of India",
  },
  { title: "Publisher & Chief Editor", org: "Kushal Bharat" },
];

function DesignationsSection() {
  return (
    <section id="designations" style={{ background: "var(--dark-surface)" }}>
      <div className="section-container">
        <div className="text-center mb-14 fade-up">
          <p
            className="text-xs tracking-[0.3em] uppercase mb-3"
            style={{ color: "var(--gold)" }}
          >
            Positions of Authority
          </p>
          <h2
            className="font-serif text-4xl md:text-5xl font-bold gold-underline"
            style={{
              color: "var(--text-light)",
              fontFamily: "'Playfair Display', serif",
            }}
          >
            Official Designations
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {designations.map((d, i) => (
            <div
              key={d.title + d.org}
              className={`fade-up fade-up-delay-${Math.min(i + 1, 7)} card-hover glass gold-border-top rounded-xl p-6`}
              data-ocid={`designations.item.${i + 1}`}
            >
              <div
                className="text-xs tracking-[0.15em] uppercase mb-1 font-medium"
                style={{ color: "var(--gold)" }}
              >
                {d.title}
              </div>
              <div
                className="text-sm leading-snug mt-2"
                style={{ color: "var(--text-muted-dark)" }}
              >
                {d.org}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// =====================
// DIPLOMACY SECTION
// =====================
const timelineItems = [
  {
    icon: Globe,
    title: "UN-Related Recognition",
    desc: "Recognized for contributions to international peace initiatives aligned with UN SDGs and global cooperation frameworks.",
  },
  {
    icon: HandshakeIcon,
    title: "Global Peace Advocacy",
    desc: "Active participant in international peace summits, representing India's vision for harmonious global coexistence.",
  },
  {
    icon: Star,
    title: "SDG Champion",
    desc: "Champion of Sustainable Development Goals, driving awareness and implementation across social, economic, and environmental dimensions.",
  },
  {
    icon: Users,
    title: "International Cooperation",
    desc: "Fostering bilateral relations and cross-border partnerships for mutual development and shared prosperity.",
  },
  {
    icon: Shield,
    title: "Diplomatic Mission India",
    desc: "Leading India's diplomatic chapter with a focus on cultural exchange, soft power projection, and people-centric diplomacy.",
  },
];

function DiplomacySection() {
  return (
    <section id="diplomacy" style={{ background: "var(--light-bg)" }}>
      <div className="section-container">
        <div className="text-center mb-14 fade-up">
          <p
            className="text-xs tracking-[0.3em] uppercase mb-3 font-medium"
            style={{ color: "var(--gold)" }}
          >
            Global Engagement
          </p>
          <h2
            className="font-serif text-4xl md:text-5xl font-bold"
            style={{
              color: "var(--text-dark)",
              fontFamily: "'Playfair Display', serif",
            }}
          >
            Diplomatic &amp; International
            <br />
            <span style={{ color: "var(--gold)" }}>Engagement</span>
          </h2>
          <div className="gold-rule mt-4" />
        </div>

        <div className="relative max-w-2xl mx-auto">
          {/* Vertical line */}
          <div
            className="absolute top-0 bottom-0 w-px"
            style={{
              left: "20px",
              background:
                "linear-gradient(to bottom, transparent, var(--gold), transparent)",
            }}
          />

          <div className="space-y-10">
            {timelineItems.map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className={`fade-up fade-up-delay-${Math.min(i + 1, 5)} flex gap-8 pl-2`}
                  data-ocid={`diplomacy.item.${i + 1}`}
                >
                  {/* Node */}
                  <div className="flex-shrink-0 relative z-10">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center"
                      style={{
                        background: "var(--light-bg)",
                        border: "2px solid var(--gold)",
                      }}
                    >
                      <Icon size={16} style={{ color: "var(--gold)" }} />
                    </div>
                  </div>
                  {/* Content */}
                  <div className="pb-2">
                    <h3
                      className="font-serif text-xl font-semibold mb-2"
                      style={{ color: "var(--text-dark)" }}
                    >
                      {item.title}
                    </h3>
                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: "var(--text-muted-light)" }}
                    >
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

// =====================
// SOCIAL WORK SECTION
// =====================
const socialWork = [
  {
    icon: Scale,
    title: "Social Justice Initiatives",
    desc: "Championing equal rights and legal protection for marginalized communities across India and beyond.",
  },
  {
    icon: GraduationCap,
    title: "Education Support",
    desc: "Facilitating scholarships, learning centers, and educational programs for underprivileged youth.",
  },
  {
    icon: Heart,
    title: "Food Distribution",
    desc: "Organizing large-scale food distribution drives to combat hunger and ensure nutritional welfare.",
  },
  {
    icon: Megaphone,
    title: "Awareness Programs",
    desc: "Conducting nationwide awareness campaigns on health, rights, and civic responsibilities.",
  },
  {
    icon: Mic,
    title: "Motivational Speaking",
    desc: "Inspiring thousands through powerful addresses at universities, forums, and community events.",
  },
];

function SocialWorkSection() {
  return (
    <section id="social" style={{ background: "var(--dark-bg)" }}>
      <div className="section-container">
        <div className="text-center mb-14 fade-up">
          <p
            className="text-xs tracking-[0.3em] uppercase mb-3"
            style={{ color: "var(--gold)" }}
          >
            Community Service
          </p>
          <h2
            className="font-serif text-4xl md:text-5xl font-bold gold-underline"
            style={{
              color: "var(--text-light)",
              fontFamily: "'Playfair Display', serif",
            }}
          >
            Social Work &amp; Public Service
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {socialWork.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className={`fade-up fade-up-delay-${Math.min(i + 1, 5)} card-hover glass rounded-2xl p-6 text-center`}
                data-ocid={`social.item.${i + 1}`}
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5"
                  style={{
                    background: "rgba(200,162,74,0.12)",
                    border: "1px solid rgba(200,162,74,0.3)",
                  }}
                >
                  <Icon size={22} style={{ color: "var(--gold)" }} />
                </div>
                <h3
                  className="font-serif text-base font-semibold mb-3"
                  style={{ color: "var(--text-light)" }}
                >
                  {item.title}
                </h3>
                <p
                  className="text-xs leading-relaxed"
                  style={{ color: "var(--text-muted-dark)" }}
                >
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// =====================
// MEDIA & LEADERSHIP
// =====================
function MediaSection() {
  return (
    <section id="media" style={{ background: "var(--light-bg)" }}>
      <div className="section-container">
        <div className="text-center mb-14 fade-up">
          <p
            className="text-xs tracking-[0.3em] uppercase mb-3 font-medium"
            style={{ color: "var(--gold)" }}
          >
            Journalism & Communication
          </p>
          <h2
            className="font-serif text-4xl md:text-5xl font-bold"
            style={{
              color: "var(--text-dark)",
              fontFamily: "'Playfair Display', serif",
            }}
          >
            Media &amp; Leadership
          </h2>
          <div className="gold-rule mt-4" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Quote */}
          <div
            className="fade-up rounded-2xl p-8 relative overflow-hidden"
            style={{
              background: "var(--dark-surface)",
              border: "1px solid rgba(200,162,74,0.2)",
            }}
          >
            <div
              className="absolute top-2 left-4 font-serif text-8xl leading-none select-none"
              style={{
                color: "rgba(200,162,74,0.15)",
                fontFamily: "'Playfair Display', serif",
              }}
            >
              &ldquo;
            </div>
            <div className="relative z-10">
              <p
                className="font-serif text-xl italic leading-relaxed mb-6"
                style={{
                  color: "var(--text-light)",
                  fontFamily: "'Playfair Display', serif",
                }}
              >
                Ethical journalism is the cornerstone of a just society. Through
                Kushal Bharat, we give voice to the voiceless and hold truth as
                our highest editorial standard.
              </p>
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-px"
                  style={{ background: "var(--gold)" }}
                />
                <span
                  className="text-xs tracking-[0.2em] uppercase font-medium"
                  style={{ color: "var(--gold)" }}
                >
                  Kushal Bharat
                </span>
              </div>
            </div>
          </div>

          {/* Right Details */}
          <div className="fade-up fade-up-delay-2 space-y-5">
            <div
              className="p-5 rounded-xl"
              style={{
                background: "#fff",
                border: "1px solid rgba(200,162,74,0.2)",
                boxShadow: "0 2px 20px rgba(0,0,0,0.05)",
              }}
            >
              <div className="flex items-start gap-4">
                <div
                  className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center mt-1"
                  style={{
                    background: "rgba(200,162,74,0.1)",
                    border: "1px solid rgba(200,162,74,0.3)",
                  }}
                >
                  <BookOpen size={16} style={{ color: "var(--gold)" }} />
                </div>
                <div>
                  <h3
                    className="font-semibold text-base mb-1"
                    style={{ color: "var(--text-dark)" }}
                  >
                    Publisher &amp; Chief Editor, Kushal Bharat
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "var(--text-muted-light)" }}
                  >
                    Dr. Hariyani serves as the Publisher &amp; Chief Editor of
                    Kushal Bharat, a publication dedicated to ethical journalism
                    and constructive public discourse. Through this platform, he
                    amplifies voices of the marginalized and champions social
                    causes.
                  </p>
                </div>
              </div>
            </div>

            <div
              className="p-5 rounded-xl"
              style={{
                background: "#fff",
                border: "1px solid rgba(200,162,74,0.2)",
                boxShadow: "0 2px 20px rgba(0,0,0,0.05)",
              }}
            >
              <div className="flex items-start gap-4">
                <div
                  className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center mt-1"
                  style={{
                    background: "rgba(200,162,74,0.1)",
                    border: "1px solid rgba(200,162,74,0.3)",
                  }}
                >
                  <Megaphone size={16} style={{ color: "var(--gold)" }} />
                </div>
                <div>
                  <h3
                    className="font-semibold text-base mb-1"
                    style={{ color: "var(--text-dark)" }}
                  >
                    Responsible Media Communication
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "var(--text-muted-light)" }}
                  >
                    Through principled editorial leadership, Dr. Hariyani
                    provides a platform for constructive public discourse,
                    responsible journalism, and ethical communication that
                    upholds democratic values.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// =====================
// AWARDS SECTION
// =====================
const awards = [
  {
    name: "Mumbai Gaurav Ratna Award",
    year: "2025",
    location: "Mumbai, India",
  },
  { name: "World Excellence Award", year: "2025", location: "England, UK" },
  {
    name: "Mankind Achievement Award",
    year: "2021",
    location: "UK Parliament",
  },
  {
    name: "Dr. Babasaheb Ambedkar Samaj Ratna",
    year: "2021",
    location: "India",
  },
  { name: "Akhand Bharat Seva Ratna Award", year: "2018", location: "India" },
];

function AwardsSection() {
  return (
    <section id="awards" style={{ background: "var(--dark-surface)" }}>
      <div className="section-container">
        <div className="text-center mb-14 fade-up">
          <p
            className="text-xs tracking-[0.3em] uppercase mb-3"
            style={{ color: "var(--gold)" }}
          >
            Honours &amp; Accolades
          </p>
          <h2
            className="font-serif text-4xl md:text-5xl font-bold gold-underline"
            style={{
              color: "var(--text-light)",
              fontFamily: "'Playfair Display', serif",
            }}
          >
            Awards &amp; Recognition
          </h2>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {awards.map((award, i) => (
            <div
              key={award.name}
              className={`fade-up fade-up-delay-${Math.min(i + 1, 5)} card-hover glass rounded-xl p-5 flex items-center gap-6 relative overflow-hidden`}
              style={{ borderLeft: "3px solid var(--gold)" }}
              data-ocid={`awards.item.${i + 1}`}
            >
              {/* Star Icon */}
              <div className="flex-shrink-0">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{
                    background: "rgba(200,162,74,0.12)",
                    border: "1px solid rgba(200,162,74,0.3)",
                  }}
                >
                  <Star
                    size={18}
                    fill="var(--gold)"
                    style={{ color: "var(--gold)" }}
                  />
                </div>
              </div>

              {/* Content */}
              <div className="flex-1">
                <h3
                  className="font-serif text-lg font-semibold"
                  style={{ color: "var(--text-light)" }}
                >
                  {award.name}
                </h3>
                <p
                  className="text-xs mt-1"
                  style={{ color: "var(--text-muted-dark)" }}
                >
                  {award.location}
                </p>
              </div>

              {/* Year Badge */}
              <div
                className="flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-bold tracking-[0.1em]"
                style={{
                  background: "rgba(200,162,74,0.15)",
                  border: "1px solid rgba(200,162,74,0.4)",
                  color: "var(--gold)",
                }}
              >
                {award.year}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// =====================
// VISION SECTION
// =====================
function VisionSection() {
  return (
    <section
      id="vision"
      className="relative overflow-hidden gold-pattern"
      style={{ background: "var(--dark-bg)", minHeight: "60vh" }}
    >
      {/* Background decorative elements */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "radial-gradient(circle at 30% 50%, rgba(200,162,74,0.3) 0%, transparent 60%), radial-gradient(circle at 70% 50%, rgba(200,162,74,0.2) 0%, transparent 60%)",
        }}
      />

      <div className="section-container relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Large decorative quotes */}
          <div
            className="quote-mark"
            style={{ top: "-20px", left: "-20px", position: "relative" }}
          />

          <div className="fade-up">
            <p
              className="text-xs tracking-[0.3em] uppercase mb-8"
              style={{ color: "var(--gold)" }}
            >
              Mission &amp; Vision
            </p>

            {/* Giant quote marks */}
            <div className="relative">
              <span
                className="absolute font-serif select-none pointer-events-none"
                style={{
                  fontSize: "160px",
                  lineHeight: 1,
                  color: "rgba(200,162,74,0.08)",
                  top: "-40px",
                  left: "-20px",
                  fontFamily: "'Playfair Display', serif",
                }}
              >
                &ldquo;
              </span>

              <blockquote
                className="font-serif italic leading-relaxed relative z-10"
                style={{
                  fontSize: "clamp(1.2rem, 2.5vw, 1.6rem)",
                  color: "var(--text-light)",
                  fontFamily: "'Playfair Display', serif",
                }}
              >
                My mission is to build bridges where walls exist, to illuminate
                darkness with the torch of education, and to ensure that every
                voice — no matter how distant — is heard on the world stage.
              </blockquote>

              <span
                className="absolute font-serif select-none pointer-events-none"
                style={{
                  fontSize: "160px",
                  lineHeight: 1,
                  color: "rgba(200,162,74,0.08)",
                  bottom: "-80px",
                  right: "-20px",
                  fontFamily: "'Playfair Display', serif",
                }}
              >
                &rdquo;
              </span>
            </div>

            <div className="gold-rule mt-10 mb-6" />

            <p
              className="text-sm tracking-[0.2em] uppercase"
              style={{ color: "var(--gold)" }}
            >
              — H.E. Dr. Bhavin R. Hariyani
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// =====================
// GALLERY SECTION
// =====================
const galleryImages = [
  {
    src: "/assets/uploads/internet_20260220_102735_13-019d3acb-3615-727a-9144-86dd39dbd78d-1.jpeg",
    label: "Diplomatic Event",
  },
  {
    src: "/assets/uploads/internet_20260220_102735_18-019d3acb-3616-74a4-8342-9f3c4b31a52d-3.jpeg",
    label: "Official Portrait",
  },
  {
    src: "/assets/uploads/internet_20260220_102735_12-019d3acb-36bc-752f-aa67-a5bb91081750-4.jpeg",
    label: "Award Ceremony",
  },
  {
    src: "/assets/uploads/internet_20260220_102735_16-019d3acb-36b1-707f-b469-5824c3b189c6-5.jpeg",
    label: "Peace Initiative",
  },
  {
    src: "/assets/uploads/internet_20260220_102735_15-019d3acb-36e0-7258-b8ac-a14d7ee30210-6.jpeg",
    label: "Community Outreach",
  },
  {
    src: "/assets/uploads/internet_20260220_102735_11-019d3acb-3716-723d-ba68-8ce0983858f7-7.jpeg",
    label: "Leadership",
  },
  {
    src: "/assets/uploads/internet_20260220_102735_7-019d3acb-3717-71a2-a879-5bb2fbd335e9-8.jpeg",
    label: "Youth Recognition",
  },
  {
    src: "/assets/uploads/internet_20260220_102735_8-019d3acb-374a-72d4-90de-d7da6644f66d-10.jpeg",
    label: "Portrait",
  },
  {
    src: "/assets/uploads/internet_20260220_102735_9-019d3acb-3744-7563-b05b-0224d3442716-9.jpeg",
    label: "Public Service",
  },
  {
    src: "/assets/uploads/internet_20260220_102735_4-019d3acb-37a4-76da-9673-ab8b2a1e8c22-11.jpeg",
    label: "Awareness Program",
  },
  {
    src: "/assets/uploads/internet_20260220_102735_6-019d3acb-3745-715c-b081-a49611722e02-12.jpeg",
    label: "Social Work",
  },
  {
    src: "/assets/uploads/internet_20260220_102735_5-019d3acb-3b66-722a-8863-dad0d22c31ea-13.png",
    label: "Brahma Kumaris",
  },
  {
    src: "/assets/uploads/internet_20260220_102735_19-019d3acb-3de4-751a-8efe-63dcc33ae87f-14.png",
    label: "For The World",
  },
  {
    src: "/assets/uploads/internet_20260220_102735_24-019d3acb-416d-71a4-87f7-3d64367aee93-15.png",
    label: "Vision & Mission",
  },
  {
    src: "/assets/uploads/internet_20260220_102735_21-019d3acb-4807-702d-83d8-1bf5baad5a4f-18.png",
    label: "National Event",
  },
  {
    src: "/assets/uploads/internet_20260220_102735_22-019d3acb-481c-713d-ab33-28ce36917eb8-19.png",
    label: "Community Service",
  },
  {
    src: "/assets/uploads/internet_20260220_102735_23-019d3acb-492f-75c8-bb08-2c462021c13c-20.png",
    label: "Dr. Ambedkar Award",
  },
  {
    src: "/assets/uploads/internet_20260220_102735_17-019d3acb-3612-76bf-ab0e-b0d46b3acb88-2.jpeg",
    label: "Hariyani Legacy",
  },
  {
    src: "/assets/uploads/internet_20260220_102735_20-019d3acb-46e4-71ac-8956-2e650280b680-17.png",
    label: "Mankind Achievement",
  },
  {
    src: "/assets/uploads/internet_20260220_102735_24-019d3acb-4229-767b-b843-cab2647a0a4d-16.png",
    label: "Recognition",
  },
];

function GallerySection() {
  return (
    <section id="gallery" style={{ background: "var(--light-bg)" }}>
      <div className="section-container">
        <div className="text-center mb-14 fade-up">
          <p
            className="text-xs tracking-[0.3em] uppercase mb-3 font-medium"
            style={{ color: "var(--gold)" }}
          >
            Photo Gallery
          </p>
          <h2
            className="font-serif text-4xl md:text-5xl font-bold"
            style={{
              color: "var(--text-dark)",
              fontFamily: "'Playfair Display', serif",
            }}
          >
            Gallery
          </h2>
          <div className="gold-rule mt-4" />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {galleryImages.map((item, i) => (
            <div
              key={item.src}
              className={`fade-up fade-up-delay-${Math.min(i + 1, 5)} gallery-item relative overflow-hidden rounded-sm`}
              style={{
                background: "#1a1a1c",
                border: "1px solid rgba(200,162,74,0.15)",
                aspectRatio: "1",
              }}
              data-ocid={`gallery.item.${i + 1}`}
            >
              <img
                src={item.src}
                alt={item.label}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full hover:translate-y-0 transition-transform duration-300">
                <span
                  className="text-xs tracking-[0.1em] uppercase"
                  style={{ color: "var(--gold)" }}
                >
                  {item.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// =====================
// CONTACT SECTION
// =====================
function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const socials = [
    { Icon: Instagram, label: "Instagram", href: "#" },
    { Icon: Facebook, label: "Facebook", href: "#" },
    { Icon: Linkedin, label: "LinkedIn", href: "#" },
    { Icon: Twitter, label: "Twitter", href: "#" },
  ];

  return (
    <section id="contact" style={{ background: "var(--dark-bg)" }}>
      <div className="section-container">
        <div className="text-center mb-14 fade-up">
          <p
            className="text-xs tracking-[0.3em] uppercase mb-3"
            style={{ color: "var(--gold)" }}
          >
            Reach Out
          </p>
          <h2
            className="font-serif text-4xl md:text-5xl font-bold gold-underline"
            style={{
              color: "var(--text-light)",
              fontFamily: "'Playfair Display', serif",
            }}
          >
            Get In Touch
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left: Contact Info */}
          <div className="fade-up space-y-6">
            <p
              className="text-base leading-relaxed"
              style={{ color: "var(--text-muted-dark)" }}
            >
              For diplomatic inquiries, official engagements, and media
              requests, please reach out through the following channels.
            </p>

            {/* Phone */}
            <div className="glass rounded-xl p-5 flex items-center gap-5 card-hover">
              <div
                className="w-12 h-12 rounded-full flex-shrink-0 flex items-center justify-center"
                style={{
                  background: "rgba(200,162,74,0.1)",
                  border: "1px solid rgba(200,162,74,0.3)",
                }}
              >
                <Phone size={18} style={{ color: "var(--gold)" }} />
              </div>
              <div>
                <p
                  className="text-xs tracking-[0.15em] uppercase mb-1"
                  style={{ color: "var(--text-muted-dark)" }}
                >
                  Phone
                </p>
                <a
                  href="tel:+919327999999"
                  className="text-base font-medium transition-colors hover:text-white"
                  style={{ color: "var(--text-light)" }}
                >
                  +91-9327999999
                </a>
              </div>
            </div>

            {/* Email */}
            <div className="glass rounded-xl p-5 flex items-center gap-5 card-hover">
              <div
                className="w-12 h-12 rounded-full flex-shrink-0 flex items-center justify-center"
                style={{
                  background: "rgba(200,162,74,0.1)",
                  border: "1px solid rgba(200,162,74,0.3)",
                }}
              >
                <Mail size={18} style={{ color: "var(--gold)" }} />
              </div>
              <div>
                <p
                  className="text-xs tracking-[0.15em] uppercase mb-1"
                  style={{ color: "var(--text-muted-dark)" }}
                >
                  Email
                </p>
                <a
                  href="mailto:dr.bhavin.r.hariyani@gmail.com"
                  className="text-sm font-medium transition-colors hover:text-white break-all"
                  style={{ color: "var(--text-light)" }}
                >
                  dr.bhavin.r.hariyani@gmail.com
                </a>
              </div>
            </div>

            {/* Social Icons */}
            <div>
              <p
                className="text-xs tracking-[0.2em] uppercase mb-4"
                style={{ color: "var(--text-muted-dark)" }}
              >
                Follow On
              </p>
              <div className="flex gap-4">
                {socials.map(({ Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    data-ocid={`contact.${label.toLowerCase()}.link`}
                    className="w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                    style={{
                      border: "1px solid rgba(200,162,74,0.4)",
                      color: "var(--gold)",
                    }}
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="fade-up fade-up-delay-2">
            <form
              onSubmit={handleSubmit}
              className="glass rounded-2xl p-8 space-y-5"
              data-ocid="contact.form"
            >
              <div>
                <label
                  htmlFor="contact-name"
                  className="block text-xs tracking-[0.15em] uppercase mb-2"
                  style={{ color: "var(--text-muted-dark)" }}
                >
                  Full Name
                </label>
                <input
                  type="text"
                  className="dark-input"
                  placeholder="Your full name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, name: e.target.value }))
                  }
                  id="contact-name"
                  data-ocid="contact.name.input"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-email"
                  className="block text-xs tracking-[0.15em] uppercase mb-2"
                  style={{ color: "var(--text-muted-dark)" }}
                >
                  Email Address
                </label>
                <input
                  type="email"
                  className="dark-input"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, email: e.target.value }))
                  }
                  id="contact-email"
                  data-ocid="contact.email.input"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-subject"
                  className="block text-xs tracking-[0.15em] uppercase mb-2"
                  style={{ color: "var(--text-muted-dark)" }}
                >
                  Subject
                </label>
                <input
                  type="text"
                  className="dark-input"
                  placeholder="Message subject"
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, subject: e.target.value }))
                  }
                  id="contact-subject"
                  data-ocid="contact.subject.input"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="block text-xs tracking-[0.15em] uppercase mb-2"
                  style={{ color: "var(--text-muted-dark)" }}
                >
                  Message
                </label>
                <textarea
                  className="dark-input resize-none"
                  rows={4}
                  placeholder="Your message..."
                  value={formData.message}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, message: e.target.value }))
                  }
                  id="contact-message"
                  data-ocid="contact.message.textarea"
                />
              </div>

              <button
                type="submit"
                data-ocid="contact.submit.button"
                className="w-full py-3.5 rounded-full text-sm tracking-[0.15em] uppercase font-medium transition-all duration-300 hover:shadow-gold-glow hover:scale-[1.02]"
                style={{ background: "var(--gold)", color: "#0B0B0C" }}
              >
                {submitted ? "Message Sent ✓" : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

// =====================
// FOOTER
// =====================
function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";
  const caffeineUrl = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`;

  return (
    <footer
      className="relative overflow-hidden py-16 text-center"
      style={{
        background: "var(--dark-surface)",
        borderTop: "1px solid rgba(200,162,74,0.15)",
      }}
    >
      <div className="max-w-4xl mx-auto px-6">
        {/* Monogram */}
        <div
          className="font-serif text-4xl font-bold mb-2 gold-shimmer inline-block"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          BRH
        </div>

        <div className="gold-rule my-5" />

        {/* Nav links */}
        <div className="flex flex-wrap justify-center gap-6 mb-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-xs tracking-[0.15em] uppercase transition-colors hover:text-white"
              style={{ color: "var(--text-muted-dark)" }}
            >
              {link.label}
            </a>
          ))}
        </div>

        <p className="text-xs mb-3" style={{ color: "var(--text-muted-dark)" }}>
          © {year} H.E. Dr. Bhavin R. Hariyani. All Rights Reserved.
        </p>

        <p className="text-xs" style={{ color: "rgba(185,181,170,0.5)" }}>
          Built with ♥ using{" "}
          <a
            href={caffeineUrl}
            target="_blank"
            rel="noreferrer"
            className="hover:text-white transition-colors"
            style={{ color: "var(--text-muted-dark)" }}
          >
            caffeine.ai
          </a>
        </p>
      </div>
    </footer>
  );
}

// =====================
// APP ROOT
// =====================
export default function App() {
  const [loading, setLoading] = useState(true);

  useScrollReveal();

  return (
    <>
      {loading && <LoadingScreen onDone={() => setLoading(false)} />}

      <div style={{ visibility: loading ? "hidden" : "visible" }}>
        <Navbar />

        <main>
          <HeroSection />
          <AboutSection />
          <DesignationsSection />
          <DiplomacySection />
          <SocialWorkSection />
          <MediaSection />
          <AwardsSection />
          <VisionSection />
          <GallerySection />
          <ContactSection />
        </main>

        <Footer />
      </div>
    </>
  );
}
