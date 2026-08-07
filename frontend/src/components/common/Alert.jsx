// ==========================================
// src/components/common/Alert.jsx
// ==========================================

import "./Alert.css";

// ==========================================
// Componente Alert
// ==========================================

function Alert({

    type = "info",

    title = "",

    message = "",

    show = true,

    closable = true,

    onClose = null

}) {

    if (!show) return null;

    // ==========================================
    // Iconos
    // ==========================================

    const icons = {

        success: "✔",

        error: "✖",

        warning: "⚠",

        info: "ℹ"

    };

    return (

        <div className={`alert alert-${type}`}>

            <div className="alert-icon">

                {icons[type]}

            </div>

            <div className="alert-content">

                {

                    title && (

                        <h4 className="alert-title">

                            {title}

                        </h4>

                    )

                }

                {

                    message && (

                        <p className="alert-message">

                            {message}

                        </p>

                    )

                }

            </div>

            {

                closable && (

                    <button

                        className="alert-close"

                        onClick={onClose}

                        type="button"

                    >

                        ×

                    </button>

                )

            }

        </div>

    );

}

export default Alert;