"use client";

import { useState } from "react";
import { useData } from "@/context/DataContext";
import { analyzeDocument } from "@/utils/MockEngine";
import { useRouter } from "next/navigation";

export default function Portal() {
  const { addReport, updateReport } = useData();
  const router = useRouter();
  const [companyName, setCompanyName] = useState("");
  const [file, setFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!companyName || !file) return;

    setIsProcessing(true);
    
    // 1. Create Report
    const report = addReport(file, companyName);

    // 2. AI Analysis (Mock)
    try {
      const result = await analyzeDocument(file);
      
      // 3. Update Report with AI results
      updateReport(report.id, {
        aiScore: result.score,
        aiAnalysis: result.analysis,
        status: "PENDING_ASSESSOR",
      });

      // Redirect or show success
      alert("Report uploaded and analyzed! Sent to Assessor.");
      router.push("/assessor");
    } catch (error) {
      console.error("Analysis failed", error);
      alert("Analysis failed.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="container">
      <h1>Input Portal</h1>
      <p style={{ color: "var(--secondary)", marginBottom: "2rem" }}>
        Upload raw PDF reports for AI analysis.
      </p>

      <div className="card" style={{ maxWidth: "600px" }}>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "1rem" }}>
            <label style={{ display: "block", marginBottom: "0.5rem" }}>Company Name</label>
            <input
              type="text"
              className="input"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="e.g. Acme Corp"
              required
            />
          </div>

          <div style={{ marginBottom: "2rem" }}>
            <label style={{ display: "block", marginBottom: "0.5rem" }}>Upload Report (PDF)</label>
            <input
              type="file"
              className="input"
              accept=".pdf"
              onChange={(e) => setFile(e.target.files[0])}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            disabled={isProcessing}
            style={{ width: "100%" }}
          >
            {isProcessing ? "AI Agent Analyzing..." : "Submit for Analysis"}
          </button>
        </form>
      </div>
    </div>
  );
}
