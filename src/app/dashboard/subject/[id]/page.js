"use client";

import { useEffect, useState, use } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { courses } from "@/data/courses";
import { questions } from "@/data/questions";
import { 
  ArrowLeft, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp, 
  FileText, 
  Award, 
  Calendar,
  Grid,
  Filter
} from "lucide-react";

export default function SubjectPage() {
  const params = useParams();
  const router = useRouter();
  const subjectId = params.id;

  const [user, setUser] = useState(null);
  const [completedList, setCompletedList] = useState([]);
  const [activeTab, setActiveTab] = useState("all"); // "all" | "topic" | "year"
  const [expandedQuestions, setExpandedQuestions] = useState({});

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

  // Find subject details
  let activeSubject = null;
  for (const course of courses) {
    for (const sem in course.semesters) {
      const sub = course.semesters[sem].find(s => s.id === subjectId);
      if (sub) {
        activeSubject = sub;
        break;
      }
    }
    if (activeSubject) break;
  }

  if (!activeSubject) {
    return (
      <div style={{ textAlign: "center", padding: "40px" }}>
        <h3 style={{ color: "#fb7185" }}>Subject not found</h3>
        <Link href="/dashboard" style={{ color: "#3b82f6", marginTop: "12px", display: "inline-block" }}>
          Return to Dashboard
        </Link>
      </div>
    );
  }

  // Get subject questions
  const subjectQuestions = questions.filter(q => q.subjectId === subjectId);
  const completedInSubject = subjectQuestions.filter(q => completedList.includes(q.id));
  const progressRate = subjectQuestions.length > 0
    ? Math.round((completedInSubject.length / subjectQuestions.length) * 100)
    : 0;

  // Toggle completion checkbox
  const handleToggleCompletion = (qId) => {
    let updated;
    if (completedList.includes(qId)) {
      updated = completedList.filter(id => id !== qId);
    } else {
      updated = [...completedList, qId];
    }
    setCompletedList(updated);

    // Save back to user in localStorage
    const updatedUser = { ...user, completedQuestions: updated };
    setUser(updatedUser);
    localStorage.setItem("paperwise_user", JSON.stringify(updatedUser));
  };

  // Toggle solution collapse
  const handleToggleExpand = (qId) => {
    setExpandedQuestions(prev => ({
      ...prev,
      [qId]: !prev[qId]
    }));
  };

  // Group questions by topic
  const questionsByTopic = subjectQuestions.reduce((acc, q) => {
    if (!acc[q.topic]) acc[q.topic] = [];
    acc[q.topic].push(q);
    return acc;
  }, {});

  // Group questions by year
  const questionsByYear = subjectQuestions.reduce((acc, q) => {
    if (!acc[q.year]) acc[q.year] = [];
    acc[q.year].push(q);
    return acc;
  }, {});

  // Sorting years descending
  const sortedYears = Object.keys(questionsByYear).sort((a, b) => b - a);

  // Question item renderer
  const renderQuestionCard = (q) => {
    const isCompleted = completedList.includes(q.id);
    const isExpanded = !!expandedQuestions[q.id];

    return (
      <div 
        key={q.id} 
        className="glass-panel" 
        style={{ 
          padding: "20px", 
          display: "flex", 
          flexDirection: "column", 
          gap: "14px",
          borderLeft: isCompleted ? "4px solid #10b981" : "1px solid rgba(255, 255, 255, 0.06)",
          transition: "all 0.2s"
        }}
      >
        <div style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
          {/* Custom Checkbox */}
          <label className="checkbox-container" style={{ marginTop: "4px" }}>
            <input 
              type="checkbox" 
              className="checkbox-input" 
              checked={isCompleted}
              onChange={() => handleToggleCompletion(q.id)}
            />
            <span className="checkmark" />
          </label>

          {/* Question Text & Tags */}
          <div style={{ flex: 1 }}>
            <p style={{ 
              fontSize: "0.95rem", 
              lineHeight: "1.6", 
              color: isCompleted ? "#94a3b8" : "#f8fafc",
              textDecoration: isCompleted ? "line-through" : "none"
            }}>
              {q.text}
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "12px" }}>
              <span className="badge badge-blue">{q.year} Paper</span>
              <span className="badge badge-teal">{q.topic}</span>
              <span className="badge badge-amber">{q.marks} Marks</span>
              <span className={`badge ${
                q.difficulty === "Easy" ? "badge-teal" : 
                q.difficulty === "Medium" ? "badge-amber" : "badge-rose"
              }`}>{q.difficulty}</span>
              <span className="badge" style={{ background: "rgba(255,255,255,0.04)", color: "#cbd5e1" }}>
                {q.type}
              </span>
            </div>
          </div>

          {/* Expand/Collapse Button */}
          <button 
            onClick={() => handleToggleExpand(q.id)}
            style={{
              background: "rgba(255, 255, 255, 0.03)",
              border: "1px solid rgba(255, 255, 255, 0.06)",
              borderRadius: "6px",
              padding: "6px 10px",
              color: "#cbd5e1",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "4px",
              fontSize: "0.8rem",
              transition: "all 0.15s"
            }}
          >
            {isExpanded ? (
              <>Hide Solution <ChevronUp size={14} /></>
            ) : (
              <>Show Solution <ChevronDown size={14} /></>
            )}
          </button>
        </div>

        {/* Expandable Solution Area */}
        {isExpanded && (
          <div style={{ 
            marginTop: "8px", 
            padding: "16px", 
            background: "rgba(0, 0, 0, 0.2)", 
            borderRadius: "8px", 
            borderLeft: "2px solid #3b82f6",
            fontSize: "0.9rem",
            lineHeight: "1.6",
            color: "#e2e8f0"
          }}>
            <h5 style={{ fontWeight: "700", color: "#60a5fa", marginBottom: "8px", fontSize: "0.85rem", letterSpacing: "0.05em" }}>
              SUGGESTED ANSWER / STEP-BY-STEP EXPLANATION
            </h5>
            <div style={{ whiteSpace: "pre-wrap" }}>{q.solution}</div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
      {/* Back button */}
      <div>
        <Link href="/dashboard" style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "6px",
          color: "#94a3b8",
          fontSize: "0.85rem",
          textDecoration: "none",
          transition: "color 0.15s"
        }}>
          <ArrowLeft size={16} /> Back to Dashboard
        </Link>
      </div>

      {/* Subject Header Panel */}
      <div className="glass-panel" style={{
        padding: "32px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "24px"
      }}>
        <div style={{ flex: 1, minWidth: "280px" }}>
          <span className="badge badge-blue" style={{ marginBottom: "8px" }}>
            {activeSubject.code}
          </span>
          <h1 style={{ fontSize: "1.8rem", fontWeight: "700", marginBottom: "8px" }}>
            {activeSubject.name}
          </h1>
          <p style={{ color: "#94a3b8", fontSize: "0.9rem" }}>
            Syllabus: Delhi University NEP UGCF • Course Type: {activeSubject.type} (Core)
          </p>
        </div>

        {/* Overall Subject Progress */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
          background: "rgba(255,255,255,0.02)",
          border: "1px solid rgba(255,255,255,0.04)",
          padding: "16px 24px",
          borderRadius: "12px"
        }}>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: "0.75rem", color: "#94a3b8", fontWeight: "500" }}>COMPLETED QUESTIONS</div>
            <div style={{ fontSize: "1.3rem", fontWeight: "700", marginTop: "2px", color: "#10b981" }}>
              {completedInSubject.length} / {subjectQuestions.length}
            </div>
          </div>
          <div style={{
            position: "relative",
            width: "56px",
            height: "56px",
            borderRadius: "50%",
            background: "conic-gradient(#10b981 0% 0%, rgba(255,255,255,0.05) 0% 100%)",
            // A dynamic background set via inline style for safety
            backgroundImage: `conic-gradient(#10b981 ${progressRate}%, rgba(255, 255, 255, 0.05) ${progressRate}% 100%)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}>
            <div style={{
              width: "46px",
              height: "46px",
              borderRadius: "50%",
              background: "#0c0f1c",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "0.85rem",
              fontWeight: "700",
              color: "#f8fafc"
            }}>
              {progressRate}%
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Menu */}
      <div style={{
        display: "flex",
        borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
        gap: "24px"
      }}>
        {[
          { id: "all", label: "All Questions", icon: FileText },
          { id: "topic", label: "Group by Topic", icon: Grid },
          { id: "year", label: "Group by Year", icon: Calendar }
        ].map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "12px 4px",
                border: "none",
                background: "transparent",
                color: isActive ? "#3b82f6" : "#64748b",
                fontWeight: isActive ? "600" : "500",
                fontSize: "0.95rem",
                cursor: "pointer",
                borderBottom: isActive ? "2px solid #3b82f6" : "2px solid transparent",
                transition: "all 0.15s ease",
                marginBottom: "-1px"
              }}
            >
              <Icon size={18} /> {tab.label}
            </button>
          );
        })}
      </div>

      {/* Questions List Container */}
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        
        {/* Tab 1: All Questions */}
        {activeTab === "all" && (
          subjectQuestions.length > 0 ? (
            subjectQuestions.map(renderQuestionCard)
          ) : (
            <div style={{ textAlign: "center", padding: "48px", color: "#64748b" }}>
              No questions found for this subject.
            </div>
          )
        )}

        {/* Tab 2: Topic-wise */}
        {activeTab === "topic" && (
          Object.keys(questionsByTopic).length > 0 ? (
            Object.keys(questionsByTopic).map((topic) => (
              <div key={topic} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <h3 style={{ 
                  fontSize: "1.05rem", 
                  fontWeight: "600", 
                  color: "#60a5fa", 
                  paddingBottom: "6px", 
                  borderBottom: "1px solid rgba(59, 130, 246, 0.15)",
                  marginTop: "12px",
                  display: "flex",
                  justifyContent: "space-between"
                }}>
                  <span>{topic}</span>
                  <span style={{ fontSize: "0.8rem", color: "#64748b" }}>
                    {questionsByTopic[topic].length} Questions
                  </span>
                </h3>
                {questionsByTopic[topic].map(renderQuestionCard)}
              </div>
            ))
          ) : (
            <div style={{ textAlign: "center", padding: "48px", color: "#64748b" }}>
              No questions grouped by topic.
            </div>
          )
        )}

        {/* Tab 3: Year-wise */}
        {activeTab === "year" && (
          sortedYears.length > 0 ? (
            sortedYears.map((year) => (
              <div key={year} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <h3 style={{ 
                  fontSize: "1.05rem", 
                  fontWeight: "600", 
                  color: "#14b8a6", 
                  paddingBottom: "6px", 
                  borderBottom: "1px solid rgba(20, 184, 166, 0.15)",
                  marginTop: "12px",
                  display: "flex",
                  justifyContent: "space-between"
                }}>
                  <span>{year} Semester Examination</span>
                  <span style={{ fontSize: "0.8rem", color: "#64748b" }}>
                    {questionsByYear[year].length} Questions
                  </span>
                </h3>
                {questionsByYear[year].map(renderQuestionCard)}
              </div>
            ))
          ) : (
            <div style={{ textAlign: "center", padding: "48px", color: "#64748b" }}>
              No questions grouped by year.
            </div>
          )
        )}

      </div>
    </div>
  );
}
