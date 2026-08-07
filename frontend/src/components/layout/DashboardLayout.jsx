// ==========================================
// src/components/layout/DashboardLayout.jsx
// ==========================================

import { Outlet } from "react-router-dom";
import { useContext, useState } from "react";

import { AuthContext } from "../../context/AuthContext";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

import "./DashboardLayout.css";

function DashboardLayout() {

    const { isAuthenticated } = useContext(AuthContext);

    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {

        setSidebarOpen((prev) => !prev);

    };

    const closeSidebar = () => {

        setSidebarOpen(false);

    };

    return (

        <div className="dashboard-layout">

            {/* ========================================== */}
            {/* Navbar */}
            {/* ========================================== */}

            <Navbar
                onToggleSidebar={toggleSidebar}
            />

            {/* ========================================== */}
            {/* Contenido */}
            {/* ========================================== */}

            <div className="dashboard-content">

                {

                    isAuthenticated && (

                        <Sidebar

                            open={sidebarOpen}

                            onClose={closeSidebar}

                        />

                    )

                }

                <main className="dashboard-main">

                    <Outlet />

                </main>

            </div>

            {/* ========================================== */}
            {/* Footer */}
            {/* ========================================== */}

            <Footer />

        </div>

    );

}

export default DashboardLayout;