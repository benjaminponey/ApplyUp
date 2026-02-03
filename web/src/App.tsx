import "./App.css";
import { AppliancesList } from "./components/AppliancesList";
import { ApplyForm } from "./components/ApplyForm";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ApplianceDetails } from "./components/ApplianceDetails";
import { LoginForm } from "./components/LoginForm";
import { AuthProvider } from "./contexts/AuthContext";
import { Header } from "./components/Header";
import { ProtectedRoute } from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppRoot />
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
            <ProtectedRoute>
              <ApplyForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/list"
          element={
            <ProtectedRoute>
              <AppliancesList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/details/:id"
          element={
            <ProtectedRoute>
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
