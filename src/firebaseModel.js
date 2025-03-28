import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./firebaseConfig.js";
/* import { model } from "./testmodel.js"; */

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const COLLECTION = "donors";
const docRef = doc(db, COLLECTION, "data2");

const model = {
    username: "donor1",
    amountbloodL: 5,
    setL(number) {
        if (Number.isInteger(number) && number > 0) {
          this.amountbloodL = number
        } else {
          throw new Error("number of l")
        }
      }
}


export function saveModelToFirestoreACB(model) {
    setDoc(
        docRef,
        {
            username: model.username,
            amountBloodL: model.amountBloodL,  // Fixed property name
        },
        { merge: true }
    ).catch((error) => {
        console.error("Firestore write error:", error);
    });
}

/* export function connectToPersistence(model) {
    getDoc(docRef)
        .then((snapshot) => {
            const data = snapshot.exists() ? snapshot.data() : {}; // Fixed `exists()`

            if (data) {
                model.username = data.username || model.username;
                model.amountBloodL = data.amountBloodL ?? 2; // Fixed property name
            }
        })
        .catch((error) => {
            console.error("Firestore read error:", error);
        });
}
 */