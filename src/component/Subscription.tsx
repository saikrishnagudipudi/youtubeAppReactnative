import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Entypo from 'react-native-vector-icons/Entypo';
import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

interface IProps {
  globalState: any;
}
interface IState {
  subActive: number;
}
const subButtonList = [
  {
    id: 1,
    text: 'All',
  },
  {
    id: 2,
    text: 'Today',
  },
  {
    id: 3,
    text: 'Continue watching',
  },
  {
    id: 4,
    text: 'Unwatched',
  },
  {
    id: 5,
    text: 'Live',
  },
  {
    id: 6,
    text: 'Post',
  },
  {
    id: 7,
    text: 'Settings',
  },
];

class Subscription extends Component<IProps, IState> {
  state: IState = {
    subActive: 1,
  };
  onClickActive = (id: number) => {
    this.setState({subActive: id});
  };
  render() {
    const getState = this.props.globalState;
    const {subActive} = this.state;
    return (
      <View
        style={[
          styles.subContainer,
          getState.themeMode
            ? {backgroundColor: '#000000cc'}
            : {backgroundColor: '#ffffff'},
        ]}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.subscriptionContainer}>
            <View style={styles.subTechnical}>
              <Image
                source={require('./assets/technical.png')}
                resizeMode="stretch"
                style={styles.subImage}
              />
              <Text
                style={[
                  styles.technicalText,
                  getState.themeMode ? {color: '#fff'} : {color: '#000'},
                ]}>
                Technical
              </Text>
            </View>
            <View style={styles.subTechnical}>
              <Image
                source={require('./assets/netflix.png')}
                resizeMode="stretch"
                style={styles.subImage}
              />
              <Text
                style={[
                  styles.technicalText,
                  getState.themeMode ? {color: '#fff'} : {color: '#000'},
                ]}>
                Netflix
              </Text>
            </View>
            <View style={styles.subTechnical}>
              <Image
                source={require('./assets/marvel.png')}
                resizeMode="stretch"
                style={styles.subImage}
              />
              <Text
                style={[
                  styles.technicalText,
                  getState.themeMode ? {color: '#fff'} : {color: '#000'},
                ]}>
                Marvel
              </Text>
            </View>
            <View style={styles.subTechnical}>
              <Image
                source={require('./assets/charli.png')}
                resizeMode="stretch"
                style={styles.subImage}
              />
              <Text
                style={[
                  styles.technicalText,
                  getState.themeMode ? {color: '#fff'} : {color: '#000'},
                ]}>
                CharliMarie
              </Text>
            </View>
            <View style={styles.allContainer}>
              <Text style={styles.allText}>All</Text>
            </View>
          </View>
          <View style={{marginTop: hp('1'), marginBottom: hp('1')}}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {subButtonList.map(item => {
                return (
                  <TouchableOpacity
                    onPress={() => this.onClickActive(item.id)}
                    style={[
                      subActive === item.id
                        ? [
                            styles.buttonActive,
                            getState.themeMode
                              ? {backgroundColor: '#fff'}
                              : {backgroundColor: '#000'},
                          ]
                        : [
                            styles.itemButtonContainer,
                            getState.themeMode
                              ? {backgroundColor: '#DADADA5a'}
                              : {backgroundColor: '#DADADA5a'},
                          ],
                    ]}>
                    <Text
                      style={[
                        subActive === item.id
                          ? [
                              styles.buttonActiveItemText,
                              getState.themeMode
                                ? {color: '#000'}
                                : {color: '#fff'},
                            ]
                          : [
                              styles.buttonItemText,
                              getState.themeMode
                                ? {color: '#fff'}
                                : {color: '#000'},
                            ],
                      ]}>
                      {item.text}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
          {getState.videoList.map((item: any) => {
            return (
              <TouchableOpacity key={item.id} style={styles.videoContainer}>
                <ImageBackground
                  source={{uri: item.thumbnailUrl}}
                  resizeMode="stretch"
                  style={styles.videoBackImage}>
                  <View style={styles.durationContainer}>
                    <Text style={[styles.durationTimeText, {color: '#fff'}]}>
                      {item.duration}
                    </Text>
                  </View>
                </ImageBackground>
                <View style={styles.titleVideoContainer}>
                  <View style={styles.titleContainer}>
                    <Image
                      source={{uri: item.thumbnailUrl}}
                      resizeMode="stretch"
                      style={styles.thumbnailImage}
                    />
                    <View style={styles.titleTextContainer}>
                      <Text
                        style={[
                          styles.videoTittle,
                          getState.themeMode
                            ? {color: '#fff'}
                            : {color: '#030303'},
                        ]}>
                        {item.title}
                      </Text>
                      <Text
                        style={[
                          styles.viewsText,
                          getState.themeMode
                            ? {color: '#fff'}
                            : {color: '#030303'},
                        ]}>
                        {item.views} Views, {item.uploadTime}
                      </Text>
                    </View>
                  </View>
                  <Entypo
                    name="dots-three-vertical"
                    color={getState.themeMode ? '#fff' : '#000'}
                    size={hp('3')}
                  />
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
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

export default connect(mapStateToProps, mapDispatchToProps)(Subscription);

const styles = StyleSheet.create({
  subContainer: {
    flex: 1,
  },
  subscriptionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp('1'),
  },
  subImage: {
    height: hp('8'),
    width: wp('17'),
  },
  subTechnical: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: wp('2'),
  },
  technicalText: {
    color: '#000',
    fontSize: hp('2'),
    fontFamily: 'Inter',
    fontWeight: '500',
    marginTop: hp('0.6'),
  },
  allContainer: {
    height: hp('11'),
    // width: wp(''),
    backgroundColor: '#C4C4C426',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: wp('4.2'),
    borderRadius: hp('1.2'),
  },
  allText: {
    color: '#076AFE',
    fontSize: hp('2.1'),
    fontFamily: 'Inter',
    fontWeight: '500',
  },
  itemButtonContainer: {
    height: hp('6'),
    // width: wp('30'),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#DADADA5a',
    marginRight: wp('2'),
    borderRadius: hp('1'),
    paddingLeft: wp('5'),
    paddingRight: wp('5'),
  },
  buttonItemText: {
    color: '#000000',
    fontSize: hp('2.5'),
    fontFamily: 'Inter',
    fontWeight: '500',
  },
  buttonActiveItemText: {
    color: '#fff',
    fontSize: hp('2.5'),
    fontFamily: 'Inter',
    fontWeight: '500',
  },
  buttonActive: {
    height: hp('6'),
    // width: wp('30'),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
    marginRight: wp('2'),
    borderRadius: hp('1'),
    paddingLeft: wp('5'),
    paddingRight: wp('5'),
  },
  videoListContainer: {
    marginTop: hp('1.5'),
  },
  videoContainer: {
    marginBottom: hp('3'),
  },
  videoBackImage: {
    height: hp('20'),
    width: wp('93'),
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    padding: hp('1'),
    borderRadius: hp('2'),
  },
  durationContainer: {
    height: hp('3'),
    width: wp('12'),
    backgroundColor: '#000',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  durationTimeText: {
    color: '#000000',
    fontSize: hp('2.2'),
    fontFamily: 'Inter',
    fontWeight: '500',
    // marginLeft: wp('2'),
  },
  titleVideoContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginTop: hp('1.5'),
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  thumbnailImage: {
    height: hp('6.5'),
    width: wp('11'),
    borderRadius: hp('30'),
  },
  titleTextContainer: {
    marginLeft: hp('1'),
  },
  videoTittle: {
    color: '#030303',
    width: wp('70'),
    fontSize: hp('2.5'),
    fontFamily: 'Inter',
    fontWeight: '500',
  },
  viewsText: {
    color: '#030303',
    width: wp('70'),
    fontSize: hp('2'),
    fontFamily: 'Inter',
    fontWeight: '500',
  },
});
