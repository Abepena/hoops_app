import { createContext, useContext, useState } from "react";

const UserContext = createContext(undefined);

const useUserContext = () => {
  context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within an UserProvider");
  }

  return context;
};

const UserProvider = (props) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [settings, setSettings] = useState({});
  const [user, setUser] = useState({});

  const UserContextValue = {
    user,
    setUser,
    isAuthenticated,
    setIsAuthenticated,
    settings,
    setSettings,
  };

  return <UserContext.Provider value={UserContextValue} {...props} />;
};

export { UserProvider, useUserContext };
