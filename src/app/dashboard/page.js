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
        borderRadius: "4px",
        background: "#121214",
        border: "1px solid #27272a",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "16px"
      }}>
        <div>
          <h1 style={{ fontSize: "1.25rem", fontWeight: "700", marginBottom: "4px" }}>
            Welcome, {user.name || "Student"}
          </h1>
          <p style={{ color: "#a1a1aa", fontSize: "0.8rem", maxWidth: "600px" }}>
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
            borderRadius: "4px",
            background: "#09090b",
            border: "1px solid #27272a",
            color: "#a1a1aa",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}>
            <BookOpen size={16} />
          </div>
          <div>
            <div style={{ fontSize: "0.7rem", color: "#a1a1aa", fontWeight: "600" }}>TOTAL QUESTIONS</div>
            <div style={{ fontSize: "1.15rem", fontWeight: "700", marginTop: "2px" }}>
              {totalQuestions.length} PYQs
            </div>
          </div>
        </div>

        {/* Stat 2 */}
        <div className="glass-panel" style={{ padding: "16px", display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{
            width: "36px",
            height: "36px",
            borderRadius: "4px",
            background: "#09090b",
            border: "1px solid #27272a",
            color: "#a1a1aa",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}>
            <CheckCircle size={16} />
          </div>
          <div>
            <div style={{ fontSize: "0.7rem", color: "#a1a1aa", fontWeight: "600" }}>COMPLETED</div>
            <div style={{ fontSize: "1.15rem", fontWeight: "700", marginTop: "2px" }}>
              {completedInSemester.length} / {totalQuestions.length}
            </div>
          </div>
        </div>

        {/* Stat 3 */}
        <div className="glass-panel" style={{ padding: "16px", display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{
            width: "36px",
            height: "36px",
            borderRadius: "4px",
            background: "#09090b",
            border: "1px solid #27272a",
            color: "#a1a1aa",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}>
            <Award size={16} />
          </div>
          <div>
            <div style={{ fontSize: "0.7rem", color: "#a1a1aa", fontWeight: "600" }}>COVERAGE</div>
            <div style={{ fontSize: "1.15rem", fontWeight: "700", marginTop: "2px" }}>
              {completionRate}%
            </div>
          </div>
        </div>

        {/* Stat 4 */}
        <div className="glass-panel" style={{ padding: "16px", display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{
            width: "36px",
            height: "36px",
            borderRadius: "4px",
            background: "#09090b",
            border: "1px solid #27272a",
            color: "#a1a1aa",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}>
            <Calendar size={16} />
          </div>
          <div>
            <div style={{ fontSize: "0.7rem", color: "#a1a1aa", fontWeight: "600" }}>DAYS REMAINING</div>
            <div style={{ fontSize: "1.15rem", fontWeight: "700", marginTop: "2px" }}>
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
        {/* Left: Subjects */}
        <div>
          <h3 style={{ fontSize: "0.85rem", fontWeight: "700", color: "#a1a1aa", letterSpacing: "0.05em", marginBottom: "12px" }}>
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
                    <h4 style={{ fontSize: "0.95rem", fontWeight: "600", color: "#ffffff" }}>{subject.name}</h4>
                    <p style={{ color: "#71717a", fontSize: "0.75rem", marginTop: "2px" }}>
                      Type: {subject.type}
                    </p>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: "0.75rem", color: "#a1a1aa" }}>
                      {subject.completedCount} / {subject.totalCount} completed
                    </div>
                    <div style={{ fontSize: "0.95rem", fontWeight: "700", color: "#ffffff", marginTop: "2px" }}>
                      {subject.progress}%
                    </div>
                  </div>
                </div>

                {/* Progress bar */}
                <div style={{
                  height: "4px",
                  background: "#09090b",
                  border: "1px solid #27272a",
                  borderRadius: "2px",
                  overflow: "hidden",
                  width: "100%"
                }}>
                  <div style={{
                    width: `${subject.progress}%`,
                    height: "100%",
                    background: "#ffffff",
                    borderRadius: "2px",
                    transition: "width 0.3s"
                  }} />
                </div>

                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}>
                  <span style={{ fontSize: "0.7rem", color: "#71717a" }}>
                    Syllabus: UGCF 2022
                  </span>
                  <Link 
                    href={`/dashboard/subject/${subject.id}`} 
                    style={{
                      fontSize: "0.8rem",
                      fontWeight: "600",
                      color: "#ffffff",
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
            {subjectsWithStats.length === 0 && (
              <div style={{ textAlign: "center", padding: "24px", color: "#71717a", fontSize: "0.8rem" }}>
                No subjects assigned for this semester.
              </div>
            )}
          </div>
        </div>

        {/* Right: Activity & Tips */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {/* Recent completions */}
          <div className="glass-panel" style={{ padding: "16px" }}>
            <h3 style={{ fontSize: "0.8rem", fontWeight: "700", color: "#a1a1aa", letterSpacing: "0.05em", marginBottom: "12px" }}>
              RECENT PROGRESS
            </h3>
            
            {completedInSemester.length > 0 ? (
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {completedInSemester.slice(0, 3).map((item) => (
                  <div key={item.id} style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "8px",
                    paddingBottom: "8px",
                    borderBottom: "1px solid #27272a"
                  }}>
                    <div style={{
                      marginTop: "3px",
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      background: "#ffffff",
                      flexShrink: 0
                    }} />
                    <div>
                      <div style={{ fontSize: "0.8rem", fontWeight: "500", color: "#ffffff" }}>
                        Solved Question
                      </div>
                      <p style={{
                        fontSize: "0.7rem",
                        color: "#a1a1aa",
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
              <div style={{ padding: "16px 0", textAlign: "center", color: "#71717a", fontSize: "0.75rem" }}>
                No completions yet. Open a subject to begin.
              </div>
            )}
          </div>

          {/* Minimal Tip card */}
          <div className="glass-panel" style={{ padding: "16px", background: "#121214" }}>
            <h3 style={{ fontSize: "0.8rem", fontWeight: "700", color: "#ffffff", marginBottom: "8px" }}>
              Study Advice
            </h3>
            <p style={{ fontSize: "0.75rem", color: "#a1a1aa", lineHeight: "1.4" }}>
              Focus on **Depreciation Ledger entries (WDV)** and **AVL Trees**. Historically, similar analytical questions have frequently appeared in SSCBS examinations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
