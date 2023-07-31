export const ThemeChange = (theme: string) => {
  return {
    type: 'THEME',
    payload: {theme: theme},
  };
};

export const ActiveVideo = (id: string) => {
  return {
    type: 'VIDEO',
    payload: {id: id},
  };
};
