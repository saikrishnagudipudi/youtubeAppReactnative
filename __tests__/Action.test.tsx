import {
  ThemeChange,
  ActiveVideo,
  HistoryVideo,
  PlayHistoryVideo,
} from '../src/component/Action';

describe('Action on Redux', () => {
  it('should create an action with the given theme', () => {
    const theme = 'dark';
    const action = ThemeChange(theme);
    expect(action.type).toBe('THEME');
    expect(action.payload.theme).toBe(theme);
  });

  it('should create an action with the given video ID', () => {
    const id = '123456';
    const action = ActiveVideo(id);
    expect(action.type).toBe('VIDEO');
    expect(action.payload.id).toBe(id);
  });

  it('should create an action with the given item', () => {
    const item = {id: '123456', title: 'Video 1'};
    const action = HistoryVideo(item);
    expect(action.type).toBe('HISTORY');
    expect(action.payload.item).toBe(item);
  });

  it('should create an action with the given video ID', () => {
    const id = '123456';
    const action = PlayHistoryVideo(id);
    expect(action.type).toBe('PLAYHISTORYVIDEO');
    expect(action.payload.id).toBe(id);
  });
});
