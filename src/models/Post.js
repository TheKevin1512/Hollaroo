export default class Post {
    
    constructor(id, uid, displayName, photoURL, content, dateTime) {
        this.id = id,
        this.uid = uid,
        this.displayName = displayName;
        this.photoURL = photoURL;
        this.content = content;
        this.dateTime = dateTime;
    }
}