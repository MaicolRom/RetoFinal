// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.2/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {
  getFirestore,
  collection,
  getDocs,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
}from "https://www.gstatic.com/firebasejs/9.6.2/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
    apiKey: "AIzaSyC-N_u75St_3WGtG9zSkopLg89z256tXcM",
    authDomain: "retofinal-8dbba.firebaseapp.com",
    projectId: "retofinal-8dbba",
    storageBucket: "retofinal-8dbba.appspot.com",
    messagingSenderId: "760585005801",
    appId: "1:760585005801:web:247aca882fbe682a23de78",
    measurementId: "G-Q4HV3ECKGJ"
};

// Initialize Firebase

export const app = initializeApp(firebaseConfig);
export const db = getFirestore();

//ESTUDIANTES

export const saveStudent = (Name,LastName) => addDoc(collection(db,"Estudiante"), {Name,LastName });
export const onGetStudent = (Callback) => onSnapshot(collection(db,"Estudiante"), Callback);
export const deleteStudent = (Id) => deleteDoc(doc(db,"Estudiante",Id));
export const getStudent = (Id) => getDoc(doc(db,"Estudiante",Id));
export const updateStudent = (Id, NewFields) => updateDoc(doc(db,"Estudiante",Id), NewFields);

//MATRICULAS

export const saveEnrollment = (Id_estudiante, Id_clase) => addDoc(collection(db, "Matriculas"), { Id_estudiante, Id_clase });
export const onGetEnrollment = (Callback) => onSnapshot(collection(db, "Matriculas"), Callback);
export const deleteEnrollment = (Id) => deleteDoc(doc(db, "Matriculas", Id));
export const getEnrollment = (Id) => getDoc(doc(db, "Matriculas", Id));
export const updateEnrollment = (Id, newFields) => updateDoc(doc(db, "Matriculas", Id), newFields);

//CLASES

export const saveClass = (Title, Description) => addDoc(collection(db, "Clases"), { Title, Description });
export const onGetClass = (Callback) => onSnapshot(collection(db, "Clases"), Callback);
export const deleteClass = (Id) => deleteDoc(doc(db, "Clases", Id));
export const getClass = (Id) => getDoc(doc(db, "Clases", Id));
export const updateClass = (Id, NewFields) => updateDoc(doc(db, "Clases", Id), NewFields);
