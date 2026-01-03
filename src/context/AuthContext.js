import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

const AUTH_EXPIRATION_TIME = 60 * 60 * 1000;

export function AuthProvider({ children }) {
  const [authenticated, setAuthenticated] = useState(undefined);

  const login = () => {
    const loginTime = Date.now();

    localStorage.setItem(
      "auth",
      JSON.stringify({ authenticated: true, loginTime })
    );

    setAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("auth");
    setAuthenticated(false);
  };

  useEffect(() => {
    const stored = localStorage.getItem("auth");

    if (!stored) {
      setAuthenticated(false);
      return;
    }

    const { authenticated, loginTime } = JSON.parse(stored);
    const expired = Date.now() - loginTime > AUTH_EXPIRATION_TIME;

    if (authenticated && !expired) {
      setAuthenticated(true);
    } else {
      logout();
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        authenticated,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthValue() {
  return useContext(AuthContext);
}
