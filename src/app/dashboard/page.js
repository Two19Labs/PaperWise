"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { courses } from "@/data/courses";
import { questions } from "@/data/questions";
import { BookOpen, CheckCircle, Award, Calendar, ChevronRight, Play } from "lucide-react";

export default function DashboardHome() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [completedList, setCompletedList] = useState([]);

  useEffect(() => {
    const storedUser = localStorage.getItem("paperwise_user");
    if (!storedUser) {
      router.push("/auth/login");
      return;
    }
    const parsed = JSON.parse(storedUser);
    setUser(parsed);
    setCompletedList(parsed.completedQuestions || []);
  }, [router]);

  if (!user) {
    return null;
  }

  // Find user's active course subjects
  const userCourse = courses.find(c => c.id === user.courseId) || courses[0];
  const activeSemester = user.semester || 1;
  const activeSubjects = userCourse.semesters[activeSemester] || [];

  // Compute stats
  // Get all question IDs belonging to the active semester's subjects
  const subjectIds = activeSubjects.map(sub => sub.id);
  const totalQuestions = questions.filter(q => subjectIds.includes(q.subjectId));
  
  // Find which of these are completed
  const completedInSemester = totalQuestions.filter(q => completedList.includes(q.id));
  const completionRate = totalQuestions.length > 0 
    ? Math.round((completedInSemester.length / totalQuestions.length) * 100) 
    : 0;

  // Calculate stats per subject
  const subjectsWithStats = activeSubjects.map(subject => {
    const subQuestions = questions.filter(q => q.subjectId === subject.id);
    const subCompleted = subQuestions.filter(q => completedList.includes(q.id));
    const subProgress = subQuestions.length > 0
      ? Math.round((subCompleted.length / subQuestions.length) * 100)
      : 0;
    return {
      ...subject,
      totalCount: subQuestions.length,
      completedCount: subCompleted.length,
      progress: subProgress
    };
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
      {/* Welcome Hero */}
      <div style={{
        padding: "32px",
        borderRadius: "16px",
        background: "linear-gradient(135deg, rgba(59, 130, 246, 0.08) 0%, rgba(20, 184, 166, 0.05) 100%)",
        border: "1px solid rgba(59, 130, 246, 0.15)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "24px"
      }}>
        <div>
          <h1 style={{ fontSize: "1.8rem", fontWeight: "700", marginBottom: "8px" }}>
            Welcome back, {user.name || "Scholar"}! 👋
          </h1>
          <p style={{ color: "#94a3b8", fontSize: "0.95rem", maxWidth: "600px" }}>
            You are currently analyzing the syllabus for **{user.courseName}** (Semester {user.semester}) at **{user.college}**. Let&apos;s finish some PYQs today!
          </p>
        </div>
        <Link href="/dashboard/analyzer" className="btn btn-primary" style={{ padding: "12px 24px" }}>
          Launch PYQ Analyzer <Play size={16} fill="white" />
        </Link>
      </div>

      {/* Stats Summary Cards */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: "20px"
      }}>
        {/* Stat 1 */}
        <div className="glass-panel" style={{ padding: "24px", display: "flex", alignItems: "center", gap: "20px" }}>
          <div style={{
            width: "48px",
            height: "48px",
            borderRadius: "12px",
            background: "rgba(59, 130, 246, 0.1)",
            border: "1px solid rgba(59, 130, 246, 0.2)",
            color: "#3b82f6",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}>
            <BookOpen size={22} />
          </div>
          <div>
            <div style={{ fontSize: "0.8rem", color: "#94a3b8", fontWeight: "500" }}>TOTAL PYQs</div>
            <div style={{ fontSize: "1.6rem", fontWeight: "700", marginTop: "4px" }}>
              {totalQuestions.length} Questions
            </div>
          </div>
        </div>

        {/* Stat 2 */}
        <div className="glass-panel" style={{ padding: "24px", display: "flex", alignItems: "center", gap: "20px" }}>
          <div style={{
            width: "48px",
            height: "48px",
            borderRadius: "12px",
            background: "rgba(16, 185, 129, 0.1)",
            border: "1px solid rgba(16, 185, 129, 0.2)",
            color: "#10b981",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}>
            <CheckCircle size={22} />
          </div>
          <div>
            <div style={{ fontSize: "0.8rem", color: "#94a3b8", fontWeight: "500" }}>COMPLETED</div>
            <div style={{ fontSize: "1.6rem", fontWeight: "700", marginTop: "4px" }}>
              {completedInSemester.length} / {totalQuestions.length}
            </div>
          </div>
        </div>

        {/* Stat 3 */}
        <div className="glass-panel" style={{ padding: "24px", display: "flex", alignItems: "center", gap: "20px" }}>
          <div style={{
            width: "48px",
            height: "48px",
            borderRadius: "12px",
            background: "rgba(20, 184, 166, 0.1)",
            border: "1px solid rgba(20, 184, 166, 0.2)",
            color: "#14b8a6",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}>
            <Award size={22} />
          </div>
          <div>
            <div style={{ fontSize: "0.8rem", color: "#94a3b8", fontWeight: "500" }}>COVERAGE</div>
            <div style={{ fontSize: "1.6rem", fontWeight: "700", marginTop: "4px" }}>
              {completionRate}%
            </div>
          </div>
        </div>

        {/* Stat 4 */}
        <div className="glass-panel" style={{ padding: "24px", display: "flex", alignItems: "center", gap: "20px" }}>
          <div style={{
            width: "48px",
            height: "48px",
            borderRadius: "12px",
            background: "rgba(245, 158, 11, 0.1)",
            border: "1px solid rgba(245, 158, 11, 0.2)",
            color: "#f59e0b",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}>
            <Calendar size={22} />
          </div>
          <div>
            <div style={{ fontSize: "0.8rem", color: "#94a3b8", fontWeight: "500" }}>DAYS LEFT</div>
            <div style={{ fontSize: "1.6rem", fontWeight: "700", marginTop: "4px" }}>
              45 Days
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Subjects & Activity */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "2fr 1fr",
        gap: "32px",
        alignItems: "start"
      }}>
        {/* Left Side: Subjects */}
        <div>
          <h3 style={{ fontSize: "1.2rem", fontWeight: "600", marginBottom: "20px" }}>
            Your Semester Subjects
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {subjectsWithStats.map((subject) => (
              <div 
                key={subject.id} 
                className="glass-panel animate-fade-in" 
                style={{ 
                  padding: "24px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px"
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div>
                    <span className="badge badge-blue" style={{ marginBottom: "6px" }}>
                      {subject.code}
                    </span>
                    <h4 style={{ fontSize: "1.1rem", fontWeight: "600" }}>{subject.name}</h4>
                    <p style={{ color: "#64748b", fontSize: "0.8rem", marginTop: "4px" }}>
                      Category: {subject.type} • Syllabus: NEP UGCF
                    </p>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: "0.85rem", color: "#94a3b8" }}>
                      {subject.completedCount} / {subject.totalCount} PYQs Done
                    </div>
                    <div style={{ fontSize: "1.2rem", fontWeight: "700", color: "#3b82f6", marginTop: "4px" }}>
                      {subject.progress}%
                    </div>
                  </div>
                </div>

                {/* Progress bar */}
                <div style={{
                  height: "8px",
                  background: "rgba(255, 255, 255, 0.05)",
                  borderRadius: "4px",
                  overflow: "hidden",
                  width: "100%"
                }}>
                  <div style={{
                    width: `${subject.progress}%`,
                    height: "100%",
                    background: "linear-gradient(90deg, #3b82f6, #14b8a6)",
                    borderRadius: "4px",
                    transition: "width 0.4s ease"
                  }} />
                </div>

                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingTop: "8px"
                }}>
                  <span style={{ fontSize: "0.8rem", color: "#64748b" }}>
                    Years Indexed: 2022 - 2024
                  </span>
                  <Link 
                    href={`/dashboard/subject/${subject.id}`} 
                    style={{
                      fontSize: "0.85rem",
                      fontWeight: "600",
                      color: "#3b82f6",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                      textDecoration: "none"
                    }}
                  >
                    View Details <ChevronRight size={16} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Recent Activity & Tips */}
        <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
          {/* Recent Activity */}
          <div className="glass-panel" style={{ padding: "24px" }}>
            <h3 style={{ fontSize: "1.05rem", fontWeight: "600", marginBottom: "16px" }}>
              Recent Progress
            </h3>
            
            {completedInSemester.length > 0 ? (
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {completedInSemester.slice(0, 3).map((item) => (
                  <div key={item.id} style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "12px",
                    paddingBottom: "12px",
                    borderBottom: "1px solid rgba(255, 255, 255, 0.04)"
                  }}>
                    <div style={{
                      marginTop: "2px",
                      width: "16px",
                      height: "16px",
                      borderRadius: "50%",
                      background: "rgba(16, 185, 129, 0.15)",
                      border: "1px solid #10b981",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center"
                    }}>
                      <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#10b981" }} />
                    </div>
                    <div>
                      <div style={{ fontSize: "0.85rem", fontWeight: "500", color: "#f8fafc" }}>
                        Marked Completed
                      </div>
                      <p style={{
                        fontSize: "0.75rem",
                        color: "#94a3b8",
                        marginTop: "2px",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        maxWidth: "180px"
                      }}>
                        {item.text}
                      </p>
                      <div style={{ display: "flex", gap: "8px", marginTop: "4px" }}>
                        <span style={{ fontSize: "0.65rem", color: "#64748b" }}>{item.topic}</span>
                        <span style={{ fontSize: "0.65rem", color: "#64748b" }}>•</span>
                        <span style={{ fontSize: "0.65rem", color: "#64748b" }}>{item.year}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ padding: "24px 0", textAlign: "center", color: "#64748b", fontSize: "0.85rem" }}>
                No questions completed yet. Pick a subject and start solving!
              </div>
            )}
          </div>

          {/* Exam Prep Tip Card */}
          <div className="glass-panel" style={{
            padding: "24px",
            background: "linear-gradient(135deg, rgba(245, 158, 11, 0.05) 0%, rgba(0, 0, 0, 0) 100%)",
            borderColor: "rgba(245, 158, 11, 0.1)"
          }}>
            <h3 style={{ fontSize: "1.05rem", fontWeight: "600", color: "#f59e0b", marginBottom: "12px" }}>
              Exam Tip of the Day
            </h3>
            <p style={{ fontSize: "0.85rem", color: "#94a3b8", lineHeight: "1.5" }}>
              **Did you know?** In DU semester papers, structural questions about **AVL Tree Rotations** and **Depreciation methods (WDV)** have appeared in 3 of the last 4 years. Make sure to solve these high-weightage questions!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
