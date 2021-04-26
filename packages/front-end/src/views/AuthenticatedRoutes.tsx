import { Route } from "react-router-dom"
import { Home } from "./Home"

type AuthenticatedRoutesProps = {
  accessToken?: string
  homeRoutes: string[]
}

export const AuthenticatedRoutes = ({ homeRoutes, accessToken }: AuthenticatedRoutesProps) => {
  return (
    <Route path={homeRoutes} exact>
      <Home accessToken={accessToken} />
    </Route>
  )
}