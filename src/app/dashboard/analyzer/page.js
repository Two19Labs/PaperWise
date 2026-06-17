"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { courses } from "@/data/courses";
import { questions } from "@/data/questions";
import Latex from "@/components/Latex";
import { 
  ChevronDown, 
  ChevronUp, 
  Filter, 
  Search, 
  RefreshCw,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

export default function AnalyzerPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [completedList, setCompletedList] = useState([]);

  // Cascading Filter States
  const [selectedSemesters, setSelectedSemesters] = useState([]);
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [selectedUnit, setSelectedUnit] = useState("all");
  const [selectedYears, setSelectedYears] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("all"); // "all" | "solved" | "unsolved"
  
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedQuestions, setExpandedQuestions] = useState({});
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);

  // Reset active index when filter criteria changes
  useEffect(() => {
    setActiveQuestionIndex(0);
  }, [selectedSemesters, selectedSubjects, selectedUnit, selectedYears, selectedTypes, selectedStatus, searchQuery]);

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

  // Load the user's course data
  const userCourse = courses.find(c => c.id === user.courseId) || courses[0];
  const semesterKeys = Object.keys(userCourse.semesters).map(Number).sort((a, b) => a - b);

  // Build subject list from selected semesters
  const availableSubjects = [];
  selectedSemesters.forEach(sem => {
    const semSubjects = userCourse.semesters[sem] || [];
    semSubjects.forEach(sub => {
      if (!availableSubjects.some(s => s.id === sub.id)) {
        availableSubjects.push({ ...sub, semester: sem });
      }
    });
  });

  // Determine active subject IDs for filtering
  const activeSubjectIds = selectedSubjects.length > 0
    ? selectedSubjects
    : availableSubjects.map(s => s.id);

  // Base question set: only from active subjects (or empty if no semester selected)
  const baseQuestions = selectedSemesters.length === 0
    ? []
    : questions.filter(q => activeSubjectIds.includes(q.subjectId));



  // Get distinct years from the base set
  const distinctYears = Array.from(new Set(baseQuestions.map(q => q.year))).sort((a, b) => b - a);

  const handleToggleFilter = (item, list, setter) => {
    if (list.includes(item)) {
      setter(list.filter(i => i !== item));
    } else {
      setter([...list, item]);
    }
  };

  const handleSemesterToggle = (sem) => {
    let updated;
    if (selectedSemesters.includes(sem)) {
      updated = selectedSemesters.filter(s => s !== sem);
    } else {
      updated = [...selectedSemesters, sem].sort((a, b) => a - b);
    }
    setSelectedSemesters(updated);
    // Reset downstream filters when semesters change
    setSelectedSubjects([]);
    setSelectedUnit("all");
    setSelectedYears([]);
  };

  // Full filtering pipeline
  const filteredQuestions = baseQuestions.filter(q => {
    // Subject filter (if specific subjects selected)
    if (selectedSubjects.length > 0 && !selectedSubjects.includes(q.subjectId)) return false;

    // Unit filter
    if (selectedUnit !== "all" && q.unit !== Number(selectedUnit)) return false;

    // Year filter
    if (selectedYears.length > 0 && !selectedYears.includes(q.year)) return false;

    // Type filter
    if (selectedTypes.length > 0 && !selectedTypes.includes(q.type)) return false;

    // Status filter
    const isSolved = completedList.includes(q.id);
    if (selectedStatus === "solved" && !isSolved) return false;
    if (selectedStatus === "unsolved" && isSolved) return false;

    // Search query filter
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      const textMatches = q.text.toLowerCase().includes(query);
      if (!textMatches) return false;
    }

    return true;
  });

  // Toggle handlers with persistence
  const updateLocalStorage = (key, val) => {
    const updatedUser = { ...user, [key]: val };
    setUser(updatedUser);
    localStorage.setItem("paperwise_user", JSON.stringify(updatedUser));
  };

  const handleToggleCompletion = (qId) => {
    const updated = completedList.includes(qId)
      ? completedList.filter(id => id !== qId)
      : [...completedList, qId];
    setCompletedList(updated);
    updateLocalStorage("completedQuestions", updated);
  };



  const handleToggleExpand = (qId) => {
    setExpandedQuestions(prev => ({ ...prev, [qId]: !prev[qId] }));
  };

  const handleClearFilters = () => {
    setSelectedSemesters([]);
    setSelectedSubjects([]);
    setSelectedUnit("all");
    setSelectedYears([]);
    setSelectedTypes([]);
    setSelectedStatus("all");
    setSearchQuery("");
  };

  // Analytics
  const totalInFilter = filteredQuestions.length;
  const solvedInFilter = filteredQuestions.filter(q => completedList.includes(q.id)).length;
  const progressPercent = totalInFilter > 0 ? Math.round((solvedInFilter / totalInFilter) * 100) : 0;



  // Check if unit filter should be shown (only when exactly one subject is selected)
  const showUnitFilter = selectedSubjects.length === 1;

  return (
    <div className="analyzer-layout-container">
      {/* COLUMN 1: FILTERS */}
      <aside className="glass-panel" style={{ padding: "16px", display: "flex", flexDirection: "column", gap: "16px", background: "#ffffff" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h3 style={{ fontSize: "0.8rem", fontWeight: "700", display: "flex", alignItems: "center", gap: "6px", color: "#0f172a" }}>
            <Filter size={14} /> FILTERS
          </h3>
          <button 
            onClick={handleClearFilters}
            style={{
              background: "transparent",
              border: "none",
              color: "#f58340",
              fontSize: "0.7rem",
              fontWeight: "600",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "2px",
              textDecoration: "underline"
            }}
          >
            <RefreshCw size={10} /> Clear
          </button>
        </div>

        {/* 1. SEMESTER — always visible */}
        <div className="form-group">
          <label className="form-label">SEMESTER</label>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
            {semesterKeys.map((sem) => {
              const isSelected = selectedSemesters.includes(sem);
              return (
                <button
                  key={sem}
                  onClick={() => handleSemesterToggle(sem)}
                  style={{
                    padding: "5px 14px",
                    borderRadius: "16px",
                    border: isSelected ? "1.5px solid #f58340" : "1px solid #e2e8f0",
                    background: isSelected ? "#fff7ed" : "#f9fafb",
                    color: isSelected ? "#ea580c" : "#475569",
                    fontSize: "0.75rem",
                    fontWeight: isSelected ? "700" : "500",
                    cursor: "pointer",
                    transition: "all 0.15s ease"
                  }}
                >
                  Sem {sem}
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. SUBJECTS — visible after ≥1 semester selected */}
        {selectedSemesters.length > 0 && (
          <div className="form-group">
            <label className="form-label">SUBJECTS</label>
            <div style={{
              maxHeight: "150px",
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              gap: "6px",
              padding: "6px",
              border: "1px solid #e2e8f0",
              borderRadius: "6px",
              background: "#f9fafb"
            }}>
              {availableSubjects.map((sub) => (
                <label key={sub.id} className="checkbox-container" style={{ fontSize: "0.75rem" }}>
                  <input 
                    type="checkbox"
                    className="checkbox-input"
                    checked={selectedSubjects.includes(sub.id)}
                    onChange={() => {
                      handleToggleFilter(sub.id, selectedSubjects, setSelectedSubjects);
                      setSelectedUnit("all");
                    }}
                  />
                  <span className="checkmark" />
                  <span style={{ display: "flex", justifyContent: "space-between", flex: 1, gap: "4px" }}>
                    <span>{sub.name}</span>
                    <span style={{ color: "#94a3b8", fontSize: "0.65rem", flexShrink: 0 }}>S{sub.semester}</span>
                  </span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* 3. UNIT — visible when exactly one subject is selected */}
        {showUnitFilter && (
          <div className="form-group">
            <label className="form-label">UNIT</label>
            <select
              className="input-control select-control"
              value={selectedUnit}
              onChange={(e) => {
                setSelectedUnit(e.target.value);
              }}
              style={{ padding: "6px 10px", fontSize: "0.8rem" }}
            >
              <option value="all">All Units</option>
              <option value="1">Unit 1</option>
              <option value="2">Unit 2</option>
            </select>
          </div>
        )}



        {/* 5. EXAM YEARS — visible after ≥1 semester selected */}
        {selectedSemesters.length > 0 && distinctYears.length > 0 && (
          <div className="form-group">
            <label className="form-label">EXAM YEARS</label>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
              {distinctYears.map((year) => {
                const isSelected = selectedYears.includes(year);
                return (
                  <button
                    key={year}
                    onClick={() => handleToggleFilter(year, selectedYears, setSelectedYears)}
                    style={{
                      padding: "3px 8px",
                      borderRadius: "4px",
                      border: isSelected ? "1px solid #f58340" : "1px solid #e2e8f0",
                      background: isSelected ? "#fff7ed" : "transparent",
                      color: isSelected ? "#ea580c" : "#475569",
                      fontSize: "0.7rem",
                      fontWeight: "600",
                      cursor: "pointer",
                    }}
                  >
                    {year}
                  </button>
                );
              })}
            </div>
          </div>
        )}



        {/* 7. COMPLETION — visible after ≥1 semester selected */}
        {selectedSemesters.length > 0 && (
          <div className="form-group">
            <label className="form-label">COMPLETION</label>
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              {[
                { id: "all", label: "All Questions" },
                { id: "solved", label: "Solved Only" },
                { id: "unsolved", label: "Unsolved Only" }
              ].map((opt) => (
                <label key={opt.id} style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.75rem", color: "#475569", cursor: "pointer" }}>
                  <input 
                    type="radio"
                    name="statusFilter"
                    checked={selectedStatus === opt.id}
                    onChange={() => setSelectedStatus(opt.id)}
                    style={{ accentColor: "#f58340" }}
                  />
                  <span>{opt.label}</span>
                </label>
              ))}
            </div>
          </div>
        )}
      </aside>

      {/* COLUMN 2: DECK */}
      <section style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        
        {/* Search */}
        <div className="glass-panel" style={{ padding: "12px 16px", display: "flex", alignItems: "center", justifyItems: "center", gap: "12px", background: "#ffffff" }}>
          <div style={{ position: "relative", flex: 1 }}>
            <span style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", color: "#94a3b8", display: "flex", alignItems: "center" }}>
              <Search size={14} />
            </span>
            <input 
              type="text"
              placeholder="Search keyword or formula..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: "100%",
                padding: "6px 12px 6px 30px",
                borderRadius: "6px",
                background: "#ffffff",
                border: "1px solid #e2e8f0",
                color: "#0f172a",
                fontSize: "0.8rem",
                outline: "none",
              }}
            />
          </div>
          <div style={{ fontSize: "0.75rem", color: "#475569", whiteSpace: "nowrap" }}>
            Filtered: <strong>{filteredQuestions.length}</strong>
          </div>
        </div>

        {/* Empty state when no semester selected */}
        {selectedSemesters.length === 0 && (
          <div className="glass-panel" style={{
            padding: "48px 32px",
            textAlign: "center",
            background: "#ffffff",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "12px"
          }}>
            <div style={{
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              background: "#fff7ed",
              border: "1px solid rgba(245, 131, 64, 0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#f58340"
            }}>
              <Filter size={20} />
            </div>
            <div>
              <p style={{ color: "#0f172a", fontWeight: "600", fontSize: "0.9rem", marginBottom: "4px" }}>
                Select a semester to get started
              </p>
              <p style={{ color: "#64748b", fontSize: "0.8rem" }}>
                Choose one or more semesters from the filter panel to load questions.
              </p>
            </div>
          </div>
        )}

        {/* Question Pagination Deck */}
        {selectedSemesters.length > 0 && (
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {filteredQuestions.length > 0 ? (
              <>
                {/* Numbered Boxes Navigation */}
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <button
                    disabled={activeQuestionIndex === 0}
                    onClick={() => setActiveQuestionIndex(prev => prev - 1)}
                    style={{
                      background: "#ffffff",
                      border: "1.5px solid #e2e8f0",
                      borderRadius: "6px",
                      width: "36px",
                      height: "36px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: activeQuestionIndex === 0 ? "#cbd5e1" : "#475569",
                      cursor: activeQuestionIndex === 0 ? "not-allowed" : "pointer",
                      transition: "all 0.15s ease",
                      flexShrink: 0
                    }}
                  >
                    <ChevronLeft size={16} />
                  </button>

                  <div style={{
                    display: "flex",
                    gap: "6px",
                    overflowX: "auto",
                    paddingBottom: "4px",
                    scrollbarWidth: "none",
                    msOverflowStyle: "none"
                  }}>
                    {filteredQuestions.map((_, index) => {
                      const isActive = index === activeQuestionIndex;
                      return (
                        <button
                          key={index}
                          onClick={() => setActiveQuestionIndex(index)}
                          style={{
                            width: "36px",
                            height: "36px",
                            borderRadius: "6px",
                            border: "none",
                            background: isActive ? "#0f172a" : "#f1f5f9",
                            color: isActive ? "#ffffff" : "#475569",
                            fontWeight: isActive ? "700" : "500",
                            fontSize: "0.85rem",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                            transition: "all 0.15s ease"
                          }}
                        >
                          {index + 1}
                        </button>
                      );
                    })}
                  </div>

                  <button
                    disabled={activeQuestionIndex === filteredQuestions.length - 1}
                    onClick={() => setActiveQuestionIndex(prev => prev + 1)}
                    style={{
                      background: "#ffffff",
                      border: "1.5px solid #e2e8f0",
                      borderRadius: "6px",
                      width: "36px",
                      height: "36px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: activeQuestionIndex === filteredQuestions.length - 1 ? "#cbd5e1" : "#475569",
                      cursor: activeQuestionIndex === filteredQuestions.length - 1 ? "not-allowed" : "pointer",
                      transition: "all 0.15s ease",
                      flexShrink: 0
                    }}
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>

                {/* Single Active Question Card */}
                {(() => {
                  const activeQuestion = filteredQuestions[activeQuestionIndex] || filteredQuestions[0];
                  if (!activeQuestion) return null;

                  const isSolved = completedList.includes(activeQuestion.id);
                  const isExpanded = !!expandedQuestions[activeQuestion.id];
                  const subjectInfo = availableSubjects.find(s => s.id === activeQuestion.subjectId);

                  return (
                    <div 
                      className="glass-panel"
                      style={{
                        padding: "24px",
                        borderLeft: isSolved ? "4px solid #f58340" : "1px solid #e2e8f0",
                        background: "#ffffff",
                        display: "flex",
                        flexDirection: "column",
                        gap: "16px",
                        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.025)"
                      }}
                    >
                      {/* Top Row: Badges & Solved status */}
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "10px" }}>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                          <span className="badge badge-orange" style={{ padding: "4px 8px", fontSize: "0.75rem" }}>{activeQuestion.year}</span>
                          <span className="badge" style={{ padding: "4px 8px", fontSize: "0.75rem" }}>{activeQuestion.marks}M</span>
                          {subjectInfo && (
                            <span className="badge" style={{ background: "#f0fdf4", color: "#16a34a", border: "1px solid #bbf7d0", padding: "4px 8px", fontSize: "0.75rem" }}>
                              {subjectInfo.name}
                            </span>
                          )}
                        </div>

                        <label className="checkbox-container" style={{ fontSize: "0.85rem", fontWeight: "600", display: "flex", alignItems: "center", gap: "6px", cursor: "pointer", userSelect: "none" }}>
                          <input 
                            type="checkbox"
                            className="checkbox-input"
                            checked={isSolved}
                            onChange={() => handleToggleCompletion(activeQuestion.id)}
                          />
                          <span className="checkmark" />
                          <span style={{ color: isSolved ? "#f58340" : "#475569" }}>
                            {isSolved ? "Solved" : "Mark Solved"}
                          </span>
                        </label>
                      </div>

                      {/* Body: Large Latex question text */}
                      <div style={{
                        fontSize: "0.95rem",
                        lineHeight: "1.6",
                        color: "#0f172a",
                        padding: "12px 0",
                        borderBottom: "1px solid #f1f5f9"
                      }}>
                        <Latex text={activeQuestion.text} />
                      </div>

                      {/* Bottom Row: Solution Toggle Button */}
                      <div style={{ display: "flex", justifyContent: "center", marginTop: "4px" }}>
                        <button 
                          onClick={() => handleToggleExpand(activeQuestion.id)}
                          style={{
                            background: isExpanded ? "#f1f5f9" : "#0f172a",
                            border: "none",
                            borderRadius: "6px",
                            padding: "8px 18px",
                            color: isExpanded ? "#0f172a" : "#ffffff",
                            fontSize: "0.8rem",
                            fontWeight: "600",
                            cursor: "pointer",
                            transition: "all 0.15s ease",
                            display: "flex",
                            alignItems: "center",
                            gap: "6px"
                          }}
                        >
                          {isExpanded ? "Hide Solution" : "Show Solution"}
                          {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                        </button>
                      </div>

                      {/* Solution Walkthrough box */}
                      {isExpanded && (
                        <div style={{
                          padding: "20px",
                          background: "#f8fafc",
                          border: "1px solid #e2e8f0",
                          borderRadius: "8px",
                          fontSize: "0.85rem",
                          lineHeight: "1.6",
                          color: "#334155",
                          marginTop: "8px",
                          boxShadow: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.02)"
                        }}>
                          <div style={{ fontWeight: "700", color: "#f58340", marginBottom: "8px", fontSize: "0.75rem", letterSpacing: "0.05em" }}>
                            SOLUTION WORKTHROUGH
                          </div>
                          <div style={{ whiteSpace: "pre-wrap" }}><Latex>{activeQuestion.solution}</Latex></div>
                        </div>
                      )}
                    </div>
                  );
                })()}
              </>
            ) : (
              <div className="glass-panel" style={{ padding: "32px", textAlign: "center", color: "#64748b", fontSize: "0.8rem", background: "#ffffff" }}>
                No matching questions found. Try adjusting your filters.
              </div>
            )}
          </div>
        )}
      </section>

      {/* COLUMN 3: ANALYTICS */}
      <aside className="analyzer-sidebar-right">
        
        {/* Progress Box */}
        <div className="glass-panel" style={{ padding: "16px", display: "flex", flexDirection: "column", gap: "8px", background: "#ffffff" }}>
          <span style={{ fontSize: "0.7rem", color: "#64748b", fontWeight: "700", letterSpacing: "0.05em" }}>
            COMPLETION RATE
          </span>
          <div style={{ display: "flex", alignItems: "baseline", gap: "4px" }}>
            <span style={{ fontSize: "1.5rem", fontWeight: "800", color: "#f58340" }}>
              {progressPercent}%
            </span>
            <span style={{ fontSize: "0.75rem", color: "#64748b" }}>
              ({solvedInFilter} / {totalInFilter} solved)
            </span>
          </div>
          <div style={{
            height: "4px",
            background: "#f3f4f6",
            border: "1px solid #e2e8f0",
            borderRadius: "2px",
            overflow: "hidden"
          }}>
            <div style={{ width: `${progressPercent}%`, height: "100%", background: "#f58340" }} />
          </div>
        </div>

        {/* Active Filters Summary */}
        <div className="glass-panel" style={{ padding: "16px", background: "#ffffff" }}>
          <h3 style={{ fontSize: "0.7rem", color: "#64748b", fontWeight: "700", marginBottom: "12px", letterSpacing: "0.05em" }}>
            ACTIVE FILTERS
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px", fontSize: "0.75rem", color: "#475569" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>Semesters</span>
              <span style={{ fontWeight: "600", color: "#0f172a" }}>
                {selectedSemesters.length > 0 ? selectedSemesters.map(s => `S${s}`).join(", ") : "—"}
              </span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>Subjects</span>
              <span style={{ fontWeight: "600", color: "#0f172a" }}>
                {selectedSubjects.length > 0 ? selectedSubjects.length : "All"}
              </span>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>Years</span>
              <span style={{ fontWeight: "600", color: "#0f172a" }}>
                {selectedYears.length > 0 ? selectedYears.join(", ") : "All"}
              </span>
            </div>
          </div>
        </div>


      </aside>
    </div>
  );
}
