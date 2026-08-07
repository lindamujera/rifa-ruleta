// ==========================================
// src/hooks/useRound.js
// ==========================================

import { useState, useEffect, useCallback } from "react";

import roundService from "../services/roundService";

function useRound() {

    const [round, setRound] = useState(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const loadRound = useCallback(async () => {

        try {

            setLoading(true);

            setError("");

            const response = await roundService.getCurrentRound();

            const data = response.data || response;

            setRound(data);

        } catch (err) {

            setError(

                err.response?.data?.message ||

                "No fue posible cargar la ronda actual."

            );

        } finally {

            setLoading(false);

        }

    }, []);

    useEffect(() => {

        loadRound();

    }, [loadRound]);

    const refreshRound = async () => {

        await loadRound();

    };

    return {

        round,

        loading,

        error,

        refreshRound,

        setRound

    };

}

export default useRound;