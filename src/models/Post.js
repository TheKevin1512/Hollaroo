export default class Post {
    
    constructor(uid, displayName, photoURL, content, dateTime) {
        this.uid = uid,
        this.displayName = displayName;
        this.photoURL = photoURL;
        this.content = content;
        this.dateTime = dateTime;
    }
}