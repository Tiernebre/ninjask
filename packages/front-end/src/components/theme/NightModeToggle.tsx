import { useEffect } from "react";
import Switch from "react-switch";
import useLocalStorage from "react-use-localstorage";
import "./NightModeToggle.css";

export const NIGHT_MODE_KEY = "night-mode";
export const NIGHT_MODE_STYLESHEET_ID = "night-theme-style";

const addNightTheme = () => {
  const nightThemeElement = document.createElement("link");
  nightThemeElement.id = NIGHT_MODE_STYLESHEET_ID;
  nightThemeElement.rel = "stylesheet";
  nightThemeElement.href = "https://unpkg.com/bulma-prefers-dark";
  document.head.appendChild(nightThemeElement);
};

const removeNightTheme = () => {
  document.getElementById(NIGHT_MODE_STYLESHEET_ID)?.remove();
};

export const NightModeToggle = () => {
  const [nightModeEnabled, setNightModeEnabled] = useLocalStorage(
    NIGHT_MODE_KEY
  );

  // local storage uses Strings :(
  const nightModeIsTrulyEnabled = nightModeEnabled === "true";

  useEffect(() => {
    if (nightModeIsTrulyEnabled) {
      addNightTheme();
    } else {
      removeNightTheme();
    }
  }, [nightModeIsTrulyEnabled]);

  const updateNightMode = (nightModeEnabled: boolean) => {
    setNightModeEnabled(nightModeEnabled.toString());
  };

  return (
    <label className="NightModeToggle">
      <span className="NightModeToggle__emoji" aria-label="Night Mode Toggle">
        🌙
      </span>
      <Switch checked={nightModeIsTrulyEnabled} onChange={updateNightMode} />
    </label>
  );
};
