"use client"

import { useEffect, useContext, createContext, ReactNode } from "react"

// ------------ Language Context Setup ------------
const LanguageContext = createContext(undefined)

function LanguageProvider({ children }: { children: ReactNode }) {
  // Dummy language context value for example
  const language = { lang: "en" }
  return (
    <LanguageContext.Provider value={language}>
      {children}
    </LanguageContext.Provider>
  )
}

function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}

// ------------ Navbar Component ------------
function Navbar() {
  const { lang } = useLanguage()
  // Simple navbar markup with class names for styling
  return (
    <nav className="navbar" role="navigation" aria-label="Main navigation">
      <div className="logo" tabIndex={0}>
        HariBhari
      </div>
      <div className="nav-links">
        <a href="/" tabIndex={0} aria-current={lang === "en" ? "page" : undefined}>Home</a>
        <a href="/about" tabIndex={0} aria-current={lang === "en" ? "page" : undefined}>About</a>
        <a href="/contact" tabIndex={0}>Contact</a>
      </div>
    </nav>
  )
}

// ------------ About Page Component ------------
export default function About() {
  useEffect(() => {
    const style = document.createElement("style")
    style.innerHTML = `
      /* Float Animation */
      @keyframes float {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-10px); }
      }
      .float {
        animation: float 4s ease-in-out infinite;
      }
      ul {
        margin: 0;
        padding-left: 1.25rem;
      }

      /* Navbar Styles */
      .navbar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: #0B610B;
        padding: 1rem 2rem;
        color: white;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
        position: sticky;
        top: 0;
        z-index: 1000;
      }
      .navbar .logo {
        font-weight: 700;
        font-size: 1.5rem;
        user-select: none;
        cursor: default;
      }
      .nav-links {
        display: flex;
        gap: 1.5rem;
      }
      .nav-links a {
        color: white;
        text-decoration: none;
        font-weight: 600;
        transition: color 0.3s ease;
      }
      .nav-links a:hover,
      .nav-links a:focus {
        color: #D5F5E3;
        outline: none;
      }
      @media (max-width: 600px) {
        .nav-links {
          display: none;
        }
           .navbar .logo {
    font-weight: 700;
    font-size: 1.75rem;      /* Slightly bigger */
    user-select: none;
    cursor: default;
    background-color: #2E8B57; /* A nicer green shade */
    padding: 0.25rem 0.75rem;
    border-radius: 8px;
  }
      }
    `
    document.head.appendChild(style)
    return () => document.head.removeChild(style)
  }, [])

  const particles = ["🌿", "🌱", "☀️", "💧", "🍃", "🌾"]

  const team = [
    { name: "Aadeesh Jain", role: "" },
    { name: "Ariba Qureshi", role: "" },
    { name: "Akshita Shukla", role: "" }
  ]

  const colors = {
    foreground: "#222",
    mutedForeground: "#555",
    primaryForeground: "#0B610B",
    border: "#0B610B",
    cardBg: "#F0FFF0",
    greenLight: "#D5F5E3",
    greenDark: "#196F3D",
  }

  return (
    <LanguageProvider>
      <Navbar />
      <main
        style={{
          position: "relative",
          fontFamily: "Arial, Helvetica, sans-serif",
          color: colors.foreground,
          maxWidth: 720,
          margin: "auto",
          padding: "4rem 1.5rem 3rem",
          minHeight: "100vh",
          backgroundColor: "#e6ffe6",
          overflow: "hidden",
        }}
      >
        {/* Floating Unicode Particles */}
        {particles.map((char, i) => (
          <span
            key={i}
            className="float"
            style={{
              position: "absolute",
              top: `${10 + i * 15}%`,
              left: `${5 + i * 20}%`,
              opacity: 0.2 + (i % 2) * 0.3,
              animationDelay: `${i * 0.8}s`,
              fontSize: 32,
              userSelect: "none",
              pointerEvents: "none",
            }}
            aria-hidden="true"
          >
            {char}
          </span>
        ))}

        {/* Bordered box wrapping all content */}
        <section
          style={{
            padding: 40,
            borderRadius: 16,
            border: `2px solid ${colors.border}`,
            backgroundColor: colors.cardBg,
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          }}
        >
          <h1
            style={{
              fontSize: "2.5rem",
              fontWeight: "800",
              marginBottom: 24,
              color: colors.primaryForeground,
            }}
          >
            About HariBhari
          </h1>

          <p
            style={{
              fontSize: "1.125rem",
              marginBottom: 32,
              lineHeight: 1.6,
              color: colors.mutedForeground,
            }}
          >
            HariBhari is your trusted all-in-one smart farming assistant. We empower farmers with real-time weather
            updates, personalized crop recommendations, market price tracking, soil health insights, and access to
            government schemes. Our goal is to make farming data-driven and accessible, enabling better decisions for
            higher productivity and sustainability.
          </p>

          <section style={{ marginBottom: 48 }}>
            <h2
              style={{
                fontSize: "1.75rem",
                fontWeight: "600",
                marginBottom: 16,
                color: colors.primaryForeground,
              }}
            >
              Our Mission
            </h2>
            <p
              style={{
                color: colors.mutedForeground,
                lineHeight: 1.6,
                fontSize: "1rem",
              }}
            >
              To revolutionize agriculture by providing farmers with cutting-edge technology and timely information that
              enhances crop yield, reduces risks, and improves livelihoods. We strive to bridge the gap between farmers and
              modern agricultural knowledge.
            </p>
          </section>

          <section style={{ marginBottom: 48 }}>
            <h2
              style={{
                fontSize: "1.75rem",
                fontWeight: "600",
                marginBottom: 16,
                color: colors.primaryForeground,
              }}
            >
              What We Offer
            </h2>
            <ul
              style={{
                color: colors.mutedForeground,
                lineHeight: 1.6,
                fontSize: "1rem",
                listStyleType: "disc",
                paddingLeft: 20,
              }}
            >
              <li>Real-time weather forecasts tailored to your location.</li>
              <li>AI-powered crop recommendations based on soil and climate.</li>
              <li>Market price updates to help you sell at the best rates.</li>
              <li>Practical tips to maintain and improve soil health.</li>
              <li>Information on government schemes and subsidies for farmers.</li>
              <li>24/7 AI assistant to answer your farming questions instantly.</li>
            </ul>
          </section>

          {/* Our Team Section */}
          <section>
            <h2
              style={{
                fontSize: "1.75rem",
                fontWeight: "600",
                marginBottom: 24,
                color: colors.primaryForeground,
              }}
            >
              Our Team
            </h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                gap: 24,
              }}
            >
              {team.map(({ name, role }, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: 24,
                    borderRadius: 12,
                    border: `1.5px solid ${colors.border}`,
                    backgroundColor: colors.greenLight,
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  }}
                >
                  <div
                    style={{
                      width: 64,
                      height: 64,
                      borderRadius: "50%",
                      backgroundColor: colors.greenLight,
                      marginBottom: 16,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 24,
                      fontWeight: "700",
                      color: colors.greenDark,
                      userSelect: "none",
                    }}
                    aria-hidden="true"
                  >
                    {name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <h3
                    style={{
                      fontSize: "1.125rem",
                      fontWeight: "600",
                      marginBottom: 8,
                      color: colors.primaryForeground,
                    }}
                  >
                    {name}
                  </h3>
                  <p style={{ fontSize: "0.9rem", color: colors.mutedForeground }}>{role}</p>
                </div>
              ))}
            </div>
          </section>
        </section>
      </main>
    </LanguageProvider>
  )
}
