"use client";

import { createContext, useContext, useEffect, useState } from "react";
import ac from "@/support/accesscontrol";

interface IAuthContext {
  user: string | null;
  setUser: (username: string) => void;
  logout: () => void;
  loading: boolean;
  canReadAny: (resource: string) => boolean;
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

const useAuth = () => useContext(AuthContext);

interface Props {
  children: React.ReactNode;
}

const AuthProvider: React.FC<Props> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<string | null>(null);

  const canReadAny = (resource: string) => {
    if (!user) {
      return false;
    }

    return ac.can(user).readAny(resource).granted;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("username");
  };

  useEffect(() => {
    const username = localStorage.getItem("username");
    if (username) {
      setUser(username);
    }
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, loading, setUser, logout, canReadAny }}
    >
      {loading && <div>Loading...</div>}
      {!loading && children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, useAuth };
