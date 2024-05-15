"use client";
import React, { useState } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { Toaster } from "@/components/ui/toaster";

export default function DashboardLayout({ children }) {
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div className="relative flex items-start justify-between w-full">
      <button
        className="absolute top-4 right-[310px] md:right-4 p-2 rounded-full bg-gray-200"
        onClick={toggleSidebar}
      >
        {isSidebarCollapsed ? ">" : "<"}
      </button>
      <div
        className={`min-w-[300px] border-r min-h-screen max-md:hidden ${
          isSidebarCollapsed ? "hidden max-md:flex" : "flex"
        }`}
      >
        <Sidebar />
      </div>

      <main className="grid h-full w-full">
        <Header />
        <div className="p-8">{children}</div>
        <Toaster />
      </main>
    </div>
  );
}
