"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Public Dashboard" },
    { href: "/portal", label: "Input Portal" },
    { href: "/assessor", label: "Assessor Review" },
    { href: "/committee", label: "Committee Verdict" },
    { href: "/admin", label: "Admin Overseer" },
  ];

  return (
    <aside className="sidebar">
      <h2 style={{ paddingLeft: "1rem", marginBottom: "1rem", color: "var(--primary)" }}>
        ESG Platform
      </h2>
      <nav style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`nav-link ${pathname === link.href ? "active" : ""}`}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
