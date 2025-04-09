import { initializeApp } from 'firebase/app';
import { collection, doc, getDoc, getDocs, getFirestore, setDoc, updateDoc } from 'firebase/firestore';
import { firebaseConfig } from '../firebaseConfig.js';
import { model } from './model.js';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const db = getFirestore(app);
const COLLECTION = 'hospitals';
const COLLECTION2 = 'requests';

onAuthStateChanged(auth, (user) => {
  try {
    if (user) {
      model.username = user.email;
      console.log('Authenticated user:', user.email);
    } else {
      model.username = null;
      console.log('User signed out.');
    }
  } catch (error) {
    console.error('Error in auth state change:', error.message);
  }
});

export async function signIn(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log('User signed in:', userCredential.user.email);
  } catch (error) {
    console.error('Error signing in:', error.message);
  }
}

export async function register(email, password) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log('User registered:', userCredential.user.email);
  } catch (error) {
    console.error('Error registering user:', error.message);
  }
}

export async function signOutUser() {
  try {
    await signOut(auth);
    console.log('User signed out.');
  } catch (error) {
    console.error('Error signing out:', error.message);
  }
}

export async function saveToFirebase(model, watchF) {
  if (!model.username) {
    console.error('No username');
    return;
  }
   
  function dataChange() {
    return [model.id, model.name, model.location, model.username, model.phone, /* model.email */];
  }

  try {
    const docRef = doc(db, COLLECTION, model.username);
    await setDoc(docRef, {
      id: model.id,
      username: model.username,
      name: model.name,
      location: model.location,
      phone: model.phone,
      /* email: model.email, */
    });
    console.log('Request successfully saved with ID:', model.id);
  } catch (error) {
    console.error('Error saving request:', error);
  }
    watchF(dataChange, saveToFirebase);
  
}

export function getModel() {
  const docRef = doc(db, COLLECTION, model.username);
  getDoc(docRef)
    .then((snapshot) => {
      const data = snapshot.exists() ? snapshot.data() : {};

      console.log('Raw data from Firestore:', data);
      if (data) {
        model.id = data.id;
        model.location = data.location;
        model.name = data.name;
        model.username = data.username;
        model.phone = data.phone;
        model.email = data.email;
      }
      console.log(model.username, model.location);
    })
    .catch((error) => {
      console.error(error);
    });
}

export async function saveRequests(request) {
  try {
    const docRef = doc(db, COLLECTION2, request.id);
    await setDoc(docRef, {
      urgency: request.urgency,
      bloodTypes: request.bloodTypes,
      amount: request.amount,
      description: request.description,
      current: request.current,
    });
    console.log('Request successfully saved with ID:', request.id);
  } catch (error) {
    console.error('Error saving request:', error);
  }
}

export async function removeReq(request) {
  try {
    const docRef = doc(db, COLLECTION2, request.id);
    await updateDoc(docRef, { current: false });
    console.log('Request successfully removed:', request.id);
  } catch (error) {
    console.error('Error deleting request:', error);
  }
}

export async function fetchreq(model) {
  try {
    const querySnapshot = await getDocs(collection(db, COLLECTION2));
    const docs = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    console.log("Fetched documents:", docs);

    const filteredDocs = docs.filter((doc) => doc.hospitalId === model.hospitalId);
    if (filteredDocs.length > 0) {
      model.setRequests(filteredDocs);
    } else {
      console.log('No data detected');
    }
  } catch (error) {
    console.error('Error fetching request:', error);
  }
}

export async function updateDetails(model) {
  if (!model.phone || !model.email) {
    console.error('Phone or email is missing');
    return;
  } 
  try {
    const docRefDetails = doc(db, COLLECTION, model.username);
    await updateDoc(docRefDetails, { phone: model.phone, email: model.email });
  } catch (error) {
    console.error('Editing failed', error.message);
  }
}
