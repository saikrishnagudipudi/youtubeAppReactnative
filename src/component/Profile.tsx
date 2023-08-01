import React, {Component} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {connect} from 'react-redux';

import {Image, StyleSheet, Text, View} from 'react-native';
interface IProps {
  globalState: any;
  navigation?: {goBack: () => void};
}
interface IState {}
class Profile extends Component<IProps, IState> {
  goHome = () => {
    this.props.navigation?.goBack();
  };
  render() {
    const getState = this.props.globalState;
    return (
      <View
        style={[
          styles.profileContainer,
          getState.themeMode
            ? {backgroundColor: '#000000cc'}
            : {backgroundColor: '#ffffff'},
        ]}>
        <View>
          <View style={styles.accountHeaderContainer}>
            <AntDesign
              onPress={this.goHome}
              name="left"
              color={getState.themeMode ? '#fff' : '#000'}
              size={hp('3')}
            />
            <View style={styles.accountTextContainer}>
              <Text style={styles.accountText}>Account</Text>
            </View>
          </View>
          <View style={styles.accountHeaderContainer}>
            <FontAwesome
              name="user-circle"
              color={getState.themeMode ? '#ffffff' : '#000000cc'}
              size={hp('6')}
            />
            <View style={{marginLeft: wp('3')}}>
              <Text
                style={[
                  styles.accountName,
                  getState.themeMode ? {color: '#fff'} : {color: '#000'},
                ]}>
                Sai Krishna Gudipudi{' '}
                <AntDesign
                  name="down"
                  color={getState.themeMode ? '#fff' : '#000'}
                  size={hp('2')}
                />
              </Text>
              <Text
                style={[
                  styles.accountName,
                  getState.themeMode ? {color: '#fff'} : {color: '#000'},
                ]}>
                saikrishna.gudipudi@extwebtech.in
              </Text>
              <Text style={styles.manageText}>Manage your Google Account</Text>
            </View>
          </View>
          <View style={styles.accountHeaderContainer}>
            <MaterialCommunityIcons
              name="account-box-outline"
              color={getState.themeMode ? '#ffffff' : '#000000cc'}
              size={hp('4')}
            />
            <Text
              style={[
                styles.yourChannelText,
                getState.themeMode ? {color: '#fff'} : {color: '#000'},
              ]}>
              Your Channel
            </Text>
          </View>
          <View style={styles.youtubeStudioContainer}>
            <View style={styles.youtubeStudioTextContainer}>
              <Image
                tintColor={getState.themeMode ? '#fff' : '#000'}
                source={require('./assets/settings.png')}
                resizeMode="stretch"
                style={styles.youtubeSettingImage}
              />
              <Text
                style={[
                  styles.yourChannelText,
                  getState.themeMode ? {color: '#fff'} : {color: '#000'},
                ]}>
                YouTube Studio
              </Text>
            </View>
            <Feather
              name="external-link"
              color={getState.themeMode ? '#ffffff' : '#000000cc'}
              size={hp('3.5')}
            />
          </View>
          <View style={styles.accountHeaderContainer}>
            <MaterialIcons
              name="bar-chart"
              color={getState.themeMode ? '#ffffff' : '#000000cc'}
              size={hp('4')}
            />
            <Text
              style={[
                styles.yourChannelText,
                getState.themeMode ? {color: '#fff'} : {color: '#000'},
              ]}>
              Time watched
            </Text>
          </View>
          <View style={styles.accountHeaderContainer}>
            <Feather
              name="youtube"
              color={getState.themeMode ? '#ffffff' : '#000000cc'}
              size={hp('4')}
            />
            <Text
              style={[
                styles.yourChannelText,
                getState.themeMode ? {color: '#fff'} : {color: '#000'},
              ]}>
              Get YouTube Premium
            </Text>
          </View>
          <View style={styles.accountHeaderContainer}>
            <FontAwesome
              name="dollar"
              color={getState.themeMode ? '#ffffff' : '#000000cc'}
              size={hp('3')}
            />
            <Text
              style={[
                styles.yourChannelText,
                getState.themeMode ? {color: '#fff'} : {color: '#000'},
              ]}>
              Purchases and memberships
            </Text>
          </View>
          <View style={styles.accountHeaderContainer}>
            <MaterialCommunityIcons
              name="account-box-multiple-outline"
              color={getState.themeMode ? '#ffffff' : '#000000cc'}
              size={hp('4')}
            />
            <Text
              style={[
                styles.yourChannelText,
                getState.themeMode ? {color: '#fff'} : {color: '#000'},
              ]}>
              Switch account
            </Text>
          </View>
          <View style={styles.accountHeaderContainer}>
            <MaterialCommunityIcons
              name="incognito"
              color={getState.themeMode ? '#ffffff' : '#000000cc'}
              size={hp('4')}
            />
            <Text
              style={[
                styles.yourChannelText,
                getState.themeMode ? {color: '#fff'} : {color: '#000'},
              ]}>
              Turn on Incognito
            </Text>
          </View>
          <View style={styles.accountHeaderContainer}>
            <MaterialCommunityIcons
              name="shield-account-outline"
              color={getState.themeMode ? '#ffffff' : '#000000cc'}
              size={hp('4')}
            />
            <Text
              style={[
                styles.yourChannelText,
                getState.themeMode ? {color: '#fff'} : {color: '#000'},
              ]}>
              Your data in YouTube
            </Text>
          </View>
          <View style={styles.accountHeaderContainer}>
            <Feather
              name="settings"
              color={getState.themeMode ? '#ffffff' : '#000000cc'}
              size={hp('4')}
            />
            <Text
              style={[
                styles.yourChannelText,
                getState.themeMode ? {color: '#fff'} : {color: '#000'},
              ]}>
              Settings
            </Text>
          </View>
          <View style={styles.accountHeaderContainer}>
            <AntDesign
              name="questioncircleo"
              color={getState.themeMode ? '#ffffff' : '#000000cc'}
              size={hp('4')}
            />
            <Text
              style={[
                styles.yourChannelText,
                getState.themeMode ? {color: '#fff'} : {color: '#000'},
              ]}>
              Help and feedback
            </Text>
          </View>
        </View>
        <View style={styles.termsContainer}>
          <Text
            style={[
              styles.termsText,
              getState.themeMode ? {color: '#fff'} : {color: '#000'},
            ]}>
            Privacy Policy Terms of Services
          </Text>
        </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

const styles = StyleSheet.create({
  profileContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: hp('2'),
  },
  accountHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#C4C4C426',
    padding: hp('1'),
    borderRadius: hp('1'),
    marginBottom: hp('1'),
  },
  accountTextContainer: {
    width: wp('82.5'),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  accountText: {
    color: '#076AFE',
    fontSize: hp('2.5'),
    fontFamily: 'Inter',
    fontWeight: '500',
  },
  accountName: {
    color: '#000000',
    fontSize: hp('2'),
    fontFamily: 'Inter',
    fontWeight: '500',
  },
  manageText: {
    color: '#076AFE',
    fontSize: hp('2'),
    fontFamily: 'Inter',
    fontWeight: '500',
  },
  yourChannelText: {
    color: '#000000',
    fontSize: hp('2'),
    fontFamily: 'Inter',
    fontWeight: '500',
    marginLeft: wp('5'),
  },
  youtubeSettingImage: {
    height: hp('4'),
    width: wp('9'),
  },
  termsContainer: {
    width: wp('95'),
    // flexDirection: 'row',
    // justifyContent: 'center',
    // alignItems: 'flex-end',
  },
  termsText: {
    color: '#000000',
    fontSize: hp('2'),
    fontFamily: 'Inter',
    fontWeight: '500',
    textAlign: 'center',
    marginTop: hp('1'),
  },
  youtubeStudioContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#C4C4C426',
    padding: hp('1'),
    borderRadius: hp('1'),
    marginBottom: hp('1'),
  },
  youtubeStudioTextContainer: {
    flexDirection: 'row',
    // justifyContent: 'space-between',/
    alignItems: 'center',
  },
});
