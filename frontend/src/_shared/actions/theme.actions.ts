import {LocalStorageKeys} from "../constants/localstorage.constants";
import {THEME_SET, ThemeSetAction} from "../types/theme.type";

export function themeSet(darkMode: boolean): ThemeSetAction {
  localStorage.setItem(LocalStorageKeys.DARK_MODE, `${darkMode}`);
  return {
    type: THEME_SET,
    darkMode
  };
}