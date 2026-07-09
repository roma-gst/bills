import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MonthDetails from "./pages/MonthDetails";
import { FinancialProvider } from "./context/FinancialContext";

function App() {
  return (
    <FinancialProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/month/:monthName" element={<MonthDetails />} />
        </Routes>
      </BrowserRouter>
    </FinancialProvider>
  );
}

export default App;
