import { initializeApp } from 'firebase/app';
import { collection, doc, getDoc, getDocs, getFirestore, setDoc, updateDoc } from 'firebase/firestore';
import { firebaseConfig } from '../firebaseConfig.js';
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from 'firebase/auth';

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const db = getFirestore(app);
const COLLECTION = 'hospitals';
const COLLECTION2 = 'requests';
const COLLECTION3 = 'hospitalApplication';

export async function initAuth(model, watchF) {
  onAuthStateChanged(auth, (user) => {
    try {
      if (user) {
        model.id = user.email;
        model.username = user.email;
        getModel(model);
        console.log('Authenticated user:', user.email);
      } else {
        model.id = null;
        model.username = null;
        console.log('User signed out.');
      }
      model.ready = true;
    } catch (error) {
      console.error('Error in auth state change:', error.message);
    }
  });

  function dataChange() {
    return [model.id, model.name, model.location, model.username, model.phone /* model.email */];
  }
  watchF(dataChange, () => saveToFirebase(model));
}

export async function signIn(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log('User signed in:', userCredential.user.email);
    return {
      success: true,
    };
  } catch (error) {
    console.error('Error signing in:', error.message);
    return {
      success: false,
      message: error.message,
    };
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

export async function saveToFirebase(model) {
  try {
    if (!model.username || !model.ready) {
      console.error('No username');
      return;
    }
    const docRef = doc(db, COLLECTION, model.username);
    await setDoc(docRef, {
      id: model.id,
      username: model.username,
      name: model.name,
      location: model.location,
      phone: model.phone,
      email: model.email,
    });
    console.log('Request successfully saved with ID:', model.id);
  } catch (error) {
    console.error('Error saving request:', error);
  }
}

export function getModel(model) {
  const docRef = doc(db, COLLECTION, model.username);
  model.ready = false;
  getDoc(docRef)
    .then((snapshot) => {
      const data = snapshot.exists() ? snapshot.data() : null;

      console.log('Raw data from Firestore:', data);
      if (data) {
        model.id = data.id;
        model.location = data.location;
        model.name = data.name;
        model.phone = data.phone;
        model.email = data.email;
      }
      console.log(model.username, model.location);
      model.ready = true;
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
    console.log('Fetched documents:', docs);

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

export async function saveApplicationDetails(application) {
  try {
    const docRef = doc(db, COLLECTION3, application.id || crypto.randomUUID());
    await setDoc(docRef, {
      bloodBankName: application.bloodBankName,
      hospitalName: application.hospitalName,
      licenseNumber: application.licenseNumber,
      registrationNumber: application.registrationNumber,
      location: application.location,
      contactEmail: application.contactEmail,
      contactPhone: application.contactPhone,
    });
    console.log('Application saved:', application);
  } catch (error) {
    console.error('Error saving application:', error);
  }
}
