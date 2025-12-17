"use client";

import { useState } from "react";
import { useData } from "@/context/DataContext";

export default function Assessor() {
  const { reports, updateReport } = useData();
  const pendingReports = reports.filter((r) => r.status === "PENDING_ASSESSOR");
  const [selectedReport, setSelectedReport] = useState(null);
  const [humanScore, setHumanScore] = useState("");

  const handleSelect = (report) => {
    setSelectedReport(report);
    setHumanScore(report.aiScore); // Default to AI score
  };

  const handleSubmit = () => {
    if (!selectedReport) return;
    
    updateReport(selectedReport.id, {
      humanScore: parseInt(humanScore),
      status: "PENDING_COMMITTEE",
    });
    
    setSelectedReport(null);
    setHumanScore("");
    alert("Verified score saved. Sent to Committee.");
  };

  return (
    <div className="container">
      <h1>Assessor Review</h1>
      <p style={{ color: "var(--secondary)", marginBottom: "2rem" }}>
        Review AI findings and validate scores.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
        {/* List */}
        <div>
          <h3 style={{ marginBottom: "1rem" }}>Pending Reports</h3>
          {pendingReports.length === 0 && <p style={{ color: "var(--secondary)" }}>No pending reports.</p>}
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {pendingReports.map((report) => (
              <div
                key={report.id}
                className="card"
                style={{
                  cursor: "pointer",
                  border: selectedReport?.id === report.id ? "1px solid var(--primary)" : undefined
                }}
                onClick={() => handleSelect(report)}
              >
                <h4>{report.companyName}</h4>
                <p style={{ fontSize: "0.9rem", color: "var(--secondary)" }}>
                  AI Score: {report.aiScore}/100
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Detail View */}
        {selectedReport && (
          <div className="card">
            <h2 style={{ marginBottom: "1rem" }}>Review: {selectedReport.companyName}</h2>
            
            <div style={{ marginBottom: "1.5rem", background: "rgba(255,255,255,0.05)", padding: "1rem", borderRadius: "0.5rem" }}>
              <h4 style={{ color: "var(--primary)", marginBottom: "0.5rem" }}>AI Analysis</h4>
              <p style={{ whiteSpace: "pre-line", fontSize: "0.9rem", color: "var(--secondary)" }}>
                {selectedReport.aiAnalysis}
              </p>
            </div>

            <div style={{ marginBottom: "2rem" }}>
              <label style={{ display: "block", marginBottom: "0.5rem" }}>Verify Score (0-100)</label>
              <input
                type="number"
                className="input"
                value={humanScore}
                onChange={(e) => setHumanScore(e.target.value)}
                min="0"
                max="100"
              />
            </div>

            <button className="btn btn-primary" onClick={handleSubmit} style={{ width: "100%" }}>
              Submit to Committee
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
