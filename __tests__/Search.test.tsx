import {fireEvent, render} from '@testing-library/react-native';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import Search from '../src/component/Search';

jest.mock('react-native-vector-icons/AntDesign', () => 'AntDesign');
jest.mock('react-native-vector-icons/Entypo', () => 'Entypo');
jest.mock('react-native-vector-icons/MaterialIcons', () => 'MaterialIcons');

jest.mock('react-native-responsive-screen', () => ({
  widthPercentageToDP: jest.fn(),
  heightPercentageToDP: jest.fn(),
}));

const searchProps = {
  globalState: {themeMode: false},
  navigation: {goBack: jest.fn(), push: jest.fn()},
  clickVideo: jest.fn(),
};

const SearchStore1 = createStore(() => {
  const initialState: any = {
    themeMode: true,
    videoList: [
      {
        id: '1',
        title: 'Big Buck Bunny',
        thumbnailUrl:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Big_Buck_Bunny_thumbnail_vlc.png/1200px-Big_Buck_Bunny_thumbnail_vlc.png',
        duration: '9:56',
        uploadTime: '4 Years ago',
        views: '24M',
        author: 'Vlc Media Player',
        videoUrl:
          'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        description:
          "Big Buck Bunny tells the story of a giant rabbit with a heart bigger than himself. When one sunny day three rodents rudely harass him, something snaps... and the rabbit ain't no bunny anymore! In the typical cartoon tradition he prepares the nasty rodents a comical revenge.\n\nLicensed under the Creative Commons Attribution license\nhttp://www.bigbuckbunny.org",
        subscriber: '25M',
        isLive: true,
      },
      {
        id: '2',
        title: 'The first Blender Open Movie from 2006',
        thumbnailUrl:
          'https://res.cloudinary.com/duujfpr1f/image/upload/v1690615059/Screenshot_from_2023-07-29_12-34-55_qko0yg.png',
        duration: '10:53',
        uploadTime: '3.6 Years ago',
        views: '20M',
        author: 'Blender Inc.',
        videoUrl:
          'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        description:
          'Song : Raja Raja Kareja Mein Samaja\nAlbum : Raja Kareja Mein Samaja\nArtist : Radhe Shyam Rasia\nSinger : Radhe Shyam Rasia\nMusic Director : Sohan Lal, Dinesh Kumar\nLyricist : Vinay Bihari, Shailesh Sagar, Parmeshwar Premi\nMusic Label : T-Series',
        subscriber: '20M',
        isLive: true,
      },
      {
        id: '3',
        title: 'For Bigger Blazes',
        thumbnailUrl:
          'https://res.cloudinary.com/duujfpr1f/image/upload/v1690615187/Screenshot_from_2023-07-29_12-49-36_myqhjg.png',
        duration: '0:15',
        uploadTime: '4 Years ago',
        views: '25M',
        author: 'T-Series Regional',
        videoUrl:
          'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        description:
          'Song : Raja Raja Kareja Mein Samaja\nAlbum : Raja Kareja Mein Samaja\nArtist : Radhe Shyam Rasia\nSinger : Radhe Shyam Rasia\nMusic Director : Sohan Lal, Dinesh Kumar\nLyricist : Vinay Bihari, Shailesh Sagar, Parmeshwar Premi\nMusic Label : T-Series',
        subscriber: '22M',
        isLive: true,
      },
      {
        id: '4',
        title: 'For Bigger Escape',
        thumbnailUrl:
          'https://img.jakpost.net/c/2019/09/03/2019_09_03_78912_1567484272._large.jpg',
        duration: '0:15',
        uploadTime: '5 Years ago',
        views: '27M',
        author: 'T-Series Regional',
        videoUrl:
          'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
        description:
          " Introducing Chromecast. The easiest way to enjoy online video and music on your TV—for when Batman's escapes aren't quite big enough. For $35. Learn how to use Chromecast with Google Play Movies and more at google.com/chromecast.",
        subscriber: '28M',
        isLive: false,
      },
      {
        id: '5',
        title: 'Big Buck Bunny',
        thumbnailUrl:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Big_Buck_Bunny_thumbnail_vlc.png/1200px-Big_Buck_Bunny_thumbnail_vlc.png',
        duration: '9:56',
        uploadTime: '4 Years ago',
        views: '24M',
        author: 'Vlc Media Player',
        videoUrl:
          'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        description:
          "Big Buck Bunny tells the story of a giant rabbit with a heart bigger than himself. When one sunny day three rodents rudely harass him, something snaps... and the rabbit ain't no bunny anymore! In the typical cartoon tradition he prepares the nasty rodents a comical revenge.\n\nLicensed under the Creative Commons Attribution license\nhttp://www.bigbuckbunny.org",
        subscriber: '25M',
        isLive: true,
      },
      {
        id: '6',
        title: 'For Bigger Blazes',
        thumbnailUrl:
          'https://res.cloudinary.com/duujfpr1f/image/upload/v1690615187/Screenshot_from_2023-07-29_12-49-36_myqhjg.png',
        duration: '0:15',
        uploadTime: '3 Years ago',
        views: '28M',
        author: 'T-Series Regional',
        videoUrl:
          'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        description:
          'Song : Raja Raja Kareja Mein Samaja\nAlbum : Raja Kareja Mein Samaja\nArtist : Radhe Shyam Rasia\nSinger : Radhe Shyam Rasia\nMusic Director : Sohan Lal, Dinesh Kumar\nLyricist : Vinay Bihari, Shailesh Sagar, Parmeshwar Premi\nMusic Label : T-Series',
        subscriber: '24M',
        isLive: false,
      },
      {
        id: '7',
        title: 'For Bigger Escape',
        thumbnailUrl:
          'https://img.jakpost.net/c/2019/09/03/2019_09_03_78912_1567484272._large.jpg',
        duration: '0:15',
        uploadTime: '3.6 Years ago',
        views: '21M',
        author: 'T-Series Regional',
        videoUrl:
          'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
        description:
          " Introducing Chromecast. The easiest way to enjoy online video and music on your TV—for when Batman's escapes aren't quite big enough. For $35. Learn how to use Chromecast with Google Play Movies and more at google.com/chromecast.",
        subscriber: '26M',
        isLive: true,
      },
      {
        id: '8',
        title: 'The first Blender Open Movie from 2006',
        thumbnailUrl:
          'https://res.cloudinary.com/duujfpr1f/image/upload/v1690615059/Screenshot_from_2023-07-29_12-34-55_qko0yg.png',
        duration: '10:53',
        uploadTime: '4 Years ago',
        views: '24M',
        author: 'Blender Inc.',
        videoUrl:
          'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        description:
          'Song : Raja Raja Kareja Mein Samaja\nAlbum : Raja Kareja Mein Samaja\nArtist : Radhe Shyam Rasia\nSinger : Radhe Shyam Rasia\nMusic Director : Sohan Lal, Dinesh Kumar\nLyricist : Vinay Bihari, Shailesh Sagar, Parmeshwar Premi\nMusic Label : T-Series',
        subscriber: '25M',
        isLive: false,
      },
    ],
    activeVideo: [],
    historyList: [],
  };
  return {
    ...initialState,
  };
});

