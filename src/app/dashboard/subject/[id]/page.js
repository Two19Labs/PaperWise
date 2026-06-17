"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { courses } from "@/data/courses";
import { questions } from "@/data/questions";
import Latex from "@/components/Latex";
import { 
  ArrowLeft, 
  ChevronDown, 
  ChevronUp, 
  FileText, 
  Calendar,
  Grid,
  Award
} from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

export default function SubjectPage() {
  const params = useParams();
  const router = useRouter();
  const subjectId = params.id;

  const [user, setUser] = useState(null);
  const [completedList, setCompletedList] = useState([]);
  
  const [activeTab, setActiveTab] = useState("unit"); // "all" | "unit" | "year"
  const [selectedUnit, setSelectedUnit] = useState(1);
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

    const syncCompletedList = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) return;

        const { data: profile } = await supabase
          .from("profiles")
          .select("completed_questions")
          .eq("id", session.user.id)
          .single();

        if (profile && profile.completed_questions) {
          setCompletedList(profile.completed_questions);
          const freshUser = { ...parsed, completedQuestions: profile.completed_questions };
          setUser(freshUser);
          localStorage.setItem("paperwise_user", JSON.stringify(freshUser));
        }
      } catch (err) {
        console.error("Error syncing completed list in subject page:", err);
      }
    };

    syncCompletedList();
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
        <Link href="/dashboard" style={{ color: "#7c3aed", marginTop: "12px", display: "inline-block" }}>
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

  // Persistence helpers
  const updateDatabaseAndLocal = async (val) => {
    // 1. Update local cache and state instantly (optimistic UI)
    const updatedUser = { ...user, completedQuestions: val };
    setUser(updatedUser);
    localStorage.setItem("paperwise_user", JSON.stringify(updatedUser));

    // 2. Sync with Supabase database
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const { error } = await supabase
        .from("profiles")
        .update({ completed_questions: val })
        .eq("id", session.user.id);

      if (error) {
        console.error("Error updating completed questions in Supabase:", error);
      }
    } catch (err) {
      console.error("Supabase update error:", err);
    }
  };

  const handleToggleCompletion = (qId) => {
    const updated = completedList.includes(qId)
      ? completedList.filter(id => id !== qId)
      : [...completedList, qId];
    setCompletedList(updated);
    updateDatabaseAndLocal(updated);
  };





  const handleToggleExpand = (qId) => {
    setExpandedQuestions(prev => ({
      ...prev,
      [qId]: !prev[qId]
    }));
  };

  // Groupings
  const questionsInUnit = subjectQuestions.filter(q => q.unit === selectedUnit);


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
          borderLeft: isCompleted ? "3px solid #7c3aed" : "1px solid #e2e8f0",
          background: "#ffffff"
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
              color: isCompleted ? "#94a3b8" : "#0f172a",
              textDecoration: isCompleted ? "line-through" : "none"
            }}>
              <Latex text={q.text} />
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "8px" }}>
              <span className="badge badge-orange">{q.year}</span>
              <span className="badge">{q.marks} Marks</span>
            </div>
          </div>

          {/* Action buttons (Doubt Basket, Solution) */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <button 
              onClick={() => handleToggleExpand(q.id)}
              style={{
                background: "#ffffff",
                border: "1px solid #e2e8f0",
                borderRadius: "4px",
                padding: "4px 8px",
                color: "#475569",
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
        </div>

        {/* Answer */}
        {isExpanded && (
          <div style={{ 
            padding: "12px", 
            background: "#f9fafb", 
            border: "1px solid #e2e8f0",
            borderRadius: "6px", 
            fontSize: "0.8rem",
            lineHeight: "1.5",
            color: "#334155"
          }}>
            <div style={{ fontWeight: "700", color: "#7c3aed", marginBottom: "6px", fontSize: "0.7rem", letterSpacing: "0.05em" }}>
              SOLUTION WORKTHROUGH
            </div>
            <div style={{ whiteSpace: "pre-wrap" }}><Latex text={q.solution} /></div>
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
          color: "#475569",
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
          <h1 style={{ fontSize: "1.25rem", fontWeight: "700", marginBottom: "4px", color: "#0f172a" }}>
            {activeSubject.name}
          </h1>
          <p style={{ color: "#64748b", fontSize: "0.75rem" }}>
            Syllabus: UGCF NEP • {user.college || "Delhi University"}
          </p>
        </div>

        {/* Progress Box */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: "4px",
          background: "#f5f3ff",
          border: "1px solid rgba(124, 58, 237, 0.25)",
          padding: "10px 16px",
          borderRadius: "6px",
          alignItems: "flex-end"
        }}>
          <span style={{ fontSize: "0.65rem", color: "#6d28d9", fontWeight: "700", letterSpacing: "0.05em" }}>
            SYLLABUS PROGRESS
          </span>
          <div style={{ display: "flex", alignItems: "baseline", gap: "6px" }}>
            <span style={{ fontSize: "1.15rem", fontWeight: "800", color: "#6d28d9" }}>
              {completedInSubject.length} / {subjectQuestions.length}
            </span>
            <span style={{ fontSize: "0.8rem", color: "#6d28d9", fontWeight: "600" }}>
              ({progressRate}%)
            </span>
          </div>
        </div>
      </div>

      {/* Tabs Menu */}
      <div style={{
        display: "flex",
        borderBottom: "1px solid #e2e8f0",
        gap: "16px",
        marginBottom: "8px"
      }}>
        {[
          { id: "all", label: "All Questions", icon: FileText },
          { id: "unit", label: "Unit Wise", icon: Grid },
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
                color: isActive ? "#6d28d9" : "#64748b",
                fontWeight: isActive ? "650" : "500",
                fontSize: "0.85rem",
                cursor: "pointer",
                borderBottom: isActive ? "2px solid #7c3aed" : "2px solid transparent",
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
            <div style={{ textAlign: "center", padding: "32px", color: "#64748b", fontSize: "0.8rem" }}>
              No questions found.
            </div>
          )
        )}

        {activeTab === "unit" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {/* Unit Selector */}
            <div style={{ display: "flex", gap: "8px", background: "#f1f5f9", padding: "4px", borderRadius: "6px", width: "max-content" }}>
              {[1, 2].map((u) => {
                const isSelected = selectedUnit === u;
                return (
                  <button
                    key={u}
                    onClick={() => setSelectedUnit(u)}
                    style={{
                      padding: "6px 16px",
                      borderRadius: "4px",
                      border: "none",
                      background: isSelected ? "#ffffff" : "transparent",
                      color: isSelected ? "#6d28d9" : "#475569",
                      fontWeight: isSelected ? "700" : "500",
                      fontSize: "0.8rem",
                      cursor: "pointer",
                      boxShadow: isSelected ? "0 1px 3px rgba(0, 0, 0, 0.05)" : "none",
                      transition: "all 0.15s"
                    }}
                  >
                    Unit {u}
                  </button>
                );
              })}
            </div>

            {/* Questions list for selected unit */}
            {questionsInUnit.length > 0 ? (
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {questionsInUnit.map(renderQuestionCard)}
              </div>
            ) : (
              <div style={{ textAlign: "center", padding: "32px", color: "#64748b", fontSize: "0.8rem" }}>
                No questions found for Unit {selectedUnit}.
              </div>
            )}
          </div>
        )}

        {activeTab === "year" && (
          sortedYears.length > 0 ? (
            sortedYears.map((year) => (
              <div key={year} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <h3 style={{ 
                  fontSize: "0.85rem", 
                  fontWeight: "700", 
                  color: "#0f172a", 
                  paddingBottom: "4px", 
                  borderBottom: "1px solid #e2e8f0",
                  marginTop: "8px",
                  display: "flex",
                  justifyContent: "space-between"
                }}>
                  <span>{year} Semester Exam</span>
                  <span style={{ fontSize: "0.75rem", color: "#64748b", fontWeight: "normal" }}>
                    {questionsByYear[year].length} Questions
                  </span>
                </h3>
                {questionsByYear[year].map(renderQuestionCard)}
              </div>
            ))
          ) : (
            <div style={{ textAlign: "center", padding: "32px", color: "#64748b", fontSize: "0.8rem" }}>
              No questions found.
            </div>
          )
        )}

      </div>
    </div>
  );
}
