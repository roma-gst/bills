import { BrowserRouter, Route, Routes } from "react-router-dom";

import { AuthProvider } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import { FinancialProvider } from "./context/FinancialContext";

import ProtectedRoute from "./routes/ProtectedRoute";
import ScrollToTop from "./routes/ScrollToTop";

import Auth from "./pages/Auth";
import Home from "./pages/Home";
import MonthDetails from "./pages/MonthDetails";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import Accounts from "./pages/Accounts";
import Categories from "./pages/Categories";
import RecurringTransactions from "./pages/RecurringTransactions";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <FinancialProvider>
            <ScrollToTop />

            <Routes>
              <Route path="/login" element={<Auth />} />

              <Route element={<ProtectedRoute />}>
                <Route path="/" element={<Home />} />
                <Route path="/accounts" element={<Accounts />} />
                <Route path="/categories" element={<Categories />} />
                <Route path="/categorias" element={<Categories />} />
                <Route path="/recurring" element={<RecurringTransactions />} />
                <Route
                  path="/recorrencias"
                  element={<RecurringTransactions />}
                />
                <Route path="/month/:monthName" element={<MonthDetails />} />
                <Route path="/profile" element={<Profile />} />
              </Route>

              <Route path="*" element={<NotFound />} />
            </Routes>
          </FinancialProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
