import { createContext, useContext } from "react";


export const AuthContext = createContext<any>({
    user : {},
    setUser : () => {}
});

export const AuthContextProvider = AuthContext.Provider;

const useAuth = () =>  useContext(AuthContext);
export default useAuth;
