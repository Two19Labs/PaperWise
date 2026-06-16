"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { courses } from "@/data/courses";
import { Mail, Lock, User, ArrowRight, ArrowLeft, BookOpen, Check } from "lucide-react";

export default function SignupPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  // Onboarding states (SSCBS is the only option, so pre-selected)
  const [selectedCollege] = useState("Shaheed Sukhdev College of Business Studies (SSCBS)");
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [selectedSemester, setSelectedSemester] = useState(1);
  
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleNextStep = () => {
    if (step === 1) {
      if (!name || !email || !password) {
        setError("Please enter your name, email, and password.");
        return;
      }
      if (password.length < 6) {
        setError("Password must be at least 6 characters.");
        return;
      }
    } else if (step === 2) {
      // College step (SSCBS is pre-selected, just proceed)
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
          name,
          college: selectedCollege,
          courseId: selectedCourseId,
          courseName: courseObj ? courseObj.name : "Custom Course",
          semester: parseInt(selectedSemester),
          completedQuestions: []
        })
      );
      router.push("/dashboard");
    }, 1000);
  };

  const currentCourse = courses.find(c => c.id === selectedCourseId);

  return (
    <main style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "#09090b",
      padding: "20px",
    }}>
      <div style={{
        width: "100%",
        maxWidth: "440px",
        padding: "32px 24px",
        borderRadius: "6px",
        background: "#121214",
        border: "1px solid #27272a",
      }}>
        {/* Step Indicator */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "28px" }}>
          <div style={{ display: "flex", gap: "6px" }}>
            {[1, 2, 3, 4].map((s) => (
              <div
                key={s}
                style={{
                  height: "2px",
                  width: "20px",
                  background: s <= step ? "#ffffff" : "#27272a",
                  transition: "all 0.2s ease",
                }}
              />
            ))}
          </div>
          <span style={{ fontSize: "0.75rem", color: "#a1a1aa", fontWeight: "600" }}>
            STEP {step} OF 4
          </span>
        </div>

        {/* Header */}
        <div style={{ marginBottom: "24px" }}>
          <h1 style={{
            fontSize: "1.35rem",
            fontWeight: "700",
            marginBottom: "6px",
            color: "#ffffff"
          }}>
            {step === 1 && "Create Your Account"}
            {step === 2 && "Confirm College"}
            {step === 3 && "Select Your Course"}
            {step === 4 && "Choose Semester"}
          </h1>
          <p style={{ color: "#a1a1aa", fontSize: "0.8rem" }}>
            {step === 1 && "Sign up to track and analyze your semester exams."}
            {step === 2 && "PaperWise is configured for SSCBS."}
            {step === 3 && "We will map your syllabus to the chosen undergraduate course."}
            {step === 4 && "Select your current semester."}
          </p>
        </div>

        {error && (
          <div style={{
            padding: "10px",
            borderRadius: "4px",
            background: "rgba(239, 68, 68, 0.1)",
            border: "1px solid rgba(239, 68, 68, 0.2)",
            color: "#f87171",
            fontSize: "0.8rem",
            marginBottom: "16px",
            textAlign: "center"
          }}>
            {error}
          </div>
        )}

        {/* Step 1: Credentials */}
        {step === 1 && (
          <div>
            <div style={{ marginBottom: "12px" }}>
              <label style={{ display: "block", fontSize: "0.75rem", fontWeight: "600", color: "#a1a1aa", marginBottom: "6px" }}>
                FULL NAME
              </label>
              <div style={{ position: "relative" }}>
                <span style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", color: "#52525b", display: "flex", alignItems: "center" }}>
                  <User size={16} />
                </span>
                <input
                  id="signup-name"
                  type="text"
                  placeholder="Aditya Sharma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "8px 12px 8px 34px",
                    borderRadius: "4px",
                    background: "#09090b",
                    border: "1px solid #27272a",
                    color: "#ffffff",
                    fontSize: "0.9rem",
                    outline: "none",
                  }}
                />
              </div>
            </div>

            <div style={{ marginBottom: "12px" }}>
              <label style={{ display: "block", fontSize: "0.75rem", fontWeight: "600", color: "#a1a1aa", marginBottom: "6px" }}>
                EMAIL ADDRESS
              </label>
              <div style={{ position: "relative" }}>
                <span style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", color: "#52525b", display: "flex", alignItems: "center" }}>
                  <Mail size={16} />
                </span>
                <input
                  id="signup-email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "8px 12px 8px 34px",
                    borderRadius: "4px",
                    background: "#09090b",
                    border: "1px solid #27272a",
                    color: "#ffffff",
                    fontSize: "0.9rem",
                    outline: "none",
                  }}
                />
              </div>
            </div>

            <div style={{ marginBottom: "20px" }}>
              <label style={{ display: "block", fontSize: "0.75rem", fontWeight: "600", color: "#a1a1aa", marginBottom: "6px" }}>
                PASSWORD
              </label>
              <div style={{ position: "relative" }}>
                <span style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", color: "#52525b", display: "flex", alignItems: "center" }}>
                  <Lock size={16} />
                </span>
                <input
                  id="signup-password"
                  type="password"
                  placeholder="Minimum 6 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "8px 12px 8px 34px",
                    borderRadius: "4px",
                    background: "#09090b",
                    border: "1px solid #27272a",
                    color: "#ffffff",
                    fontSize: "0.9rem",
                    outline: "none",
                  }}
                />
              </div>
            </div>

            <button
              id="signup-next-1"
              onClick={handleNextStep}
              className="btn btn-primary"
              style={{ width: "100%", padding: "10px" }}
            >
              Continue <ArrowRight size={14} />
            </button>
          </div>
        )}

        {/* Step 2: College Confirmation */}
        {step === 2 && (
          <div>
            <div style={{
              padding: "16px",
              background: "#09090b",
              border: "1px solid #27272a",
              borderRadius: "4px",
              marginBottom: "20px"
            }}>
              <span style={{ fontSize: "0.7rem", color: "#a1a1aa", fontWeight: "600", display: "block", marginBottom: "4px" }}>
                COLLEGE
              </span>
              <div style={{ fontSize: "0.95rem", fontWeight: "600", color: "#ffffff" }}>
                {selectedCollege}
              </div>
            </div>

            <div style={{ display: "flex", gap: "10px" }}>
              <button
                onClick={handlePrevStep}
                className="btn btn-secondary"
                style={{ flex: "1" }}
              >
                <ArrowLeft size={14} /> Back
              </button>
              <button
                id="signup-next-2"
                onClick={handleNextStep}
                className="btn btn-primary"
                style={{ flex: "1" }}
              >
                Next <ArrowRight size={14} />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Course Selection */}
        {step === 3 && (
          <div>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "20px" }}>
              {courses.map((course) => {
                const isSelected = selectedCourseId === course.id;
                return (
                  <div
                    key={course.id}
                    onClick={() => setSelectedCourseId(course.id)}
                    style={{
                      padding: "12px 16px",
                      borderRadius: "4px",
                      cursor: "pointer",
                      background: isSelected ? "#1a1a1e" : "#09090b",
                      border: isSelected ? "1px solid #ffffff" : "1px solid #27272a",
                      color: isSelected ? "#ffffff" : "#a1a1aa",
                      transition: "all 0.15s",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center"
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: "600", fontSize: "0.85rem", marginBottom: "2px" }}>
                        {course.name}
                      </div>
                      <div style={{ fontSize: "0.7rem", color: "#71717a" }}>
                        Syllabus: UGCF NEP
                      </div>
                    </div>
                    {isSelected && <Check size={14} style={{ color: "#ffffff" }} />}
                  </div>
                );
              })}
            </div>

            <div style={{ display: "flex", gap: "10px" }}>
              <button
                onClick={handlePrevStep}
                className="btn btn-secondary"
                style={{ flex: "1" }}
              >
                <ArrowLeft size={14} /> Back
              </button>
              <button
                id="signup-next-3"
                onClick={handleNextStep}
                className="btn btn-primary"
                style={{ flex: "1" }}
              >
                Next <ArrowRight size={14} />
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Semester selection */}
        {step === 4 && (
          <div>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "8px",
              marginBottom: "24px"
            }}>
              {Array.from({ length: 8 }, (_, i) => i + 1).map((sem) => {
                const isSelected = selectedSemester === sem;
                return (
                  <button
                    key={sem}
                    type="button"
                    onClick={() => setSelectedSemester(sem)}
                    style={{
                      height: "44px",
                      borderRadius: "4px",
                      background: isSelected ? "#ffffff" : "#09090b",
                      border: isSelected ? "1px solid #ffffff" : "1px solid #27272a",
                      color: isSelected ? "#09090b" : "#ffffff",
                      fontSize: "0.9rem",
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

            <div style={{ display: "flex", gap: "10px" }}>
              <button
                onClick={handlePrevStep}
                className="btn btn-secondary"
                style={{ flex: "1" }}
              >
                <ArrowLeft size={14} /> Back
              </button>
              <button
                id="signup-finish"
                onClick={handleSubmit}
                disabled={isLoading}
                className="btn btn-primary"
                style={{ flex: "1", background: "#ffffff", color: "#09090b", fontWeight: "700" }}
              >
                {isLoading ? "Creating..." : "Complete Setup"}
              </button>
            </div>
          </div>
        )}

        {/* Login redirection */}
        {step === 1 && (
          <div style={{
            marginTop: "20px",
            textAlign: "center",
            fontSize: "0.8rem",
            color: "#a1a1aa"
          }}>
            Already have an account?{" "}
            <Link href="/auth/login" style={{
              color: "#ffffff",
              fontWeight: "600",
              textDecoration: "underline"
            }}>
              Sign in
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
