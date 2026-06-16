"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { colleges } from "@/data/colleges";
import { courses } from "@/data/courses";
import { Mail, Lock, ArrowRight, ArrowLeft, BookOpen, Search, Check } from "lucide-react";

export default function SignupPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  // Onboarding states
  const [selectedCollege, setSelectedCollege] = useState("");
  const [searchCollegeQuery, setSearchCollegeQuery] = useState("");
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [selectedSemester, setSelectedSemester] = useState(1);
  
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Filtered colleges list
  const filteredColleges = colleges.filter(college =>
    college.toLowerCase().includes(searchCollegeQuery.toLowerCase())
  );

  const handleNextStep = () => {
    if (step === 1) {
      if (!email || !password) {
        setError("Please enter your email and password.");
        return;
      }
      if (password.length < 6) {
        setError("Password must be at least 6 characters.");
        return;
      }
    } else if (step === 2) {
      if (!selectedCollege) {
        setError("Please select your college.");
        return;
      }
    } else if (step === 3) {
      if (!selectedCourseId) {
        setError("Please select your course.");
        return;
      }
    }
    
    setError("");
    setStep(step + 1);
  };

  const handlePrevStep = () => {
    setError("");
    setStep(step - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    const courseObj = courses.find(c => c.id === selectedCourseId);

    setTimeout(() => {
      setIsLoading(false);
      localStorage.setItem(
        "paperwise_user",
        JSON.stringify({
          email,
          name: email.split("@")[0],
          college: selectedCollege,
          courseId: selectedCourseId,
          courseName: courseObj ? courseObj.name : "Custom Course",
          semester: parseInt(selectedSemester),
          completedQuestions: [] // New user starts with 0 completions
        })
      );
      router.push("/dashboard");
    }, 1200);
  };

  const currentCourse = courses.find(c => c.id === selectedCourseId);

  return (
    <main style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "linear-gradient(-45deg, #070913, #0f1322, #072e1c, #070913)",
      backgroundSize: "400% 400%",
      padding: "20px",
    }}>
      <div style={{
        width: "100%",
        maxWidth: "480px",
        padding: "40px 30px",
        borderRadius: "16px",
        background: "rgba(255, 255, 255, 0.02)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        border: "1px solid rgba(255, 255, 255, 0.06)",
        boxShadow: "0 20px 50px rgba(0, 0, 0, 0.7)",
      }}>
        {/* Step Indicator */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px" }}>
          <div style={{ display: "flex", gap: "6px" }}>
            {[1, 2, 3, 4].map((s) => (
              <div
                key={s}
                style={{
                  height: "4px",
                  width: "24px",
                  borderRadius: "2px",
                  background: s <= step ? "#3b82f6" : "rgba(255, 255, 255, 0.1)",
                  transition: "all 0.3s ease",
                }}
              />
            ))}
          </div>
          <span style={{ fontSize: "0.8rem", color: "#64748b", fontWeight: "600" }}>
            STEP {step} OF 4
          </span>
        </div>

        {/* Brand Header */}
        <div style={{ textAlign: "center", marginBottom: "28px" }}>
          <h1 style={{
            fontSize: "1.6rem",
            fontWeight: "700",
            marginBottom: "8px",
            background: "linear-gradient(135deg, #f8fafc 30%, #10b981 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}>
            {step === 1 && "Create Your Account"}
            {step === 2 && "Where do you study?"}
            {step === 3 && "What is your course?"}
            {step === 4 && "Select your Semester"}
          </h1>
          <p style={{ color: "#94a3b8", fontSize: "0.85rem" }}>
            {step === 1 && "Start your smart exam preparation today"}
            {step === 2 && "DU papers are common across colleges, but we customize your hub"}
            {step === 3 && "We will load the syllabus according to your choice"}
            {step === 4 && "Almost done! Tell us your current semester"}
          </p>
        </div>

        {error && (
          <div style={{
            padding: "12px",
            borderRadius: "8px",
            background: "rgba(244, 63, 94, 0.1)",
            border: "1px solid rgba(244, 63, 94, 0.2)",
            color: "#fb7185",
            fontSize: "0.85rem",
            marginBottom: "20px",
            textAlign: "center"
          }}>
            {error}
          </div>
        )}

        {/* Step 1: Account Setup */}
        {step === 1 && (
          <div>
            <div style={{ marginBottom: "20px" }}>
              <label style={{ display: "block", fontSize: "0.8rem", fontWeight: "600", color: "#94a3b8", marginBottom: "8px" }}>
                EMAIL ADDRESS
              </label>
              <div style={{ position: "relative" }}>
                <span style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#64748b", display: "flex", alignItems: "center" }}>
                  <Mail size={18} />
                </span>
                <input
                  id="signup-email"
                  type="email"
                  placeholder="name@college.du.ac.in"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "12px 16px 12px 40px",
                    borderRadius: "8px",
                    background: "rgba(255, 255, 255, 0.03)",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    color: "#f8fafc",
                    fontSize: "0.95rem",
                    outline: "none",
                  }}
                />
              </div>
            </div>

            <div style={{ marginBottom: "28px" }}>
              <label style={{ display: "block", fontSize: "0.8rem", fontWeight: "600", color: "#94a3b8", marginBottom: "8px" }}>
                PASSWORD
              </label>
              <div style={{ position: "relative" }}>
                <span style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#64748b", display: "flex", alignItems: "center" }}>
                  <Lock size={18} />
                </span>
                <input
                  id="signup-password"
                  type="password"
                  placeholder="At least 6 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "12px 16px 12px 40px",
                    borderRadius: "8px",
                    background: "rgba(255, 255, 255, 0.03)",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    color: "#f8fafc",
                    fontSize: "0.95rem",
                    outline: "none",
                  }}
                />
              </div>
            </div>

            <button
              id="signup-next-1"
              onClick={handleNextStep}
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "8px",
                background: "#3b82f6",
                color: "#ffffff",
                fontSize: "0.95rem",
                fontWeight: "600",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
              }}
            >
              Continue <ArrowRight size={16} />
            </button>
          </div>
        )}

        {/* Step 2: College Search */}
        {step === 2 && (
          <div>
            <div style={{ marginBottom: "16px", position: "relative" }}>
              <span style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#64748b", display: "flex", alignItems: "center" }}>
                <Search size={16} />
              </span>
              <input
                type="text"
                placeholder="Search your college (e.g. Hindu)"
                value={searchCollegeQuery}
                onChange={(e) => setSearchCollegeQuery(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px 16px 10px 36px",
                  borderRadius: "8px",
                  background: "rgba(255, 255, 255, 0.04)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  color: "#f8fafc",
                  fontSize: "0.9rem",
                  outline: "none",
                }}
              />
            </div>

            <div style={{
              maxHeight: "220px",
              overflowY: "auto",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              borderRadius: "8px",
              background: "rgba(0, 0, 0, 0.2)",
              marginBottom: "24px",
              padding: "4px"
            }}>
              {filteredColleges.length > 0 ? (
                filteredColleges.map((college) => {
                  const isSelected = selectedCollege === college;
                  return (
                    <div
                      key={college}
                      onClick={() => setSelectedCollege(college)}
                      style={{
                        padding: "10px 14px",
                        borderRadius: "6px",
                        cursor: "pointer",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        background: isSelected ? "rgba(59, 130, 246, 0.15)" : "transparent",
                        color: isSelected ? "#60a5fa" : "#f8fafc",
                        fontSize: "0.85rem",
                        transition: "all 0.15s",
                        border: isSelected ? "1px solid rgba(59, 130, 246, 0.3)" : "1px solid transparent",
                        marginBottom: "2px"
                      }}
                    >
                      <span>{college}</span>
                      {isSelected && <Check size={16} />}
                    </div>
                  );
                })
              ) : (
                <div style={{ padding: "16px", textAlign: "center", color: "#64748b", fontSize: "0.85rem" }}>
                  No colleges found. Try typing another name.
                </div>
              )}
            </div>

            <div style={{ display: "flex", gap: "12px" }}>
              <button
                onClick={handlePrevStep}
                style={{
                  flex: "1",
                  padding: "12px",
                  borderRadius: "8px",
                  background: "rgba(255, 255, 255, 0.04)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  color: "#f8fafc",
                  fontSize: "0.95rem",
                  fontWeight: "500",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                }}
              >
                <ArrowLeft size={16} /> Back
              </button>
              <button
                id="signup-next-2"
                onClick={handleNextStep}
                style={{
                  flex: "1",
                  padding: "12px",
                  borderRadius: "8px",
                  background: "#3b82f6",
                  color: "#ffffff",
                  fontSize: "0.95rem",
                  fontWeight: "600",
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                }}
              >
                Next <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Course Selection */}
        {step === 3 && (
          <div>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "28px" }}>
              {courses.map((course) => {
                const isSelected = selectedCourseId === course.id;
                return (
                  <div
                    key={course.id}
                    onClick={() => setSelectedCourseId(course.id)}
                    style={{
                      padding: "16px 20px",
                      borderRadius: "10px",
                      cursor: "pointer",
                      background: isSelected ? "rgba(16, 185, 129, 0.08)" : "rgba(255, 255, 255, 0.02)",
                      border: isSelected ? "1px solid #10b981" : "1px solid rgba(255, 255, 255, 0.06)",
                      color: isSelected ? "#34d399" : "#f8fafc",
                      transition: "all 0.2s",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center"
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: "600", fontSize: "0.95rem", marginBottom: "4px" }}>
                        {course.name}
                      </div>
                      <div style={{ fontSize: "0.75rem", color: isSelected ? "#a7f3d0" : "#64748b" }}>
                        {course.durationSemesters} Semesters • NEP UGCF Syllabus
                      </div>
                    </div>
                    <div style={{
                      width: "20px",
                      height: "20px",
                      borderRadius: "50%",
                      border: isSelected ? "6px solid #10b981" : "2px solid rgba(255, 255, 255, 0.2)",
                      background: "transparent",
                      transition: "all 0.15s"
                    }} />
                  </div>
                );
              })}
            </div>

            <div style={{ display: "flex", gap: "12px" }}>
              <button
                onClick={handlePrevStep}
                style={{
                  flex: "1",
                  padding: "12px",
                  borderRadius: "8px",
                  background: "rgba(255, 255, 255, 0.04)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  color: "#f8fafc",
                  fontSize: "0.95rem",
                  fontWeight: "500",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                }}
              >
                <ArrowLeft size={16} /> Back
              </button>
              <button
                id="signup-next-3"
                onClick={handleNextStep}
                style={{
                  flex: "1",
                  padding: "12px",
                  borderRadius: "8px",
                  background: "#3b82f6",
                  color: "#ffffff",
                  fontSize: "0.95rem",
                  fontWeight: "600",
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                }}
              >
                Next <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Semester Selection */}
        {step === 4 && (
          <div>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "12px",
              marginBottom: "32px"
            }}>
              {Array.from({ length: currentCourse ? currentCourse.durationSemesters : 8 }, (_, i) => i + 1).map((sem) => {
                const isSelected = selectedSemester === sem;
                return (
                  <button
                    key={sem}
                    type="button"
                    onClick={() => setSelectedSemester(sem)}
                    style={{
                      height: "56px",
                      borderRadius: "8px",
                      background: isSelected ? "rgba(59, 130, 246, 0.15)" : "rgba(255, 255, 255, 0.02)",
                      border: isSelected ? "1px solid #3b82f6" : "1px solid rgba(255, 255, 255, 0.06)",
                      color: isSelected ? "#60a5fa" : "#f8fafc",
                      fontSize: "1.05rem",
                      fontWeight: "600",
                      cursor: "pointer",
                      transition: "all 0.15s",
                    }}
                  >
                    S{sem}
                  </button>
                );
              })}
            </div>

            <div style={{ display: "flex", gap: "12px" }}>
              <button
                onClick={handlePrevStep}
                style={{
                  flex: "1",
                  padding: "12px",
                  borderRadius: "8px",
                  background: "rgba(255, 255, 255, 0.04)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  color: "#f8fafc",
                  fontSize: "0.95rem",
                  fontWeight: "500",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                }}
              >
                <ArrowLeft size={16} /> Back
              </button>
              <button
                id="signup-finish"
                onClick={handleSubmit}
                disabled={isLoading}
                style={{
                  flex: "1",
                  padding: "12px",
                  borderRadius: "8px",
                  background: "#10b981",
                  color: "#070913",
                  fontSize: "0.95rem",
                  fontWeight: "700",
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                  transition: "all 0.15s",
                }}
              >
                {isLoading ? "Creating..." : "Finish Setup"}
                {!isLoading && <ArrowRight size={16} />}
              </button>
            </div>
          </div>
        )}

        {/* Login redirection */}
        {step === 1 && (
          <div style={{
            marginTop: "24px",
            textAlign: "center",
            fontSize: "0.85rem",
            color: "#94a3b8"
          }}>
            Already have an account?{" "}
            <Link href="/auth/login" style={{
              color: "#3b82f6",
              fontWeight: "500",
              textDecoration: "none"
            }}>
              Sign in
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
