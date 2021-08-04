import firebase from "firebase/app";
import 'firebase/storage'
import 'firebase/database'

class Fire {
    constructor() {
        this.init()
        //binding appent to this
    }

    init() {
        if (!firebase.apps.length) {
            firebase.initializeApp({
                //config firebae api
                apiKey: "AIzaSyBcKBLIaU5hd5udUtFrAckm4eerD9GGjgM",
                authDomain: "spores-internship.firebaseapp.com",
                projectId: "spores-internship",
                storageBucket: "spores-internship.appspot.com",
                messagingSenderId: "680777121188",
                appId: "1:680777121188:web:1fd0afbe2f383d2c749531",
                measurementId: "G-G05GX9BNN8"
            })
        }
    }

    get storage() {
        return firebase.storage()
    }

    uploadImage = (file, onUploadFailed, onUploadSuccess) => {
        const uploadTask = this.storage.ref(`/images/${file.name}`).put(file)
        //initiates the firebase side uploading
        uploadTask.on('state_changed',
            (snapShot) => {
                //takes a snap shot of the process as it is happening
            }, (err) => {
                //catches the errors
                onUploadFailed(err)
            }, () => {
                // gets the functions from storage refences the image storage in firebase by the children
                // gets the download url then sets the image from firebase as the value for the imgUrl key:
                this.storage.ref('images').child(file.name).getDownloadURL()
                    .then(fireBaseUrl => {
                        onUploadSuccess(prevObject => ({...prevObject, imgUrl: fireBaseUrl}))
                    })
            })
    }
}

Fire.create = new Fire()
export default Fire