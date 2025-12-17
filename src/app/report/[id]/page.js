"use client";

import { useData } from "@/context/DataContext";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function ReportDetail() {
  const { id } = useParams();
  const { getReport } = useData();
  const report = getReport(id);

  if (!report) {
    return (
      <div className="container">
        <p>Report not found.</p>
        <Link href="/" style={{ color: "var(--primary)" }}>&larr; Back to Dashboard</Link>
      </div>
    );
  }

  return (
    <div className="container">
      <div style={{ marginBottom: "2rem" }}>
        <Link href="/" style={{ color: "var(--secondary)", fontSize: "0.9rem" }}>&larr; Back to Dashboard</Link>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
        <h1>{report.companyName}</h1>
        {report.tier && (
          <span className={`badge badge-${report.tier.toLowerCase()}`} style={{ fontSize: "1.2rem", padding: "0.5rem 1rem" }}>
            {report.tier} Tier
          </span>
        )}
      </div>

      <div className="card" style={{ marginBottom: "2rem" }}>
        <h3 style={{ marginBottom: "1.5rem", borderBottom: "1px solid var(--card-border)", paddingBottom: "1rem" }}>
          Executive Summary
        </h3>
        
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "2rem", marginBottom: "2rem" }}>
          <div>
            <p style={{ color: "var(--secondary)", fontSize: "0.9rem" }}>Final Score</p>
            <p style={{ fontSize: "2rem", fontWeight: "bold" }}>{report.humanScore}/100</p>
          </div>
          <div>
            <p style={{ color: "var(--secondary)", fontSize: "0.9rem" }}>AI Initial Score</p>
            <p style={{ fontSize: "2rem", fontWeight: "bold", color: "var(--secondary)" }}>{report.aiScore}/100</p>
          </div>
          <div>
            <p style={{ color: "var(--secondary)", fontSize: "0.9rem" }}>Status</p>
            <p>{report.status.replace("_", " ")}</p>
          </div>
        </div>

        <div style={{ background: "rgba(255,255,255,0.05)", padding: "1.5rem", borderRadius: "0.5rem" }}>
          <h4 style={{ color: "var(--primary)", marginBottom: "1rem" }}>AI Analysis & Findings</h4>
          <p style={{ whiteSpace: "pre-line", lineHeight: "1.6", color: "var(--foreground)" }}>
            {report.aiAnalysis}
          </p>
        </div>
      </div>

      <div className="card">
        <h3 style={{ marginBottom: "1rem" }}>Source Document</h3>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <div style={{ 
            width: "40px", height: "40px", background: "var(--error)", borderRadius: "4px", 
            display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold" 
          }}>
            PDF
          </div>
          <div>
            <p>{report.fileName}</p>
            <a href={report.fileUrl} target="_blank" style={{ color: "var(--primary)", fontSize: "0.9rem" }}>
              Download / View
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
