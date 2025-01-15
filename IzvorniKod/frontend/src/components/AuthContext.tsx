import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

// Tipovi za autentifikacijski kontekst
interface AuthContextType {
  isAuthenticated: boolean; // Stanje autentifikacije
  login: (token: string) => void; // Funkcija za prijavu
  logout: () => void; // Funkcija za odjavu
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Komponenta koja osigurava autentifikacijski kontekst
export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    // Provjera postoji li token u localStorage pri prvom učitavanju
    return !!localStorage.getItem("authToken");
  });

  // Funkcija za prijavu
  const login = (token: string) => {
    localStorage.setItem("authToken", token); // Spremamo token u localStorage
    setIsAuthenticated(true); // Ažuriramo stanje autentifikacije
    console.log("User logged in, token stored.");
  };

  // Funkcija za odjavu
  const logout = () => {
    localStorage.removeItem("authToken"); // Brišemo token iz localStorage
    setIsAuthenticated(false); // Ažuriramo stanje autentifikacije
    console.log("User logged out, token removed.");
  };

  // Povremeno možemo dodati efekt za provjeru stanja tokena
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsAuthenticated(!!token); // Ako token postoji, korisnik je autentificiran
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook za jednostavno korištenje AuthContext-a
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
