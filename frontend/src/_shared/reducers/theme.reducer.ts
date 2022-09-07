import {THEME_SET, ThemeActionTypes, ThemeState} from "../types/theme.type";
import {LocalStorageKeys} from "../constants/localstorage.constants";

const initialState: ThemeState = {
  darkMode: localStorage.getItem(LocalStorageKeys.DARK_MODE) === `${true}`, // => only if true in storage its actually true as we want the default to be false
};

export function themeReducer(state = initialState, action: ThemeActionTypes): ThemeState {
  switch (action.type) {
    case THEME_SET:
      return {
        ...state,
        darkMode: action.darkMode
      };
    default:
      return state;
  }
}