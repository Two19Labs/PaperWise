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
  Star,
  HelpCircle
} from "lucide-react";

export default function AnalyzerPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [completedList, setCompletedList] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  const [doubts, setDoubts] = useState([]);

  // Filter States
  const [selectedSubjectId, setSelectedSubjectId] = useState("all");
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [selectedYears, setSelectedYears] = useState([]);
  const [selectedDifficulties, setSelectedDifficulties] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("all"); // "all" | "completed" | "uncompleted"
  const [filterBookmarkedOnly, setFilterBookmarkedOnly] = useState(false);
  const [filterDoubtOnly, setFilterDoubtOnly] = useState(false);
  
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
    setDoubts(parsed.doubtQuestions || []);
  }, [router]);

  if (!user) {
    return null;
  }

  // Load subjects ONLY for the user's chosen course
  const userCourse = courses.find(c => c.id === user.courseId) || courses[0];
  const allSubjects = [];
  Object.keys(userCourse.semesters).forEach(sem => {
    userCourse.semesters[sem].forEach(sub => {
      if (!allSubjects.some(s => s.id === sub.id)) {
        allSubjects.push({
          ...sub,
          courseName: userCourse.name.includes("[") ? userCourse.name.split("[")[1].replace("]", "") : userCourse.name,
          courseId: userCourse.id,
          semester: sem
        });
      }
    });
  });

  const allSubjectIds = allSubjects.map(s => s.id);

  // Filter questions globally or by subject
  const currentQuestionsSet = selectedSubjectId === "all"
    ? questions.filter(q => allSubjectIds.includes(q.subjectId))
    : questions.filter(q => q.subjectId === selectedSubjectId);

  // Get distinct topics for current subject(s)
  const distinctTopics = Array.from(new Set(currentQuestionsSet.map(q => q.topic)));

  const handleToggleFilter = (item, list, setter) => {
    if (list.includes(item)) {
      setter(list.filter(i => i !== item));
    } else {
      setter([...list, item]);
    }
  };

  // Perform filtering
  const filteredQuestions = questions.filter(q => {
    // Subject filter
    if (selectedSubjectId !== "all" && q.subjectId !== selectedSubjectId) return false;
    
    // Global safety check (only show questions mapping to our SSCBS subject list)
    if (selectedSubjectId === "all" && !allSubjectIds.includes(q.subjectId)) return false;

    // Topic filter
    if (selectedTopics.length > 0 && !selectedTopics.includes(q.topic)) return false;

    // Year filter
    if (selectedYears.length > 0 && !selectedYears.includes(q.year)) return false;

    // Difficulty filter
    if (selectedDifficulties.length > 0 && !selectedDifficulties.includes(q.difficulty)) return false;

    // Type filter
    if (selectedTypes.length > 0 && !selectedTypes.includes(q.type)) return false;

    // Status filter
    const isCompleted = completedList.includes(q.id);
    if (selectedStatus === "completed" && !isCompleted) return false;
    if (selectedStatus === "uncompleted" && isCompleted) return false;

    // Bookmarked filter
    if (filterBookmarkedOnly && !bookmarks.includes(q.id)) return false;

    // Doubt filter
    if (filterDoubtOnly && !doubts.includes(q.id)) return false;

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

  const handleToggleDoubt = (qId) => {
    const updated = doubts.includes(qId)
      ? doubts.filter(id => id !== qId)
      : [...doubts, qId];
    setDoubts(updated);
    updateLocalStorage("doubtQuestions", updated);
  };

  const handleToggleExpand = (qId) => {
    setExpandedQuestions(prev => ({ ...prev, [qId]: !prev[qId] }));
  };

  const handleClearFilters = () => {
    setSelectedTopics([]);
    setSelectedYears([]);
    setSelectedDifficulties([]);
    setSelectedTypes([]);
    setSelectedStatus("all");
    setFilterBookmarkedOnly(false);
    setFilterDoubtOnly(false);
    setSearchQuery("");
  };

  // Analytics
  const totalInFilter = filteredQuestions.length;
  const completedInFilter = filteredQuestions.filter(q => completedList.includes(q.id)).length;
  const progressPercent = totalInFilter > 0 ? Math.round((completedInFilter / totalInFilter) * 100) : 0;

  const topicCounts = filteredQuestions.reduce((acc, q) => {
    acc[q.topic] = (acc[q.topic] || 0) + 1;
    return acc;
  }, {});
  const sortedTopicFrequency = Object.keys(topicCounts)
    .map(topic => ({ topic, count: topicCounts[topic] }))
    .sort((a, b) => b.count - a.count);

  const difficultyCounts = filteredQuestions.reduce((acc, q) => {
    acc[q.difficulty] = (acc[q.difficulty] || 0) + 1;
    return acc;
  }, { Easy: 0, Medium: 0, Hard: 0 });

  // Group subjects by Course for optgroup layout
  const subjectsByCourse = allSubjects.reduce((acc, s) => {
    if (!acc[s.courseName]) acc[s.courseName] = [];
    acc[s.courseName].push(s);
    return acc;
  }, {});

  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "240px 1fr 280px",
      gap: "20px",
      alignItems: "start"
    }}>
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

        {/* Subject dropdown grouped by course */}
        <div className="form-group">
          <label className="form-label">SUBJECT</label>
          <select 
            className="input-control select-control"
            value={selectedSubjectId}
            onChange={(e) => {
              setSelectedSubjectId(e.target.value);
              setSelectedTopics([]);
            }}
            style={{ padding: "6px 10px", fontSize: "0.8rem" }}
          >
            <option value="all">All Subjects (SSCBS)</option>
            {Object.keys(subjectsByCourse).map(courseName => (
              <optgroup key={courseName} label={courseName} style={{ background: "#ffffff", fontWeight: "600" }}>
                {subjectsByCourse[courseName].map(sub => (
                  <option key={sub.id} value={sub.id} style={{ background: "#ffffff", fontWeight: "normal" }}>
                    {sub.name} (S{sub.semester})
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>

        {/* Topics */}
        <div className="form-group">
          <label className="form-label">TOPICS</label>
          <div style={{
            maxHeight: "120px",
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            gap: "6px",
            padding: "4px",
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

        {/* Years */}
        <div className="form-group">
          <label className="form-label">EXAM YEARS</label>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
            {[2022, 2023, 2024].map((year) => {
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

        {/* Personal Lists */}
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
            <label className="checkbox-container" style={{ fontSize: "0.75rem" }}>
              <input 
                type="checkbox"
                className="checkbox-input"
                checked={filterDoubtOnly}
                onChange={(e) => setFilterDoubtOnly(e.target.checked)}
              />
              <span className="checkmark" />
              <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                <HelpCircle size={12} style={{ color: "#ef4444" }} /> Doubt Basket
              </span>
            </label>
          </div>
        </div>

        {/* Difficulty */}
        <div className="form-group">
          <label className="form-label">DIFFICULTY</label>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            {["Easy", "Medium", "Hard"].map((diff) => (
              <label key={diff} className="checkbox-container" style={{ fontSize: "0.75rem" }}>
                <input 
                  type="checkbox"
                  className="checkbox-input"
                  checked={selectedDifficulties.includes(diff)}
                  onChange={() => handleToggleFilter(diff, selectedDifficulties, setSelectedDifficulties)}
                />
                <span className="checkmark" />
                <span>{diff}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Completion */}
        <div className="form-group">
          <label className="form-label">COMPLETION</label>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            {[
              { id: "all", label: "All Questions" },
              { id: "completed", label: "Attempted Only" },
              { id: "uncompleted", label: "Unattempted Only" }
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
            Filtered: **{filteredQuestions.length}**
          </div>
        </div>

        {/* List */}
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {filteredQuestions.length > 0 ? (
            filteredQuestions.map((q) => {
              const isCompleted = completedList.includes(q.id);
              const isBookmarked = bookmarks.includes(q.id);
              const isDoubt = doubts.includes(q.id);
              const isExpanded = !!expandedQuestions[q.id];

              return (
                <div 
                  key={q.id}
                  className="glass-panel"
                  style={{
                    padding: "16px",
                    borderLeft: isCompleted ? "3px solid #f58340" : "1px solid #e2e8f0",
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
                        checked={isCompleted}
                        onChange={() => handleToggleCompletion(q.id)}
                      />
                      <span className="checkmark" />
                    </label>

                    <div style={{ flex: 1 }}>
                      <p style={{
                        fontSize: "0.85rem",
                        lineHeight: "1.4",
                        color: isCompleted ? "#94a3b8" : "#0f172a",
                        textDecoration: isCompleted ? "line-through" : "none"
                      }}>
                        <Latex text={q.text} />
                      </p>

                      <div style={{ display: "flex", flexWrap: "wrap", gap: "4px", marginTop: "6px" }}>
                        <span className="badge badge-orange">{q.year}</span>
                        <span className="badge">{q.topic}</span>
                        <span className="badge">{q.marks}M</span>
                        <span className="badge">{q.difficulty}</span>
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
                        onClick={() => handleToggleDoubt(q.id)}
                        style={{
                          background: "transparent",
                          border: "none",
                          cursor: "pointer",
                          color: isDoubt ? "#ef4444" : "#94a3b8",
                          display: "flex"
                        }}
                      >
                        <HelpCircle size={14} fill={isDoubt ? "rgba(239, 68, 68, 0.05)" : "none"} />
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
              No matching questions found.
            </div>
          )}
        </div>
      </section>

      {/* COLUMN 3: ANALYTICS */}
      <aside style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        
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
              ({completedInFilter} / {totalInFilter} solved)
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

        {/* Difficulty */}
        <div className="glass-panel" style={{ padding: "16px", background: "#ffffff" }}>
          <h3 style={{ fontSize: "0.7rem", color: "#64748b", fontWeight: "700", marginBottom: "12px", letterSpacing: "0.05em" }}>
            DIFFICULTY SPREAD
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {["Easy", "Medium", "Hard"].map((lvl) => {
              const count = difficultyCounts[lvl] || 0;
              const pct = totalInFilter > 0 ? Math.round((count / totalInFilter) * 100) : 0;
              return (
                <div key={lvl}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.7rem", marginBottom: "2px" }}>
                    <span style={{ color: "#0f172a", fontWeight: "500" }}>{lvl}</span>
                    <span style={{ color: "#64748b" }}>{count} ({pct}%)</span>
                  </div>
                  <div style={{ height: "4px", background: "#f3f4f6", border: "1px solid #e2e8f0", borderRadius: "2px", overflow: "hidden" }}>
                    <div style={{ width: `${pct}%`, height: "100%", background: "#f58340" }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Topic Repetitions */}
        <div className="glass-panel" style={{ padding: "16px", background: "#ffffff" }}>
          <h3 style={{ fontSize: "0.7rem", color: "#64748b", fontWeight: "700", marginBottom: "12px", letterSpacing: "0.05em" }}>
            TOPIC REPETITIONS
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            {sortedTopicFrequency.slice(0, 3).map((item) => (
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
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
}
