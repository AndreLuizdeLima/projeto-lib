import { useState, useEffect } from "react";
import { useAuthValue } from "../context/AuthContext";

export const useAuthLogin = () => {
    const { login: authLogin } = useAuthValue();
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(null)

    const [cancelled, setCancelled] = useState(false);

    function checkIfsCamcelled() {
        if (cancelled) {
            return;
        }
    }


    //http://localhost:5678/webhook/8e04b6ff-4edf-475b-9195-866c8141d996/auth?email=andreluiz@andre.com&password=12345
    const url = 'http://localhost:5678/webhook/8e04b6ff-4edf-475b-9195-866c8141d996/auth?'

    const login = async (data) => {
        checkIfsCamcelled();
        setLoading(true);
        setError(null);

        const email = data.email.trim()
        const password = data.password.trim()

        try {
            const response = await fetch(
                `${url}email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`
            );


            const result = await response.json();

            if (!result.auth) {
                throw new Error("Email ou senha inválidos");
            }
            authLogin();
            return true;
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        return () => setCancelled(true);
    }, []);

    return {
        error,
        loading,
        login
    };
}