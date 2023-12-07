import { createContext, useState } from "react";
import React from "react";

export interface Avocat {
  prenom: string;

  nom: string;

  email: string;

  bio: string;

  photoDeProfile: string;

  telephone: string;

  verifie: boolean;

  infosVerification: string;

  ansExperience: number;

  aideJuridique: boolean;

  active: boolean;

  specialite: string[];

  diplome: string;

  langues: string[];

  honoraires: string[];

  moyenDePaiement: string[];

  adresse: {};
}

export type Client = {
  nom: string;

  prenom: string;

  email: string;

  phoneNumber: string;
};

export type Admin = {};

export type USER_ROLE = "AVOCAT" | "ADMIN" | "CLIENT" | null;

export interface IAuth {
  isAuth: boolean;
  token: string | null;
  role: USER_ROLE;
  user: Avocat | null; // | Client | Admin
}

export interface IAuthContext {
  auth: IAuth;
  logout: () => void;
  hydrateAuth: () => void;
  persistAuth: () => void;
  setUser: (user: /*Client | Admin |*/ Avocat) => void;
  setRoleAndToken: (token: string, role: USER_ROLE) => void;
}

export const AuthContext = createContext<IAuthContext | null>(null);

interface IAuthContextProviderProps {
  children: React.ReactNode;
}

export const AuthContextProvider: React.FC<IAuthContextProviderProps> = ({
  children,
}) => {
  const [auth, setAuth] = useState<IAuth>({
    isAuth: false,
    token: null,
    role: null,
    user: null,
  });

  /**set new token after sign in success*/
  const setRoleAndToken = (token: string, role: USER_ROLE) =>
    setAuth(prev => ({ ...prev, isAuth: true, token, role }));

  /**set current user data */
  const setUser = (user: /*Client | Admin | */ Avocat) => {
    setAuth(prev => ({ ...prev, user }));
  };

  /**delete user from local storage */
  const deleteAuthFromLocalStorage = () =>
    window.localStorage.removeItem("auth");

  /**hydrate auth from local storage */
  const hydrateAuth = () => {
    const authFromLocal = window.localStorage.getItem("auth");
    if (authFromLocal?.length === 0 || authFromLocal === null) return;
    console.log("hydrating auth from local storage", authFromLocal);
    setAuth(JSON.parse(window.localStorage.getItem("auth") || "") as IAuth);
  };

  const persistAuth = () =>
    window.localStorage.setItem("auth", JSON.stringify(auth));

  const logout = () => {
    deleteAuthFromLocalStorage();
    setAuth(prev => ({
      ...prev,
      isAuth: false,
      token: null,
      user: null,
      role: "AVOCAT",
    }));
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
        logout,
        hydrateAuth,
        persistAuth,
        setUser,
        setRoleAndToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
