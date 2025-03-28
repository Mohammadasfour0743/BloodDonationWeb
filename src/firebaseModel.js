import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './firebaseConfig.js';
import { model } from './testmodel.js';
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore"


const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

const COLLECTION = "donors"

global.doc = doc;
global.setDoc = setDoc;
global.app = db
const docRef = doc(db, COLLECTION, "data2")

export function saveModelToFirestoreACB() {
    
  setDoc(
    docRef,
    {
      username: model.username,
      amoundBloodL: model.amoundBloodL,
    },
    { merge: true },
  ).catch((error) => {
    console.error("Firestore write error:", error)
  })
}


// export the function connectToPersistence
export function connectToPersistence(model) {
  
  /* model.ready = false */
  /* function getModelStateACB() {
    return [model.username, model.amountBloodL]
  } */

  getDoc(docRef)
    .then((snapshot) => {
      const data = snapshot.exists ? snapshot.data() : {}

      if (data) {
        // for defaults
        model.username = data.username
        model.dishes = data.amountBloodL ?? 2
      } /* else {
        // if no data
        model.numberOfGuests = 2
        model.dishes = []
        model.currentDishId = null
      } */
      /* model.ready = true */
    })
    .catch((error) => {
      /* console.error("Firestore read error:", error)
      // defaults on error
      model.numberOfGuests = 2
      model.dishes = []
      model.currentDishId = null
      model.ready = true */
      /* state.data = {};  // Ensure state.data is never null */
    })
  
  }

  /* watchFunction(getModelStateACB, saveModelToFirestoreACB); */

  // read
  

