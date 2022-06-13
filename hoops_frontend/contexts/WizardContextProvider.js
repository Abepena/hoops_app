import { createContext, useState, useMemo, useContext } from "react";

export const WizardContext = createContext();

export const WizardProvider = ({ children }) => {
  const [wizardState, setWizardState] = useState({});
  const [loading, setLoading] = useState(false);

  const value = { wizardState, setWizardState, loading, setLoading };
  return (
    <WizardContext.Provider value={value}>{children}</WizardContext.Provider>
  );
};

export const useWizardContext = () => useContext(WizardContext);
