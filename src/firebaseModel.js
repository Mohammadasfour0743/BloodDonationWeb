import {doc, getDoc, setDoc, getFirestore} from "firebase/firestore"
import {initializeApp} from "firebase/app"
import {firebaseConfig} from "./firebaseConfig.js"
import {model} from "./testmodel.js"

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const COLLECTION = "hospitals"
const docRef = doc(db, COLLECTION, "hospital1")

export function saveModel(model){
    setDoc(docRef, {
        hospitalName: model.username,
        hospitalLocation: model.location,
    },{
        merge: true
    }).catch((error) => {
        console.error(error)
    })
}