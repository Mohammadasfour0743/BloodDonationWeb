import { initializeApp } from 'firebase/app';
import { collection, doc, getDoc, getDocs, getFirestore, setDoc, updateDoc, onSnapshot } from 'firebase/firestore';
import { firebaseConfig } from '../firebaseConfig.js';
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from 'firebase/auth';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const HOSPITALS_COLLECTION = 'hospitals';
const REQUESTS_COLLECTION = 'requests';
const RESPONSES_COLLECTION = 'responses';
const APPLICATIONS_COLLECTION = 'hospitalApplication';

let responseSubscription;

function updateLocation(model) {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log('yes');
        const longitude = position.coords.longitude;
        const latitude = position.coords.latitude;
        model.setlongitude(longitude);
        model.setLatitude(latitude);
        console.log(longitude, latitude);
        saveToFirebase(model);
      },
      (err) => {
        console.log('Error fetching location', err);
      }
    );
  }
}

function logoutUserFromModel(model) {
  model.clearModel(model);
  model.username = null;
  unsubscribeFromAutomaticResponseUpdates();
}

export async function initAuth(model) {
  onAuthStateChanged(auth, async (user) => {
    try {
      if (user) {
        model.email = user.email;
        model.username = user.email;
        await getModel(model);
        updateLocation(model);
        fetchRequests(model);
        handleAutomaticResponseUpdates(model);
      } else {
        logoutUserFromModel(model);
      }
    } catch (error) {
      console.error('Error in auth state change:', error.message);
    }
  });
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
    logoutUserFromModel();
  } catch (error) {
    console.error('Error signing out:', error.message);
  }
}

export async function saveToFirebase(model) {
  if (!auth.currentUser) return;

  try {
    if (!model.username) {
      console.error('User is not logged in');
      return;
    }
    const docRef = doc(db, HOSPITALS_COLLECTION, model.username);
    await setDoc(
      docRef,
      {
        ...(model.id != null && { username: model.username }),
        ...(model.name != null && { name: model.name }),
        ...(model.phone != null && { phone: model.phone }),
        ...(model.email != null && { email: model.email }),
        ...(model.longitude != null && { longitude: model.longitude }),
        ...(model.latitude != null && { latitude: model.latitude }),
        updatedAt: new Date().toISOString(),
      },
      { merge: true }
    );
  } catch (error) {
    console.error('Error saving request:', error);
  }
}

export async function getModel(model) {
  const docRef = doc(db, HOSPITALS_COLLECTION, model.username);
  model.ready = false;
  try {
    const snapshot = await getDoc(docRef);
    const data = snapshot.exists() ? snapshot.data() : null;
    console.log(model.username);
    console.log('from ' + docRef.path);
    console.log(data);
    console.log(data.phone);
    if (data) {
      if (data.id) model.id = data.id;
      if (data.phone) model.phone = data.phone;
      if (data.email) model.email = data.email;
      if (data.longitude) model.longitude = data.longitude;
      if (data.latitude) model.latitude = data.latitude;
      if (data.name) model.name = data.name;
      if (data.location) model.location = data.location;
    }
    model.ready = true;
  } catch (error) {
    console.error(error);
  }
}

export async function saveRequests(request, model) {
  try {
    const docRef = doc(db, REQUESTS_COLLECTION, request.id);
    await setDoc(
      docRef,
      {
        id: request.id,
        urgency: request.urgency,
        bloodTypes: request.bloodTypes,
        amount: request.amount,
        description: request.description,
        current: request.current,
        hospitalName: request.hospitalName,
        hospitalEmail: request.hospitalEmail,
        latitude: request.latitude,
        longitude: request.longitude,
        updatedAt: new Date().toISOString(),
        location: request.location,
      },
      { merge: true }
    );

    console.log('Request successfully saved with ID:', request.id);
  } catch (error) {
    console.error('Error saving request:', error);
  }
}

export async function removeReq(request) {
  try {
    console.log(request);
    const docRef = doc(db, REQUESTS_COLLECTION, request);

    await updateDoc(docRef, { current: false });
    console.log('Request successfully removed:', request.id);
  } catch (error) {
    console.error('Error deleting request:', error);
  }
}

export async function fetchRequests(model) {
  model.ready = false;
  try {
    const querySnapshot = await getDocs(collection(db, REQUESTS_COLLECTION));
    const docs = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    const filteredDocs = docs.filter((doc) => doc.hospitalName === model.name);
    console.log('Fetched documents:', filteredDocs);

    model.setRequests(filteredDocs);
    fetchResponses(model);
  } catch (error) {
    console.error('Error fetching request:', error);
  } finally {
    module.ready = true;
  }
}

/* 
amount 1 (number)

bloodTypes (array)

0 "AB+" (string)

1 "AB-" (string)

current true (boolean)

description "2w456789" (string)

hospitalEmail "test2@a.com" (string)

hospitalName "test2" (string)

id "vxDmg98TME" (string)

latitude 59.3575999 (number)

location "Kistagången 16" (string)

longitude 18.0933241 (number)

updatedAt "2025-05-09T06:28:39.770Z" (string)

urgency true */

export async function fetchResponses(model) {
  model.ready = false;
  try {
    const querySnapshot = await getDocs(collection(db, RESPONSES_COLLECTION));
    const docs = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    model.setResponses(docs);
  } catch (error) {
    console.log('Error fetching respones', error);
  } finally {
    model.ready = true;
  }
}

export async function updateDetails(model) {
  if (!model.phone || !model.email) {
    console.error('Phone or email is missing');
    return;
  }
  try {
    const docRefDetails = doc(db, HOSPITALS_COLLECTION, model.username);
    await updateDoc(
      docRefDetails,
      { phone: model.phone, email: model.email },
      {
        merge: true,
      }
    );
  } catch (error) {
    console.error('Editing failed', error.message);
  }
}

export async function saveApplicationDetails(application) {
  try {
    const docRef = doc(db, APPLICATIONS_COLLECTION, application.id || crypto.randomUUID());
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

export async function handleAutomaticResponseUpdates(model) {
  if (responseSubscription) return;
  responseSubscription = onSnapshot(collection(db, RESPONSES_COLLECTION), (snapshot) => {
    snapshot.docChanges().forEach((change) => {
      if (change.type === 'added') {
        model.addResponse(change.doc.data());
      }
    });
  });
}

function unsubscribeFromAutomaticResponseUpdates() {
  if (!responseSubscription) return;
  responseSubscription();
  responseSubscription = null;
}
