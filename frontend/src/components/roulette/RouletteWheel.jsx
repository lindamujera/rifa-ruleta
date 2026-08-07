// ==========================================
// src/components/roulette/RouletteWheel.jsx
// ==========================================

import { useEffect, useState, useRef } from "react";
import spinService from "../../services/spinService";
import Button from "../common/Button";
import Loader from "../common/Loader";
import Alert from "../common/Alert";
import { FaTicketAlt, FaInfoCircle, FaGift } from "react-icons/fa";
import './RouletteWheel.css';


// 🎯 Mini Ruleta Animada SVG
const MiniRuletaIcon = () => (
  <svg
    className="icono-ruleta-animado"
    width="32"
    height="32"
    viewBox="0 0 100 100"
    style={{ verticalAlign: "middle", marginRight: "10px" }}
  >
    <circle cx="50" cy="50" r="46" fill="none" stroke="#2563eb" strokeWidth="8" />
    <path d="M50 50 L50 4 A46 46 0 0 1 96 50 Z" fill="#3b82f6" />
    <path d="M50 50 L96 50 A46 46 0 0 1 50 96 Z" fill="#ef4444" />
    <path d="M50 50 L50 96 A46 46 0 0 1 50 96 Z" fill="#eab308" />
    <path d="M50 50 L4 50 A46 46 0 0 1 50 4 Z" fill="#22c55e" />
    <circle cx="50" cy="50" r="14" fill="#ffffff" />
    <circle cx="50" cy="50" r="8" fill="#1d4ed8" />
  </svg>
);

function RouletteWheel({
    spinId,
    spin = null,
    disabled = false,
    onFinish = () => {}
}) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [rotating, setRotating] = useState(false);
    const [degrees, setDegrees] = useState(0);
    const [premio, setPremio] = useState(null);
    const [currentSpin, setCurrentSpin] = useState(spin);

    // 🎥 Referencias para procesar el video y el canvas
    const videoRef = useRef(null);
    const canvasRef = useRef(null);

    useEffect(() => {
        setCurrentSpin(spin);
        setPremio(null);
        setError("");
    }, [spinId, spin]);

    // 🎥 Renderizar el video en el canvas eliminando la pantalla verde
    useEffect(() => {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        if (!video || !canvas) return;

        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        let animationId;

        const processFrame = () => {
            if (video.paused || video.ended) return;

            if (video.videoWidth && video.videoHeight) {
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
            }

            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            const frame = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const data = frame.data;

            // Eliminar el fondo verde en tiempo real
            for (let i = 0; i < data.length; i += 4) {
                const r = data[i];
                const g = data[i + 1];
                const b = data[i + 2];

                if (g > 100 && g > r * 1.25 && g > b * 1.25) {
                    data[i + 3] = 0; // Transparente
                }
            }

            ctx.putImageData(frame, 0, 0);
            animationId = requestAnimationFrame(processFrame);
        };

        const handlePlay = () => processFrame();
        video.addEventListener('play', handlePlay);

        // Forzar reproducción automática para alimentar el Canvas
        video.play().catch((e) => console.log("Esperando interacción del usuario:", e));

        if (!video.paused) processFrame();

        return () => {
            video.removeEventListener('play', handlePlay);
            cancelAnimationFrame(animationId);
        };
    }, []);

    const ejecutarRuleta = async () => {
        if (!spinId) {
            setError("No existe un giro disponible.");
            return;
        }

        if (currentSpin?.estado === "EJECUTADO") {
            setError("Este giro ya fue ejecutado.");
            return;
        }

        try {
            setLoading(true);
            setError("");
            setRotating(true);

            const response = await spinService.ejecutarRuleta(spinId);
            const data = response.data || response;
            const result = data.data || data;
            const premioGanado = result.premio ?? result.spin?.premio ?? 0;
            const newSpin = result.spin || currentSpin;

            setCurrentSpin(newSpin);
            setPremio(premioGanado);

            const vueltas = 8;
            const random = Math.floor(Math.random() * 360);
            const rotation = vueltas * 360 + random;

            setDegrees((prev) => prev + rotation);

            setTimeout(() => {
                setRotating(false);
                onFinish(premioGanado);
            }, 5200);
        } catch (err) {
            setRotating(false);
            setError(
                err.response?.data?.message ||
                err.message ||
                "No fue posible ejecutar la ruleta."
            );
        } finally {
            setLoading(false);
        }
    };

    const statusText = () => {
        if (!currentSpin) return "Sin giro seleccionado.";
        if (currentSpin.estado === "PENDIENTE") return "Pago aprobado y disponible.";
        if (currentSpin.estado === "EJECUTADO") return "Giro ejecutado.";
        if (currentSpin.estado === "BLOQUEADO") return "Giro bloqueado.";
        return `Estado: ${currentSpin.estado}`;
    };

    return (
        <div className="roulette-container">
            {/* 📍 Video alimentador del canvas (Ruta desde carpeta public) */}
            <video
                ref={videoRef}
                src="/istockphoto-2255690380-640_adpp_is.mp4"
                autoPlay
                loop
                muted
                playsInline
                style={{ display: "none" }}
            />

            {/* 🖼️ Canvas que procesa las monedas sin verde */}
            <canvas ref={canvasRef} className="roulette-bg-video" />

            {/* Título de la sección con la Mini Ruleta */}
            <h2 className="roulette-section-title">
                <MiniRuletaIcon /> Ruleta de Premios
            </h2>

            {error && <Alert type="error" message={error} />}

            {/* Tarjetas de Información */}
            <div className="roulette-info-row">
                <div className="roulette-card">
                    <h4><FaTicketAlt /> Spin ID</h4>
                    <strong>{spinId || "-"}</strong>
                </div>
                <div className="roulette-card">
                    <h4><FaInfoCircle /> Estado</h4>
                    <span className={`status-badge status-${currentSpin?.estado?.toLowerCase() || 'default'}`}>
                        {statusText()}
                    </span>
                </div>
            </div>

            {/* Ruleta Realista Arcoíris */}
            <div className="roulette-area">
                <div className="roulette-pointer">▼</div>
                <div
                    className="roulette-disc rainbow-wheel"
                    style={{ 
                        transform: `rotate(${degrees}deg)`,
                        transition: rotating ? 'transform 5s cubic-bezier(0.15, 0.9, 0.2, 1)' : 'none'
                    }}
                >
                    <div className="roulette-center">🎯</div>
                </div>
            </div>

            {loading && <Loader text="Girando la ruleta..." />}

            {/* Resultado del Premio */}
            {premio !== null && !loading && (
                <div className="roulette-result">
                    <h3><FaGift className="icono-premio-animado" /> Premio Ganado</h3>
                    <h1>$ {Number(premio).toLocaleString("es-CO")}</h1>
                </div>
            )}

            {/* Acciones / Botón Principal */}
            <div className="roulette-actions">
                <Button
                    className="btn-spin-action"
                    onClick={ejecutarRuleta}
                    disabled={
                        disabled ||
                        loading ||
                        rotating ||
                        currentSpin?.estado === "EJECUTADO"
                    }
                >
                    {currentSpin?.estado === "EJECUTADO"
                        ? "Giro completado"
                        : rotating
                        ? "Girando..."
                        : "Girar Ruleta"}
                </Button>
            </div>
        </div>
    );
}

export default RouletteWheel;