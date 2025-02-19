import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

type LoginType = {
  email: string;
  remember_me?: boolean | undefined;
};

interface ProviderProps {
  user: string | null;
  token: string;
  login(data: LoginType): void;
  logout(): void;
}

const AuthContext = createContext<ProviderProps>({
  user: null,
  token: "",
  login: () => {},
  logout: () => {},
});

export const randomAlphaNumeric = (length: number) => {
  let s = "";
  Array.from({ length }).some(() => {
    s += Math.random().toString(36).slice(2);
    return s.length >= length;
  });
  return s.slice(0, length);
};

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const storedInfo = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user") || "{}")
    : null;
  const [user, setUser] = useState<string | null>(storedInfo?.email);
  const [token, setToken] = useState(storedInfo?.token || "");
  // const [roles, setRoles] = useState(storedInfo?.roles || [])
  // const [departmentId, setDepartmentId] = useState(storedInfo?.departmentId || '')
  const navigate = useNavigate();

  const login = (data: any) => {
    const t = randomAlphaNumeric(50);
    setTimeout(() => {
      const obj = { ...data };
      setUser(data.email);
      setToken(t);
      // setRoles(data.roles)
      // setDepartmentId(data.departmentId)
      localStorage.setItem("user", JSON.stringify(obj));
      navigate("/dashboard");
    }, 0);
  };

  const logout = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
