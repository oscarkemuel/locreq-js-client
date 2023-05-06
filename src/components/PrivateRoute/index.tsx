import { APP_ROUTES } from "@/constants/app-routes";
import { checkUserAuthenticated } from "@/functions/check-user-authenticated";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

type PrivateRouteProps = {
  children: React.ReactNode;
}

const PrivateRoute = ({children}: PrivateRouteProps) => {
  const { push } = useRouter()

  const userIsAuthenticated = checkUserAuthenticated();

  useEffect(() => {
    if (!userIsAuthenticated) {
      push(APP_ROUTES.public.login)
    }
  }, [userIsAuthenticated, push])

  return (
    <>
      {!userIsAuthenticated && null}
      {userIsAuthenticated && children}
    </>
  )
}

export default PrivateRoute