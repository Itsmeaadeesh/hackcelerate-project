"use client"

import { useEffect, useContext, createContext, ReactNode } from "react"

// ------------ Language Context Setup ------------
const LanguageContext = createContext(undefined)

function LanguageProvider({ children }: { children: ReactNode }) {
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
  return (
    <nav className="navbar" role="navigation" aria-label="Main navigation">
      <div className="logo" tabIndex={0}>
        HariBhari
      </div>
      <div className="nav-links">
        <a href="/" tabIndex={0} aria-current={lang === "en" ? "page" : undefined}>Home</a>
        <a href="/about" tabIndex={0} aria-current={lang === "en" ? "page" : undefined}>About</a>
        <a href="/contact" tabIndex={0} aria-current={lang === "en" ? "page" : undefined}>Contact</a>
        <a href="/privacy" tabIndex={0} aria-current={lang === "en" ? "page" : undefined}>Privacy</a>
      </div>
    </nav>
  )
}

// ------------ Privacy Page Component ------------
export default function Privacy() {
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
        background-color: #2E8B57;
        padding: 1rem 2rem;
        color: white;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
        position: sticky;
        top: 0;
        z-index: 1000;
      }
      .navbar .logo {
        font-weight: 700;
        font-size: 1.75rem;
        user-select: none;
        cursor: default;
        background-color: #196F3D;
        padding: 0.25rem 0.75rem;
        border-radius: 8px;
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
      }

      /* Content Styles */
      h1 {
        color: #0B610B;
        font-weight: 800;
        font-size: 2.5rem;
        margin-bottom: 1rem;
      }
      p {
        font-size: 1.125rem;
        line-height: 1.6;
        color: #555;
        margin-bottom: 1rem;
      }
      ul {
        margin-left: 1.25rem;
        margin-bottom: 1.5rem;
        color: #555;
      }
      li {
        margin-bottom: 0.5rem;
      }
    `
    document.head.appendChild(style)
    return () => document.head.removeChild(style)
  }, [])

  const particles = ["🌿", "🌱", "☀️", "💧", "🍃", "🌾"]

  return (
    <LanguageProvider>
      <Navbar />
      <main
        style={{
          position: "relative",
          fontFamily: "Arial, Helvetica, sans-serif",
          color: "#222",
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

        <article
          style={{
            padding: 40,
            borderRadius: 16,
            border: `2px solid #0B610B`,
            backgroundColor: "#F0FFF0",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          }}
        >
          <h1>Privacy Policy</h1>
          <p>
            At HariBhari, we value your privacy and are committed to protecting your personal information.
            This Privacy Policy explains how we collect, use, and safeguard your data when you use our services.
          </p>

          <h2>Information We Collect</h2>
          <ul>
            <li>Personal information you provide when contacting us (name, email, message).</li>
            <li>Usage data such as browser type, pages visited, and time spent on our website.</li>
            <li>Cookies and tracking technologies to improve your experience.</li>
          </ul>

          <h2>How We Use Your Information</h2>
          <ul>
            <li>To respond to your inquiries and provide customer support.</li>
            <li>To improve and personalize our website and services.</li>
            <li>To communicate important updates and promotional offers with your consent.</li>
          </ul>

          <h2>Data Security</h2>
          <p>
            We implement appropriate technical and organizational measures to protect your personal data
            from unauthorized access, alteration, disclosure, or destruction.
          </p>

          <h2>Your Rights</h2>
          <ul>
            <li>Access and update your personal information.</li>
            <li>Request deletion of your data.</li>
            <li>Withdraw consent at any time where processing is based on consent.</li>
          </ul>

          <h2>Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy or our data practices,
            please contact us through the <a href="/contact" style={{color: "#196F3D", textDecoration: "underline"}}>Contact page</a>.
          </p>
        </article>
      </main>
    </LanguageProvider>
  )
}
