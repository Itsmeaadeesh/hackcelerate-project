"use client"

import { useEffect, useContext, createContext, ReactNode, useState } from "react"

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
      </div>
    </nav>
  )
}

// ------------ Contact Page Component ------------
export default function Contact() {
  // For form state (basic example)
  const [formData, setFormData] = useState({ name: "", email: "", message: "" })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // For now, just simulate submission success
    setSubmitted(true)
  }

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
        background-color: #2E8B57; /* matched improved color */
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

      /* Contact form styles */
      form {
        display: flex;
        flex-direction: column;
        gap: 1.25rem;
      }
      label {
        font-weight: 600;
        color: #196F3D;
      }
      input, textarea {
        padding: 0.75rem 1rem;
        border: 2px solid #196F3D;
        border-radius: 8px;
        font-size: 1rem;
        font-family: inherit;
        resize: vertical;
      }
      input:focus, textarea:focus {
        outline: none;
        border-color: #2E8B57;
        box-shadow: 0 0 5px #2E8B57;
      }
      button {
        background-color: #196F3D;
        color: white;
        padding: 0.75rem 1.5rem;
        border: none;
        border-radius: 8px;
        font-size: 1.1rem;
        font-weight: 700;
        cursor: pointer;
        transition: background-color 0.3s ease;
        align-self: flex-start;
      }
      button:hover,
      button:focus {
        background-color: #2E8B57;
        outline: none;
      }
      .success-message {
        color: #0B610B;
        font-weight: 600;
        margin-top: 1rem;
      }
    `
    document.head.appendChild(style)
    return () => document.head.removeChild(style)
  }, [])

  const particles = ["🌿", "🌱", "☀️", "💧", "🍃", "🌾"]

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

        {/* Content box */}
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
            Contact HariBhari
          </h1>

          <p
            style={{
              fontSize: "1.125rem",
              marginBottom: 32,
              lineHeight: 1.6,
              color: colors.mutedForeground,
            }}
          >
            Have questions or want to get in touch? Fill out the form below and our team will get back to you as soon as possible.
          </p>

          <form onSubmit={handleSubmit} noValidate>
            <label htmlFor="name">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="Your full name"
              aria-required="true"
            />

            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              aria-required="true"
            />

            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              rows={5}
              required
              value={formData.message}
              onChange={handleChange}
              placeholder="Write your message here..."
              aria-required="true"
            />

            <button type="submit">Send Message</button>

            {submitted && (
              <p className="success-message" role="alert">
                Thank you for contacting us! We will respond shortly.
              </p>
            )}
          </form>
        </section>
      </main>
    </LanguageProvider>
  )
}
