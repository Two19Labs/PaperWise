"use client";

import Link from "next/link";
import { BookOpen, ArrowRight, CheckCircle, BarChart3, Filter, Award, Sparkles } from "lucide-react";

export default function LandingPage() {
  return (
    <div style={{
      minHeight: "100vh",
      background: "#070913",
      color: "#f8fafc",
      fontFamily: "var(--font-inter)",
      display: "flex",
      flexDirection: "column",
      position: "relative",
      overflowX: "hidden"
    }}>
      {/* Decorative Glow Elements */}
      <div style={{
        position: "absolute",
        top: "-100px",
        left: "50%",
        transform: "translateX(-50%)",
        width: "600px",
        height: "300px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%)",
        filter: "blur(60px)",
        pointerEvents: "none"
      }} />

      {/* Navbar Header */}
      <header style={{
        height: "80px",
        borderBottom: "1px solid rgba(255, 255, 255, 0.04)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 40px",
        position: "relative",
        zIndex: 10
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <BookOpen size={24} style={{ color: "#3b82f6" }} />
          <span style={{ fontSize: "1.3rem", fontWeight: "800", letterSpacing: "-0.02em" }}>
            Paper<span style={{ color: "#3b82f6" }}>Wise</span>
          </span>
        </div>

        <nav style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <Link href="/auth/login" style={{
            color: "#94a3b8",
            fontSize: "0.95rem",
            fontWeight: "500",
            textDecoration: "none",
            transition: "color 0.2s"
          }}>
            Sign In
          </Link>
          <Link href="/auth/signup" className="btn btn-primary" style={{ padding: "8px 16px" }}>
            Sign Up Free
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <main style={{ flex: 1, position: "relative", zIndex: 5 }}>
        <section style={{
          padding: "100px 20px 80px",
          textAlign: "center",
          maxWidth: "800px",
          margin: "0 auto"
        }}>
          {/* Tagline */}
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            background: "rgba(59, 130, 246, 0.1)",
            border: "1px solid rgba(59, 130, 246, 0.2)",
            color: "#60a5fa",
            padding: "6px 14px",
            borderRadius: "9999px",
            fontSize: "0.8rem",
            fontWeight: "600",
            marginBottom: "28px"
          }}>
            <Sparkles size={14} /> Built for Delhi University Semester Exams
          </div>

          {/* Heading */}
          <h1 style={{
            fontSize: "3.5rem",
            fontWeight: "800",
            lineHeight: "1.15",
            letterSpacing: "-0.03em",
            marginBottom: "24px"
          }}>
            Ace Your DU Exams with{" "}
            <span style={{
              background: "linear-gradient(135deg, #3b82f6 0%, #14b8a6 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent"
            }}>Smart PYQ Analysis</span>
          </h1>

          {/* Subtitle */}
          <p style={{
            fontSize: "1.15rem",
            color: "#94a3b8",
            lineHeight: "1.6",
            marginBottom: "40px",
            maxWidth: "680px",
            margin: "0 auto 40px"
          }}>
            Stop digging through messy PDF scans. Filter past year questions by topic, track your coverage, and access step-by-step solutions instantly.
          </p>

          {/* CTA Buttons */}
          <div style={{ display: "flex", justifyContent: "center", gap: "16px", flexWrap: "wrap" }}>
            <Link href="/auth/signup" className="btn btn-primary" style={{ padding: "14px 28px", fontSize: "1rem" }}>
              Start Analyzing Now <ArrowRight size={18} />
            </Link>
            <Link href="/auth/login" className="btn btn-secondary" style={{ padding: "14px 28px", fontSize: "1rem" }}>
              Explore Demo Dashboard
            </Link>
          </div>
        </section>

        {/* Stats Row */}
        <section style={{
          borderTop: "1px solid rgba(255, 255, 255, 0.04)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.04)",
          background: "rgba(255, 255, 255, 0.01)",
          padding: "32px 20px"
        }}>
          <div style={{
            maxWidth: "1000px",
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-around",
            flexWrap: "wrap",
            gap: "24px",
            textAlign: "center"
          }}>
            <div>
              <div style={{ fontSize: "2rem", fontWeight: "800", color: "#f8fafc" }}>5,000+</div>
              <div style={{ fontSize: "0.85rem", color: "#64748b", marginTop: "4px", fontWeight: "500" }}>INDEXED QUESTIONS</div>
            </div>
            <div>
              <div style={{ fontSize: "2rem", fontWeight: "800", color: "#f8fafc" }}>80+</div>
              <div style={{ fontSize: "0.85rem", color: "#64748b", marginTop: "4px", fontWeight: "500" }}>DU COLLEGES</div>
            </div>
            <div>
              <div style={{ fontSize: "2rem", fontWeight: "800", color: "#f8fafc" }}>50+</div>
              <div style={{ fontSize: "0.85rem", color: "#64748b", marginTop: "4px", fontWeight: "500" }}>COURSES COVERED</div>
            </div>
            <div>
              <div style={{ fontSize: "2rem", fontWeight: "800", color: "#10b981" }}>100%</div>
              <div style={{ fontSize: "0.85rem", color: "#64748b", marginTop: "4px", fontWeight: "500" }}>FREE FOR STUDENTS</div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section style={{ padding: "100px 20px", maxWidth: "1000px", margin: "0 auto" }}>
          <h2 style={{
            fontSize: "2rem",
            fontWeight: "800",
            textAlign: "center",
            marginBottom: "56px"
          }}>
            A Better Way to Study DU Past Papers
          </h2>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "32px"
          }}>
            {/* Feature 1 */}
            <div className="glass-panel" style={{ padding: "32px" }}>
              <div style={{
                width: "48px",
                height: "48px",
                borderRadius: "12px",
                background: "rgba(59, 130, 246, 0.1)",
                color: "#3b82f6",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "20px"
              }}>
                <Filter size={22} />
              </div>
              <h3 style={{ fontSize: "1.2rem", fontWeight: "700", marginBottom: "12px" }}>Topic-Level Filters</h3>
              <p style={{ color: "#94a3b8", fontSize: "0.9rem", lineHeight: "1.6" }}>
                Filter questions by subject, year, unit, topic, or subtopic. Pinpoint exactly what you need to revise in minutes.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="glass-panel" style={{ padding: "32px" }}>
              <div style={{
                width: "48px",
                height: "48px",
                borderRadius: "12px",
                background: "rgba(16, 185, 129, 0.1)",
                color: "#10b981",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "20px"
              }}>
                <CheckCircle size={22} />
              </div>
              <h3 style={{ fontSize: "1.2rem", fontWeight: "700", marginBottom: "12px" }}>Progress Ticks</h3>
              <p style={{ color: "#94a3b8", fontSize: "0.9rem", lineHeight: "1.6" }}>
                Check off questions as you solve them. Watch your syllabus coverage percentage increase and stay motivated.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="glass-panel" style={{ padding: "32px" }}>
              <div style={{
                width: "48px",
                height: "48px",
                borderRadius: "12px",
                background: "rgba(20, 184, 166, 0.1)",
                color: "#14b8a6",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "20px"
              }}>
                <BarChart3 size={22} />
              </div>
              <h3 style={{ fontSize: "1.2rem", fontWeight: "700", marginBottom: "12px" }}>Topic Heatmaps</h3>
              <p style={{ color: "#94a3b8", fontSize: "0.9rem", lineHeight: "1.6" }}>
                Analyze year-wise repeating trends. Identify high-weightage &quot;Hot Topics&quot; that DU examiners love to ask.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer style={{
        padding: "40px",
        borderTop: "1px solid rgba(255, 255, 255, 0.04)",
        textAlign: "center",
        fontSize: "0.85rem",
        color: "#64748b",
        position: "relative",
        zIndex: 10
      }}>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
          <BookOpen size={18} style={{ color: "#3b82f6" }} />
          <span style={{ fontWeight: "700", color: "#f8fafc" }}>PaperWise</span>
        </div>
        <p>© 2026 PaperWise. Tailored for Delhi University (DU) CBCS & NEP-UGCF curricula.</p>
        <p style={{ marginTop: "6px" }}>Crafted with passion for smart learning.</p>
      </footer>
    </div>
  );
}
