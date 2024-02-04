import { fs } from "../../Config/Config";
import {
  getDocs,
  getDoc,
  doc,
  collection,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";

export const getAllCarts = async (user) => {
  const querySnapShot = await getDoc(doc(fs, `carts`, `${user}`));
  return querySnapShot;
};

export const updateCart = async (user, items) => {
  await updateDoc(doc(fs, `carts`, `${user}`), {
    products: items,
  });
};

export const deleteCart = async (user) => {
  await deleteDoc(doc(fs, "carts", `${user}`));
};
