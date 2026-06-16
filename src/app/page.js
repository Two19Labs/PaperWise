"use client";

import Link from "next/link";
import { BookOpen, ArrowRight, CheckCircle, BarChart3, Filter, Sparkles } from "lucide-react";

export default function LandingPage() {
  return (
    <div style={{
      minHeight: "100vh",
      background: "#09090b",
      color: "#ffffff",
      fontFamily: "var(--font-inter)",
      display: "flex",
      flexDirection: "column",
    }}>
      {/* Header */}
      <header style={{
        height: "64px",
        borderBottom: "1px solid #27272a",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 24px",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <BookOpen size={20} style={{ color: "#ffffff" }} />
          <span style={{ fontSize: "1rem", fontWeight: "800", letterSpacing: "-0.01em" }}>
            Paper<span style={{ color: "#a1a1aa" }}>Wise</span>
          </span>
        </div>

        <nav style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <Link href="/auth/login" style={{
            color: "#a1a1aa",
            fontSize: "0.85rem",
            fontWeight: "500",
            textDecoration: "none",
          }}>
            Sign In
          </Link>
          <Link href="/auth/signup" className="btn btn-primary" style={{ padding: "6px 12px", fontSize: "0.8rem" }}>
            Sign Up Free
          </Link>
        </nav>
      </header>

      {/* Main Container */}
      <main style={{ flex: 1, padding: "80px 20px" }}>
        {/* Hero */}
        <section style={{
          textAlign: "center",
          maxWidth: "700px",
          margin: "0 auto 64px"
        }}>
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            background: "#121214",
            border: "1px solid #27272a",
            color: "#a1a1aa",
            padding: "4px 10px",
            borderRadius: "4px",
            fontSize: "0.75rem",
            fontWeight: "600",
            marginBottom: "20px"
          }}>
            <Sparkles size={12} /> Designed for SSCBS Students
          </div>

          <h1 style={{
            fontSize: "2.5rem",
            fontWeight: "800",
            lineHeight: "1.2",
            letterSpacing: "-0.02em",
            marginBottom: "16px",
            color: "#ffffff"
          }}>
            Ace Your Semester Exams with Smart PYQ Analysis
          </h1>

          <p style={{
            fontSize: "0.95rem",
            color: "#a1a1aa",
            lineHeight: "1.55",
            marginBottom: "32px",
            maxWidth: "540px",
            margin: "0 auto 32px"
          }}>
            Stop digging through messy PDF dumps. Filter past papers by topic, check off what you have revised, and access structured solution guides instantly.
          </p>

          <div style={{ display: "flex", justifyContent: "center", gap: "12px", flexWrap: "wrap" }}>
            <Link href="/auth/signup" className="btn btn-primary" style={{ padding: "10px 20px" }}>
              Get Started <ArrowRight size={14} />
            </Link>
            <Link href="/auth/login" className="btn btn-secondary" style={{ padding: "10px 20px" }}>
              Explore Demo
            </Link>
          </div>
        </section>

        {/* Stats */}
        <section style={{
          borderTop: "1px solid #27272a",
          borderBottom: "1px solid #27272a",
          background: "#121214",
          padding: "24px 20px",
          marginBottom: "64px"
        }}>
          <div style={{
            maxWidth: "800px",
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-around",
            flexWrap: "wrap",
            gap: "16px",
            textAlign: "center"
          }}>
            <div>
              <div style={{ fontSize: "1.5rem", fontWeight: "800", color: "#ffffff" }}>SSCBS</div>
              <div style={{ fontSize: "0.7rem", color: "#71717a", marginTop: "2px", fontWeight: "600" }}>EXCLUSIVELY TUNED</div>
            </div>
            <div>
              <div style={{ fontSize: "1.5rem", fontWeight: "800", color: "#ffffff" }}>BMS, BBA, B.Sc.</div>
              <div style={{ fontSize: "0.7rem", color: "#71717a", marginTop: "2px", fontWeight: "600" }}>SUPPORTED COURSES</div>
            </div>
            <div>
              <div style={{ fontSize: "1.5rem", fontWeight: "800", color: "#ffffff" }}>UGCF NEP</div>
              <div style={{ fontSize: "0.7rem", color: "#71717a", marginTop: "2px", fontWeight: "600" }}>SYLLABUS COMPLIANT</div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section style={{ maxWidth: "900px", margin: "0 auto" }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "20px"
          }}>
            {/* Feature 1 */}
            <div className="glass-panel" style={{ padding: "20px" }}>
              <div style={{
                width: "36px",
                height: "36px",
                borderRadius: "4px",
                background: "#09090b",
                border: "1px solid #27272a",
                color: "#ffffff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "16px"
              }}>
                <Filter size={18} />
              </div>
              <h3 style={{ fontSize: "0.95rem", fontWeight: "700", marginBottom: "8px" }}>Granular Filters</h3>
              <p style={{ color: "#a1a1aa", fontSize: "0.8rem", lineHeight: "1.5" }}>
                Filter questions by subject, year, topic, or difficulty. Find what you need in seconds.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="glass-panel" style={{ padding: "20px" }}>
              <div style={{
                width: "36px",
                height: "36px",
                borderRadius: "4px",
                background: "#09090b",
                border: "1px solid #27272a",
                color: "#ffffff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "16px"
              }}>
                <CheckCircle size={18} />
              </div>
              <h3 style={{ fontSize: "0.95rem", fontWeight: "700", marginBottom: "8px" }}>Track Coverage</h3>
              <p style={{ color: "#a1a1aa", fontSize: "0.8rem", lineHeight: "1.5" }}>
                Check off solved questions and watch your progress metrics rise in real-time.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="glass-panel" style={{ padding: "20px" }}>
              <div style={{
                width: "36px",
                height: "36px",
                borderRadius: "4px",
                background: "#09090b",
                border: "1px solid #27272a",
                color: "#ffffff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "16px"
              }}>
                <BarChart3 size={18} />
              </div>
              <h3 style={{ fontSize: "0.95rem", fontWeight: "700", marginBottom: "8px" }}>Solve Solutions</h3>
              <p style={{ color: "#a1a1aa", fontSize: "0.8rem", lineHeight: "1.5" }}>
                Every question card contains a toggleable, structured explanation to speed up your learning.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer style={{
        padding: "32px",
        borderTop: "1px solid #27272a",
        textAlign: "center",
        fontSize: "0.75rem",
        color: "#71717a"
      }}>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "6px", marginBottom: "12px" }}>
          <BookOpen size={14} style={{ color: "#ffffff" }} />
          <span style={{ fontWeight: "700", color: "#ffffff" }}>PaperWise</span>
        </div>
        <p>© 2026 PaperWise. Tailored for Shaheed Sukhdev College of Business Studies.</p>
      </footer>
    </div>
  );
}
