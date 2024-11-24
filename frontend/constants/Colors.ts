/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 */

export const Colors = {
  light: {
    primary: '#1E6091', 
    secondary: '#52B69A', 
    background: '#FFF', 
    icon: '#1E6091', 
    active: '#52B69A', 
    inactive: '#1E6091', 
  },
  dark: {
    primary: '#FFF', 
    secondary: '#52B69A', 
    background: '#1E6091', 
    icon: '#1E6091', 
    active: '#FFF', 
    inactive: '#52B69A', 
  },
};

export const getColors = (theme: "light" | "dark") => Colors[theme];
