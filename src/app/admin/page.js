"use client";

import { useData } from "@/context/DataContext";

export default function Admin() {
  const { reports } = useData();

  return (
    <div className="container">
      <h1>Admin Overseer</h1>
      <p style={{ color: "var(--secondary)", marginBottom: "2rem" }}>
        Full scope of all reports in the system.
      </p>

      <div className="card" style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid var(--card-border)" }}>
              <th style={{ padding: "1rem" }}>Company</th>
              <th style={{ padding: "1rem" }}>Status</th>
              <th style={{ padding: "1rem" }}>AI Score</th>
              <th style={{ padding: "1rem" }}>Human Score</th>
              <th style={{ padding: "1rem" }}>Tier</th>
              <th style={{ padding: "1rem" }}>Created At</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report) => (
              <tr key={report.id} style={{ borderBottom: "1px solid var(--card-border)" }}>
                <td style={{ padding: "1rem" }}>{report.companyName}</td>
                <td style={{ padding: "1rem" }}>
                  <span style={{ 
                    fontSize: "0.8rem", 
                    padding: "0.25rem 0.5rem", 
                    borderRadius: "4px",
                    background: "rgba(255,255,255,0.1)"
                  }}>
                    {report.status.replace("_", " ")}
                  </span>
                </td>
                <td style={{ padding: "1rem" }}>{report.aiScore || "-"}</td>
                <td style={{ padding: "1rem" }}>{report.humanScore || "-"}</td>
                <td style={{ padding: "1rem" }}>
                  {report.tier ? (
                    <span className={`badge badge-${report.tier.toLowerCase()}`}>{report.tier}</span>
                  ) : "-"}
                </td>
                <td style={{ padding: "1rem", color: "var(--secondary)", fontSize: "0.9rem" }}>
                  {new Date(report.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {reports.length === 0 && (
          <div style={{ padding: "2rem", textAlign: "center", color: "var(--secondary)" }}>
            No data available.
          </div>
        )}
      </div>
    </div>
  );
}
