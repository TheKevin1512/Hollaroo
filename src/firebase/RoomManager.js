import firebase from 'react-native-firebase';
import Room from '../models/Room';
const db = firebase.firestore();
const COLLECTION_ROOMS = 'rooms';

export function createRoom(roomName, chatters) {
    //Always include self
    chatters[firebase.auth().currentUser.uid] = true;
    
    const roomRef = db.collection(COLLECTION_ROOMS).doc();
    const room = new Room(roomRef.id, roomName, chatters);
    roomRef.set(room).catch((error) => {
        console.error(error);
    });
}

export function getRooms(uid, onSuccess) {
    db
        .collection(COLLECTION_ROOMS)
        .where("chatters.".concat(uid), '==', true)
        .onSnapshot((snapshot) => {
            let rooms = [];
            snapshot.forEach((room) => {
                rooms.push(room.data());
            })
            onSuccess(rooms);
        }, (error) => {
            console.error(error);
        });
}