import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {connect} from 'react-redux';

const Stack = createNativeStackNavigator();
import {Appearance} from 'react-native';
import Landing from './Landing';
import {ThemeChange} from './Action';
import BottomTab from './BottomTab';
import Profile from './Profile';
import VideoPlayers from './VideoPlayers';
import Search from './Search';

interface IProps {
  globalState: any;
  onThemeChange: (theme: any) => void;
  navigation?: {replace: (arg: string) => void};
}
interface IState {}

class First extends Component<IProps, IState> {
  componentDidUpdate(
    prevProps: Readonly<IProps>,
    prevState: Readonly<IState>,
    snapshot?: any,
  ): void {
    Appearance.addChangeListener(theme => {
      this.props.onThemeChange(theme.colorScheme);
    });
  }
  componentDidMount = () => {
    const color = Appearance.getColorScheme();
    this.props.onThemeChange(color);
  };
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Landing" component={Landing} />
          <Stack.Screen name="BottomTab" component={BottomTab} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="VideoPlayers" component={VideoPlayers} />
          <Stack.Screen name="Search" component={Search} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
const mapStateToProps = (state: any) => {
  return {
    globalState: state,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onThemeChange: (para: string) => dispatch(ThemeChange(para)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(First);
