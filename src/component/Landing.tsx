import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {connect} from 'react-redux';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
interface IProps {
  globalState: any;
  navigation?: {replace: (arg: string) => void};
}
interface IState {}

class Landing extends Component<IProps, IState> {
  componentDidMount = () => {
    setTimeout(() => {
      this.props.navigation?.replace('BottomTab');
    }, 3000);
  };
  render() {
    // console.log(this.props.globalState)
    return (
      <View
        testID="landingScreenId"
        style={[
          styles.landingScreen,
          this.props.globalState.themeMode
            ? {backgroundColor: '#000000cc'}
            : {backgroundColor: '#ffffff'},
        ]}>
        <View style={styles.iconContainer}>
          <FontAwesome name="play" color={'#fff'} size={hp('4.5')} />
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

export default connect(mapStateToProps, mapDispatchToProps)(Landing);

const styles = StyleSheet.create({
  landingScreen: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    height: hp('10%'),
    width: wp('30%'),
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF0000',
    borderRadius: hp('2.2'),
  },
});
