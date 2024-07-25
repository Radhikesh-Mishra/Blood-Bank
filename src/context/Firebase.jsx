import React, { createContext, useContext, useEffect, useState } from 'react';
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import { getFirestore, collection, addDoc, getDocs, getDoc, query, where } from 'firebase/firestore';

const FirebaseContext = createContext(null);

const firebaseConfig = {
  apiKey: /* api key */,
  authDomain: /* auth domain */,
  databaseURL:  /* database url */,
  projectId: /* project id */,
  storageBucket: /* storage bucket */,
  messagingSenderId: /* messaging sender id */,
  appId: /* app id */
};

const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);

export const useFirebase = () => useContext(FirebaseContext);

export const FirebaseProvider = (props) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, user => {
      setUser(user);
    });
  }, []);

  const signInUserWithEmailAndPassword = async (email, password) => {
    return createUserWithEmailAndPassword(firebaseAuth, email, password);
  };

  const logInUserWithEmailAndPassword = async (email, password) => {
    return signInWithEmailAndPassword(firebaseAuth, email, password);
  };

  const logOutUser = async() => {
    await signOut(firebaseAuth);
  }

  const createUserData = async (name, contact, email) => {
    return await addDoc(collection(firestore, 'users'), {
      name,
      contact,
      email
    });
  };

  const createHospitalData = async (name, contact, email, hospital) => {
    return await addDoc(collection(firestore, 'hospital'), {
      name,
      contact,
      email,
      hospital
    });
  };

  const createRequestData = async (name, contact, email, blood, date) => {
    return await addDoc(collection(firestore, 'requests'), {
      name,
      email,
      contact,
      date,
      blood
    });
  };

  const createDonateData = async (name, contact, email, blood, date, hospital, time) => {
    return await addDoc(collection(firestore, 'donate'), {
      name,
      email,
      contact,
      date,
      blood,
      hospital,
      time
    });
  };

  const fetchRequests = async() => {
    const collectionRef = collection(firestore, 'requests');
    const result = await getDocs(collectionRef);
    return result;
  };

  const fetchDonate = async (hospital) => {
    const collectionRef = collection(firestore, 'donate');
    const q = query(collectionRef, where('hospital', '==', hospital));
    const result = await getDocs(q);
    return result.docs.map(doc => doc.data());
};

const fetchHospital = async (email) => {
    const collectionRef = collection(firestore, 'hospital');
    const q = query(collectionRef, where('email', '==', email));
    const result = await getDocs(q);
    if (!result.empty) {
        return result.docs[0].data(); // This includes the hospital attribute
    } else {
        throw new Error('User not found');
    }
};

const fetchUserDetails = async (email) => {
    const userDocRef = query(collection(firestore, 'users'), where('email', '==', email));
    const userSnapshot = await getDocs(userDocRef);
    if (!userSnapshot.empty) {
      return userSnapshot.docs[0].data();
    }

    const hospitalDocRef = query(collection(firestore, 'hospital'), where('email', '==', email));
    const hospitalSnapshot = await getDocs(hospitalDocRef);
    if (!hospitalSnapshot.empty) {
      return hospitalSnapshot.docs[0].data();
    }

    return null;
  };



  return (
    <FirebaseContext.Provider value={{ firebaseApp, user, signInUserWithEmailAndPassword, logInUserWithEmailAndPassword, createDonateData, createUserData, createHospitalData, createRequestData, fetchRequests, fetchDonate, fetchHospital, logOutUser, fetchUserDetails}}>
      {props.children}
    </FirebaseContext.Provider>
  );
};
