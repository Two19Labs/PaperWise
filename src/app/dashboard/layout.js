"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { 
  BookOpen, 
  LayoutDashboard, 
  BarChart3, 
  Settings, 
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

  useEffect(() => {
    const storedUser = localStorage.getItem("paperwise_user");
    if (!storedUser) {
      router.push("/auth/login");
    } else {
      setUser(JSON.parse(storedUser));
    }
  }, [router]);

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
        background: "#070913",
        color: "#64748b",
        fontFamily: "var(--font-inter)"
      }}>
        Loading your space...
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
      background: "#070913",
      fontFamily: "var(--font-inter)",
      color: "#f8fafc"
    }}>
      {/* Sidebar */}
      <aside style={{
        width: isSidebarCollapsed ? "80px" : "260px",
        background: "#0a0e1c",
        borderRight: "1px solid rgba(255, 255, 255, 0.06)",
        display: "flex",
        flexDirection: "column",
        transition: "width 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        position: "relative",
        zIndex: 10
      }}>
        {/* Sidebar Header */}
        <div style={{
          height: "72px",
          display: "flex",
          alignItems: "center",
          justifyContent: isSidebarCollapsed ? "center" : "space-between",
          padding: "0 24px",
          borderBottom: "1px solid rgba(255, 255, 255, 0.04)"
        }}>
          {!isSidebarCollapsed && (
            <Link href="/dashboard" style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              textDecoration: "none",
              color: "#f8fafc"
            }}>
              <BookOpen size={22} style={{ color: "#3b82f6" }} />
              <span style={{ fontSize: "1.15rem", fontWeight: "700", letterSpacing: "-0.01em" }}>
                Paper<span style={{ color: "#3b82f6" }}>Wise</span>
              </span>
            </Link>
          )}
          {isSidebarCollapsed && (
            <BookOpen size={24} style={{ color: "#3b82f6" }} />
          )}

          {/* Collapse toggle button */}
          <button
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            style={{
              position: "absolute",
              right: "-12px",
              top: "24px",
              width: "24px",
              height: "24px",
              borderRadius: "50%",
              background: "#3b82f6",
              color: "#ffffff",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 10px rgba(59, 130, 246, 0.3)"
            }}
          >
            {isSidebarCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
          </button>
        </div>

        {/* Course Details (Simplified in sidebar) */}
        {!isSidebarCollapsed && (
          <div style={{
            padding: "16px 20px",
            margin: "16px 16px 0",
            background: "rgba(255, 255, 255, 0.02)",
            border: "1px solid rgba(255, 255, 255, 0.04)",
            borderRadius: "10px",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
              <GraduationCap size={16} style={{ color: "#14b8a6" }} />
              <span style={{ fontSize: "0.75rem", fontWeight: "600", color: "#14b8a6" }}>
                ACTIVE PROFILE
              </span>
            </div>
            <div style={{ fontSize: "0.85rem", fontWeight: "600", color: "#f8fafc", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {user.courseName}
            </div>
            <div style={{ fontSize: "0.75rem", color: "#94a3b8", marginTop: "2px" }}>
              Semester {user.semester} • {user.college}
            </div>
          </div>
        )}

        {/* Navigation Items */}
        <nav style={{ flex: 1, padding: "24px 16px", display: "flex", flexDirection: "column", gap: "6px" }}>
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
                  gap: "12px",
                  padding: "12px 16px",
                  borderRadius: "8px",
                  color: isActive ? "#3b82f6" : "#94a3b8",
                  background: isActive ? "rgba(59, 130, 246, 0.08)" : "transparent",
                  textDecoration: "none",
                  fontWeight: isActive ? "600" : "500",
                  fontSize: "0.95rem",
                  transition: "all 0.15s ease",
                  justifyContent: isSidebarCollapsed ? "center" : "flex-start"
                }}
              >
                <Icon size={20} />
                {!isSidebarCollapsed && <span>{item.name}</span>}
              </Link>
            );
          })}
        </nav>

        {/* User Footer */}
        <div style={{
          padding: "20px 16px",
          borderTop: "1px solid rgba(255, 255, 255, 0.04)",
          display: "flex",
          flexDirection: "column",
          gap: "8px"
        }}>
          {!isSidebarCollapsed && (
            <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "4px 8px" }}>
              <div style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                background: "rgba(255, 255, 255, 0.06)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#94a3b8"
              }}>
                <User size={16} />
              </div>
              <div style={{ minWidth: 0, flex: 1 }}>
                <div style={{ fontSize: "0.85rem", fontWeight: "600", color: "#f8fafc", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {user.name}
                </div>
                <div style={{ fontSize: "0.75rem", color: "#64748b", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
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
              gap: "12px",
              padding: "10px 16px",
              borderRadius: "8px",
              background: "rgba(244, 63, 94, 0.05)",
              border: "1px solid rgba(244, 63, 94, 0.1)",
              color: "#fb7185",
              cursor: "pointer",
              fontSize: "0.9rem",
              fontWeight: "500",
              transition: "all 0.15s ease",
            }}
          >
            <LogOut size={18} />
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
          height: "72px",
          background: "#080c18",
          borderBottom: "1px solid rgba(255, 255, 255, 0.04)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 32px",
          flexShrink: 0
        }}>
          <div>
            <h2 style={{ fontSize: "1.1rem", fontWeight: "600", color: "#f8fafc" }}>
              {pathname === "/dashboard" && "Dashboard Overview"}
              {pathname === "/dashboard/analyzer" && "PYQ Analyser Tool"}
              {pathname.includes("/dashboard/subject/") && "Subject Analytics & PYQs"}
            </h2>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <span style={{
              fontSize: "0.75rem",
              fontWeight: "600",
              color: "#60a5fa",
              background: "rgba(59, 130, 246, 0.1)",
              padding: "4px 10px",
              borderRadius: "12px",
              border: "1px solid rgba(59, 130, 246, 0.2)"
            }}>
              Semester {user.semester}
            </span>
            <span style={{
              fontSize: "0.75rem",
              fontWeight: "600",
              color: "#2dd4bf",
              background: "rgba(20, 184, 166, 0.1)",
              padding: "4px 10px",
              borderRadius: "12px",
              border: "1px solid rgba(20, 184, 166, 0.2)"
            }}>
              {user.college}
            </span>
          </div>
        </header>

        {/* Content body */}
        <main style={{ flex: 1, padding: "32px", position: "relative" }}>
          {children}
        </main>
      </div>
    </div>
  );
}
