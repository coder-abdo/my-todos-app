import { makeAutoObservable } from "mobx";
import { createContext, FC, useContext } from "react";
export class User {
  token: string | null = localStorage.getItem("token") || null;
  constructor() {
    makeAutoObservable(this);
  }
  saveToken(token: string | null) {
    this.token = token;
  }
}

const StoreContext = createContext<User>(new User());

export const StoreProvider: FC<{ store: User }> = ({ store, children }) => (
  <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
);
export const useStore = () => useContext(StoreContext);
