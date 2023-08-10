import React, {Component} from 'react';
import {connect} from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Octicons from 'react-native-vector-icons/Octicons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();
import {SafeAreaView, StatusBar, StyleSheet, Text, View} from 'react-native';
import Home from './Home';
import Explore from './Explore';
import Add from './Add';
import Subscription from './Subscription';
import Library from './Library';

interface IProps {
  globalState: any;
  navigation?: {push: (arg: string) => void};
}
interface IState {}

class BottomTab extends Component<IProps, IState> {
  goProfile = () => {
    this.props.navigation?.push('Profile');
  };

  onSearch = () => {
    this.props.navigation?.push('Search');
  };

  getColorIcons = () => (this.props.globalState.themeMode ? '#fff' : '#000');
  getHeaderIcons = () =>
    this.props.globalState.themeMode ? '#ffffff' : '#000000cc';
  render() {
    const getState = this.props.globalState;
    // console.log(this.props.globalState);
    return (
      <View
        testID="bottomScreenContainer"
        style={[
          styles.homeContainer,
          getState.themeMode
            ? {backgroundColor: '#000000cc'}
            : {backgroundColor: '#ffffff'},
        ]}>
        <SafeAreaView style={{flex: 1}}>
          <StatusBar
            backgroundColor={getState.themeMode ? '#000000aa' : '#fff'}
            barStyle={getState.themeMode ? 'light-content' : 'dark-content'}
          />
          <View style={styles.homeHeaderContainer}>
            <View style={styles.titleContainer}>
              <View style={styles.iconContainer}>
                <FontAwesome name="play" color={'#fff'} size={hp('2.3')} />
              </View>
              <Text
                style={[
                  styles.title,
                  getState.themeMode ? {color: '#FFFFFF'} : {color: '#282828'},
                ]}>
                Youtube
              </Text>
            </View>
            <View
              style={[
                styles.titleBarIcons,
                //   {backgroundColor: '#C4C4C426'},
              ]}>
              <MaterialCommunityIcons
                name="cast"
                color={this.getHeaderIcons()}
                size={hp('3.4')}
              />
              <AntDesign
                name="bells"
                color={this.getHeaderIcons()}
                size={hp('3.4')}
              />
              <AntDesign
                name="search1"
                color={this.getHeaderIcons()}
                size={hp('3.4')}
                onPress={this.onSearch}
                testID="search"
              />
              <FontAwesome
                name="user-circle"
                onPress={this.goProfile}
                testID="profile"
                color={this.getHeaderIcons()}
                size={hp('3.4')}
              />
            </View>
          </View>

          <View style={{flex: 1}} testID="BottomTabBars">
            <Tab.Navigator
              initialRouteName="Home"
              screenOptions={{
                tabBarActiveTintColor: '#000000',
                headerShown: false,
                tabBarHideOnKeyboard: true,
                tabBarShowLabel: false,
                tabBarStyle: {
                  height: hp(10),
                  width: wp(93),
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: 'rgba(196, 196, 196, 0.35)',
                  elevation: 0,
                  borderRadius: hp('1.3'),
                  paddingBottom: 0,
                },
                tabBarLabelStyle: {
                  backgroundColor: 'transparent',
                },
              }}>
              <Tab.Screen
                name="Home"
                component={Home}
                options={{
                  tabBarLabelStyle: {
                    backgroundColor: 'transparent',
                  },
                  tabBarIcon: ({focused}) => (
                    <View testID="tabButtons" style={styles.tabBarContainer}>
                      {focused ? (
                        <MaterialCommunityIcons
                          name="home-variant"
                          color={this.getColorIcons()}
                          size={hp('4.2')}
                        />
                      ) : (
                        <Octicons
                          name="home"
                          color={this.getColorIcons()}
                          size={hp('4.2')}
                        />
                      )}
                      <Text
                        style={[
                          styles.labelInActiveStyle,
                          {color: this.getColorIcons()},
                        ]}>
                        Home
                      </Text>
                    </View>
                  ),
                }}
              />
              <Tab.Screen
                name="Explore"
                component={Explore}
                options={{
                  tabBarIcon: ({focused}) => (
                    <View style={styles.tabBarContainer}>
                      <Ionicons
                        name={focused ? 'compass-sharp' : 'compass-outline'}
                        color={this.getColorIcons()}
                        size={hp('4.2')}
                      />
                      <Text
                        style={[
                          styles.labelInActiveStyle,
                          {color: this.getColorIcons()},
                        ]}>
                        Explore
                      </Text>
                    </View>
                  ),
                }}
              />
              <Tab.Screen
                name="Add"
                component={Add}
                options={{
                  tabBarIcon: () => (
                    <View>
                      <AntDesign
                        name="pluscircleo"
                        color={this.getColorIcons()}
                        size={hp('6.5')}
                      />
                    </View>
                  ),
                }}
              />
              <Tab.Screen
                name="Subscription"
                component={Subscription}
                options={{
                  tabBarIcon: ({focused}) => (
                    <View style={styles.tabBarContainer}>
                      <MaterialCommunityIcons
                        name={
                          focused
                            ? 'youtube-subscription'
                            : 'youtube-subscription'
                        }
                        color={this.getColorIcons()}
                        size={hp('4.2')}
                      />
                      <Text
                        style={[
                          styles.labelInActiveStyle,
                          {color: this.getColorIcons(), fontSize: hp('1.45')},
                        ]}>
                        Subscription
                      </Text>
                    </View>
                  ),
                }}
              />
              <Tab.Screen
                name="Library"
                component={Library}
                options={{
                  tabBarIcon: ({focused}) => (
                    <View style={styles.tabBarContainer}>
                      <MaterialCommunityIcons
                        name={
                          focused
                            ? 'play-box-multiple'
                            : 'play-box-multiple-outline'
                        }
                        color={this.getColorIcons()}
                        size={hp('4.2')}
                      />
                      <Text
                        style={[
                          styles.labelInActiveStyle,
                          {color: this.getColorIcons()},
                        ]}>
                        Library
                      </Text>
                    </View>
                  ),
                }}
              />
            </Tab.Navigator>
          </View>
        </SafeAreaView>
      </View>
    );
  }
}
const mapStateToProps = (state: any) => {
  return {
    globalState: state,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(BottomTab);

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    padding: hp(1.5),
  },
  homeHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // padding: hp('2'),
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconContainer: {
    height: hp('4'),
    width: wp('11'),
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF0000',
    borderRadius: hp('1.2'),
  },
  title: {
    color: '#282828',
    fontSize: hp('3'),
    fontFamily: 'Inter',
    fontWeight: '800',
    marginLeft: wp('1'),
  },
  titleBarIcons: {
    width: wp('45'),
    height: hp('5'),
    backgroundColor: '#C4C4C426',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRadius: hp('1'),
  },
  tabBarContainer: {
    // height: hp(10),
    width: wp(30),
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    // borderWidth: 1,
  },
  labelInActiveStyle: {
    color: '#000000',
    fontSize: hp('1.6'),
    fontFamily: 'Inter',
    fontWeight: '800',
  },
});
