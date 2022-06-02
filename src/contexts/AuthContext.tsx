import { useState, createContext, useContext } from "react";

const AuthContext = createContext({
    userID: null,
    setUserID: (newID: string) => {},
});

const AuthContextComponent = ({ children }) => {
    const [userID, setUserID] = useState(null);

    return (
        <AuthContext.Provider value={{ userID, setUserID }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContextComponent;

export const useAuthContext = () => useContext(AuthContext);
