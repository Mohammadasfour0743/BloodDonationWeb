import { doc, getDoc, setDoc, getFirestore } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../firebaseConfig.js';
import { model } from './model.js';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const COLLECTION = 'hospitals';
const docRef = doc(db, COLLECTION, 'hospital1');
const docRef2 = doc(db, COLLECTION, 'hospital1/requests/request')

export function persistFirebase(model, watchF) {
  function dataChange() {
    return [model.id, model.name, model.location];
  }

  setDoc(
    docRef,
    {
      id: model.id,
      name: model.name,
      location: model.location,
    },
    {
      merge: true,
    }
  ).catch((error) => {
    console.error(error);
  });

  watchF(dataChange, persistFirebase);
}

export function getModel() {
  getDoc(docRef)
    .then((snapshot) => {
      const data = snapshot.exists ? snapshot.data() : {};
      console.log('Raw data from Firestore:', data);
      if (data) {
        model.id = data.id;
        model.location = data.location;
        model.name = data.name;
      }
      console.log(model.username, model.location);
      console.log()
    })
    .catch((error) => {
      console.error(error);
    });
}

export function saveRequests(){
      setDoc(
        docRef2,
        {
          requestid: model.request.requestid,
          urgency: model.request.urgency,
          bloodtype: model.request.bloodtype,
          amount: model.request.amount,
          description: model.request.description,
        },
        {
          merge: true,
        }
      ).catch((error) => {
        console.error(error);
      });
    
      /* watchF(dataChange, persistFirebase); */
}

export function getRequests(){

}