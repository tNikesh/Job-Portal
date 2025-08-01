"use client";
import React, { createContext, useState, useContext, useEffect } from "react";
import api from "../lib/api";
import { useRouter } from "next/navigation";

interface User{
  id:number;
  username:string;
  email:string;
  role:string;
}

interface AuthContextType {
  user: User|null;
  loading:boolean;
  logout:()=>void;
}

const AuthContext = createContext<AuthContextType>({
  user:null,
  loading:true,
  logout:()=>{},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading,setLoading]=useState(false);

  const router = useRouter();

  useEffect(()=>{
    const token=localStorage.getItem("token");

    if (!token) {
      setLoading(false);
      return;
    }

  
      api.get('/user')
          .then((res)=>{
            const mappedUser = mapUserApiToUser(res.data);
            setUser(mappedUser);
          })
          .catch(()=>{
            localStorage.removeItem('token');setUser(null);
          })
          .finally(()=>setLoading(false));
   
    
  },[])

  const logout=()=>{
    localStorage.removeItem('token');
    setUser(null);
    router.push('/login');
  }

  return (
    <AuthContext.Provider value={{ user, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

function mapUserApiToUser(userApi: any): User {
  return {
    id: userApi.id,
    username: userApi.username,
    email: userApi.email,
    role: userApi.role,
  };
}


export const useAuth = () => useContext(AuthContext);
