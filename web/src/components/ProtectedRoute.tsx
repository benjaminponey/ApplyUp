import { PropsWithChildren, useEffect } from "react";
import { useAuth, UserRole } from "../contexts/AuthContext";
import { LoginForm } from "./LoginForm";
import { useNavigate } from "react-router-dom";


export type ProtectedRouteProps = {
    role?: UserRole
    roleFallbackPath?: string
};


export const ProtectedRoute = ({ role, roleFallbackPath, children }: PropsWithChildren<ProtectedRouteProps>) => {
  const { user } = useAuth();

  const navigate = useNavigate()

  useEffect(() => {
    if(user && role && roleFallbackPath && role !== user.role) {
        navigate(roleFallbackPath)
    }
  }, [user, role, roleFallbackPath])

  return user ? children : <LoginForm />;
};
