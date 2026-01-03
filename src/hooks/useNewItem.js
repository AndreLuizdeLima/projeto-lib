import { useReducer, useCallback } from "react";

const initialState = {
  data: null,
  loading: false,
  error: null,
};

const fetchReducer = (state, action) => {
  switch (action.type) {
    case "LOADING":
      return { ...state, loading: true, error: null };
    case "SUCCESS":
      return { data: action.payload, loading: false, error: null };
    case "ERROR":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const endpoints = {
  GENERO: "http://localhost:5678/webhook/fea290ca-4ef4-44df-b484-192c5bef73f6/genero",
};

export const useNewItem = (typeData) => {
  const [state, dispatch] = useReducer(fetchReducer, initialState);

  const insert = useCallback(async (payload) => {
    const urlBase = endpoints[typeData];

    if (!urlBase) {
      dispatch({ type: "ERROR", payload: "Tipo inválido" });
      return;
    }

    dispatch({ type: "LOADING" });

    try {
      const res = await fetch(urlBase, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Erro ao criar dados");

      const data = await res.json();
      dispatch({ type: "SUCCESS", payload: data });
    } catch (err) {
      dispatch({ type: "ERROR", payload: err.message });
    }
  }, [typeData]);

  return { ...state, insert };
};
