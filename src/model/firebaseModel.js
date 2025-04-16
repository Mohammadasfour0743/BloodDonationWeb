import { initializeApp } from 'firebase/app';
import { collection, doc, GeoPoint, getDoc, getDocs, getFirestore, setDoc, updateDoc } from 'firebase/firestore';
import { firebaseConfig } from '../firebaseConfig.js';
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { GeoFirestore } from 'geofirestore';

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const db = getFirestore(app);
const COLLECTION = 'hospitals';
const COLLECTION2 = 'requests';
const COLLECTION3 = 'hospitalApplication';
const geoFirestore = new GeoFirestore(db);

export async function initAuth(model, watchF) {
  onAuthStateChanged(auth, (user) => {
    try {
      if (user) {
        model.username = user.email;
        getModel(model);
        console.log(model);
        console.log('Authenticated user:', user.email);
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition((position) => {
            const longitude = position.coords.longitude;
            const latitude = position.coords.latitude;

            model.setlongitude(longitude);
            model.setLatitude(latitude);

            console.log('Longitude:', model.longitude, 'Latitude:', model.latitude);

            saveToFirebase(model);
          });
        }
        fetchreq(model);
      } else {
        console.log('User signed out.');
        model.id = null;

        model.name = null;
        model.location = null;
        model.username = null;
        model.phone = null;
        model.email = null;
        model.longitude = null;
        model.latitude = null;
        model.clearRequests();
      }
      model.ready = true;
    } catch (error) {
      console.error('Error in auth state change:', error.message);
    }
  });

  function dataChange() {
    return [
      model.id,
      model.name,
      model.location,
      model.username,
      model.phone,
      model.email,
      model.longitude,
      model.latitude,
      model.coordinates,
    ];
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

export async function signOutUser(model) {
  try {
    await signOut(auth);
    model.id = null;
    model.username = null;
    model.location = null;
    model.name = null;
    model.email = null;
    model.phone = null;
    model.longitude = null;
    model.latitude = null;
    model.coordinates = null;
    console.log('User signed out.');
  } catch (error) {
    console.error('Error signing out:', error.message);
  }
}

export async function saveToFirebase(model) {
  if (!auth.currentUser) return;
  try {
    if (
      !model.username ||
      !model.ready ||
      !model.id ||
      !model.name ||
      !model.email ||
      !model.phone ||
      !model.location ||
      !model.longitude ||
      !model.latitude
    ) {
      console.error('No username');
      return;
    }
    if (!model.longitude || !model.latitude) {
      console.error('Longitude or latitude is missing');
      return;
    }
    const docRef = doc(db, COLLECTION, model.username);
    //const geoCollection = geoFirestore.collection(COLLECTION);
    await setDoc(
      docRef,
      {
        id: model.id,
        username: model.username,
        name: model.name,
        location: model.location,
        phone: model.phone,
        email: model.email,
        longitude: model.longitude,
        latitude: model.latitude,
        coordinates: new GeoPoint(model.latitude, model.longitude),
        updatedAt: new Date(),
      },
      { merge: true }
    );
    console.log('Request successfully saved with ID:', model.id);
    console.log('location: ', model.location);
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
        if (data.longitude) data.longitude = model.longitude;
        if (data.latitude) data.latitude = model.latitude;
      }
      console.log('sdfdsfsgdsgvh tyejdfttb zybn');

      console.log(model);
      model.ready = true;
    })
    .catch((error) => {
      console.error(error);
    });
}

export async function saveRequests(request, model) {
  try {
    const docRef = doc(db, COLLECTION2, request.id);

    // const geoCollection = geoFirestore.collection(COLLECTION);

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
        coordinates: new GeoPoint(model.latitude, model.longitude),
        updatedAt: new Date(),
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
    const docRef = doc(db, COLLECTION2, request);

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

    const filteredDocs = docs.filter((doc) => doc.hospitalName === model.username && doc.current === true);
    console.log('Fetched documents:', filteredDocs);

    model.setRequests(filteredDocs);
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