const SearchStore2 = createStore(() => {
  const initialState: any = {
    themeMode: false,
    videoList: [
      {
        id: '1',
        title: 'Big Buck Bunny',
        thumbnailUrl:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Big_Buck_Bunny_thumbnail_vlc.png/1200px-Big_Buck_Bunny_thumbnail_vlc.png',
        duration: '9:56',
        uploadTime: '4 Years ago',
        views: '24M',
        author: 'Vlc Media Player',
        videoUrl:
          'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        description:
          "Big Buck Bunny tells the story of a giant rabbit with a heart bigger than himself. When one sunny day three rodents rudely harass him, something snaps... and the rabbit ain't no bunny anymore! In the typical cartoon tradition he prepares the nasty rodents a comical revenge.\n\nLicensed under the Creative Commons Attribution license\nhttp://www.bigbuckbunny.org",
        subscriber: '25M',
        isLive: true,
      },
      {
        id: '2',
        title: 'The first Blender Open Movie from 2006',
        thumbnailUrl:
          'https://res.cloudinary.com/duujfpr1f/image/upload/v1690615059/Screenshot_from_2023-07-29_12-34-55_qko0yg.png',
        duration: '10:53',
        uploadTime: '3.6 Years ago',
        views: '20M',
        author: 'Blender Inc.',
        videoUrl:
          'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        description:
          'Song : Raja Raja Kareja Mein Samaja\nAlbum : Raja Kareja Mein Samaja\nArtist : Radhe Shyam Rasia\nSinger : Radhe Shyam Rasia\nMusic Director : Sohan Lal, Dinesh Kumar\nLyricist : Vinay Bihari, Shailesh Sagar, Parmeshwar Premi\nMusic Label : T-Series',
        subscriber: '20M',
        isLive: true,
      },
      {
        id: '3',
        title: 'For Bigger Blazes',
        thumbnailUrl:
          'https://res.cloudinary.com/duujfpr1f/image/upload/v1690615187/Screenshot_from_2023-07-29_12-49-36_myqhjg.png',
        duration: '0:15',
        uploadTime: '4 Years ago',
        views: '25M',
        author: 'T-Series Regional',
        videoUrl:
          'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        description:
          'Song : Raja Raja Kareja Mein Samaja\nAlbum : Raja Kareja Mein Samaja\nArtist : Radhe Shyam Rasia\nSinger : Radhe Shyam Rasia\nMusic Director : Sohan Lal, Dinesh Kumar\nLyricist : Vinay Bihari, Shailesh Sagar, Parmeshwar Premi\nMusic Label : T-Series',
        subscriber: '22M',
        isLive: true,
      },
      {
        id: '4',
        title: 'For Bigger Escape',
        thumbnailUrl:
          'https://img.jakpost.net/c/2019/09/03/2019_09_03_78912_1567484272._large.jpg',
        duration: '0:15',
        uploadTime: '5 Years ago',
        views: '27M',
        author: 'T-Series Regional',
        videoUrl:
          'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
        description:
          " Introducing Chromecast. The easiest way to enjoy online video and music on your TV—for when Batman's escapes aren't quite big enough. For $35. Learn how to use Chromecast with Google Play Movies and more at google.com/chromecast.",
        subscriber: '28M',
        isLive: false,
      },
      {
        id: '5',
        title: 'Big Buck Bunny',
        thumbnailUrl:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Big_Buck_Bunny_thumbnail_vlc.png/1200px-Big_Buck_Bunny_thumbnail_vlc.png',
        duration: '9:56',
        uploadTime: '4 Years ago',
        views: '24M',
        author: 'Vlc Media Player',
        videoUrl:
          'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        description:
          "Big Buck Bunny tells the story of a giant rabbit with a heart bigger than himself. When one sunny day three rodents rudely harass him, something snaps... and the rabbit ain't no bunny anymore! In the typical cartoon tradition he prepares the nasty rodents a comical revenge.\n\nLicensed under the Creative Commons Attribution license\nhttp://www.bigbuckbunny.org",
        subscriber: '25M',
        isLive: true,
      },
      {
        id: '6',
        title: 'For Bigger Blazes',
        thumbnailUrl:
          'https://res.cloudinary.com/duujfpr1f/image/upload/v1690615187/Screenshot_from_2023-07-29_12-49-36_myqhjg.png',
        duration: '0:15',
        uploadTime: '3 Years ago',
        views: '28M',
        author: 'T-Series Regional',
        videoUrl:
          'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        description:
          'Song : Raja Raja Kareja Mein Samaja\nAlbum : Raja Kareja Mein Samaja\nArtist : Radhe Shyam Rasia\nSinger : Radhe Shyam Rasia\nMusic Director : Sohan Lal, Dinesh Kumar\nLyricist : Vinay Bihari, Shailesh Sagar, Parmeshwar Premi\nMusic Label : T-Series',
        subscriber: '24M',
        isLive: false,
      },
      {
        id: '7',
        title: 'For Bigger Escape',
        thumbnailUrl:
          'https://img.jakpost.net/c/2019/09/03/2019_09_03_78912_1567484272._large.jpg',
        duration: '0:15',
        uploadTime: '3.6 Years ago',
        views: '21M',
        author: 'T-Series Regional',
        videoUrl:
          'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
        description:
          " Introducing Chromecast. The easiest way to enjoy online video and music on your TV—for when Batman's escapes aren't quite big enough. For $35. Learn how to use Chromecast with Google Play Movies and more at google.com/chromecast.",
        subscriber: '26M',
        isLive: true,
      },
      {
        id: '8',
        title: 'The first Blender Open Movie from 2006',
        thumbnailUrl:
          'https://res.cloudinary.com/duujfpr1f/image/upload/v1690615059/Screenshot_from_2023-07-29_12-34-55_qko0yg.png',
        duration: '10:53',
        uploadTime: '4 Years ago',
        views: '24M',
        author: 'Blender Inc.',
        videoUrl:
          'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        description:
          'Song : Raja Raja Kareja Mein Samaja\nAlbum : Raja Kareja Mein Samaja\nArtist : Radhe Shyam Rasia\nSinger : Radhe Shyam Rasia\nMusic Director : Sohan Lal, Dinesh Kumar\nLyricist : Vinay Bihari, Shailesh Sagar, Parmeshwar Premi\nMusic Label : T-Series',
        subscriber: '25M',
        isLive: false,
      },
    ],
    activeVideo: [],
    historyList: [],
  };
  return {
    ...initialState,
  };
});

