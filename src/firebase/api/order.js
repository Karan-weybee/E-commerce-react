import { fs } from "../../Config/Config";
import {
  getDocs,
  getDoc,
  doc,
  collection,
  addDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";

export const getOrder = async (order) => {
  const querySnapShot = await getDoc(doc(fs, `orders`, `${order}`));
  return querySnapShot;
};

export const userOrders = async (user) => {
  const querySnapShot = await getDoc(doc(fs, `user-orders`, `${user}`));
  return querySnapShot;
};

export const addNewOrder = async (card) => {
  const order = await addDoc(collection(fs, "orders"), {
    date: String(new Date()),
    products: card,
  });

  return order;
};

export const updateOrder = async (user, orders) => {
  await updateDoc(doc(fs, `user-orders`, `${user}`), {
    orders: orders,
  });
};

export const setOrderList = async (user, orders) => {
  const querySnapShot = await setDoc(doc(fs, `user-orders`, `${user}`), {
    orders: orders,
  });
  return querySnapShot;
};
