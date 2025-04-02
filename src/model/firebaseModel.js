import {doc, getDoc, setDoc, getFirestore} from "firebase/firestore"
import {initializeApp} from "firebase/app"
import {firebaseConfig} from "../firebaseConfig.js"
import {model} from "./model.js"

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const COLLECTION = "hospitals"
const docRef = doc(db, COLLECTION, "hospital1")

export function persistFirebase(model, watchF){
    function dataChange(){
        return [model.hospitals.id, model.hospitals.name, model.hospitals.location]
    }

        setDoc(docRef, {
            id: model.id,
            name: model.name,
            location: model.location,
        },{
            merge: true
        }).catch((error) => {
            console.error(error)
        })

    watchF(dataChange, persistFirebase);

    /*function getModel(){
        getDoc(docRef)
            .then((snapshot) => {
                const data = snapshot.exists ? snapshot.data() : {}
                console.log("Raw data from Firestore:", data);
                if (data) {
                    model.username = data.hospitalName
                    model.location = data.hospitalLocation
                }
            console.log(model.username, model.location)
            }).catch((error) => {
                console.error(error)
            })
    }*/
}