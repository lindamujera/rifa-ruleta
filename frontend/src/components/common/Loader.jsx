// ==========================================
// src/components/common/Loader.jsx
// ==========================================

import "./Loader.css";

function Loader({

    text = "Cargando...",

    fullScreen = true

}) {

    return (

        <div
            className={

                fullScreen

                    ? "loader-container fullscreen"

                    : "loader-container"

            }
        >

            <div className="loader-content">

                <div className="loader-spinner"></div>

                <p className="loader-text">

                    {text}

                </p>

            </div>

        </div>

    );

}

export default Loader;