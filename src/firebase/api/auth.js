import { auth, fs } from "../../Config/Config";
import { addDoc, collection } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

export const createUser = async (name, email, password) => {
  await createUserWithEmailAndPassword(auth, email, password);

  const docRef = await addDoc(collection(fs, "users"), {
    Name: name,
    Email: email,
    Password: password,
    orders: [],
  });

  return docRef;
};

export const loginUser = async (email, password) => {
  const user = signInWithEmailAndPassword(auth, email, password).then(
    (user) => {
      return user;
    }
  );

  return user;
};
