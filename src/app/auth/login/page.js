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

    // Mock successful authentication after 1 second delay
    setTimeout(() => {
      setIsLoading(false);
      // Store mock user info in localStorage
      localStorage.setItem(
        "paperwise_user",
        JSON.stringify({
          email,
          name: email.split("@")[0],
          college: "Hindu College",
          courseId: "bsc_cs_hons",
          courseName: "B.Sc (Hons) Computer Science",
          semester: 2,
          completedQuestions: ["ds_q2", "ds_q5"]
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
      background: "linear-gradient(-45deg, #070913, #0f1322, #0c2340, #070913)",
      backgroundSize: "400% 400%",
      padding: "20px",
    }}>
      <div style={{
        width: "100%",
        maxWidth: "420px",
        padding: "40px 30px",
        borderRadius: "16px",
        background: "rgba(255, 255, 255, 0.02)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        border: "1px solid rgba(255, 255, 255, 0.06)",
        boxShadow: "0 20px 50px rgba(0, 0, 0, 0.5)",
      }}>
        {/* Brand Header */}
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: "48px",
            height: "48px",
            borderRadius: "12px",
            background: "rgba(59, 130, 246, 0.1)",
            border: "1px solid rgba(59, 130, 246, 0.2)",
            color: "#3b82f6",
            marginBottom: "16px",
          }}>
            <BookOpen size={24} />
          </div>
          <h1 style={{
            fontSize: "1.8rem",
            fontWeight: "700",
            letterSpacing: "-0.025em",
            marginBottom: "8px",
            background: "linear-gradient(135deg, #f8fafc 30%, #3b82f6 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}>Welcome Back</h1>
          <p style={{ color: "#94a3b8", fontSize: "0.9rem" }}>
            Sign in to continue analyzing your DU PYQs
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

        <form onSubmit={handleSubmit}>
          {/* Email field */}
          <div style={{ marginBottom: "20px" }}>
            <label style={{
              display: "block",
              fontSize: "0.8rem",
              fontWeight: "600",
              color: "#94a3b8",
              marginBottom: "8px"
            }}>
              EMAIL ADDRESS
            </label>
            <div style={{ position: "relative" }}>
              <span style={{
                position: "absolute",
                left: "12px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "#64748b",
                display: "flex",
                alignItems: "center"
              }}>
                <Mail size={18} />
              </span>
              <input
                id="login-email"
                type="email"
                placeholder="you@college.du.ac.in"
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
                  transition: "all 0.2s",
                }}
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Password field */}
          <div style={{ marginBottom: "24px" }}>
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "8px"
            }}>
              <label style={{
                fontSize: "0.8rem",
                fontWeight: "600",
                color: "#94a3b8",
              }}>
                PASSWORD
              </label>
              <a href="#" style={{
                fontSize: "0.8rem",
                color: "#3b82f6",
                textDecoration: "none"
              }}>
                Forgot?
              </a>
            </div>
            <div style={{ position: "relative" }}>
              <span style={{
                position: "absolute",
                left: "12px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "#64748b",
                display: "flex",
                alignItems: "center"
              }}>
                <Lock size={18} />
              </span>
              <input
                id="login-password"
                type="password"
                placeholder="••••••••"
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
                  transition: "all 0.2s",
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
              transition: "all 0.2s",
            }}
          >
            {isLoading ? "Signing in..." : "Sign In"}
            {!isLoading && <ArrowRight size={16} />}
          </button>
        </form>

        {/* Signup redirection */}
        <div style={{
          marginTop: "24px",
          textAlign: "center",
          fontSize: "0.85rem",
          color: "#94a3b8"
        }}>
          Don&apos;t have an account?{" "}
          <Link href="/auth/signup" style={{
            color: "#3b82f6",
            fontWeight: "500",
            textDecoration: "none"
          }}>
            Create an account
          </Link>
        </div>
      </div>
    </main>
  );
}
