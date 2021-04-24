import { Fragment, useEffect, useState } from "react"
import { SessionService } from "../../api/session"

type SessionRefresherProps = {
  onSessionRefresh: (accessToken: string) => void;
  sessionService: SessionService;
  children: React.ReactNode;
}

export const SessionRefresher = ({ onSessionRefresh, sessionService, children }: SessionRefresherProps) => {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const refreshSession = async () => {
      try {
        const { accessToken } = await sessionService.refreshOne()
        onSessionRefresh(accessToken)
      } catch (error) {
        console.error('Refresh failed -- going to treat session as an unauthenticated one.')
      } finally {
        setIsLoading(false)
      }
    }
    refreshSession()
  }, [sessionService, onSessionRefresh])
  
  return isLoading ? <p>Loading...</p> : <Fragment>{children}</Fragment>
}