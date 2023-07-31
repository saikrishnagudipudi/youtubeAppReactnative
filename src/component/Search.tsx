import React, {Component} from 'react';
import {connect} from 'react-redux';

import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {ActiveVideo} from './Action';
interface IProps {
  globalState: any;
  navigation?: {goBack: () => void; push: (arg: string) => void};
  clickVideo: (id: string) => void;
}
interface IState {
  searchInput: string;
}

class Search extends Component<IProps, IState> {
  state: IState = {
    searchInput: '',
  };
  goBack = () => {
    this.props.navigation?.goBack();
  };

  onChangeSearch = (text: string) => {
    this.setState({searchInput: text});
  };

  onPlayVideo = async (id: string) => {
    await this.props.clickVideo(id);
    this.props.navigation?.push('VideoPlayers');
  };

  render() {
    const getState = this.props.globalState;
    const {searchInput} = this.state;
    const filterSearchList = getState.videoList.filter(
      (each: {title: string}) =>
        each.title
          .toLocaleLowerCase()
          .includes(searchInput.toLocaleLowerCase()),
    );
    return (
      <View
        style={[
          styles.searchContainer,
          getState.themeMode
            ? {backgroundColor: '#000000cc'}
            : {backgroundColor: '#ffffff'},
        ]}>
        <View style={styles.searchHeaderContainer}>
          <AntDesign
            name="arrowleft"
            color={getState.themeMode ? '#fff' : '#000'}
            size={hp('4')}
            onPress={this.goBack}
          />
          <View
            style={[
              styles.inputContainer,
              getState.themeMode
                ? {borderColor: '#fff'}
                : {borderColor: '#000'},
            ]}>
            <TextInput
              onChangeText={text => this.onChangeSearch(text)}
              value={searchInput}
              style={[
                styles.input,
                getState.themeMode ? {color: '#fff'} : {color: '#000'},
              ]}
              placeholder="Search..."
              placeholderTextColor={getState.themeMode ? '#fff' : '#000'}
            />
            <AntDesign
              name="search1"
              color={getState.themeMode ? '#fff' : '#000'}
              size={hp('3')}
            />
          </View>
          <MaterialIcons
            name="keyboard-voice"
            color={getState.themeMode ? '#fff' : '#000'}
            size={hp('4')}
          />
        </View>
        <FlatList
          data={filterSearchList}
          keyExtractor={item => item.id}
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                style={styles.searchItemContainer}
                onPress={() => this.onPlayVideo(item.id)}>
                <View style={styles.searchItemTitleContainer}>
                  <Image
                    style={styles.searchImage}
                    source={{uri: item.thumbnailUrl}}
                    resizeMode="stretch"
                  />
                  <View style={styles.searchTitleContainer}>
                    <Text
                      style={[
                        styles.searchTitle,
                        getState.themeMode ? {color: '#fff'} : {color: '#000'},
                      ]}>
                      {item.title}
                    </Text>
                    <Text
                      style={[
                        styles.searchAuthorText,
                        getState.themeMode
                          ? {color: '#fff'}
                          : {color: '#030303'},
                      ]}>
                      {item.author}
                    </Text>
                  </View>
                </View>
                <Entypo
                  name="dots-three-vertical"
                  color={getState.themeMode ? '#fff' : '#000'}
                  size={hp('3')}
                />
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
export default connect(mapStateToProps, mapDispatchToProps)(Search);

const styles = StyleSheet.create({
  searchContainer: {
    flex: 1,
    padding: hp('1'),
  },
  searchHeaderContainer: {
    flexDirection: 'row',
    // justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    height: hp('7'),
    width: wp('75'),
    flexDirection: 'row',
    // justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    marginLeft: wp('1'),
    marginRight: wp('2'),
    borderRadius: hp('6'),
  },
  input: {
    width: wp('63'),
    color: '#000',
    fontSize: hp('2.2'),
    fontFamily: 'Inter',
    fontWeight: '500',
    marginLeft: wp('2'),
  },
  searchItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginTop: hp('2'),
  },
  searchItemTitleContainer: {
    flexDirection: 'row',
    // justifyContent: 'center',
    alignItems: 'flex-start',
  },
  searchImage: {
    height: hp('6'),
    width: wp('20'),
  },
  searchTitleContainer: {
    marginLeft: wp('2'),
  },
  searchTitle: {
    width: wp('60'),
    color: '#000',
    fontSize: hp('2.2'),
    fontFamily: 'Inter',
    fontWeight: '600',
  },
  searchAuthorText: {
    width: wp('60'),
    color: '#030303',
    fontSize: hp('2'),
    fontFamily: 'Inter',
    fontWeight: '500',
  },
});
