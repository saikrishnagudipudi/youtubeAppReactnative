export const ThemeChange = (theme: string) => {
  return {
    type: 'THEME',
    payload: {theme: theme}
  };
};
