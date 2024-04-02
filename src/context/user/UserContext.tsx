"use client";

import React, { createContext, useState, useContext, ReactNode } from "react";

export interface Organisation {
  id: string;
  org_name: string;
  org_id: string;
  verificaion: verstatus;
  org_mail: string;
  org_key: string | null;
}

export enum verstatus {
  NOTVERIFIED = 'NOTVERIFIED',
  PENDING = 'PENDING',
  VERIFIED = 'VERIFIED',
}

export enum status {
  USER = 'USER',
  NGO = 'NGO',
  SPONSOR = 'SPONSOR'
}

export interface UserProfile {
  id: string;
  status: status;
  location: string | null;
  organisation?: Organisation[];
}

export interface User {
  id: string;
  name: string | null;
  email: string;
  active: boolean;
}

interface UserContextType {
  user: User | null;
  updateUser: (newUserData: User | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  // Setter function to update the user data
  const updateUser = (newUserData: User | null) => {
    setUser(newUserData);
  };

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
