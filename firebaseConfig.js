import {initializeApp} from "firebase/app";
import {getDatabase} from "firebase/database";

const firebaseConfig = {
  authDomain: "",
  databaseURL: "https://furniture-70a47-default-rtdb.firebaseio.com/",
  projectId: "furniture-70a47",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export default database;
