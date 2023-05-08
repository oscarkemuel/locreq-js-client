'use client'
import { APP_ROUTES } from "@/constants/app-routes";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import LoadingScreen from "../LoadingScreen";
import { useAuthStore } from "@/store/auth";

type PrivateRouteProps = {
  children: React.ReactNode;
}

const PrivateRoute = ({children}: PrivateRouteProps) => {
  const { push } = useRouter()
  const { actions: { getToken } } = useAuthStore()

  const userIsAuthenticated = !!getToken()

  useEffect(() => {
    if (!userIsAuthenticated) {
      push(APP_ROUTES.public.login)
    }
  }, [userIsAuthenticated, push])

  return (
    <>
      {!userIsAuthenticated && <LoadingScreen />}
      {userIsAuthenticated && children}
    </>
  )
}

export default PrivateRoute