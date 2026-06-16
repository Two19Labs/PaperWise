"use client";

import Link from "next/link";
import { BookOpen, ArrowRight, CheckCircle, BarChart3, Filter, Sparkles } from "lucide-react";

export default function LandingPage() {
  return (
    <div style={{
      minHeight: "100vh",
      background: "#f9fafb",
      color: "#0f172a",
      fontFamily: "var(--font-inter)",
      display: "flex",
      flexDirection: "column",
    }}>
      {/* Header */}
      <header style={{
        height: "64px",
        background: "#ffffff",
        borderBottom: "1px solid #e2e8f0",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 24px",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <BookOpen size={20} style={{ color: "#f58340" }} />
          <span style={{ fontSize: "1rem", fontWeight: "800", letterSpacing: "-0.01em" }}>
            Paper<span style={{ color: "#f58340" }}>Wise</span>
          </span>
        </div>

        <nav style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <Link href="/auth/login" style={{
            color: "#475569",
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
            background: "#fff7ed",
            border: "1px solid rgba(245, 131, 64, 0.25)",
            color: "#ea580c",
            padding: "4px 10px",
            borderRadius: "4px",
            fontSize: "0.75rem",
            fontWeight: "700",
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
            color: "#0f172a"
          }}>
            Ace Your SSCBS Semester Exams with Smart PYQ Analysis
          </h1>

          <p style={{
            fontSize: "0.95rem",
            color: "#475569",
            lineHeight: "1.55",
            marginBottom: "32px",
            maxWidth: "540px",
            margin: "0 auto 32px"
          }}>
            Stop digging through messy PDF dumps. Filter past papers by topic, check off solved questions, earn reward oranges, and access detailed step-by-step guides.
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
          borderTop: "1px solid #e2e8f0",
          borderBottom: "1px solid #e2e8f0",
          background: "#ffffff",
          padding: "24px 20px",
          marginBottom: "64px",
          boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.02)"
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
              <div style={{ fontSize: "1.5rem", fontWeight: "800", color: "#0f172a" }}>SSCBS</div>
              <div style={{ fontSize: "0.7rem", color: "#64748b", marginTop: "2px", fontWeight: "700" }}>EXCLUSIVELY TUNED</div>
            </div>
            <div>
              <div style={{ fontSize: "1.5rem", fontWeight: "800", color: "#0f172a" }}>BMS, BBA, B.Sc.</div>
              <div style={{ fontSize: "0.7rem", color: "#64748b", marginTop: "2px", fontWeight: "700" }}>SUPPORTED COURSES</div>
            </div>
            <div>
              <div style={{ fontSize: "1.5rem", fontWeight: "800", color: "#0f172a" }}>UGCF NEP</div>
              <div style={{ fontSize: "0.7rem", color: "#64748b", marginTop: "2px", fontWeight: "700" }}>SYLLABUS COMPLIANT</div>
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
            <div className="glass-panel" style={{ padding: "20px", background: "#ffffff" }}>
              <div style={{
                width: "36px",
                height: "36px",
                borderRadius: "6px",
                background: "#fff7ed",
                border: "1px solid rgba(245, 131, 64, 0.2)",
                color: "#f58340",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "16px"
              }}>
                <Filter size={18} />
              </div>
              <h3 style={{ fontSize: "0.95rem", fontWeight: "700", marginBottom: "8px", color: "#0f172a" }}>Granular Filters</h3>
              <p style={{ color: "#475569", fontSize: "0.8rem", lineHeight: "1.5" }}>
                Filter questions by subject, year, topic, or difficulty. Find what you need in seconds.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="glass-panel" style={{ padding: "20px", background: "#ffffff" }}>
              <div style={{
                width: "36px",
                height: "36px",
                borderRadius: "6px",
                background: "#fff7ed",
                border: "1px solid rgba(245, 131, 64, 0.2)",
                color: "#f58340",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "16px"
              }}>
                <CheckCircle size={18} />
              </div>
              <h3 style={{ fontSize: "0.95rem", fontWeight: "700", marginBottom: "8px", color: "#0f172a" }}>Track Coverage</h3>
              <p style={{ color: "#475569", fontSize: "0.8rem", lineHeight: "1.5" }}>
                Check off solved questions, earn oranges, and watch your progress metrics rise in real-time.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="glass-panel" style={{ padding: "20px", background: "#ffffff" }}>
              <div style={{
                width: "36px",
                height: "36px",
                borderRadius: "6px",
                background: "#fff7ed",
                border: "1px solid rgba(245, 131, 64, 0.2)",
                color: "#f58340",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "16px"
              }}>
                <BarChart3 size={18} />
              </div>
              <h3 style={{ fontSize: "0.95rem", fontWeight: "700", marginBottom: "8px", color: "#0f172a" }}>Detailed Solutions</h3>
              <p style={{ color: "#475569", fontSize: "0.8rem", lineHeight: "1.5" }}>
                Every question card contains a toggleable, structured explanation to speed up your learning.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer style={{
        padding: "32px",
        borderTop: "1px solid #e2e8f0",
        background: "#ffffff",
        textAlign: "center",
        fontSize: "0.75rem",
        color: "#64748b"
      }}>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "6px", marginBottom: "12px" }}>
          <BookOpen size={14} style={{ color: "#f58340" }} />
          <span style={{ fontWeight: "700", color: "#0f172a" }}>PaperWise</span>
        </div>
        <p>© 2026 PaperWise. Tailored for Shaheed Sukhdev College of Business Studies.</p>
      </footer>
    </div>
  );
}
