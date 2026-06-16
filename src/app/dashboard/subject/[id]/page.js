"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { courses } from "@/data/courses";
import { questions } from "@/data/questions";
import { 
  ArrowLeft, 
  ChevronDown, 
  ChevronUp, 
  FileText, 
  Calendar,
  Grid
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
        <h3 style={{ color: "#ef4444" }}>Subject not found</h3>
        <Link href="/dashboard" style={{ color: "#ffffff", marginTop: "12px", display: "inline-block" }}>
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

  // Toggle completion
  const handleToggleCompletion = (qId) => {
    let updated;
    if (completedList.includes(qId)) {
      updated = completedList.filter(id => id !== qId);
    } else {
      updated = [...completedList, qId];
    }
    setCompletedList(updated);

    const updatedUser = { ...user, completedQuestions: updated };
    setUser(updatedUser);
    localStorage.setItem("paperwise_user", JSON.stringify(updatedUser));
  };

  // Toggle expand
  const handleToggleExpand = (qId) => {
    setExpandedQuestions(prev => ({
      ...prev,
      [qId]: !prev[qId]
    }));
  };

  // Grouping
  const questionsByTopic = subjectQuestions.reduce((acc, q) => {
    if (!acc[q.topic]) acc[q.topic] = [];
    acc[q.topic].push(q);
    return acc;
  }, {});

  const questionsByYear = subjectQuestions.reduce((acc, q) => {
    if (!acc[q.year]) acc[q.year] = [];
    acc[q.year].push(q);
    return acc;
  }, {});

  const sortedYears = Object.keys(questionsByYear).sort((a, b) => b - a);

  // Card renderer
  const renderQuestionCard = (q) => {
    const isCompleted = completedList.includes(q.id);
    const isExpanded = !!expandedQuestions[q.id];

    return (
      <div 
        key={q.id} 
        className="glass-panel" 
        style={{ 
          padding: "16px", 
          display: "flex", 
          flexDirection: "column", 
          gap: "12px",
          borderLeft: isCompleted ? "2px solid #ffffff" : "1px solid #27272a",
        }}
      >
        <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
          {/* Custom Checkbox */}
          <label className="checkbox-container" style={{ marginTop: "2px" }}>
            <input 
              type="checkbox" 
              className="checkbox-input" 
              checked={isCompleted}
              onChange={() => handleToggleCompletion(q.id)}
            />
            <span className="checkmark" />
          </label>

          <div style={{ flex: 1 }}>
            <p style={{ 
              fontSize: "0.85rem", 
              lineHeight: "1.5", 
              color: isCompleted ? "#71717a" : "#ffffff",
              textDecoration: isCompleted ? "line-through" : "none"
            }}>
              {q.text}
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "8px" }}>
              <span className="badge">{q.year}</span>
              <span className="badge">{q.topic}</span>
              <span className="badge">{q.marks} Marks</span>
              <span className="badge">{q.difficulty}</span>
              <span className="badge">{q.type}</span>
            </div>
          </div>

          <button 
            onClick={() => handleToggleExpand(q.id)}
            style={{
              background: "#121214",
              border: "1px solid #27272a",
              borderRadius: "4px",
              padding: "4px 8px",
              color: "#a1a1aa",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "2px",
              fontSize: "0.75rem",
            }}
          >
            {isExpanded ? (
              <>Hide <ChevronUp size={12} /></>
            ) : (
              <>Solution <ChevronDown size={12} /></>
            )}
          </button>
        </div>

        {/* Answer Walkthrough */}
        {isExpanded && (
          <div style={{ 
            padding: "12px", 
            background: "#09090b", 
            border: "1px solid #27272a",
            borderRadius: "4px", 
            fontSize: "0.8rem",
            lineHeight: "1.5",
            color: "#e2e8f0"
          }}>
            <div style={{ fontWeight: "700", color: "#a1a1aa", marginBottom: "6px", fontSize: "0.7rem", letterSpacing: "0.05em" }}>
              SOLUTION WALKTHROUGH
            </div>
            <div style={{ whiteSpace: "pre-wrap" }}>{q.solution}</div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <div>
        <Link href="/dashboard" style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "4px",
          color: "#a1a1aa",
          fontSize: "0.8rem",
          textDecoration: "none",
        }}>
          <ArrowLeft size={14} /> Dashboard Overview
        </Link>
      </div>

      {/* Header Panel */}
      <div className="glass-panel" style={{
        padding: "24px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "16px"
      }}>
        <div style={{ flex: 1, minWidth: "250px" }}>
          <span className="badge" style={{ marginBottom: "6px" }}>
            {activeSubject.code}
          </span>
          <h1 style={{ fontSize: "1.25rem", fontWeight: "700", marginBottom: "4px" }}>
            {activeSubject.name}
          </h1>
          <p style={{ color: "#a1a1aa", fontSize: "0.75rem" }}>
            Syllabus: UGCF NEP • Course: SSCBS
          </p>
        </div>

        {/* Progress box */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: "4px",
          background: "#09090b",
          border: "1px solid #27272a",
          padding: "10px 16px",
          borderRadius: "4px",
          alignItems: "flex-end"
        }}>
          <span style={{ fontSize: "0.65rem", color: "#a1a1aa", fontWeight: "600", letterSpacing: "0.05em" }}>
            COMPLETED QUESTIONS
          </span>
          <div style={{ display: "flex", alignItems: "baseline", gap: "6px" }}>
            <span style={{ fontSize: "1.15rem", fontWeight: "700", color: "#ffffff" }}>
              {completedInSubject.length} / {subjectQuestions.length}
            </span>
            <span style={{ fontSize: "0.8rem", color: "#a1a1aa" }}>
              ({progressRate}%)
            </span>
          </div>
        </div>
      </div>

      {/* Tabs Menu */}
      <div style={{
        display: "flex",
        borderBottom: "1px solid #27272a",
        gap: "16px",
        marginBottom: "8px"
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
                gap: "6px",
                padding: "10px 2px",
                border: "none",
                background: "transparent",
                color: isActive ? "#ffffff" : "#71717a",
                fontWeight: isActive ? "600" : "500",
                fontSize: "0.85rem",
                cursor: "pointer",
                borderBottom: isActive ? "2px solid #ffffff" : "2px solid transparent",
                transition: "all 0.1s ease",
                marginBottom: "-1px"
              }}
            >
              <Icon size={14} /> {tab.label}
            </button>
          );
        })}
      </div>

      {/* List */}
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        
        {activeTab === "all" && (
          subjectQuestions.length > 0 ? (
            subjectQuestions.map(renderQuestionCard)
          ) : (
            <div style={{ textAlign: "center", padding: "32px", color: "#71717a", fontSize: "0.8rem" }}>
              No questions found.
            </div>
          )
        )}

        {activeTab === "topic" && (
          Object.keys(questionsByTopic).length > 0 ? (
            Object.keys(questionsByTopic).map((topic) => (
              <div key={topic} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <h3 style={{ 
                  fontSize: "0.85rem", 
                  fontWeight: "700", 
                  color: "#ffffff", 
                  paddingBottom: "4px", 
                  borderBottom: "1px solid #27272a",
                  marginTop: "8px",
                  display: "flex",
                  justifyContent: "space-between"
                }}>
                  <span>{topic}</span>
                  <span style={{ fontSize: "0.75rem", color: "#71717a", fontWeight: "normal" }}>
                    {questionsByTopic[topic].length} Questions
                  </span>
                </h3>
                {questionsByTopic[topic].map(renderQuestionCard)}
              </div>
            ))
          ) : (
            <div style={{ textAlign: "center", padding: "32px", color: "#71717a", fontSize: "0.8rem" }}>
              No questions found.
            </div>
          )
        )}

        {activeTab === "year" && (
          sortedYears.length > 0 ? (
            sortedYears.map((year) => (
              <div key={year} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <h3 style={{ 
                  fontSize: "0.85rem", 
                  fontWeight: "700", 
                  color: "#ffffff", 
                  paddingBottom: "4px", 
                  borderBottom: "1px solid #27272a",
                  marginTop: "8px",
                  display: "flex",
                  justifyContent: "space-between"
                }}>
                  <span>{year} Semester Exam</span>
                  <span style={{ fontSize: "0.75rem", color: "#71717a", fontWeight: "normal" }}>
                    {questionsByYear[year].length} Questions
                  </span>
                </h3>
                {questionsByYear[year].map(renderQuestionCard)}
              </div>
            ))
          ) : (
            <div style={{ textAlign: "center", padding: "32px", color: "#71717a", fontSize: "0.8rem" }}>
              No questions found.
            </div>
          )
        )}

      </div>
    </div>
  );
}
