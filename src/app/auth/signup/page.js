"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { courses } from "@/data/courses";
import { Mail, Lock, User, ArrowRight, ArrowLeft, BookOpen, Check } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

export default function SignupPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  // Colleges list
  const colleges = [
    { id: "sscbs", name: "Shaheed Sukhdev College of Business Studies (SSCBS)" },
    { id: "srcc", name: "Shri Ram College of Commerce (SRCC)" }
  ];

  // Onboarding states
  const [selectedCollegeId, setSelectedCollegeId] = useState("sscbs");
  const [selectedCourseId, setSelectedCourseId] = useState("");
  
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
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
      // College confirm
    }
    
    setError("");
    setStep(step + 1);
  };

  const handlePrevStep = () => {
    setError("");
    setStep(step - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedCourseId) {
      setError("Please select your course.");
      return;
    }
    setIsLoading(true);
    setError("");
    setSuccessMessage("");

    const collegeObj = colleges.find(c => c.id === selectedCollegeId);
    const collegeName = collegeObj ? collegeObj.name : "Shaheed Sukhdev College of Business Studies (SSCBS)";
    const courseObj = courses.find(c => c.id === selectedCourseId);
    const courseName = courseObj ? courseObj.name : "Custom Course";

    try {
      const { data, error: signupError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            college_id: selectedCollegeId,
            college_name: collegeName,
            course_id: selectedCourseId,
            course_name: courseName,
          }
        }
      });

      if (signupError) {
        setError(signupError.message);
        setIsLoading(false);
        return;
      }

      const userSession = data?.session;
      const userProfile = {
        email,
        name,
        college: collegeName,
        collegeId: selectedCollegeId,
        courseId: selectedCourseId,
        courseName,
        completedQuestions: []
      };

      // Cache user details locally for instant/optimistic loading
      localStorage.setItem("paperwise_user", JSON.stringify(userProfile));

      if (userSession) {
        setIsLoading(false);
        router.push("/dashboard");
      } else {
        setIsLoading(false);
        setSuccessMessage("Account created successfully! Please check your email inbox to verify your account, then sign in.");
        setStep(1); // Reset back to step 1 so they can navigate to sign in
      }
    } catch (err) {
      if (err.message && (err.message.includes("supabaseUrl") || err.message.includes("supabaseKey"))) {
        setError("Supabase URL and Key are missing. Please restart your Next.js development server to load the environment variables.");
      } else {
        setError(err.message || "An unexpected error occurred during signup.");
      }
      setIsLoading(false);
    }
  };

  return (
    <main style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "#f9fafb",
      padding: "20px",
    }}>
      <div style={{
        width: "100%",
        maxWidth: "440px",
        padding: "36px 28px",
        borderRadius: "8px",
        background: "#ffffff",
        border: "1px solid #e2e8f0",
        boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.05)"
      }}>
        {/* Step Indicator */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "28px" }}>
          <div style={{ display: "flex", gap: "6px" }}>
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                style={{
                  height: "3px",
                  width: "24px",
                  borderRadius: "1.5px",
                  background: s <= step ? "#f58340" : "#e2e8f0",
                  transition: "all 0.2s ease",
                }}
              />
            ))}
          </div>
          <span style={{ fontSize: "0.75rem", color: "#64748b", fontWeight: "600" }}>
            STEP {step} OF 3
          </span>
        </div>

        {/* Header */}
        <div style={{ marginBottom: "24px" }}>
          <h1 style={{
            fontSize: "1.3rem",
            fontWeight: "700",
            marginBottom: "6px",
            color: "#0f172a"
          }}>
            {step === 1 && "Create Your Account"}
            {step === 2 && "Confirm College"}
            {step === 3 && "Select Your Course"}
          </h1>
          <p style={{ color: "#475569", fontSize: "0.8rem" }}>
            {step === 1 && "Start tracking and analyzing your SSCBS past papers."}
            {step === 2 && "Verify your college details to proceed."}
            {step === 3 && "You will have full access to all semesters and subjects."}
          </p>
        </div>

        {error && (
          <div style={{
            padding: "10px",
            borderRadius: "6px",
            background: "rgba(239, 68, 68, 0.05)",
            border: "1px solid rgba(239, 68, 68, 0.1)",
            color: "#ef4444",
            fontSize: "0.8rem",
            marginBottom: "16px",
            textAlign: "center"
          }}>
            {error}
          </div>
        )}

        {successMessage && (
          <div style={{
            padding: "12px",
            borderRadius: "6px",
            background: "rgba(34, 197, 94, 0.05)",
            border: "1px solid rgba(34, 197, 94, 0.1)",
            color: "#16a34a",
            fontSize: "0.8rem",
            marginBottom: "16px",
            textAlign: "center",
            lineHeight: "1.4"
          }}>
            {successMessage}
          </div>
        )}

        {/* Step 1 */}
        {step === 1 && (
          <div>
            <div style={{ marginBottom: "12px" }}>
              <label style={{ display: "block", fontSize: "0.75rem", fontWeight: "600", color: "#475569", marginBottom: "6px" }}>
                FULL NAME
              </label>
              <div style={{ position: "relative" }}>
                <span style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", color: "#94a3b8", display: "flex", alignItems: "center" }}>
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
                    borderRadius: "6px",
                    background: "#ffffff",
                    border: "1px solid #e2e8f0",
                    color: "#0f172a",
                    fontSize: "0.9rem",
                    outline: "none",
                  }}
                />
              </div>
            </div>

            <div style={{ marginBottom: "12px" }}>
              <label style={{ display: "block", fontSize: "0.75rem", fontWeight: "600", color: "#475569", marginBottom: "6px" }}>
                EMAIL ADDRESS
              </label>
              <div style={{ position: "relative" }}>
                <span style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", color: "#94a3b8", display: "flex", alignItems: "center" }}>
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
                    borderRadius: "6px",
                    background: "#ffffff",
                    border: "1px solid #e2e8f0",
                    color: "#0f172a",
                    fontSize: "0.9rem",
                    outline: "none",
                  }}
                />
              </div>
            </div>

            <div style={{ marginBottom: "20px" }}>
              <label style={{ display: "block", fontSize: "0.75rem", fontWeight: "600", color: "#475569", marginBottom: "6px" }}>
                PASSWORD
              </label>
              <div style={{ position: "relative" }}>
                <span style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", color: "#94a3b8", display: "flex", alignItems: "center" }}>
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
                    borderRadius: "6px",
                    background: "#ffffff",
                    border: "1px solid #e2e8f0",
                    color: "#0f172a",
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

        {/* Step 2 */}
        {step === 2 && (
          <div>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "20px" }}>
              {colleges.map((college) => {
                const isSelected = selectedCollegeId === college.id;
                return (
                  <div
                    key={college.id}
                    onClick={() => {
                      setSelectedCollegeId(college.id);
                      setSelectedCourseId(""); // Reset course if college changes
                    }}
                    style={{
                      padding: "16px",
                      borderRadius: "6px",
                      cursor: "pointer",
                      background: isSelected ? "#fff7ed" : "#ffffff",
                      border: isSelected ? "1px solid #f58340" : "1px solid #e2e8f0",
                      color: isSelected ? "#ea580c" : "#475569",
                      transition: "all 0.15s",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center"
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: "600", fontSize: "0.85rem" }}>
                        {college.name}
                      </div>
                    </div>
                    {isSelected && <Check size={14} style={{ color: "#ea580c" }} />}
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

        {/* Step 3 */}
        {step === 3 && (
          <div>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "20px" }}>
              {courses.filter(c => c.collegeId === selectedCollegeId).map((course) => {
                const isSelected = selectedCourseId === course.id;
                return (
                  <div
                    key={course.id}
                    onClick={() => setSelectedCourseId(course.id)}
                    style={{
                      padding: "12px 16px",
                      borderRadius: "6px",
                      cursor: "pointer",
                      background: isSelected ? "#fff7ed" : "#ffffff",
                      border: isSelected ? "1px solid #f58340" : "1px solid #e2e8f0",
                      color: isSelected ? "#ea580c" : "#475569",
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
                      <div style={{ fontSize: "0.7rem", color: "#94a3b8" }}>
                        Syllabus: UGCF NEP
                      </div>
                    </div>
                    {isSelected && <Check size={14} style={{ color: "#ea580c" }} />}
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
                id="signup-finish"
                onClick={handleSubmit}
                disabled={isLoading}
                className="btn btn-primary"
                style={{ flex: "1", fontWeight: "700" }}
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
            color: "#475569"
          }}>
            Already have an account?{" "}
            <Link href="/auth/login" style={{
              color: "#f58340",
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
