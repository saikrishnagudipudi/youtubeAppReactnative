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

export const HistoryVideo = (item: any) => {
  return {
    type: 'HISTORY',
    payload: {item: item},
  };
};

export const PlayHistoryVideo = (id: string) => {
  return {
    type: 'PLAYHISTORYVIDEO',
    payload: {id: id},
  };
};
