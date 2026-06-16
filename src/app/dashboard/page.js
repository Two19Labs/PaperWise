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
  const [oranges, setOranges] = useState(0);

  useEffect(() => {
    const storedUser = localStorage.getItem("paperwise_user");
    if (!storedUser) {
      router.push("/auth/login");
      return;
    }
    const parsed = JSON.parse(storedUser);
    setUser(parsed);
    setCompletedList(parsed.completedQuestions || []);
    setOranges((parsed.completedQuestions || []).length * 10);
  }, [router]);

  if (!user) {
    return null;
  }

  // Find user's active course subjects
  const userCourse = courses.find(c => c.id === user.courseId) || courses[0];
  const activeSemester = user.semester || 1;
  const activeSubjects = userCourse.semesters[activeSemester] || [];

  // Compute stats
  const subjectIds = activeSubjects.map(sub => sub.id);
  const totalQuestions = questions.filter(q => subjectIds.includes(q.subjectId));
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
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      {/* Welcome Banner */}
      <div style={{
        padding: "24px",
        borderRadius: "8px",
        background: "#ffffff",
        border: "1px solid #e2e8f0",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "16px",
        boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.02)"
      }}>
        <div>
          <h1 style={{ fontSize: "1.25rem", fontWeight: "700", marginBottom: "4px", color: "#0f172a" }}>
            Welcome, {user.name || "Student"} 👋
          </h1>
          <p style={{ color: "#475569", fontSize: "0.8rem", maxWidth: "600px" }}>
            You are tracking the syllabus for **{user.courseName}** (Semester {user.semester}) at **SSCBS**.
          </p>
        </div>
        <Link href="/dashboard/analyzer" className="btn btn-primary" style={{ padding: "8px 12px", fontSize: "0.8rem" }}>
          Open Analyzer <Play size={12} fill="currentColor" />
        </Link>
      </div>

      {/* Stats row */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: "16px"
      }}>
        {/* Stat 1 */}
        <div className="glass-panel" style={{ padding: "16px", display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{
            width: "36px",
            height: "36px",
            borderRadius: "6px",
            background: "#fff7ed",
            border: "1px solid rgba(245, 131, 64, 0.2)",
            color: "#f58340",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}>
            <BookOpen size={16} />
          </div>
          <div>
            <div style={{ fontSize: "0.7rem", color: "#64748b", fontWeight: "600" }}>TOTAL QUESTIONS</div>
            <div style={{ fontSize: "1.15rem", fontWeight: "700", marginTop: "2px", color: "#0f172a" }}>
              {totalQuestions.length} PYQs
            </div>
          </div>
        </div>

        {/* Stat 2 */}
        <div className="glass-panel" style={{ padding: "16px", display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{
            width: "36px",
            height: "36px",
            borderRadius: "6px",
            background: "#fff7ed",
            border: "1px solid rgba(245, 131, 64, 0.2)",
            color: "#f58340",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}>
            <CheckCircle size={16} />
          </div>
          <div>
            <div style={{ fontSize: "0.7rem", color: "#64748b", fontWeight: "600" }}>COMPLETED</div>
            <div style={{ fontSize: "1.15rem", fontWeight: "700", marginTop: "2px", color: "#0f172a" }}>
              {completedInSemester.length} / {totalQuestions.length}
            </div>
          </div>
        </div>

        {/* Stat 3 */}
        <div className="glass-panel" style={{ padding: "16px", display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{
            width: "36px",
            height: "36px",
            borderRadius: "6px",
            background: "#fff7ed",
            border: "1px solid rgba(245, 131, 64, 0.2)",
            color: "#f58340",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}>
            <Award size={16} />
          </div>
          <div>
            <div style={{ fontSize: "0.7rem", color: "#64748b", fontWeight: "600" }}>COVERAGE</div>
            <div style={{ fontSize: "1.15rem", fontWeight: "700", marginTop: "2px", color: "#0f172a" }}>
              {completionRate}%
            </div>
          </div>
        </div>

        {/* Stat 4 */}
        <div className="glass-panel" style={{ padding: "16px", display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{
            width: "36px",
            height: "36px",
            borderRadius: "6px",
            background: "#fff7ed",
            border: "1px solid rgba(245, 131, 64, 0.2)",
            color: "#f58340",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}>
            <Calendar size={16} />
          </div>
          <div>
            <div style={{ fontSize: "0.7rem", color: "#64748b", fontWeight: "600" }}>DAYS REMAINING</div>
            <div style={{ fontSize: "1.15rem", fontWeight: "700", marginTop: "2px", color: "#0f172a" }}>
              45 Days
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 300px",
        gap: "24px",
        alignItems: "start"
      }}>
        {/* Left Column: Subjects */}
        <div>
          <h3 style={{ fontSize: "0.8rem", fontWeight: "700", color: "#64748b", letterSpacing: "0.03em", marginBottom: "12px" }}>
            SUBJECTS
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {subjectsWithStats.map((subject) => (
              <div 
                key={subject.id} 
                className="glass-panel" 
                style={{ 
                  padding: "16px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px"
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div>
                    <span className="badge" style={{ marginBottom: "4px" }}>
                      {subject.code}
                    </span>
                    <h4 style={{ fontSize: "0.95rem", fontWeight: "600", color: "#0f172a" }}>{subject.name}</h4>
                    <p style={{ color: "#64748b", fontSize: "0.75rem", marginTop: "2px" }}>
                      Type: {subject.type}
                    </p>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: "0.75rem", color: "#64748b" }}>
                      {subject.completedCount} / {subject.totalCount} completed
                    </div>
                    <div style={{ fontSize: "0.95rem", fontWeight: "700", color: "#f58340", marginTop: "2px" }}>
                      {subject.progress}%
                    </div>
                  </div>
                </div>

                {/* Progress bar (Orange Accent) */}
                <div style={{
                  height: "4px",
                  background: "#f3f4f6",
                  border: "1px solid #e2e8f0",
                  borderRadius: "2px",
                  overflow: "hidden",
                  width: "100%"
                }}>
                  <div style={{
                    width: `${subject.progress}%`,
                    height: "100%",
                    background: "#f58340",
                    borderRadius: "2px",
                    transition: "width 0.3s"
                  }} />
                </div>

                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}>
                  <span style={{ fontSize: "0.7rem", color: "#94a3b8" }}>
                    Syllabus: UGCF 2022
                  </span>
                  <Link 
                    href={`/dashboard/subject/${subject.id}`} 
                    style={{
                      fontSize: "0.8rem",
                      fontWeight: "650",
                      color: "#f58340",
                      display: "flex",
                      alignItems: "center",
                      gap: "2px",
                      textDecoration: "underline"
                    }}
                  >
                    Open Review <ChevronRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Activity & Rewards */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {/* Orange Rewards Card */}
          <div className="glass-panel" style={{
            padding: "16px",
            background: "#fff7ed",
            border: "1px solid rgba(245, 131, 64, 0.25)"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
              <span style={{ fontSize: "1.25rem" }}>🍊</span>
              <h3 style={{ fontSize: "0.85rem", fontWeight: "700", color: "#ea580c" }}>
                ORANGES EARNED
              </h3>
            </div>
            <div style={{ display: "flex", alignItems: "baseline", gap: "4px", marginBottom: "8px" }}>
              <span style={{ fontSize: "1.8rem", fontWeight: "800", color: "#ea580c" }}>
                {oranges}
              </span>
              <span style={{ fontSize: "0.8rem", color: "#c2410c" }}>oranges collected</span>
            </div>
            <p style={{ fontSize: "0.75rem", color: "#c2410c", lineHeight: "1.4" }}>
              Earn 10 oranges for every question checked off! Keep practicing to fill your reward basket.
            </p>
          </div>

          {/* Recent completions */}
          <div className="glass-panel" style={{ padding: "16px" }}>
            <h3 style={{ fontSize: "0.8rem", fontWeight: "700", color: "#64748b", letterSpacing: "0.03em", marginBottom: "12px" }}>
              RECENT COMPLETIONS
            </h3>
            
            {completedInSemester.length > 0 ? (
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {completedInSemester.slice(0, 3).map((item) => (
                  <div key={item.id} style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "8px",
                    paddingBottom: "8px",
                    borderBottom: "1px solid #e2e8f0"
                  }}>
                    <div style={{
                      marginTop: "3px",
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      background: "#f58340",
                      flexShrink: 0
                    }} />
                    <div>
                      <div style={{ fontSize: "0.8rem", fontWeight: "600", color: "#0f172a" }}>
                        Solved Question
                      </div>
                      <p style={{
                        fontSize: "0.7rem",
                        color: "#475569",
                        marginTop: "1px",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        maxWidth: "200px"
                      }}>
                        {item.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ padding: "16px 0", textAlign: "center", color: "#64748b", fontSize: "0.75rem" }}>
                No questions completed yet.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
