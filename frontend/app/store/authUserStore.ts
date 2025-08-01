import { create } from "zustand";
import { User } from "../types/user";
import { persist } from "zustand/middleware";

type AuthState = {
  authUser: User | null;
  setAuthUser: (user: User | null) => void;
  logout: () => void;
};

const broadcast = typeof window !== "undefined" ? new BroadcastChannel("auth_channel") : null;

const useAuthStore = create<AuthState>()( 
  persist(
    (set)=>({
    authUser: null,
    setAuthUser: (user) => {
      set({ authUser: user });
      if (user) {
        broadcast?.postMessage({ type: "SET_USER", user });
      }
    },
    logout: () => {
      localStorage.removeItem("token");
      set({ authUser: null });
      broadcast?.postMessage({ type: "LOGOUT" });
    },
  }),
  {
    name:"auth-storage"
  }
));


if (typeof window !== "undefined" && broadcast) {
  broadcast.onmessage = (event) => {
    if (event.data.type === "SET_USER") {
      useAuthStore.setState({ authUser: event.data.user });
    }
    if (event.data.type === "LOGOUT") {
      localStorage.removeItem("token");
      useAuthStore.setState({ authUser: null });
    }
  };
}


export default useAuthStore;
