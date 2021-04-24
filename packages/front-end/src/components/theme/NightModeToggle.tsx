import Switch from 'react-switch'
import useLocalStorage from 'react-use-localstorage'

const NIGHT_MODE_KEY = 'night-mode'

export const NightModeToggle = () =>{
  const [nightModeEnabled, setNightModeEnabled] = useLocalStorage(NIGHT_MODE_KEY)
  
  const updateNightMode = (nightModeEnabled: boolean) => {
    setNightModeEnabled(nightModeEnabled.toString())
  }

  return <Switch checked={nightModeEnabled === 'true'} onChange={updateNightMode} />
} 
