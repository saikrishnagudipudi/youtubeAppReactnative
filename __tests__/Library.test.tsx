import {fireEvent, render} from '@testing-library/react-native';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import Library from '../src/component/Library';
import {act} from 'react-test-renderer';

jest.mock('react-native-responsive-screen', () => ({
  widthPercentageToDP: jest.fn(),
  heightPercentageToDP: jest.fn(),
}));

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

jest.mock('@react-native-community/slider', () => () => <></>);
jest.mock('@react-navigation/native', () => {
  const actualNavigation = jest.requireActual('@react-navigation/native');
  const {View: MockView} = require('react-native');
  return {
    ...actualNavigation,
    NavigationContainer: () => <MockView />,
  };
});

const LibraryStore1 = createStore(() => {
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
    historyList: [
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
        videoDuration: 596,
        seeks: 102,
      },
    ],
  };
  return {
    ...initialState,
  };
});

const LibraryStore2 = createStore(() => {
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
    historyList: [
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
        videoDuration: 596,
        seeks: 102,
      },
    ],
  };
  return {
    ...initialState,
  };
});

const mockFn = jest.fn();
const libraryProps = {
  globalState: {
    themeMode: false,
    historyList: [
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
        videoDuration: 596,
        seeks: 102,
      },
    ],
  },
  clickPlayHistory: jest.fn(),
  navigation: {
    push: mockFn,
  },
};

describe('Library Screen', () => {
  it('Library Screen light Background color', () => {
    const {getByTestId} = render(
      <Provider store={LibraryStore1}>
        <Library />
      </Provider>,
    );
    const libraryMainScreen = getByTestId('libraryScreen');
    expect(libraryMainScreen.props.style[1].backgroundColor).toBe('#000000cc');
  });
  it('Library Screen Dark Background color', () => {
    const {getByTestId} = render(
      <Provider store={LibraryStore2}>
        <Library />
      </Provider>,
    );
    const libraryMainScreen = getByTestId('libraryScreen');
    expect(libraryMainScreen.props.style[1].backgroundColor).toBe('#ffffff');
  });

  it('Library Screen FlatList Video', async () => {
    const {getByTestId} = render(
      <Provider store={LibraryStore2}>
        <Library />
      </Provider>,
    );
    const onClickVideo = jest.fn();
    const libraryVideoButton = getByTestId('history1');

    await fireEvent.press(libraryVideoButton);
    // console.log(libraryProps.navigation);
    expect(libraryProps.navigation.push).toBeCalled;

    expect(onClickVideo).toBeCalled;
  });

  it('Library Screen FlatList Video Tittle Color Check', async () => {
    const {getByTestId} = render(
      <Provider store={LibraryStore1}>
        <Library />
      </Provider>,
    );
    const libraryVideoTitle = getByTestId('VideoTittleId1');
    expect(libraryVideoTitle.props.style[1].color).toBe('#fff');
  });
  it('Library Screen FlatList Video Tittle Color Check', async () => {
    const {getByTestId} = render(
      <Provider store={LibraryStore2}>
        <Library />
      </Provider>,
    );
    const libraryVideoTitle = getByTestId('VideoTittleId1');
    expect(libraryVideoTitle.props.style[1].color).toBe('#030303');
  });
});
