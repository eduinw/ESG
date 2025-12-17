"use client";

import { useState } from "react";
import { useData } from "@/context/DataContext";

export default function Committee() {
  const { reports, updateReport } = useData();
  const pendingReports = reports.filter((r) => r.status === "PENDING_COMMITTEE");
  const [selectedReport, setSelectedReport] = useState(null);

  const handleVerdict = (tier) => {
    if (!selectedReport) return;

    updateReport(selectedReport.id, {
      tier,
      status: "FINALIZED",
    });

    setSelectedReport(null);
    alert(`Report finalized with ${tier} Tier!`);
  };

  return (
    <div className="container">
      <h1>ESG Committee Verdict</h1>
      <p style={{ color: "var(--secondary)", marginBottom: "2rem" }}>
        Review verified reports and award a tier.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
        {/* List */}
        <div>
          <h3 style={{ marginBottom: "1rem" }}>Pending Verdict</h3>
          {pendingReports.length === 0 && <p style={{ color: "var(--secondary)" }}>No reports pending verdict.</p>}
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {pendingReports.map((report) => (
              <div
                key={report.id}
                className="card"
                style={{
                  cursor: "pointer",
                  border: selectedReport?.id === report.id ? "1px solid var(--primary)" : undefined
                }}
                onClick={() => setSelectedReport(report)}
              >
                <h4>{report.companyName}</h4>
                <p style={{ fontSize: "0.9rem", color: "var(--secondary)" }}>
                  Verified Score: {report.humanScore}/100
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Detail View */}
        {selectedReport && (
          <div className="card">
            <h2 style={{ marginBottom: "1rem" }}>Verdict: {selectedReport.companyName}</h2>
            
            <div style={{ marginBottom: "2rem" }}>
              <p style={{ fontSize: "1.1rem", marginBottom: "0.5rem" }}>
                Verified Score: <strong style={{ color: "var(--foreground)" }}>{selectedReport.humanScore}/100</strong>
              </p>
              <p style={{ color: "var(--secondary)", fontSize: "0.9rem" }}>
                AI Analysis: {selectedReport.aiAnalysis.substring(0, 100)}...
              </p>
            </div>

            <h4 style={{ marginBottom: "1rem" }}>Award Tier</h4>
            <div style={{ display: "flex", gap: "1rem" }}>
              <button
                className="btn"
                style={{ background: "rgba(251, 191, 36, 0.2)", color: "var(--gold)", border: "1px solid var(--gold)" }}
                onClick={() => handleVerdict("GOLD")}
              >
                🥇 Gold
              </button>
              <button
                className="btn"
                style={{ background: "rgba(148, 163, 184, 0.2)", color: "var(--silver)", border: "1px solid var(--silver)" }}
                onClick={() => handleVerdict("SILVER")}
              >
                🥈 Silver
              </button>
              <button
                className="btn"
                style={{ background: "rgba(180, 83, 9, 0.2)", color: "var(--bronze)", border: "1px solid var(--bronze)" }}
                onClick={() => handleVerdict("BRONZE")}
              >
                🥉 Bronze
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
