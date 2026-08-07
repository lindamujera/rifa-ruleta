// ==========================================
// src/components/admin/UsersTable.jsx
// ==========================================

import { useEffect, useState } from "react";

import userService from "../../services/userService";

import Loader from "../common/Loader";
import Alert from "../common/Alert";
import Button from "../common/Button";

import "./UsersTable.css";

function UsersTable() {

    const [users, setUsers] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const [search, setSearch] = useState("");

    const [processingId, setProcessingId] = useState(null);

    // ==========================================
    // Cargar Usuarios
    // ==========================================

    useEffect(() => {

        loadUsers();

    }, []);

    const loadUsers = async () => {

        try {

            setLoading(true);

            setError("");

            const response = await userService.getAllUsers();

            const data = response.data || response || [];

            setUsers(data);

        } catch (err) {

            setError(

                err.response?.data?.message ||

                "No fue posible cargar los usuarios."

            );

        } finally {

            setLoading(false);

        }

    };

    // ==========================================
    // Cambiar Estado Usuario
    // ==========================================

    const toggleStatus = async (user) => {

        try {

            setProcessingId(user._id);

            if (user.active) {

                await userService.deactivateUser(user._id);

            } else {

                await userService.activateUser(user._id);

            }

            await loadUsers();

        } catch (err) {

            alert(

                err.response?.data?.message ||

                "No fue posible actualizar el usuario."

            );

        } finally {

            setProcessingId(null);

        }

    };

    // ==========================================
    // Filtrar Usuarios
    // ==========================================

    const filteredUsers = users.filter((user) => {

        const text = (

            `${user.name || ""} ${user.email || ""}`

        ).toLowerCase();

        return text.includes(search.toLowerCase());

    });

    // ==========================================
    // Loading
    // ==========================================

    if (loading) {

        return <Loader />;

    }

    // ==========================================
    // Render
    // ==========================================

    return (

        <section className="users-table-container">

            <div className="users-table-header">

                <h2>

                    👥 Administración de Usuarios

                </h2>

                <input

                    type="text"

                    placeholder="Buscar usuario..."

                    value={search}

                    onChange={(e) =>

                        setSearch(e.target.value)

                    }

                    className="users-search"

                />

            </div>

            {

                error && (

                    <Alert

                        type="error"

                        message={error}

                    />

                )

            }

            {

                filteredUsers.length === 0 ? (

                    <Alert

                        type="info"

                        message="No existen usuarios registrados."

                    />

                ) : (

                    <table className="users-table">

                        <thead>

                            <tr>

                                <th>Nombre</th>

                                <th>Correo</th>

                                <th>Rol</th>

                                <th>Estado</th>

                                <th>Acciones</th>

                            </tr>

                        </thead>

                        <tbody>

                            {

                                filteredUsers.map((user) => (

                                    <tr

                                        key={user._id}

                                    >

                                        <td>

                                            {

                                                user.name ||

                                                user.nombre ||

                                                "-"

                                            }

                                        </td>

                                        <td>

                                            {

                                                user.email ||

                                                "-"

                                            }

                                        </td>

                                        <td>

                                            {

                                                user.role ||

                                                "USER"

                                            }

                                        </td>

                                        <td>

                                            <span

                                                className={`user-status ${

                                                    user.active

                                                    ? "active"

                                                    : "inactive"

                                                }`}

                                            >

                                                {

                                                    user.active

                                                    ? "Activo"

                                                    : "Inactivo"

                                                }

                                            </span>

                                        </td>

                                        <td>

                                            <Button

                                                className={

                                                    user.active

                                                    ? "btn-disable"

                                                    : "btn-enable"

                                                }

                                                disabled={

                                                    processingId === user._id

                                                }

                                                onClick={() =>

                                                    toggleStatus(user)

                                                }

                                            >

                                                {

                                                    user.active

                                                    ? "Desactivar"

                                                    : "Activar"

                                                }

                                            </Button>

                                        </td>

                                    </tr>

                                ))

                            }

                        </tbody>

                    </table>

                )

            }

        </section>

    );

}

export default UsersTable;