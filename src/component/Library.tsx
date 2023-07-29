import React, {Component} from 'react';
import {
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {connect} from 'react-redux';
interface IProps {
  globalState: any;
}
interface IState {}
import Entypo from 'react-native-vector-icons/Entypo';
class Library extends Component<IProps, IState> {
  render() {
    const getState = this.props.globalState;
    return (
      <View
        style={[
          styles.libraryContainer,
          getState.themeMode
            ? {backgroundColor: '#000000cc'}
            : {backgroundColor: '#ffffff'},
        ]}>
        <Text
          style={[
            styles.reactText,
            getState.themeMode ? {color: '#fff'} : {color: '#000'},
          ]}>
          Recent
        </Text>
        <View style={styles.hrLine} />
        <View>
          <TouchableOpacity>
            <Text>History</Text>
          </TouchableOpacity>
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

export default connect(mapStateToProps, mapDispatchToProps)(Library);

const styles = StyleSheet.create({
  libraryContainer: {
    flex: 1,
  },
  reactText: {
    color: '#000',
    fontSize: hp('2.2'),
    fontFamily: 'Inter',
    fontWeight: '500',
    marginTop: hp('0.6'),
  },
  hrLine: {
    width: wp('100'),
    borderWidth: 1,
    borderColor: '#C4C4C426',
  },
});
