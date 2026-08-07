// ==========================================
// src/App.jsx
// ==========================================

import { Routes, Route, Navigate } from "react-router-dom";

// ==========================================
// Páginas Públicas
// ==========================================
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Autologin from "./pages/Autologin";

// ==========================================
// Páginas Privadas
// ==========================================

import Dashboard from "./pages/Dashboard";
import Payments from "./pages/Payments";
import Tickets from "./pages/Tickets";
import Roulette from "./pages/Roulette";
import History from "./pages/History";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
// ==========================================
// Administración
// ==========================================

import Admin from "./pages/Admin";

// ==========================================
// Error 404
// ==========================================

function App() {

    return ( 

        <Routes>

            {/* Públicas */}

            <Route
                path="/"
                element={<Home />}
            />

            <Route
                path="/home"
                element={<Home />}
            />

            <Route
                path="/login"
                element={<Login />}
            />

            <Route
                path="/autologin"
                element={<Autologin />}
            />

            <Route
                path="/register"
                element={<Register />}
            />

            <Route
                path="/home"
                element={<Home />}
            />

            {/* Usuario */}

            <Route
                path="/dashboard"
                element={<Dashboard />}
            />

            <Route
                path="/profile"
                element={<Profile />}
            />

            <Route
                path="/payments"
                element={<Payments />}
            />

            <Route
                path="/tickets"
                element={<Tickets />}
            />

            <Route
                path="/roulette"
                element={<Roulette />}
            />

            <Route
                path="/roulette/:spinId"
                element={<Roulette />}
            />

            <Route
                path="/history"
                element={<History />}
            />

            {/* Administrador */}

            <Route
                path="/admin"
                element={<Admin />}
            />

            <Route
                path="/admin/pagos"
                element={<Navigate to="/admin" replace />}
            />

            <Route
                path="/admin/payments"
                element={<Navigate to="/admin" replace />}
            />

            {/* Error */}

            <Route
                path="*"
                element={<NotFound />}
            />

        </Routes>

    );

}

export default App;