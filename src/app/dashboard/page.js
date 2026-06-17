"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { courses } from "@/data/courses";
import { questions } from "@/data/questions";
import { BookOpen, CheckCircle, Award, Calendar, ChevronRight, Play } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

export default function DashboardHome() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [completedList, setCompletedList] = useState([]);
  
  // Selected course tab (initialised based on user course selection but togglable)
  const [activeCourseId, setActiveCourseId] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("paperwise_user");
    if (!storedUser) {
      router.push("/auth/login");
      return;
    }
    const parsed = JSON.parse(storedUser);
    setUser(parsed);
    setCompletedList(parsed.completedQuestions || []);
    setActiveCourseId(parsed.courseId || "bms");

    const syncProfile = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) return;

        const { data: profile } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", session.user.id)
          .single();

        if (profile) {
          const freshUserObj = {
            email: session.user.email,
            name: profile.name,
            college: profile.college_name,
            collegeId: profile.college_id,
            courseId: profile.course_id,
            courseName: profile.course_name,
            completedQuestions: profile.completed_questions || []
          };
          setUser(freshUserObj);
          setCompletedList(profile.completed_questions || []);
          localStorage.setItem("paperwise_user", JSON.stringify(freshUserObj));
        }
      } catch (err) {
        console.error("Dashboard home profile sync error:", err);
      }
    };

    syncProfile();
  }, [router]);

  if (!user || !activeCourseId) {
    return null;
  }

  // Find active course details
  const activeCourse = courses.find(c => c.id === activeCourseId) || courses[0];

  // Calculate stats for the active course (across all semesters)
  const allSubjectIds = [];
  const subjectsBySemester = {};

  Object.keys(activeCourse.semesters).forEach(sem => {
    subjectsBySemester[sem] = activeCourse.semesters[sem].map(subject => {
      allSubjectIds.push(subject.id);
      
      const subQuestions = questions.filter(q => q.subjectId === subject.id);
      const subCompleted = subQuestions.filter(q => completedList.includes(q.id));
      const progress = subQuestions.length > 0
        ? Math.round((subCompleted.length / subQuestions.length) * 100)
        : 0;

      return {
        ...subject,
        totalCount: subQuestions.length,
        completedCount: subCompleted.length,
        progress
      };
    });
  });

  const totalQuestions = questions.filter(q => allSubjectIds.includes(q.subjectId));
  const completedInCourse = totalQuestions.filter(q => completedList.includes(q.id));
  const coverageRate = totalQuestions.length > 0
    ? Math.round((completedInCourse.length / totalQuestions.length) * 100)
    : 0;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      {/* Welcome Banner */}
      <div style={{
        padding: "20px 24px",
        borderRadius: "8px",
        background: "#ffffff",
        border: "1px solid #e2e8f0",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "16px"
      }}>
        <div>
          <h1 style={{ fontSize: "1.2rem", fontWeight: "700", color: "#0f172a", marginBottom: "4px" }}>
            Welcome, {user.name || "Student"} 👋
          </h1>
          <p style={{ color: "#475569", fontSize: "0.8rem" }}>
            You have full access to all semesters and subjects for **{user.college || "Delhi University"}**.
          </p>
        </div>
        <Link href="/dashboard/analyzer" className="btn btn-primary" style={{ padding: "8px 12px", fontSize: "0.8rem" }}>
          Open PYQ Analyzer <Play size={12} fill="currentColor" />
        </Link>
      </div>

      {/* Stats Summary row */}
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
            background: "#fdf2f2",
            border: "1px solid rgba(158, 42, 43, 0.2)",
            color: "#9e2a2b",
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
            background: "#fdf2f2",
            border: "1px solid rgba(158, 42, 43, 0.2)",
            color: "#9e2a2b",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}>
            <CheckCircle size={16} />
          </div>
          <div>
            <div style={{ fontSize: "0.7rem", color: "#64748b", fontWeight: "600" }}>COMPLETED</div>
            <div style={{ fontSize: "1.15rem", fontWeight: "700", marginTop: "2px", color: "#0f172a" }}>
              {completedInCourse.length} / {totalQuestions.length}
            </div>
          </div>
        </div>

        {/* Stat 3 */}
        <div className="glass-panel" style={{ padding: "16px", display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{
            width: "36px",
            height: "36px",
            borderRadius: "6px",
            background: "#fdf2f2",
            border: "1px solid rgba(158, 42, 43, 0.2)",
            color: "#9e2a2b",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}>
            <Award size={16} />
          </div>
          <div>
            <div style={{ fontSize: "0.7rem", color: "#64748b", fontWeight: "600" }}>TOTAL COVERAGE</div>
            <div style={{ fontSize: "1.15rem", fontWeight: "700", marginTop: "2px", color: "#0f172a" }}>
              {coverageRate}%
            </div>
          </div>
        </div>
      </div>

      {/* Main content grid: Semesters & Subjects */}
      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        {Object.keys(subjectsBySemester).map((sem) => (
          <div key={sem} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <h3 style={{ 
              fontSize: "0.85rem", 
              fontWeight: "700", 
              color: "#475569", 
              letterSpacing: "0.05em",
              borderBottom: "1px solid #e2e8f0",
              paddingBottom: "4px",
              marginTop: "8px"
            }}>
              SEMESTER {sem}
            </h3>

            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: "16px"
            }}>
              {subjectsBySemester[sem].map((subject) => (
                <div 
                  key={subject.id} 
                  className="glass-panel" 
                  style={{ 
                    padding: "16px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                    background: "#ffffff"
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div>
                      <span className="badge" style={{ marginBottom: "4px" }}>
                        {subject.code}
                      </span>
                      <h4 style={{ fontSize: "0.9rem", fontWeight: "600", color: "#0f172a" }}>{subject.name}</h4>
                      <p style={{ color: "#64748b", fontSize: "0.7rem", marginTop: "2px" }}>
                        Type: {subject.type}
                      </p>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontSize: "0.75rem", color: "#64748b" }}>
                        {subject.completedCount} / {subject.totalCount} done
                      </div>
                      <div style={{ fontSize: "0.95rem", fontWeight: "700", color: "#9e2a2b", marginTop: "2px" }}>
                        {subject.progress}%
                      </div>
                    </div>
                  </div>

                  {/* Progress bar */}
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
                      background: "#9e2a2b",
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
                        fontSize: "0.75rem",
                        fontWeight: "650",
                        color: "#9e2a2b",
                        display: "flex",
                        alignItems: "center",
                        gap: "2px",
                        textDecoration: "underline"
                      }}
                    >
                      Browse PYQs <ChevronRight size={14} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
