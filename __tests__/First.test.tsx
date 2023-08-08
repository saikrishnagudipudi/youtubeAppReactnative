import {Provider} from 'react-redux';
import First from '../src/component/First';
import Store from '../src/component/Store';
import {fireEvent, render} from '@testing-library/react-native';
import {Appearance} from 'react-native';
import {act} from 'react-test-renderer';
jest.mock('@react-navigation/native', () => ({
  NavigationContainer: jest.fn(),
}));
jest.mock('react-native-responsive-screen', () => ({
  widthPercentageToDP: jest.fn(),
  heightPercentageToDP: jest.fn(),
}));

jest.mock('react-native/Libraries/Utilities/Appearance', () => {
  const Appearance = {
    ...jest.requireActual('react-native/Libraries/Utilities/Appearance'),
    getColorScheme: jest.fn(),
    addChangeListener: jest.fn(),
  };
  return Appearance;
});

jest.mock('@react-navigation/native-stack', () => ({
  createNativeStackNavigator: () => ({
    Navigator: () => <></>,
    Screen: () => <></>,
  }),
}));
jest.mock('@react-navigation/bottom-tabs', () => ({
  createBottomTabNavigator: jest.fn(),
}));

jest.mock('react-native-video', () => () => <></>);

jest.mock('react-native-vector-icons/FontAwesome', () => 'FontAwesome');
jest.mock(
  'react-native-vector-icons/MaterialCommunityIcons',
  () => 'MaterialCommunityIcons',
);
jest.mock('react-native-vector-icons/AntDesign', () => 'AntDesign');
jest.mock('react-native-vector-icons/Ionicons', () => 'Ionicons');
jest.mock('react-native-vector-icons/Octicons', () => 'Octicons');
jest.mock('react-native-vector-icons/Entypo', () => 'Entypo');
jest.mock('react-native-vector-icons/Foundation', () => 'Foundation');
jest.mock('react-native-vector-icons/Foundation', () => 'Foundation');
jest.mock('react-native-vector-icons/MaterialIcons', () => 'MaterialIcons');
jest.mock('react-native-vector-icons/Feather', () => 'Feather');

const mockFn = jest.fn();
const navigationScreenProps = {
  navigation: {
    replace: mockFn,
  },
  globalState: {themeMode: false},
  onThemeChange: jest.fn(),
};

describe('Navigation Screen', () => {
  it('Check the Landing Screen Dark Background', () => {
    render(
      <Provider store={Store}>
        <First />
      </Provider>,
    );
    const newTheme = {colorScheme: 'dark'};
    // console.log('Appearance', Appearance.addChangeListener.mock.contexts[0]);
    act(() => {
      Appearance.addChangeListener.mock.calls[0][0](newTheme);
      Appearance.addChangeListener.mock.contexts[0].getColorScheme();
      Appearance.addChangeListener.mock.contexts[0].addChangeListener();
      expect(navigationScreenProps.onThemeChange).toHaveBeenCalledTimes(0);
    });
  });
  it('Check the Landing Screen light Background', () => {
    render(
      <Provider store={Store}>
        <First />
      </Provider>,
    );
    const newTheme = {colorScheme: 'light'};
    act(() => {
      Appearance.addChangeListener.mock.calls[0][0](newTheme);
      Appearance.addChangeListener.mock.contexts[0].getColorScheme();
      Appearance.addChangeListener.mock.contexts[0].addChangeListener();
      expect(navigationScreenProps.onThemeChange).toHaveBeenCalledTimes(0);
    });
  });
});
