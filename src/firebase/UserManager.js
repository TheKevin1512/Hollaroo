import firebase from 'react-native-firebase';
import User from '../models/User';
const db = firebase.firestore();
const COLLECTION_USERS = 'users';

export function createUser(fbUser) {
    const user = new User(fbUser.displayName, fbUser.email, fbUser.phoneNumber, fbUser.photoURL, fbUser.uid);
    db
        .collection(COLLECTION_USERS)
        .doc(user.uid)
        .set(user);
}

export function getUsers(onSuccess) {
    db
        .collection(COLLECTION_USERS)
        .onSnapshot((snapshot) => {
            let users = [];
            snapshot.forEach((user) => {
                users.push(user.data());
            });
            onSuccess(users);
        }, (error) => {
            console.error("Could not retrieve users", error);
        })
        
}