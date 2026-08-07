import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

function Profile() {

    const [usuario, setUsuario] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        obtenerPerfil();
    }, []);

    const obtenerPerfil = async () => {

        try {

            const token = localStorage.getItem("token");

            if (!token) {
                navigate("/login");
                return;
            }

            const respuesta = await api.get("/users/profile");

            setUsuario(respuesta.data.data);

        } catch (error) {

            console.error(error);

            localStorage.removeItem("token");
            localStorage.removeItem("user");

            navigate("/login");

        }

    };

    const cerrarSesion = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/login");

    };

    if (!usuario) {

        return (
            <div className="container">
                <h2>Cargando perfil...</h2>
            </div>
        );

    }

    return (

        <div className="container">

            <h1 className="title">
                Mi Perfil
            </h1>

            <div className="card">

                <h2>{usuario.nombre}</h2>

                <hr />

                <p>
                    <strong>📧 Correo:</strong><br />
                    {usuario.correo}
                </p>

                <p>
                    <strong>📱 Celular:</strong><br />
                    {usuario.celular}
                </p>

                <p>
                    <strong>👤 Rol:</strong><br />
                    {usuario.rol}
                </p>

                <p>
                    <strong>✅ Estado:</strong><br />
                    {usuario.estado}
                </p>

                <p>
                    <strong>🎰 Giros disponibles:</strong><br />
                    {usuario.girosDisponibles}
                </p>

                <p>
                    <strong>🏆 Total ganado:</strong><br />
                    ${usuario.totalGanado.toLocaleString()}
                </p>

                <br />

                <button
                    className="primary-btn"
                    onClick={cerrarSesion}
                >
                    Cerrar sesión
                </button>

            </div>

        </div>

    );

}

export default Profile;