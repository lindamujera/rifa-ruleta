// ==========================================
// src/pages/NotFound.jsx
// ==========================================

import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                textAlign: "center"
            }}
        >
            <h1>404</h1>

            <h2>Página no encontrada</h2>

            <p>
                La página que buscas no existe.
            </p>

            <Link to="/">
                Volver al Inicio
            </Link>
        </div>
    );
}