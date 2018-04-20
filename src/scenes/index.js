import { Navigation } from 'react-native-navigation';
import LoginScreen from './screens/LoginScreen';
import FeedTab from './tabs/FeedTab';
import MessagingTab from './tabs/MessagingTab';

export default (store, Provider) =>  {
	Navigation.registerComponent('Login', () => LoginScreen, store, Provider);
	Navigation.registerComponent('FeedTab', () => FeedTab, store, Provider);
	Navigation.registerComponent('MessagingTab', () => MessagingTab, store, Provider);
}