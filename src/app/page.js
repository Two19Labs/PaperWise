import Link from "next/link";
import { 
  Sparkles, 
  ArrowRight, 
  BookOpen, 
  Filter, 
  CheckCircle, 
  BarChart3, 
  LayoutDashboard,
  Check,
  Lock,
  ChevronRight
} from "lucide-react";

export default function LandingPage() {
  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      background: "#ffffff",
      fontFamily: "var(--font-inter)",
      position: "relative",
      overflow: "hidden"
    }}>
      {/* Technical Blueprint Dot Grid Overlay */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: "radial-gradient(#9e2a2b 1.2px, transparent 1.2px)",
        backgroundSize: "28px 28px",
        opacity: 0.045,
        zIndex: 0,
        pointerEvents: "none"
      }} />

      {/* Decorative handcrafted brick line grids */}
      <div style={{
        position: "absolute",
        top: 0,
        left: "5%",
        width: "1px",
        height: "100%",
        background: "linear-gradient(180deg, rgba(158, 42, 43, 0.08) 0%, rgba(158, 42, 43, 0) 100%)",
        zIndex: 0,
        pointerEvents: "none"
      }} />
      <div style={{
        position: "absolute",
        top: 0,
        right: "5%",
        width: "1px",
        height: "100%",
        background: "linear-gradient(180deg, rgba(158, 42, 43, 0.08) 0%, rgba(158, 42, 43, 0) 100%)",
        zIndex: 0,
        pointerEvents: "none"
      }} />

      {/* Header */}
      <header style={{
        height: "64px",
        borderBottom: "1px solid rgba(15, 23, 42, 0.06)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 24px",
        background: "rgba(255, 255, 255, 0.8)",
        backdropFilter: "blur(8px)",
        zIndex: 10,
        position: "relative"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "28px",
            height: "28px",
            borderRadius: "6px",
            background: "#fdf2f2",
            border: "1px solid rgba(158, 42, 43, 0.2)",
          }}>
            <BookOpen size={15} style={{ color: "#9e2a2b" }} />
          </div>
          <span style={{ fontSize: "0.95rem", fontWeight: "800", letterSpacing: "-0.015em", fontFamily: "var(--font-outfit)", color: "#0f172a" }}>
            Paper<span style={{ color: "#9e2a2b" }}>Wise</span>
          </span>
        </div>

        <nav style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <Link href="/auth/login" style={{
            color: "#475569",
            fontSize: "0.85rem",
            fontWeight: "600",
            textDecoration: "none",
            transition: "color 0.2s"
          }}>
            Sign In
          </Link>
          <Link href="/auth/signup" className="btn" style={{ 
            padding: "8px 14px", 
            fontSize: "0.8rem", 
            background: "#9e2a2b",
            color: "#ffffff",
            fontWeight: "600",
            borderRadius: "6px",
            border: "none",
            boxShadow: "0 2px 4px rgba(158, 42, 43, 0.1)"
          }}>
            Sign Up Free
          </Link>
        </nav>
      </header>

      {/* Main Container */}
      <main style={{ flex: 1, padding: "80px 24px 64px", zIndex: 5, position: "relative" }}>
        {/* Hero Area */}
        <section style={{
          textAlign: "center",
          maxWidth: "840px",
          margin: "0 auto 80px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }} className="fade-in-up">
          {/* Badge */}
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            background: "#fdf2f2",
            border: "1px solid rgba(158, 42, 43, 0.22)",
            color: "#9e2a2b",
            padding: "5px 12px",
            borderRadius: "20px",
            fontSize: "0.75rem",
            fontWeight: "700",
            marginBottom: "24px",
            letterSpacing: "0.02em"
          }}>
            <Sparkles size={12} /> Supporting UGCF NEP 2022 Regulations
          </div>

          <h1 style={{
            fontSize: "3.2rem",
            fontWeight: "850",
            lineHeight: "1.15",
            letterSpacing: "-0.03em",
            marginBottom: "20px",
            color: "#0f172a",
            fontFamily: "var(--font-outfit)",
            maxWidth: "780px"
          }}>
            Ace Your Delhi University Semester Exams with Smart PYQ Analysis
          </h1>

          <p style={{
            fontSize: "1rem",
            color: "#475569",
            lineHeight: "1.6",
            marginBottom: "36px",
            maxWidth: "580px",
          }}>
            Stop digging through messy PDF dumps. Filter past papers by topic, check off solved questions, and access detailed step-by-step solutions tailored to Delhi University syllabi.
          </p>

          <div style={{ display: "flex", justifyContent: "center", gap: "16px", flexWrap: "wrap", marginBottom: "64px" }}>
            <Link href="/auth/signup" className="btn" style={{ 
              padding: "12px 24px", 
              background: "#9e2a2b",
              color: "#ffffff",
              fontWeight: "600",
              fontSize: "0.9rem",
              borderRadius: "6px",
              boxShadow: "0 4px 6px rgba(158, 42, 43, 0.15)",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              border: "none"
            }}>
              Get Started Free <ArrowRight size={16} />
            </Link>
            <Link href="/auth/login" className="btn" style={{ 
              padding: "12px 24px", 
              background: "#ffffff",
              color: "#475569",
              border: "1px solid #cbd5e1",
              fontWeight: "600",
              fontSize: "0.9rem",
              borderRadius: "6px"
            }}>
              Explore Demo
            </Link>
          </div>

          {/* Interactive Mockup (Handcrafted Product Preview) */}
          <div style={{
            width: "100%",
            maxWidth: "760px",
            background: "#ffffff",
            border: "1px solid #e2e8f0",
            borderRadius: "12px",
            boxShadow: "0 25px 50px -12px rgba(158, 42, 43, 0.08), 0 8px 20px -6px rgba(0, 0, 0, 0.04)",
            overflow: "hidden",
            textAlign: "left",
            position: "relative"
          }}>
            {/* Mock Header */}
            <div style={{
              background: "#f8fafc",
              borderBottom: "1px solid #e2e8f0",
              padding: "12px 18px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between"
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#ef4444" }} />
                <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#f59e0b" }} />
                <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#10b981" }} />
                <div style={{
                  marginLeft: "12px",
                  background: "#ffffff",
                  border: "1px solid #e2e8f0",
                  borderRadius: "4px",
                  fontSize: "0.65rem",
                  color: "#64748b",
                  padding: "2px 24px 2px 8px",
                  width: "190px",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  fontFamily: "var(--font-inter)"
                }}>
                  paperwise.app/dashboard
                </div>
              </div>
              <span className="badge badge-orange" style={{ fontWeight: "700", fontSize: "0.6rem" }}>
                DEMO WORKSPACE
              </span>
            </div>

            {/* Mock Workspace Panel */}
            <div style={{ display: "flex", flexWrap: "wrap", minHeight: "300px" }}>
              {/* Sidebar Mock */}
              <div style={{
                width: "160px",
                borderRight: "1px solid #e2e8f0",
                padding: "16px 12px",
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                background: "#fcfdfd"
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "4px" }}>
                  <span style={{ fontSize: "0.58rem", fontWeight: "700", color: "#94a3b8", letterSpacing: "0.05em" }}>
                    DU ACADEMIC PORTAL
                  </span>
                </div>
                <div style={{ 
                  fontSize: "0.75rem", 
                  fontWeight: "700", 
                  color: "#7f1d1d", 
                  background: "#fdf2f2", 
                  padding: "8px 10px", 
                  borderRadius: "6px", 
                  display: "flex", 
                  alignItems: "center", 
                  gap: "8px" 
                }}>
                  <LayoutDashboard size={12} style={{ color: "#9e2a2b" }} /> Overview
                </div>
                <div style={{ 
                  fontSize: "0.75rem", 
                  fontWeight: "500", 
                  color: "#475569", 
                  padding: "8px 10px", 
                  display: "flex", 
                  alignItems: "center", 
                  gap: "8px" 
                }}>
                  <BarChart3 size={12} /> PYQ Analyzer
                </div>
              </div>

              {/* Workspace Main Mock */}
              <div style={{ flex: 1, padding: "20px", display: "flex", flexDirection: "column", gap: "16px", minWidth: "280px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <h3 style={{ fontSize: "0.9rem", fontWeight: "750", color: "#0f172a" }}>Welcome back, Student! 👋</h3>
                    <p style={{ fontSize: "0.68rem", color: "#64748b", marginTop: "2px" }}>Your syllabus coverage tracker</p>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "2px" }}>
                    <span style={{ fontSize: "0.85rem", fontWeight: "850", color: "#9e2a2b" }}>68%</span>
                    <span style={{ fontSize: "0.58rem", color: "#64748b", fontWeight: "600" }}>TOTAL PROGRESS</span>
                  </div>
                </div>

                {/* Progress bar mock */}
                <div style={{ height: "6px", background: "#f1f5f9", borderRadius: "3px", overflow: "hidden", border: "1px solid #e2e8f0" }}>
                  <div style={{ width: "68%", height: "100%", background: "linear-gradient(90deg, #9e2a2b 0%, #7f1d1d 100%)", borderRadius: "3px" }} />
                </div>

                {/* Question List Mock */}
                <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "4px" }}>
                  <div style={{ fontSize: "0.68rem", color: "#94a3b8", fontWeight: "700", letterSpacing: "0.04em" }}>ACTIVE SEMESTER PYQS</div>
                  
                  {/* Q1 solved */}
                  <div style={{
                    border: "1px solid #e2e8f0",
                    borderRadius: "8px",
                    padding: "12px",
                    background: "#ffffff",
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "10px",
                    borderLeft: "3.5px solid #9e2a2b"
                  }}>
                    <div style={{
                      width: "14px",
                      height: "14px",
                      borderRadius: "3px",
                      background: "#fdf2f2",
                      border: "1px solid #9e2a2b",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#9e2a2b",
                      flexShrink: 0,
                      marginTop: "2px"
                    }}>
                      <Check size={10} strokeWidth={3} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: "0.75rem", lineHeight: "1.45", color: "#94a3b8", textDecoration: "line-through" }}>
                        Explain the properties of indifference curves with appropriate diagrams.
                      </p>
                      <div style={{ display: "flex", gap: "6px", marginTop: "6px" }}>
                        <span className="badge badge-orange" style={{ fontSize: "0.58rem", padding: "1px 4px" }}>2024</span>
                        <span className="badge" style={{ fontSize: "0.58rem", padding: "1px 4px" }}>Microeconomics</span>
                      </div>
                    </div>
                  </div>

                  {/* Q2 unsolved */}
                  <div style={{
                    border: "1px solid #e2e8f0",
                    borderRadius: "8px",
                    padding: "12px",
                    background: "#ffffff",
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "10px"
                  }}>
                    <div style={{
                      width: "14px",
                      height: "14px",
                      borderRadius: "3px",
                      border: "1px solid #cbd5e1",
                      flexShrink: 0,
                      marginTop: "2px"
                    }} />
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: "0.75rem", lineHeight: "1.45", color: "#334155" }}>
                        Distinguish between perfectly competitive and monopolistically competitive markets.
                      </p>
                      <div style={{ display: "flex", gap: "6px", marginTop: "6px" }}>
                        <span className="badge badge-orange" style={{ fontSize: "0.58rem", padding: "1px 4px" }}>2023</span>
                        <span className="badge" style={{ fontSize: "0.58rem", padding: "1px 4px" }}>Microeconomics</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Row */}
        <section style={{
          borderTop: "1px solid rgba(15, 23, 42, 0.08)",
          borderBottom: "1px solid rgba(15, 23, 42, 0.08)",
          background: "rgba(255, 255, 255, 0.7)",
          padding: "32px 24px",
          marginBottom: "80px",
        }}>
          <div style={{
            maxWidth: "860px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "24px",
            textAlign: "center"
          }}>
            <div>
              <div style={{ fontSize: "1.6rem", fontWeight: "850", color: "#9e2a2b", fontFamily: "var(--font-outfit)" }}>66 COLLEGES</div>
              <div style={{ fontSize: "0.68rem", color: "#64748b", marginTop: "4px", fontWeight: "700", letterSpacing: "0.04em" }}>FULL DELHI UNIVERSITY LIST</div>
            </div>
            <div>
              <div style={{ fontSize: "1.6rem", fontWeight: "850", color: "#0f172a", fontFamily: "var(--font-outfit)" }}>BMS, BBA, B.Sc, B.Com</div>
              <div style={{ fontSize: "0.68rem", color: "#64748b", marginTop: "4px", fontWeight: "700", letterSpacing: "0.04em" }}>ALL UNDERGRADUATE COURSES</div>
            </div>
            <div>
              <div style={{ fontSize: "1.6rem", fontWeight: "850", color: "#0f172a", fontFamily: "var(--font-outfit)" }}>UGCF NEP</div>
              <div style={{ fontSize: "0.68rem", color: "#64748b", marginTop: "4px", fontWeight: "700", letterSpacing: "0.04em" }}>REGULATION COMPLIANT</div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section style={{ maxWidth: "900px", margin: "0 auto 48px" }}>
          <h2 style={{
            textAlign: "center",
            fontSize: "1.6rem",
            fontWeight: "800",
            marginBottom: "40px",
            color: "#0f172a",
            fontFamily: "var(--font-outfit)",
            letterSpacing: "-0.02em"
          }}>
            Crafted for DU Students by DU Students
          </h2>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "24px"
          }}>
            {/* Feature 1 */}
            <div className="glass-panel" style={{ 
              padding: "24px", 
              background: "#ffffff", 
              borderRadius: "8px", 
              border: "1px solid #e2e8f0",
              transition: "transform 0.2s ease, border-color 0.2s ease"
            }}>
              <div style={{
                width: "40px",
                height: "40px",
                borderRadius: "8px",
                background: "#fdf2f2",
                border: "1px solid rgba(158, 42, 43, 0.25)",
                color: "#9e2a2b",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "20px"
              }}>
                <Filter size={20} />
              </div>
              <h3 style={{ fontSize: "1rem", fontWeight: "700", marginBottom: "10px", color: "#0f172a", fontFamily: "var(--font-outfit)" }}>Granular Filters</h3>
              <p style={{ color: "#475569", fontSize: "0.82rem", lineHeight: "1.55" }}>
                Filter questions by subject, year, topic, or difficulty. Find exactly what you need in seconds without wading through full PDFs.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="glass-panel" style={{ 
              padding: "24px", 
              background: "#ffffff", 
              borderRadius: "8px", 
              border: "1px solid #e2e8f0",
              transition: "transform 0.2s ease, border-color 0.2s ease"
            }}>
              <div style={{
                width: "40px",
                height: "40px",
                borderRadius: "8px",
                background: "#fdf2f2",
                border: "1px solid rgba(158, 42, 43, 0.25)",
                color: "#9e2a2b",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "20px"
              }}>
                <CheckCircle size={20} />
              </div>
              <h3 style={{ fontSize: "1rem", fontWeight: "700", marginBottom: "10px", color: "#0f172a", fontFamily: "var(--font-outfit)" }}>Track Coverage</h3>
              <p style={{ color: "#475569", fontSize: "0.82rem", lineHeight: "1.55" }}>
                Check off solved questions, watch your progress metrics rise in real-time, and make sure no syllabus block is left unreviewed.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="glass-panel" style={{ 
              padding: "24px", 
              background: "#ffffff", 
              borderRadius: "8px", 
              border: "1px solid #e2e8f0",
              transition: "transform 0.2s ease, border-color 0.2s ease"
            }}>
              <div style={{
                width: "40px",
                height: "40px",
                borderRadius: "8px",
                background: "#fdf2f2",
                border: "1px solid rgba(158, 42, 43, 0.25)",
                color: "#9e2a2b",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "20px"
              }}>
                <BarChart3 size={20} />
              </div>
              <h3 style={{ fontSize: "1rem", fontWeight: "700", marginBottom: "10px", color: "#0f172a", fontFamily: "var(--font-outfit)" }}>Detailed Solutions</h3>
              <p style={{ color: "#475569", fontSize: "0.82rem", lineHeight: "1.55" }}>
                Every question card contains a toggleable, structured explanation with equations and LaTeX math to speed up your learning.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer style={{
        padding: "48px 24px",
        borderTop: "1px solid rgba(15, 23, 42, 0.06)",
        background: "#ffffff",
        textAlign: "center",
        fontSize: "0.75rem",
        color: "#64748b",
        zIndex: 5,
        position: "relative"
      }}>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "6px", marginBottom: "16px" }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "24px",
            height: "24px",
            borderRadius: "5px",
            background: "#fdf2f2",
            border: "1px solid rgba(158, 42, 43, 0.15)",
          }}>
            <BookOpen size={12} style={{ color: "#9e2a2b" }} />
          </div>
          <span style={{ fontWeight: "800", color: "#0f172a", fontFamily: "var(--font-outfit)" }}>PaperWise</span>
        </div>
        <p style={{ marginBottom: "8px" }}>© 2026 PaperWise. Designed by SSCBS students for the entirety of Delhi University.</p>
        <p style={{ color: "#94a3b8", fontSize: "0.68rem" }}>Made with care • UGCF NEP 2022 Compliant</p>
      </footer>
    </div>
  );
}
