import firebase from 'react-native-firebase';
import User from '../models/User';
const db = firebase.firestore();

export function createUser(fbUser) {
    const user = new User(fbUser.displayName, fbUser.email, fbUser.phoneNumber, fbUser.photoURL, fbUser.uid);
    db
        .collection('users')
        .doc(user.uid)
        .set(user);
}