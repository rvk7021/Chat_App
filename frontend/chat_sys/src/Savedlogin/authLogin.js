import { createContext, useContext, useState, useEffect } from "react";

export const Authlogin = createContext();

export const useAuthUser = () => {
  return useContext(Authlogin);
};

export const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(() => {
    const storedUser = localStorage.getItem('authUser');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    localStorage.setItem('authUser', JSON.stringify(authUser));
  }, [authUser]);

  return (
    <Authlogin.Provider value={{ authUser, setAuthUser }}>
      {children}
    </Authlogin.Provider>
  );
};
