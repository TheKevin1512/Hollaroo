import { Navigation } from 'react-native-navigation';
import LoginScreen from './screens/LoginScreen';
import FeedTab from './tabs/FeedTab';
import MessagingTab from './tabs/MessagingTab';
import CreatePostScreen from './screens/CreatePostScreen';
import CreateRoomScreen from './screens/CreateRoomScreen';

export default (store, Provider) =>  {
	Navigation.registerComponent('LoginScreen', () => LoginScreen, store, Provider);
	Navigation.registerComponent('CreatePostScreen', () => CreatePostScreen, store, Provider);
	Navigation.registerComponent('CreateRoomScreen', () => CreateRoomScreen, store, Provider);
	Navigation.registerComponent('FeedTab', () => FeedTab, store, Provider);
	Navigation.registerComponent('MessagingTab', () => MessagingTab, store, Provider);
}