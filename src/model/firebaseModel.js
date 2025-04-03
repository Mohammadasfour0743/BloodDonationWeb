import { initializeApp } from 'firebase/app';
import { collection, doc, getDoc, getDocs, getFirestore, setDoc, updateDoc } from 'firebase/firestore';
import { firebaseConfig } from '../firebaseConfig.js';
import { model } from './model.js';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const COLLECTION = 'hospitals';
const COLLECTION2= 'requests';
const docRef = doc(db, COLLECTION, 'hospital1');

/* const docRef2 = doc(db, COLLECTION2, 'requestsa') */

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

export async function saveRequests(request) {
  try {
    const docRef = doc(collection(db, COLLECTION2), request.id);
    await setDoc(docRef, {
      /* hospitalId: request.hospitalId, */
      urgency: request.urgency,
      bloodType: request.bloodType,
      amount: request.amount,
      description: request.description, 
      current: request.current
      /* email: request.email,
      phone:request.phone */
    });
    console.log("Request successfully saved with ID:", request.id);
  } catch (error) {
    console.error("Error saving request:", error);
  }
}

export async function removeReq(request){
  try{
    const docRef = doc(collection(db, COLLECTION2), request);
    await updateDoc(docRef, {
      current: false, // Update the 'current' field to false
    });
  }catch (error){
    console.error("Error deleting request:", error);
  }
}

export async function fetchreq(model){
  try{
    /* const docRef = doc(collection(db, COLLECTION2)); */
    const querySnapshot = await getDocs(collection(db, COLLECTION2));
    const docs = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    model.setRequests(docs);
  
  }catch (error){
    console.error("Error fetching request:", error);
  }
}

