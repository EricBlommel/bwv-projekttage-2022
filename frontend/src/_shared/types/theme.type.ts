export interface ThemeState {
  darkMode: boolean;
}

export const THEME_SET = 'THEME_SET';

export interface ThemeSetAction {
  type: typeof THEME_SET;
  darkMode: boolean;
}

export type ThemeActionTypes = ThemeSetAction;