import { useEffect, useReducer } from 'react';

const initialState = {
  documents: [],
  loading: false,
  error: null
};

const fetchReducer = (state, action) => {
  switch (action.type) {
    case 'LOADING':
      return { ...state, loading: true, error: null };
    case 'SUCCESS':
      return { documents: action.payload, loading: false, error: null };
    case 'ERROR':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const endpoints = {
  GENERO: 'http://localhost:5678/webhook/fea290ca-4ef4-44df-b484-192c5bef73f6/genero'
};

export const useGetItems = (typeData, id = null) => {
  const [state, dispatch] = useReducer(fetchReducer, initialState);

  useEffect(() => {
    const config = endpoints[typeData];

    if (!config) {
      dispatch({ type: 'ERROR', payload: 'Tipo inválido' });
      return;
    }

    const controller = new AbortController();

    const fetchData = async () => {
      dispatch({ type: 'LOADING' });

      try {
        const url = id
          ? `${config}/${id}`
          : config;

        const res = await fetch(url, {
          signal: controller.signal
        });

        if (!res.ok) throw new Error('Erro ao buscar dados');

        const data = await res.json();
        dispatch({ type: 'SUCCESS', payload: data });

      } catch (err) {
        if (err.name !== 'AbortError') {
          dispatch({ type: 'ERROR', payload: err.message });
        }
      }
    };

    fetchData();
    return () => controller.abort();
  }, [typeData, id]);

  return state;
};
