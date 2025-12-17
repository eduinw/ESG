"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

const DataContext = createContext();

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
  const [reports, setReports] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from local storage on mount
  useEffect(() => {
    const savedReports = localStorage.getItem("esg_reports");
    if (savedReports) {
      setReports(JSON.parse(savedReports));
    }
    setIsLoaded(true);
  }, []);

  // Save to local storage whenever reports change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("esg_reports", JSON.stringify(reports));
    }
  }, [reports, isLoaded]);

  const addReport = (file, companyName) => {
    const newReport = {
      id: uuidv4(),
      companyName: companyName || "Unknown Company",
      status: "PENDING_AI",
      aiScore: null,
      aiAnalysis: null,
      humanScore: null,
      tier: null,
      fileUrl: file ? URL.createObjectURL(file) : null, // Mock URL
      fileName: file ? file.name : "report.pdf",
      createdAt: new Date().toISOString(),
    };
    setReports((prev) => [newReport, ...prev]);
    return newReport;
  };

  const updateReport = (id, updates) => {
    setReports((prev) =>
      prev.map((report) => (report.id === id ? { ...report, ...updates } : report))
    );
  };

  const getReport = (id) => reports.find((r) => r.id === id);

  return (
    <DataContext.Provider value={{ reports, addReport, updateReport, getReport }}>
      {children}
    </DataContext.Provider>
  );
};
