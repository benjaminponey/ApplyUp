import "./App.css";
import { AppliancesList } from "./components/AppliancesList";
import { ApplyForm } from "./components/ApplyForm";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { AppliancesProvider } from "./contexts/AppliancesContext";
import { ApplianceDetails } from "./components/ApplianceDetails";
import { LoginForm } from "./components/LoginForm";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { Header } from "./components/Header";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { useEffect } from "react";

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppliancesProvider>
          <AppRoot />
        </AppliancesProvider>
      </AuthProvider>
    </Router>
  );
}

const AppRoot = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route
          path="/form"
          element={
            <ProtectedRoute role="candidate" roleFallbackPath="/list">
              <ApplyForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/list"
          element={
            <ProtectedRoute role="interviewer" roleFallbackPath="/form">
              <AppliancesList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/details/:id"
          element={
            <ProtectedRoute role="interviewer" roleFallbackPath="/form">
              <ApplianceDetails />
            </ProtectedRoute>
          }
        />
        {/* Syntax with search params instead of path params <Route path="/details" element={<ApplianceDetails />} /> */}
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </>
  );
};

export default App;
