import { useState, createContext } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [key, setKey] = useState("");

    return <AuthContext.Provider value={{key, setKey}}>{children}</AuthContext.Provider>
}