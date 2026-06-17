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
  Star
} from "lucide-react";

export default function AnalyzerPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [completedList, setCompletedList] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);

  // Cascading Filter States
  const [selectedSemesters, setSelectedSemesters] = useState([]);
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [selectedUnit, setSelectedUnit] = useState("all");
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [selectedYears, setSelectedYears] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("all"); // "all" | "solved" | "unsolved"
  const [filterBookmarkedOnly, setFilterBookmarkedOnly] = useState(false);
  
  const [searchQuery, setSearchQuery] = useState("");
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
    setBookmarks(parsed.bookmarkedQuestions || []);
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

  // Get distinct topics for current filtered set, optionally filtered by unit
  const questionsForTopics = selectedUnit === "all"
    ? baseQuestions
    : baseQuestions.filter(q => q.unit === Number(selectedUnit));
  const distinctTopics = Array.from(new Set(questionsForTopics.map(q => q.topic)));

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
    setSelectedTopics([]);
    setSelectedYears([]);
  };

  // Full filtering pipeline
  const filteredQuestions = baseQuestions.filter(q => {
    // Subject filter (if specific subjects selected)
    if (selectedSubjects.length > 0 && !selectedSubjects.includes(q.subjectId)) return false;

    // Unit filter
    if (selectedUnit !== "all" && q.unit !== Number(selectedUnit)) return false;

    // Topic filter
    if (selectedTopics.length > 0 && !selectedTopics.includes(q.topic)) return false;

    // Year filter
    if (selectedYears.length > 0 && !selectedYears.includes(q.year)) return false;

    // Type filter
    if (selectedTypes.length > 0 && !selectedTypes.includes(q.type)) return false;

    // Status filter
    const isSolved = completedList.includes(q.id);
    if (selectedStatus === "solved" && !isSolved) return false;
    if (selectedStatus === "unsolved" && isSolved) return false;

    // Bookmarked filter
    if (filterBookmarkedOnly && !bookmarks.includes(q.id)) return false;

    // Search query filter
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      const textMatches = q.text.toLowerCase().includes(query);
      const topicMatches = q.topic.toLowerCase().includes(query);
      if (!textMatches && !topicMatches) return false;
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

  const handleToggleBookmark = (qId) => {
    const updated = bookmarks.includes(qId)
      ? bookmarks.filter(id => id !== qId)
      : [...bookmarks, qId];
    setBookmarks(updated);
    updateLocalStorage("bookmarkedQuestions", updated);
  };

  const handleToggleExpand = (qId) => {
    setExpandedQuestions(prev => ({ ...prev, [qId]: !prev[qId] }));
  };

  const handleClearFilters = () => {
    setSelectedSemesters([]);
    setSelectedSubjects([]);
    setSelectedUnit("all");
    setSelectedTopics([]);
    setSelectedYears([]);
    setSelectedTypes([]);
    setSelectedStatus("all");
    setFilterBookmarkedOnly(false);
    setSearchQuery("");
  };

  // Analytics
  const totalInFilter = filteredQuestions.length;
  const solvedInFilter = filteredQuestions.filter(q => completedList.includes(q.id)).length;
  const progressPercent = totalInFilter > 0 ? Math.round((solvedInFilter / totalInFilter) * 100) : 0;

  const topicCounts = filteredQuestions.reduce((acc, q) => {
    acc[q.topic] = (acc[q.topic] || 0) + 1;
    return acc;
  }, {});
  const sortedTopicFrequency = Object.keys(topicCounts)
    .map(topic => ({ topic, count: topicCounts[topic] }))
    .sort((a, b) => b.count - a.count);

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
                      setSelectedTopics([]);
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
                setSelectedTopics([]);
              }}
              style={{ padding: "6px 10px", fontSize: "0.8rem" }}
            >
              <option value="all">All Units</option>
              <option value="1">Unit 1</option>
              <option value="2">Unit 2</option>
            </select>
          </div>
        )}

        {/* 4. TOPICS — visible after ≥1 semester selected */}
        {selectedSemesters.length > 0 && distinctTopics.length > 0 && (
          <div className="form-group">
            <label className="form-label">TOPICS</label>
            <div style={{
              maxHeight: "120px",
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              gap: "6px",
              padding: "6px",
              border: "1px solid #e2e8f0",
              borderRadius: "6px",
              background: "#f9fafb"
            }}>
              {distinctTopics.map((topic) => (
                <label key={topic} className="checkbox-container" style={{ fontSize: "0.75rem" }}>
                  <input 
                    type="checkbox"
                    className="checkbox-input"
                    checked={selectedTopics.includes(topic)}
                    onChange={() => handleToggleFilter(topic, selectedTopics, setSelectedTopics)}
                  />
                  <span className="checkmark" />
                  <span>{topic}</span>
                </label>
              ))}
            </div>
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

        {/* 6. PERSONAL LISTS — visible after ≥1 semester selected */}
        {selectedSemesters.length > 0 && (
          <div className="form-group">
            <label className="form-label">PERSONAL LISTS</label>
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <label className="checkbox-container" style={{ fontSize: "0.75rem" }}>
                <input 
                  type="checkbox"
                  className="checkbox-input"
                  checked={filterBookmarkedOnly}
                  onChange={(e) => setFilterBookmarkedOnly(e.target.checked)}
                />
                <span className="checkmark" />
                <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                  <Star size={12} fill={filterBookmarkedOnly ? "#f58340" : "none"} style={{ color: "#f58340" }} /> Bookmarked
                </span>
              </label>
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
              placeholder="Search keyword, formula, or topic..."
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

        {/* Question List */}
        {selectedSemesters.length > 0 && (
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {filteredQuestions.length > 0 ? (
              filteredQuestions.map((q) => {
                const isSolved = completedList.includes(q.id);
                const isBookmarked = bookmarks.includes(q.id);
                const isExpanded = !!expandedQuestions[q.id];

                // Find subject name for display
                const subjectInfo = availableSubjects.find(s => s.id === q.subjectId);

                return (
                  <div 
                    key={q.id}
                    className="glass-panel"
                    style={{
                      padding: "16px",
                      borderLeft: isSolved ? "3px solid #f58340" : "1px solid #e2e8f0",
                      background: "#ffffff",
                      display: "flex",
                      flexDirection: "column",
                      gap: "8px"
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                      <label className="checkbox-container" style={{ marginTop: "2px" }}>
                        <input 
                          type="checkbox"
                          className="checkbox-input"
                          checked={isSolved}
                          onChange={() => handleToggleCompletion(q.id)}
                        />
                        <span className="checkmark" />
                      </label>

                      <div style={{ flex: 1 }}>
                        <p style={{
                          fontSize: "0.85rem",
                          lineHeight: "1.4",
                          color: isSolved ? "#94a3b8" : "#0f172a",
                          textDecoration: isSolved ? "line-through" : "none"
                        }}>
                          <Latex text={q.text} />
                        </p>

                        <div style={{ display: "flex", flexWrap: "wrap", gap: "4px", marginTop: "6px" }}>
                          <span className="badge badge-orange">{q.year}</span>
                          <span className="badge">{q.topic}</span>
                          <span className="badge">{q.marks}M</span>
                          {subjectInfo && (
                            <span className="badge" style={{ background: "#f0fdf4", color: "#16a34a", border: "1px solid #bbf7d0" }}>
                              {subjectInfo.name.length > 25 ? subjectInfo.name.substring(0, 22) + "…" : subjectInfo.name}
                            </span>
                          )}
                        </div>
                      </div>

                      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                        <button
                          onClick={() => handleToggleBookmark(q.id)}
                          style={{
                            background: "transparent",
                            border: "none",
                            cursor: "pointer",
                            color: isBookmarked ? "#f58340" : "#94a3b8",
                            display: "flex"
                          }}
                        >
                          <Star size={14} fill={isBookmarked ? "#f58340" : "none"} />
                        </button>

                        <button 
                          onClick={() => handleToggleExpand(q.id)}
                          style={{
                            background: "#ffffff",
                            border: "1px solid #e2e8f0",
                            borderRadius: "4px",
                            padding: "3px 6px",
                            color: "#475569",
                            fontSize: "0.7rem",
                            cursor: "pointer",
                          }}
                        >
                          {isExpanded ? "Hide" : "Solution"}
                        </button>
                      </div>
                    </div>

                    {isExpanded && (
                      <div style={{
                        padding: "12px",
                        background: "#f9fafb",
                        border: "1px solid #e2e8f0",
                        borderRadius: "6px",
                        fontSize: "0.8rem",
                        lineHeight: "1.4",
                        color: "#334155",
                        marginTop: "4px"
                      }}>
                        <div style={{ fontWeight: "700", color: "#f58340", marginBottom: "4px", fontSize: "0.7rem", letterSpacing: "0.05em" }}>
                          SOLUTION WORKTHROUGH
                        </div>
                        <div style={{ whiteSpace: "pre-wrap" }}><Latex>{q.solution}</Latex></div>
                      </div>
                    )}
                  </div>
                );
              })
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
              <span>Topics</span>
              <span style={{ fontWeight: "600", color: "#0f172a" }}>
                {selectedTopics.length > 0 ? selectedTopics.length : "All"}
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

        {/* Topic Repetitions */}
        <div className="glass-panel" style={{ padding: "16px", background: "#ffffff" }}>
          <h3 style={{ fontSize: "0.7rem", color: "#64748b", fontWeight: "700", marginBottom: "12px", letterSpacing: "0.05em" }}>
            TOPIC REPETITIONS
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            {sortedTopicFrequency.length > 0 ? (
              sortedTopicFrequency.slice(0, 5).map((item) => (
                <div key={item.topic} style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "6px 10px",
                  background: "#f9fafb",
                  border: "1px solid #e2e8f0",
                  borderRadius: "4px",
                  fontSize: "0.75rem"
                }}>
                  <span style={{ fontWeight: "500", color: "#0f172a" }}>{item.topic}</span>
                  <span className="badge badge-orange" style={{ fontSize: "0.70rem" }}>
                    {item.count}
                  </span>
                </div>
              ))
            ) : (
              <p style={{ fontSize: "0.75rem", color: "#94a3b8", textAlign: "center", padding: "8px" }}>
                Select a semester to see topic data.
              </p>
            )}
          </div>
        </div>
      </aside>
    </div>
  );
}
