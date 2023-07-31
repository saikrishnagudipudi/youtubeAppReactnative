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
import Entypo from 'react-native-vector-icons/Entypo';
import {ActiveVideo} from './Action';
const buttonList = [
  {
    id: 1,
    text: 'All',
  },
  {
    id: 2,
    text: 'All Design',
  },
  {
    id: 3,
    text: 'UX Design',
  },
];
interface IProps {
  globalState: any;
  navigation?: {push: (arg: string) => void};
  clickVideo: (id: string) => void;
}
interface IState {
  activeId: number;
}

class Home extends Component<IProps, IState> {
  state: IState = {
    activeId: 1,
  };

  onClickTopButton = (id: number) => {
    this.setState({activeId: id});
  };

  onClickVideo = async (id: string) => {
    await this.props.clickVideo(id);
    this.props.navigation?.push('VideoPlayers');
  };

  render() {
    const getState = this.props.globalState;
    const {activeId} = this.state;
    return (
      <View
        style={[
          styles.homeContainer,
          getState.themeMode
            ? {backgroundColor: '#000000cc'}
            : {backgroundColor: '#ffffff'},
        ]}>
        <View style={styles.topButtonContainer}>
          <View style={styles.shortContainer}>
            <Image
              source={require('./assets/youtube-shorts.png')}
              resizeMode="stretch"
              style={styles.shortImage}
            />
            <Text
              style={[
                styles.shortText,
                getState.themeMode ? {color: '#fff'} : {color: '#000'},
              ]}>
              Shorts
            </Text>
          </View>
          <FlatList
            data={buttonList}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => {
              return (
                <TouchableOpacity
                  onPress={() => this.onClickTopButton(item.id)}
                  style={[
                    activeId === item.id
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
                      activeId === item.id
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
            }}
          />
        </View>
        <FlatList
          data={getState.videoList}
          showsVerticalScrollIndicator={false}
          style={styles.videoListContainer}
          keyExtractor={item => item.id}
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                onPress={() => this.onClickVideo(item.id)}
                style={styles.videoContainer}>
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
          }}
        />
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
  return {
    clickVideo: (para: string) => dispatch(ActiveVideo(para)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  topButtonContainer: {
    marginTop: hp('1'),
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'center',
  },
  shortContainer: {
    height: hp('6'),
    width: wp('30'),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#DADADA5a',
    borderRadius: hp('1'),
  },
  shortImage: {
    height: hp('3.5'),
    width: wp('5'),
  },
  shortText: {
    color: '#000000',
    fontSize: hp('2.2'),
    fontFamily: 'Inter',
    fontWeight: '500',
    marginLeft: wp('2'),
  },
  itemButtonContainer: {
    height: hp('6'),
    // width: wp('30'),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#DADADA5a',
    marginLeft: wp('2'),
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
    marginLeft: wp('2'),
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
    // width: wp('12'),
    backgroundColor: '#000',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: wp("0.5"),
    paddingRight: wp("0.5")
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
    height: hp('6'),
    width: wp('12'),
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
