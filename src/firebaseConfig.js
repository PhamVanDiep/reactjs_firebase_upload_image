// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = initializeApp ({
  apiKey: "AIzaSyCC8RNZC0SLnVaxEusMmnU9-VesP1Ri9iU",
  authDomain: "reactjs-upload.firebaseapp.com",
  projectId: "reactjs-upload",
  storageBucket: "reactjs-upload.appspot.com",
  messagingSenderId: "485878211943",
  appId: "1:485878211943:web:67b3e047ffe94a85b47bc2"
});

const storage = getStorage(firebaseConfig);
export default storage;