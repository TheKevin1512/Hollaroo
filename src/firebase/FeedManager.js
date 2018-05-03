import firebase from 'react-native-firebase';
import Post from '../models/Post';
const db = firebase.firestore();
const COLLECTION_POSTS = 'posts';

export function createPost(uid, name, photoURL, content, dateTime) {
    const postRef = db.collection(COLLECTION_POSTS).doc();
    const post = new Post(postRef.id, uid, name, photoURL, content, dateTime);
    postRef.set(post).catch((error) => {
        console.error("Error adding document", error);
    });
}

export function getFeed(onSucces) {
    db
        .collection(COLLECTION_POSTS)
        .onSnapshot((snapshot) => {
            let posts = []
            snapshot.forEach((post) => {
                posts.push(post.data());
            })
            onSucces(posts);
        }, (error) => {
            console.error("Could not retrieve snapshot for feed", error);
        });
}