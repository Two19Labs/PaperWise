"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { courses } from "@/data/courses";
import { questions } from "@/data/questions";
import { 
  CheckCircle, 
  ChevronDown, 
  ChevronUp, 
  Filter, 
  Search, 
  RefreshCw, 
  TrendingUp, 
  PieChart, 
  BarChart,
  HelpCircle
} from "lucide-react";

export default function AnalyzerPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [completedList, setCompletedList] = useState([]);

  // Filter States
  const [selectedSubjectId, setSelectedSubjectId] = useState("all");
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [selectedYears, setSelectedYears] = useState([]);
  const [selectedDifficulties, setSelectedDifficulties] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("all"); // "all" | "completed" | "uncompleted"
  const [searchQuery, setSearchQuery] = useState("");

  // Expander State for Solutions
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

  // Get active subjects
  const userCourse = courses.find(c => c.id === user.courseId) || courses[0];
  const activeSubjects = userCourse.semesters[user.semester] || [];
  const activeSubjectIds = activeSubjects.map(s => s.id);

  // Set default subject if not initialized
  if (selectedSubjectId === "all" && activeSubjects.length > 0) {
    setSelectedSubjectId(activeSubjects[0].id);
  }

  // Filter questions by active semester subjects first
  const semesterQuestions = questions.filter(q => activeSubjectIds.includes(q.subjectId));

  // Get distinct topics for the currently selected subject
  const currentSubjectQuestions = questions.filter(q => q.subjectId === selectedSubjectId);
  const distinctTopics = Array.from(new Set(currentSubjectQuestions.map(q => q.topic)));

  // Handle multi-select toggle helper
  const handleToggleFilter = (item, list, setter) => {
    if (list.includes(item)) {
      setter(list.filter(i => i !== item));
    } else {
      setter([...list, item]);
    }
  };

  // Perform filtering
  const filteredQuestions = semesterQuestions.filter(q => {
    // Subject filter
    if (selectedSubjectId !== "all" && q.subjectId !== selectedSubjectId) return false;

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

    // Search query filter
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      const textMatches = q.text.toLowerCase().includes(query);
      const topicMatches = q.topic.toLowerCase().includes(query);
      const subtopicMatches = q.subtopic.toLowerCase().includes(query);
      if (!textMatches && !topicMatches && !subtopicMatches) return false;
    }

    return true;
  });

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
    setExpandedQuestions(prev => ({ ...prev, [qId]: !prev[qId] }));
  };

  // Clear filters
  const handleClearFilters = () => {
    setSelectedTopics([]);
    setSelectedYears([]);
    setSelectedDifficulties([]);
    setSelectedTypes([]);
    setSelectedStatus("all");
    setSearchQuery("");
  };

  // --- Analytics calculations from filtered list ---
  const totalInFilter = filteredQuestions.length;
  const completedInFilter = filteredQuestions.filter(q => completedList.includes(q.id)).length;
  const progressPercent = totalInFilter > 0 ? Math.round((completedInFilter / totalInFilter) * 100) : 0;

  // Topic distribution (for charts)
  const topicCounts = filteredQuestions.reduce((acc, q) => {
    acc[q.topic] = (acc[q.topic] || 0) + 1;
    return acc;
  }, {});
  const sortedTopicFrequency = Object.keys(topicCounts)
    .map(topic => ({ topic, count: topicCounts[topic] }))
    .sort((a, b) => b.count - a.count);

  // Difficulty breakdown
  const difficultyCounts = filteredQuestions.reduce((acc, q) => {
    acc[q.difficulty] = (acc[q.difficulty] || 0) + 1;
    return acc;
  }, { Easy: 0, Medium: 0, Hard: 0 });

  // Year distribution
  const yearCounts = filteredQuestions.reduce((acc, q) => {
    acc[q.year] = (acc[q.year] || 0) + 1;
    return acc;
  }, {});

  const currentSubjectObj = activeSubjects.find(s => s.id === selectedSubjectId);

  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "260px 1fr 300px",
      gap: "24px",
      alignItems: "start"
    }}>
      {/* COLUMN 1: FILTER PANEL */}
      <aside className="glass-panel" style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h3 style={{ fontSize: "0.95rem", fontWeight: "700", display: "flex", alignItems: "center", gap: "8px" }}>
            <Filter size={16} /> Filters
          </h3>
          <button 
            onClick={handleClearFilters}
            style={{
              background: "transparent",
              border: "none",
              color: "#3b82f6",
              fontSize: "0.75rem",
              fontWeight: "600",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "4px"
            }}
          >
            <RefreshCw size={12} /> Clear All
          </button>
        </div>

        {/* Subject Filter */}
        <div className="form-group">
          <label className="form-label">SUBJECT</label>
          <select 
            className="input-control select-control"
            value={selectedSubjectId}
            onChange={(e) => {
              setSelectedSubjectId(e.target.value);
              setSelectedTopics([]); // reset topics when subject changes
            }}
            style={{ padding: "8px 12px", fontSize: "0.85rem" }}
          >
            {activeSubjects.map((sub) => (
              <option key={sub.id} value={sub.id} style={{ background: "#0a0e1c" }}>
                {sub.name}
              </option>
            ))}
          </select>
        </div>

        {/* Topic Filter */}
        <div className="form-group">
          <label className="form-label">TOPICS</label>
          <div style={{
            maxHeight: "140px",
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            padding: "4px",
            border: "1px solid rgba(255, 255, 255, 0.04)",
            borderRadius: "6px",
            background: "rgba(0,0,0,0.15)"
          }}>
            {distinctTopics.map((topic) => (
              <label key={topic} className="checkbox-container" style={{ fontSize: "0.8rem" }}>
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
            {distinctTopics.length === 0 && (
              <div style={{ padding: "8px", color: "#64748b", fontSize: "0.75rem" }}>
                No topics available.
              </div>
            )}
          </div>
        </div>

        {/* Year Filter */}
        <div className="form-group">
          <label className="form-label">EXAM YEARS</label>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
            {[2022, 2023, 2024].map((year) => {
              const isSelected = selectedYears.includes(year);
              return (
                <button
                  key={year}
                  onClick={() => handleToggleFilter(year, selectedYears, setSelectedYears)}
                  style={{
                    padding: "4px 10px",
                    borderRadius: "6px",
                    border: isSelected ? "1px solid #3b82f6" : "1px solid rgba(255, 255, 255, 0.08)",
                    background: isSelected ? "rgba(59, 130, 246, 0.15)" : "transparent",
                    color: isSelected ? "#60a5fa" : "#94a3b8",
                    fontSize: "0.75rem",
                    fontWeight: "600",
                    cursor: "pointer",
                    transition: "all 0.15s"
                  }}
                >
                  {year}
                </button>
              );
            })}
          </div>
        </div>

        {/* Difficulty Filter */}
        <div className="form-group">
          <label className="form-label">DIFFICULTY</label>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {["Easy", "Medium", "Hard"].map((diff) => (
              <label key={diff} className="checkbox-container" style={{ fontSize: "0.8rem" }}>
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

        {/* Question Type Filter */}
        <div className="form-group">
          <label className="form-label">QUESTION TYPE</label>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {["MCQ", "Short", "Long", "Numerical"].map((type) => (
              <label key={type} className="checkbox-container" style={{ fontSize: "0.8rem" }}>
                <input 
                  type="checkbox"
                  className="checkbox-input"
                  checked={selectedTypes.includes(type)}
                  onChange={() => handleToggleFilter(type, selectedTypes, setSelectedTypes)}
                />
                <span className="checkmark" />
                <span>{type} Answer</span>
              </label>
            ))}
          </div>
        </div>

        {/* Completion Status Filter */}
        <div className="form-group">
          <label className="form-label">COMPLETION STATUS</label>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {[
              { id: "all", label: "All Questions" },
              { id: "completed", label: "Attempted Only" },
              { id: "uncompleted", label: "Unattempted Only" }
            ].map((opt) => (
              <label key={opt.id} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.8rem", color: "#94a3b8", cursor: "pointer" }}>
                <input 
                  type="radio"
                  name="statusFilter"
                  checked={selectedStatus === opt.id}
                  onChange={() => setSelectedStatus(opt.id)}
                  style={{ accentColor: "#3b82f6" }}
                />
                <span>{opt.label}</span>
              </label>
            ))}
          </div>
        </div>
      </aside>

      {/* COLUMN 2: QUESTION LISTING */}
      <section style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        
        {/* Search Bar & Stats */}
        <div className="glass-panel" style={{ padding: "16px 24px", display: "flex", alignItems: "center", justifyItems: "center", gap: "16px" }}>
          <div style={{ position: "relative", flex: 1 }}>
            <span style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#64748b", display: "flex", alignItems: "center" }}>
              <Search size={16} />
            </span>
            <input 
              type="text"
              placeholder="Search keyword, formula, or topic..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: "100%",
                padding: "8px 16px 8px 36px",
                borderRadius: "6px",
                background: "rgba(255, 255, 255, 0.03)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                color: "#f8fafc",
                fontSize: "0.85rem",
                outline: "none",
              }}
            />
          </div>
          <div style={{ fontSize: "0.8rem", color: "#94a3b8", fontWeight: "500", whiteSpace: "nowrap" }}>
            Showing **{filteredQuestions.length}** of **{semesterQuestions.length}**
          </div>
        </div>

        {/* Dynamic deck list */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {filteredQuestions.length > 0 ? (
            filteredQuestions.map((q) => {
              const isCompleted = completedList.includes(q.id);
              const isExpanded = !!expandedQuestions[q.id];

              return (
                <div 
                  key={q.id}
                  className="glass-panel"
                  style={{
                    padding: "20px",
                    borderLeft: isCompleted ? "4px solid #10b981" : "1px solid rgba(255, 255, 255, 0.06)",
                    transition: "all 0.15s ease",
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px"
                  }}
                >
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "14px" }}>
                    <label className="checkbox-container" style={{ marginTop: "4px" }}>
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
                        fontSize: "0.9rem",
                        lineHeight: "1.55",
                        color: isCompleted ? "#64748b" : "#f8fafc",
                        textDecoration: isCompleted ? "line-through" : "none"
                      }}>
                        {q.text}
                      </p>

                      {/* Info badges */}
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "10px" }}>
                        <span className="badge badge-blue">{q.year}</span>
                        <span className="badge badge-teal">{q.topic}</span>
                        <span className="badge badge-amber">{q.marks}M</span>
                        <span className={`badge ${
                          q.difficulty === "Easy" ? "badge-teal" : 
                          q.difficulty === "Medium" ? "badge-amber" : "badge-rose"
                        }`}>{q.difficulty}</span>
                      </div>
                    </div>

                    <button 
                      onClick={() => handleToggleExpand(q.id)}
                      style={{
                        background: "rgba(255,255,255,0.02)",
                        border: "1px solid rgba(255,255,255,0.06)",
                        borderRadius: "6px",
                        padding: "5px 8px",
                        color: "#94a3b8",
                        fontSize: "0.75rem",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "2px"
                      }}
                    >
                      {isExpanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                      Solution
                    </button>
                  </div>

                  {isExpanded && (
                    <div style={{
                      padding: "12px 16px",
                      background: "rgba(0,0,0,0.25)",
                      borderLeft: "2px solid #3b82f6",
                      borderRadius: "6px",
                      fontSize: "0.85rem",
                      lineHeight: "1.5",
                      color: "#cbd5e1",
                      marginTop: "6px"
                    }}>
                      <div style={{ fontWeight: "700", color: "#60a5fa", marginBottom: "6px", fontSize: "0.75rem", letterSpacing: "0.05em" }}>
                        SOLUTION WORKTHROUGH
                      </div>
                      <div style={{ whiteSpace: "pre-wrap" }}>{q.solution}</div>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="glass-panel" style={{ padding: "48px", textAlign: "center", color: "#64748b" }}>
              No questions match the selected filter combination. Try clearing filters or altering search keywords.
            </div>
          )}
        </div>
      </section>

      {/* COLUMN 3: ANALYTICS PANEL */}
      <aside style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        
        {/* Progress Gauge */}
        <div className="glass-panel" style={{ padding: "20px", textAlign: "center" }}>
          <h3 style={{ fontSize: "0.8rem", color: "#94a3b8", fontWeight: "600", marginBottom: "16px", textTransform: "uppercase" }}>
            Completion Progress
          </h3>
          <div style={{
            position: "relative",
            width: "90px",
            height: "90px",
            borderRadius: "50%",
            background: `conic-gradient(#3b82f6 ${progressPercent}%, rgba(255,255,255,0.04) ${progressPercent}% 100%)`,
            margin: "0 auto 12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}>
            <div style={{
              width: "74px",
              height: "74px",
              borderRadius: "50%",
              background: "#0c0f1c",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center"
            }}>
              <span style={{ fontSize: "1.25rem", fontWeight: "700" }}>{progressPercent}%</span>
              <span style={{ fontSize: "0.6rem", color: "#64748b" }}>COVERED</span>
            </div>
          </div>
          <p style={{ fontSize: "0.8rem", color: "#94a3b8" }}>
            Attempted **{completedInFilter}** of **{totalInFilter}** questions in active selection.
          </p>
        </div>

        {/* Difficulty Breakdown Bar */}
        <div className="glass-panel" style={{ padding: "20px" }}>
          <h3 style={{ fontSize: "0.8rem", color: "#94a3b8", fontWeight: "600", marginBottom: "16px", textTransform: "uppercase" }}>
            Difficulty Breakdown
          </h3>
          
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {["Easy", "Medium", "Hard"].map((lvl) => {
              const count = difficultyCounts[lvl] || 0;
              const pct = totalInFilter > 0 ? Math.round((count / totalInFilter) * 100) : 0;
              const barColor = lvl === "Easy" ? "#10b981" : lvl === "Medium" ? "#f59e0b" : "#f43f5e";
              return (
                <div key={lvl}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", marginBottom: "4px" }}>
                    <span style={{ color: "#e2e8f0" }}>{lvl}</span>
                    <span style={{ color: "#94a3b8" }}>{count} ({pct}%)</span>
                  </div>
                  <div style={{ height: "6px", background: "rgba(255,255,255,0.03)", borderRadius: "3px", overflow: "hidden" }}>
                    <div style={{ width: `${pct}%`, height: "100%", background: barColor, borderRadius: "3px" }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Repeated Topics Heatmap */}
        <div className="glass-panel" style={{ padding: "20px" }}>
          <h3 style={{ fontSize: "0.8rem", color: "#94a3b8", fontWeight: "600", marginBottom: "16px", textTransform: "uppercase" }}>
            Repeated Hot Topics
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {sortedTopicFrequency.slice(0, 4).map((item, idx) => (
              <div key={item.topic} style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "8px 12px",
                background: "rgba(255,255,255,0.02)",
                borderRadius: "6px",
                borderLeft: `3px solid ${idx === 0 ? "#10b981" : "#3b82f6"}`,
                fontSize: "0.8rem"
              }}>
                <span style={{ fontWeight: "500", color: "#e2e8f0" }}>{item.topic}</span>
                <span className="badge badge-blue" style={{ fontSize: "0.65rem" }}>
                  {item.count} appearance{item.count > 1 ? "s" : ""}
                </span>
              </div>
            ))}
            {sortedTopicFrequency.length === 0 && (
              <div style={{ fontSize: "0.75rem", color: "#64748b", textAlign: "center", padding: "12px" }}>
                No active topics.
              </div>
            )}
          </div>
        </div>
      </aside>
    </div>
  );
}
