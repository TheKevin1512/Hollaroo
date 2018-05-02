import firebase from 'react-native-firebase';
const db = firebase.firestore();
const COLLECTION_POSTS = 'posts';

export function createPost(post) {
    db
        .collection(COLLECTION_POSTS)
        .add(post)
        .then((docRef) => {
            console.log("Successfully written with ID: ", docRef.id);
        })
        .catch((error) => {
            console.error("Error adding document", error);
        })
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