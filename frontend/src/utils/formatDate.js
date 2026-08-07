// ==========================================
// src/utils/formatDate.js
// ==========================================

/**
 * Formatea una fecha al formato colombiano.
 *
 * Ejemplo:
 * 15/07/2026
 */

export function formatDate(date) {

    if (!date) return "-";

    return new Date(date).toLocaleDateString(

        "es-CO",

        {

            year: "numeric",

            month: "2-digit",

            day: "2-digit"

        }

    );

}

/**
 * Formatea fecha y hora.
 *
 * Ejemplo:
 * 15/07/2026, 08:30 a. m.
 */

export function formatDateTime(date) {

    if (!date) return "-";

    return new Date(date).toLocaleString(

        "es-CO",

        {

            year: "numeric",

            month: "2-digit",

            day: "2-digit",

            hour: "2-digit",

            minute: "2-digit"

        }

    );

}

/**
 * Obtiene únicamente la hora.
 *
 * Ejemplo:
 * 08:45 a. m.
 */

export function formatTime(date) {

    if (!date) return "-";

    return new Date(date).toLocaleTimeString(

        "es-CO",

        {

            hour: "2-digit",

            minute: "2-digit"

        }

    );

}

/**
 * Devuelve una fecha para inputs HTML.
 *
 * Resultado:
 * YYYY-MM-DD
 */

export function formatInputDate(date) {

    if (!date) return "";

    const d = new Date(date);

    const year = d.getFullYear();

    const month = String(

        d.getMonth() + 1

    ).padStart(2, "0");

    const day = String(

        d.getDate()

    ).padStart(2, "0");

    return `${year}-${month}-${day}`;

}

/**
 * Devuelve una fecha y hora para inputs datetime-local.
 *
 * Resultado:
 * YYYY-MM-DDTHH:mm
 */

export function formatInputDateTime(date) {

    if (!date) return "";

    const d = new Date(date);

    const year = d.getFullYear();

    const month = String(

        d.getMonth() + 1

    ).padStart(2, "0");

    const day = String(

        d.getDate()

    ).padStart(2, "0");

    const hours = String(

        d.getHours()

    ).padStart(2, "0");

    const minutes = String(

        d.getMinutes()

    ).padStart(2, "0");

    return `${year}-${month}-${day}T${hours}:${minutes}`;

}

/**
 * Calcula hace cuánto tiempo ocurrió una fecha.
 *
 * Ejemplos:
 * Hace 5 minutos
 * Hace 2 horas
 * Hace 3 días
 */

export function timeAgo(date) {

    if (!date) return "-";

    const seconds = Math.floor(

        (new Date() - new Date(date)) / 1000

    );

    const minutes = Math.floor(seconds / 60);

    const hours = Math.floor(minutes / 60);

    const days = Math.floor(hours / 24);

    if (seconds < 60) {

        return "Hace unos segundos";

    }

    if (minutes < 60) {

        return `Hace ${minutes} minuto${minutes !== 1 ? "s" : ""}`;

    }

    if (hours < 24) {

        return `Hace ${hours} hora${hours !== 1 ? "s" : ""}`;

    }

    return `Hace ${days} día${days !== 1 ? "s" : ""}`;

}

export default formatDate;