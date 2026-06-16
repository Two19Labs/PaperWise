"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { 
  BookOpen, 
  LayoutDashboard, 
  BarChart3, 
  LogOut, 
  ChevronLeft, 
  ChevronRight,
  User,
  GraduationCap
} from "lucide-react";

export default function DashboardLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [user, setUser] = useState(null);
  const [oranges, setOranges] = useState(0);

  useEffect(() => {
    const storedUser = localStorage.getItem("paperwise_user");
    if (!storedUser) {
      router.push("/auth/login");
    } else {
      const parsed = JSON.parse(storedUser);
      setUser(parsed);
      // Award 10 oranges per completed question
      setOranges((parsed.completedQuestions || []).length * 10);
    }
  }, [router, pathname]); // Re-calculate oranges when pathname changes (user toggles questions)

  const handleLogout = () => {
    localStorage.removeItem("paperwise_user");
    router.push("/auth/login");
  };

  if (!user) {
    return (
      <div style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#f9fafb",
        color: "#64748b",
        fontSize: "0.85rem",
        fontFamily: "var(--font-inter)"
      }}>
        Loading...
      </div>
    );
  }

  const navItems = [
    { name: "Overview", path: "/dashboard", icon: LayoutDashboard },
    { name: "PYQ Analyzer", path: "/dashboard/analyzer", icon: BarChart3 },
  ];

  return (
    <div style={{
      display: "flex",
      minHeight: "100vh",
      background: "#f9fafb",
      fontFamily: "var(--font-inter)",
      color: "#0f172a"
    }}>
      {/* Sidebar */}
      <aside style={{
        width: isSidebarCollapsed ? "68px" : "240px",
        background: "#ffffff",
        borderRight: "1px solid #e2e8f0",
        display: "flex",
        flexDirection: "column",
        transition: "width 0.2s ease-in-out",
        position: "relative",
        zIndex: 10
      }}>
        {/* Sidebar Header */}
        <div style={{
          height: "64px",
          display: "flex",
          alignItems: "center",
          justifyContent: isSidebarCollapsed ? "center" : "space-between",
          padding: "0 20px",
          borderBottom: "1px solid #e2e8f0"
        }}>
          {!isSidebarCollapsed && (
            <Link href="/dashboard" style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              textDecoration: "none",
              color: "#0f172a"
            }}>
              <BookOpen size={18} style={{ color: "#f58340" }} />
              <span style={{ fontSize: "1rem", fontWeight: "800", letterSpacing: "-0.01em" }}>
                Paper<span style={{ color: "#f58340" }}>Wise</span>
              </span>
            </Link>
          )}
          {isSidebarCollapsed && (
            <BookOpen size={18} style={{ color: "#f58340" }} />
          )}

          <button
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            style={{
              position: "absolute",
              right: "-10px",
              top: "20px",
              width: "20px",
              height: "20px",
              borderRadius: "4px",
              background: "#ffffff",
              color: "#64748b",
              border: "1px solid #e2e8f0",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)"
            }}
          >
            {isSidebarCollapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
          </button>
        </div>

        {/* Profile Card */}
        {!isSidebarCollapsed && (
          <div style={{
            padding: "12px 14px",
            margin: "12px 12px 0",
            background: "#f9fafb",
            border: "1px solid #e2e8f0",
            borderRadius: "6px",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "2px" }}>
              <GraduationCap size={14} style={{ color: "#f58340" }} />
              <span style={{ fontSize: "0.65rem", fontWeight: "700", color: "#64748b", letterSpacing: "0.05em" }}>
                ACTIVE PROFILE
              </span>
            </div>
            <div style={{ fontSize: "0.75rem", fontWeight: "750", color: "#0f172a", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {user.courseName.includes("[") ? user.courseName.split("[")[1].replace("]", "") : user.courseName}
            </div>
            <div style={{ fontSize: "0.65rem", color: "#64748b", marginTop: "2px" }}>
              Semester {user.semester} • SSCBS
            </div>
          </div>
        )}

        {/* Navigation Items */}
        <nav style={{ flex: 1, padding: "20px 12px", display: "flex", flexDirection: "column", gap: "4px" }}>
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.path}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "10px 12px",
                  borderRadius: "6px",
                  color: isActive ? "#ea580c" : "#475569",
                  background: isActive ? "#fff7ed" : "transparent",
                  border: isActive ? "1px solid rgba(245, 131, 64, 0.15)" : "1px solid transparent",
                  textDecoration: "none",
                  fontWeight: isActive ? "650" : "500",
                  fontSize: "0.85rem",
                  transition: "all 0.1s ease",
                  justifyContent: isSidebarCollapsed ? "center" : "flex-start"
                }}
              >
                <Icon size={16} />
                {!isSidebarCollapsed && <span>{item.name}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div style={{
          padding: "16px 12px",
          borderTop: "1px solid #e2e8f0",
          display: "flex",
          flexDirection: "column",
          gap: "8px"
        }}>
          {!isSidebarCollapsed && (
            <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "2px 6px" }}>
              <div style={{
                width: "28px",
                height: "28px",
                borderRadius: "4px",
                background: "#f3f4f6",
                border: "1px solid #e2e8f0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#475569"
              }}>
                <User size={14} />
              </div>
              <div style={{ minWidth: 0, flex: 1 }}>
                <div style={{ fontSize: "0.8rem", fontWeight: "600", color: "#0f172a", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {user.name}
                </div>
                <div style={{ fontSize: "0.65rem", color: "#64748b", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {user.email}
                </div>
              </div>
            </div>
          )}

          <button
            onClick={handleLogout}
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: isSidebarCollapsed ? "center" : "flex-start",
              gap: "10px",
              padding: "8px 12px",
              borderRadius: "6px",
              background: "rgba(239, 68, 68, 0.05)",
              border: "1px solid rgba(239, 68, 68, 0.1)",
              color: "#ef4444",
              cursor: "pointer",
              fontSize: "0.8rem",
              fontWeight: "500",
              transition: "all 0.1s ease",
            }}
          >
            <LogOut size={14} />
            {!isSidebarCollapsed && <span>Log Out</span>}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        minWidth: 0,
        height: "100vh",
        overflowY: "auto"
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
          flexShrink: 0
        }}>
          <div>
            <h2 style={{ fontSize: "0.85rem", fontWeight: "700", color: "#475569", letterSpacing: "0.03em" }}>
              {pathname === "/dashboard" && "OVERVIEW"}
              {pathname === "/dashboard/analyzer" && "ANALYZER"}
              {pathname.includes("/dashboard/subject/") && "SUBJECT REVIEW"}
            </h2>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            {/* Gamification widget */}
            <span style={{
              fontSize: "0.75rem",
              fontWeight: "700",
              color: "#ea580c",
              background: "#fff7ed",
              border: "1px solid rgba(245, 131, 64, 0.25)",
              padding: "4px 10px",
              borderRadius: "6px",
              display: "flex",
              alignItems: "center",
              gap: "4px"
            }}>
              🍊 {oranges} Oranges
            </span>
            <span className="badge">
              Semester {user.semester}
            </span>
            <span className="badge">
              SSCBS
            </span>
          </div>
        </header>

        {/* Content body */}
        <main style={{ flex: 1, padding: "24px" }}>
          {children}
        </main>
      </div>
    </div>
  );
}
