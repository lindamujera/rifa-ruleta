// ==========================================
// src/components/common/Spinner.jsx
// ==========================================

import "./Spinner.css";

function Spinner({

    size = "medium",

    color = "primary",

    text = "",

    centered = false

}) {

    const spinner = (

        <div className="spinner-wrapper">

            <div

                className={`spinner spinner-${size} spinner-${color}`}

            ></div>

            {

                text && (

                    <span className="spinner-text">

                        {text}

                    </span>

                )

            }

        </div>

    );

    if (centered) {

        return (

            <div className="spinner-center">

                {spinner}

            </div>

        );

    }

    return spinner;

}

export default Spinner;