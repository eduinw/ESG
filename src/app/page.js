"use client";

import { useData } from "@/context/DataContext";
import Link from "next/link";

export default function Dashboard() {
  const { reports } = useData();
  const finalizedReports = reports.filter((r) => r.status === "FINALIZED");

  return (
    <div className="container">
      <h1 style={{ marginBottom: "2rem" }}>Public ESG Dashboard</h1>
      
      {finalizedReports.length === 0 ? (
        <div className="card" style={{ textAlign: "center", padding: "3rem" }}>
          <p style={{ color: "var(--secondary)" }}>No finalized reports yet.</p>
        </div>
      ) : (
        <div style={{ display: "grid", gap: "1rem", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))" }}>
          {finalizedReports.map((report) => (
            <Link href={`/report/${report.id}`} key={report.id}>
              <div className="card" style={{ cursor: "pointer", transition: "transform 0.2s" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: "1rem" }}>
                  <h3>{report.companyName}</h3>
                  <span className={`badge badge-${report.tier.toLowerCase()}`}>
                    {report.tier}
                  </span>
                </div>
                <p style={{ color: "var(--secondary)", fontSize: "0.9rem" }}>
                  Verified Score: <strong style={{ color: "var(--foreground)" }}>{report.humanScore}/100</strong>
                </p>
                <div style={{ marginTop: "1rem", fontSize: "0.8rem", color: "var(--secondary)" }}>
                  Finalized on {new Date(report.createdAt).toLocaleDateString()}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
