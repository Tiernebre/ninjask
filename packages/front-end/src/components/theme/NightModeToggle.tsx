import { useState } from 'react'
import Switch from 'react-switch'

export const NightModeToggle = () =>{
  const [nightModeEnabled, setNightModeEnabled] = useState(false)

  return <Switch checked={nightModeEnabled} onChange={setNightModeEnabled} />
} 
