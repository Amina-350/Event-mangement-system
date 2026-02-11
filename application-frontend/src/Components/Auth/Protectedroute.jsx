import React from "react"
import { Navigate, Outlet } from "react-router-dom"

export default function Protectedroute() {
  const isAuthenticated = Boolean(localStorage.getItem("token"))

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}
