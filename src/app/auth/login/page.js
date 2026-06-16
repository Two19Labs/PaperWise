"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Mail, Lock, ArrowRight, BookOpen } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    setError("");
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      localStorage.setItem(
        "paperwise_user",
        JSON.stringify({
          email,
          name: email.split("@")[0],
          college: "Shaheed Sukhdev College of Business Studies (SSCBS)",
          courseId: "bsc_cs",
          courseName: "B.Sc. (Hons.) Computer Science [B.Sc. Comp Science]",
          semester: 2,
          completedQuestions: ["ds_q2"]
        })
      );
      router.push("/dashboard");
    }, 1000);
  };

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
        maxWidth: "400px",
        padding: "32px 24px",
        borderRadius: "6px",
        background: "#121214",
        border: "1px solid #27272a",
      }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "28px" }}>
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: "40px",
            height: "40px",
            borderRadius: "4px",
            background: "#1a1a1e",
            border: "1px solid #27272a",
            color: "#ffffff",
            marginBottom: "12px",
          }}>
            <BookOpen size={20} />
          </div>
          <h1 style={{
            fontSize: "1.35rem",
            fontWeight: "700",
            marginBottom: "6px",
            color: "#ffffff"
          }}>Welcome Back</h1>
          <p style={{ color: "#a1a1aa", fontSize: "0.8rem" }}>
            Sign in to track your SSCBS syllabus PYQs
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

        <form onSubmit={handleSubmit}>
          {/* Email field */}
          <div style={{ marginBottom: "16px" }}>
            <label style={{
              display: "block",
              fontSize: "0.75rem",
              fontWeight: "600",
              color: "#a1a1aa",
              marginBottom: "6px"
            }}>
              EMAIL ADDRESS
            </label>
            <div style={{ position: "relative" }}>
              <span style={{
                position: "absolute",
                left: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "#52525b",
                display: "flex",
                alignItems: "center"
              }}>
                <Mail size={16} />
              </span>
              <input
                id="login-email"
                type="email"
                placeholder="name@example.com"
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
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Password field */}
          <div style={{ marginBottom: "20px" }}>
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "6px"
            }}>
              <label style={{
                fontSize: "0.75rem",
                fontWeight: "600",
                color: "#a1a1aa",
              }}>
                PASSWORD
              </label>
              <a href="#" style={{
                fontSize: "0.75rem",
                color: "#a1a1aa",
                textDecoration: "underline"
              }}>
                Forgot?
              </a>
            </div>
            <div style={{ position: "relative" }}>
              <span style={{
                position: "absolute",
                left: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "#52525b",
                display: "flex",
                alignItems: "center"
              }}>
                <Lock size={16} />
              </span>
              <input
                id="login-password"
                type="password"
                placeholder="••••••••"
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
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            id="login-submit"
            type="submit"
            disabled={isLoading}
            className="btn btn-primary"
            style={{ width: "100%", padding: "10px" }}
          >
            {isLoading ? "Signing in..." : "Sign In"}
            {!isLoading && <ArrowRight size={14} />}
          </button>
        </form>

        {/* Signup redirection */}
        <div style={{
          marginTop: "20px",
          textAlign: "center",
          fontSize: "0.8rem",
          color: "#a1a1aa"
        }}>
          Don&apos;t have an account?{" "}
          <Link href="/auth/signup" style={{
            color: "#ffffff",
            fontWeight: "600",
            textDecoration: "underline"
          }}>
            Create an account
          </Link>
        </div>
      </div>
    </main>
  );
}
