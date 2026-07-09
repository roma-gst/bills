import { createContext, useContext } from "react";
import useFinancialPlanner from "../hooks/useFinancialPlanner";

const FinancialContext = createContext();

export function FinancialProvider({ children }) {
  const financial = useFinancialPlanner();

  return (
    <FinancialContext.Provider value={financial}>
      {children}
    </FinancialContext.Provider>
  );
}

export function useFinancial() {
  return useContext(FinancialContext);
}
