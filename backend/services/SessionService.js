const mongoose = require("mongoose");

class SessionService {

    // ==========================================
    // Iniciar una sesión y una transacción
    // ==========================================
    async iniciar() {

        const session = await mongoose.startSession();

        session.startTransaction();

        return session;

    }

    // ==========================================
    // Confirmar la transacción
    // ==========================================
    async confirmar(session) {

        if (!session) {
            return;
        }

        await session.commitTransaction();

    }

    // ==========================================
    // Cancelar la transacción
    // ==========================================
    async cancelar(session) {

        if (!session) {
            return;
        }

        try {
            await session.abortTransaction();
        } catch (error) {
            const isAlreadyAborted =
                error &&
                (
                    error.code === 251 ||
                    error.codeName === "NoSuchTransaction" ||
                    error.message?.includes("Cannot call abortTransaction after calling commitTransaction") ||
                    error.errorLabels?.includes("TransientTransactionError")
                );

            if (isAlreadyAborted) {
                console.warn(
                    "SessionService.cancelar: transaction already aborted or not found.",
                    error.message || error
                );
            } else {
                throw error;
            }
        }

    }

    // ==========================================
    // Ejecutar una función dentro de una
    // transacción automáticamente
    // ==========================================
    async esTransitorio(error) {
        if (!error) {
            return false;
        }

        if (
            error.errorLabels &&
            typeof error.errorLabels.includes === "function" &&
            error.errorLabels.includes("TransientTransactionError")
        ) {
            return true;
        }

        if (
            error.errorLabelSet &&
            typeof error.errorLabelSet.has === "function" &&
            error.errorLabelSet.has("TransientTransactionError")
        ) {
            return true;
        }

        return [
            112,
            244,
            251
        ].includes(error.code) ||
            [
                "WriteConflict",
                "NoSuchTransaction",
                "UnknownTransactionCommitResult"
            ].includes(error.codeName) ||
            [
                "MongoNetworkError",
                "MongoTransactionError"
            ].includes(error.name);
    }

    async ejecutar(callback, retries = 3) {

        let attempt = 0;

        while (attempt < retries) {

            attempt += 1;
            const session = await this.iniciar();

            try {

                const resultado = await callback(session);

                await this.confirmar(session);

                return resultado;

            } catch (error) {

                try {
                    await this.cancelar(session);
                } catch (cancelError) {
                    console.error("SessionService.cancelar error:", cancelError.message || cancelError);
                }

                if (
                    attempt < retries &&
                    await this.esTransitorio(error)
                ) {
                    console.warn(
                        `SessionService.ejecutar: intento ${attempt} fallido por error transitorio. Reintentando...`,
                        error.message || error
                    );
                    continue;
                }

                throw error;

            } finally {

                session.endSession();

            }

        }

        throw new Error(
            "SessionService.ejecutar: no se pudo completar la transacción después de varios intentos."
        );

    }

}

module.exports = new SessionService();