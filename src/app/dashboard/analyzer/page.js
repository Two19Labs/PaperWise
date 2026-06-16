"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { courses } from "@/data/courses";
import { questions } from "@/data/questions";
import { 
  ChevronDown, 
  ChevronUp, 
  Filter, 
  Search, 
  RefreshCw, 
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

  // Expander State
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

  const semesterQuestions = questions.filter(q => activeSubjectIds.includes(q.subjectId));

  // Topics for selected subject
  const currentSubjectQuestions = questions.filter(q => q.subjectId === selectedSubjectId);
  const distinctTopics = Array.from(new Set(currentSubjectQuestions.map(q => q.topic)));

  const handleToggleFilter = (item, list, setter) => {
    if (list.includes(item)) {
      setter(list.filter(i => i !== item));
    } else {
      setter([...list, item]);
    }
  };

  // Perform filtering
  const filteredQuestions = semesterQuestions.filter(q => {
    if (selectedSubjectId !== "all" && q.subjectId !== selectedSubjectId) return false;
    if (selectedTopics.length > 0 && !selectedTopics.includes(q.topic)) return false;
    if (selectedYears.length > 0 && !selectedYears.includes(q.year)) return false;
    if (selectedDifficulties.length > 0 && !selectedDifficulties.includes(q.difficulty)) return false;
    if (selectedTypes.length > 0 && !selectedTypes.includes(q.type)) return false;

    const isCompleted = completedList.includes(q.id);
    if (selectedStatus === "completed" && !isCompleted) return false;
    if (selectedStatus === "uncompleted" && isCompleted) return false;

    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      const textMatches = q.text.toLowerCase().includes(query);
      const topicMatches = q.topic.toLowerCase().includes(query);
      if (!textMatches && !topicMatches) return false;
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

  const handleToggleExpand = (qId) => {
    setExpandedQuestions(prev => ({ ...prev, [qId]: !prev[qId] }));
  };

  const handleClearFilters = () => {
    setSelectedTopics([]);
    setSelectedYears([]);
    setSelectedDifficulties([]);
    setSelectedTypes([]);
    setSelectedStatus("all");
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

  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "240px 1fr 280px",
      gap: "20px",
      alignItems: "start"
    }}>
      {/* COLUMN 1: FILTERS */}
      <aside className="glass-panel" style={{ padding: "16px", display: "flex", flexDirection: "column", gap: "16px" }}>
        <div style={{ display: "flex", justifyItems: "center", justifyContent: "space-between", alignItems: "center" }}>
          <h3 style={{ fontSize: "0.8rem", fontWeight: "700", display: "flex", alignItems: "center", gap: "6px" }}>
            <Filter size={14} /> FILTERS
          </h3>
          <button 
            onClick={handleClearFilters}
            style={{
              background: "transparent",
              border: "none",
              color: "#a1a1aa",
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

        {/* Subject */}
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
            {activeSubjects.map((sub) => (
              <option key={sub.id} value={sub.id} style={{ background: "#09090b" }}>
                {sub.name}
              </option>
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
            border: "1px solid #27272a",
            borderRadius: "4px",
            background: "#09090b"
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
            {distinctTopics.length === 0 && (
              <div style={{ padding: "6px", color: "#52525b", fontSize: "0.7rem" }}>
                Select a subject first
              </div>
            )}
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
                    border: isSelected ? "1px solid #ffffff" : "1px solid #27272a",
                    background: isSelected ? "#ffffff" : "transparent",
                    color: isSelected ? "#09090b" : "#a1a1aa",
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

        {/* Type */}
        <div className="form-group">
          <label className="form-label">QUESTION TYPE</label>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            {["MCQ", "Short", "Long", "Numerical"].map((type) => (
              <label key={type} className="checkbox-container" style={{ fontSize: "0.75rem" }}>
                <input 
                  type="checkbox"
                  className="checkbox-input"
                  checked={selectedTypes.includes(type)}
                  onChange={() => handleToggleFilter(type, selectedTypes, setSelectedTypes)}
                />
                <span className="checkmark" />
                <span>{type}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Status */}
        <div className="form-group">
          <label className="form-label">STATUS</label>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            {[
              { id: "all", label: "All Questions" },
              { id: "completed", label: "Attempted" },
              { id: "uncompleted", label: "Unattempted" }
            ].map((opt) => (
              <label key={opt.id} style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.75rem", color: "#a1a1aa", cursor: "pointer" }}>
                <input 
                  type="radio"
                  name="statusFilter"
                  checked={selectedStatus === opt.id}
                  onChange={() => setSelectedStatus(opt.id)}
                  style={{ accentColor: "#ffffff" }}
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
        <div className="glass-panel" style={{ padding: "12px 16px", display: "flex", alignItems: "center", justifyItems: "center", gap: "12px" }}>
          <div style={{ position: "relative", flex: 1 }}>
            <span style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", color: "#52525b", display: "flex", alignItems: "center" }}>
              <Search size={14} />
            </span>
            <input 
              type="text"
              placeholder="Search terms, topics, subtopics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: "100%",
                padding: "6px 12px 6px 30px",
                borderRadius: "4px",
                background: "#09090b",
                border: "1px solid #27272a",
                color: "#ffffff",
                fontSize: "0.8rem",
                outline: "none",
              }}
            />
          </div>
          <div style={{ fontSize: "0.75rem", color: "#a1a1aa", whiteSpace: "nowrap" }}>
            Found: **{filteredQuestions.length}**
          </div>
        </div>

        {/* List */}
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {filteredQuestions.length > 0 ? (
            filteredQuestions.map((q) => {
              const isCompleted = completedList.includes(q.id);
              const isExpanded = !!expandedQuestions[q.id];

              return (
                <div 
                  key={q.id}
                  className="glass-panel"
                  style={{
                    padding: "16px",
                    borderLeft: isCompleted ? "2px solid #ffffff" : "1px solid #27272a",
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
                        color: isCompleted ? "#71717a" : "#ffffff",
                        textDecoration: isCompleted ? "line-through" : "none"
                      }}>
                        {q.text}
                      </p>

                      <div style={{ display: "flex", flexWrap: "wrap", gap: "4px", marginTop: "6px" }}>
                        <span className="badge">{q.year}</span>
                        <span className="badge">{q.topic}</span>
                        <span className="badge">{q.marks}M</span>
                        <span className="badge">{q.difficulty}</span>
                      </div>
                    </div>

                    <button 
                      onClick={() => handleToggleExpand(q.id)}
                      style={{
                        background: "#121214",
                        border: "1px solid #27272a",
                        borderRadius: "4px",
                        padding: "3px 6px",
                        color: "#a1a1aa",
                        fontSize: "0.7rem",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "2px"
                      }}
                    >
                      {isExpanded ? "Hide" : "Solution"}
                    </button>
                  </div>

                  {isExpanded && (
                    <div style={{
                      padding: "12px",
                      background: "#09090b",
                      border: "1px solid #27272a",
                      borderRadius: "4px",
                      fontSize: "0.8rem",
                      lineHeight: "1.4",
                      color: "#cbd5e1",
                      marginTop: "4px"
                    }}>
                      <div style={{ fontWeight: "700", color: "#a1a1aa", marginBottom: "4px", fontSize: "0.7rem", letterSpacing: "0.05em" }}>
                        SOLUTION WORKTHROUGH
                      </div>
                      <div style={{ whiteSpace: "pre-wrap" }}>{q.solution}</div>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="glass-panel" style={{ padding: "32px", textAlign: "center", color: "#71717a", fontSize: "0.8rem" }}>
              No matching questions.
            </div>
          )}
        </div>
      </section>

      {/* COLUMN 3: ANALYTICS */}
      <aside style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        
        {/* Simple Progress Box */}
        <div className="glass-panel" style={{ padding: "16px", display: "flex", flexDirection: "column", gap: "8px" }}>
          <span style={{ fontSize: "0.7rem", color: "#a1a1aa", fontWeight: "600", letterSpacing: "0.05em" }}>
            COMPLETION RATE
          </span>
          <div style={{ display: "flex", alignItems: "baseline", gap: "6px" }}>
            <span style={{ fontSize: "1.5rem", fontWeight: "700", color: "#ffffff" }}>
              {progressPercent}%
            </span>
            <span style={{ fontSize: "0.75rem", color: "#71717a" }}>
              ({completedInFilter} / {totalInFilter} solved)
            </span>
          </div>
          <div style={{
            height: "4px",
            background: "#09090b",
            border: "1px solid #27272a",
            borderRadius: "2px",
            overflow: "hidden"
          }}>
            <div style={{ width: `${progressPercent}%`, height: "100%", background: "#ffffff" }} />
          </div>
        </div>

        {/* Difficulty Breakdown (Clean linear blocks) */}
        <div className="glass-panel" style={{ padding: "16px" }}>
          <h3 style={{ fontSize: "0.7rem", color: "#a1a1aa", fontWeight: "600", marginBottom: "12px", letterSpacing: "0.05em" }}>
            DIFFICULTY SPREAD
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {["Easy", "Medium", "Hard"].map((lvl) => {
              const count = difficultyCounts[lvl] || 0;
              const pct = totalInFilter > 0 ? Math.round((count / totalInFilter) * 100) : 0;
              return (
                <div key={lvl}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.7rem", marginBottom: "2px" }}>
                    <span style={{ color: "#ffffff" }}>{lvl}</span>
                    <span style={{ color: "#71717a" }}>{count} ({pct}%)</span>
                  </div>
                  <div style={{ height: "3px", background: "#09090b", borderRadius: "1px", overflow: "hidden" }}>
                    <div style={{ width: `${pct}%`, height: "100%", background: "#ffffff" }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Repeated Hot Topics (Clean simple list) */}
        <div className="glass-panel" style={{ padding: "16px" }}>
          <h3 style={{ fontSize: "0.7rem", color: "#a1a1aa", fontWeight: "600", marginBottom: "12px", letterSpacing: "0.05em" }}>
            TOPIC REPETITIONS
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            {sortedTopicFrequency.slice(0, 3).map((item) => (
              <div key={item.topic} style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "6px 10px",
                background: "#09090b",
                border: "1px solid #27272a",
                borderRadius: "4px",
                fontSize: "0.75rem"
              }}>
                <span style={{ fontWeight: "500", color: "#ffffff" }}>{item.topic}</span>
                <span style={{ color: "#a1a1aa", fontWeight: "600" }}>
                  {item.count}
                </span>
              </div>
            ))}
            {sortedTopicFrequency.length === 0 && (
              <div style={{ fontSize: "0.75rem", color: "#71717a", textAlign: "center" }}>
                No active data.
              </div>
            )}
          </div>
        </div>
      </aside>
    </div>
  );
}
