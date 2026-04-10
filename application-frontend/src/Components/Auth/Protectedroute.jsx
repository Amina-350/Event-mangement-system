import { Navigate, Outlet } from "react-router-dom"
import React from "react";
export default function Protectedroute() {
  const isAuthenticated = Boolean(localStorage.getItem("token"))

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}
