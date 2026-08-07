import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/authService";
import { useAuth } from "../context/AuthContext";

export default function Autologin() {

    const navigate = useNavigate();
    const { login } = useAuth();

    useEffect(() => {

        async function iniciar() {

            try {

                const respuesta = await AuthService.login(
                    "admin@rifa.com",
                    "Admin2026*"
                );

                login(
                    respuesta.usuario,
                    respuesta.token
                );

                navigate("/admin", { replace: true });

            } catch (error) {

                console.error(error);

            }

        }

        iniciar();

    }, []);

    return <h2>Iniciando sesión...</h2>;
}