describe('Search screen Test cases', () => {
  it('Search Screen Dark background', () => {
    const {getByTestId} = render(
      <Provider store={SearchStore1}>
        <Search />
      </Provider>,
    );

    const getScreenId = getByTestId('searchScreen');
    expect(getScreenId.props.style[1].backgroundColor).toBe('#000000cc');
  });
  it('Search Screen Light background', () => {
    const {getByTestId} = render(
      <Provider store={SearchStore2}>
        <Search />
      </Provider>,
    );

    const getScreenId = getByTestId('searchScreen');
    expect(getScreenId.props.style[1].backgroundColor).toBe('#ffffff');
  });

  it('Search Screen Light background', () => {
    const {getByTestId} = render(
      <Provider store={SearchStore1}>
        <Search />
      </Provider>,
    );
    const getSearchId = getByTestId('searchVideo');
    fireEvent.changeText(getSearchId, 'abcd');
    expect(getSearchId.props.value).toBe('abcd');
  });
  it('Search Screen Light background', () => {
    const {getByTestId} = render(
      <Provider store={SearchStore1}>
        <Search />
      </Provider>,
    );
    const getArrowId = getByTestId('arrowLeft');
    fireEvent.press(getArrowId);
    expect(getArrowId.props.goBack).toHaveBeenCalled;
  });
  it('Search Screen Light background', () => {
    const {getByTestId} = render(
      <Provider store={SearchStore1}>
        <Search {...searchProps} />
      </Provider>,
    );
    const getVideoId = getByTestId('SearchVideo1');
    fireEvent.press(getVideoId);
    expect(getVideoId.props.clickVideo).toHaveBeenCalled;
    expect(searchProps.navigation.push).toHaveBeenCalled;
  });
});
