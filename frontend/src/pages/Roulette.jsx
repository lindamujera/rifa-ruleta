import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import RouletteWheel from "../components/roulette/RouletteWheel";
import spinService from "../services/spinService";
import { FaSignOutAlt } from "react-icons/fa";

import "../styles/Roulette.css";

// ==========================================
// 🎯 COMPONENTE MINI RULETA (AQUÍ SE COLOCA)
// ==========================================
const MiniRuletaIcon = () => (
  <svg
    className="icono-ruleta-animado"
    width="34"
    height="34"
    viewBox="0 0 100 100"
    style={{ verticalAlign: 'middle', marginRight: '10px' }}
  >
    {/* Borde exterior */}
    <circle cx="50" cy="50" r="46" fill="none" stroke="#ffffff" strokeWidth="8" />
    
    {/* Secciones de la ruleta */}
    <path d="M50 50 L50 4 A46 46 0 0 1 96 50 Z" fill="#3b82f6" />
    <path d="M50 50 L96 50 A46 46 0 0 1 50 96 Z" fill="#ef4444" />
    <path d="M50 50 L50 96 A46 46 0 0 1 4 50 Z" fill="#eab308" />
    <path d="M50 50 L4 50 A46 46 0 0 1 50 4 Z" fill="#22c55e" />
    
    {/* Centro de la ruleta */}
    <circle cx="50" cy="50" r="14" fill="#ffffff" />
    <circle cx="50" cy="50" r="8" fill="#1d4ed8" />
  </svg>
);

// ==========================================
// COMPONENTE PRINCIPAL
// ==========================================
export default function Roulette() {
    const { isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();
    const { spinId: routeSpinId } = useParams();
    const [searchParams] = useSearchParams();

    const [spinId, setSpinId] = useState(null);
    const [spin, setSpin] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const querySpinId = searchParams.get("spinId");

    const handleLogout = () => {
        if (logout) {
            logout();
        }
        navigate("/login");
    };

    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/login");
            return;
        }

        const id = routeSpinId || querySpinId;

        if (!id) {
            setError(
                "Necesitas un spinId válido. Usa el enlace recibido después de la aprobación del pago."
            );
            setSpinId(null);
            setSpin(null);
            return;
        }

        setSpinId(id);
    }, [isAuthenticated, navigate, routeSpinId, querySpinId]);

    useEffect(() => {
        if (!spinId) return;

        const loadSpin = async () => {
            try {
                setLoading(true);
                setError("");

                const response = await spinService.obtenerSpin(spinId);
                const data = response.data || response;
                const fetchedSpin = data.data || data;

                setSpin(fetchedSpin);
            } catch (err) {
                setError(
                    err.response?.data?.message ||
                        err.message ||
                        "No fue posible cargar el Spin."
                );
            } finally {
                setLoading(false);
            }
        };

        loadSpin();
    }, [spinId]);

    return (
        <div className="roulette-page">
            {/* Encabezado Principal con la MiniRuletaIcon */}
          <header className="roulette-header">
    <div className="banner-text-content">
        <h1>
            <MiniRuletaIcon /> Ruleta 
        </h1>
        <p>
            ¡Bienvenido! Haz clic en la ruleta o en el botón de girar para obtener tu premio y espera tu premio.
        </p>
    </div>
    {/* Barra superior con botón de salir */}
            <div className="top-navbar">
                <button className="btn-logout" onClick={handleLogout}>
                    <FaSignOutAlt /> Salir
                </button>
            </div>
</header>

            {/* Contenido Principal */}
            <div className="roulette-content">
                {loading && <p className="loading-text">Cargando información del giro...</p>}

                {error && (
                    <div className="roulette-error">
                        <strong>Error:</strong> {error}
                    </div>
                )}

                {!loading && !error && !spin && (
                    <div className="roulette-empty">
                        <p>
                            No se encontró un giro. Verifica el enlace o espera
                            la aprobación del administrador.
                        </p>
                    </div>
                )}

                {!loading && spin && (
                    <div className="roulette-section">
                        <RouletteWheel
                            spinId={spinId}
                            spin={spin}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}