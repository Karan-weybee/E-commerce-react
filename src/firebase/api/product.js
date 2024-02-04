import { fs } from "../../Config/Config";
import { getDocs, getDoc, doc, collection } from "firebase/firestore";
import { query, limit } from "firebase/firestore";

export const getAllProducts = async () => {
  const querySnapshot = await getDocs(collection(fs, "products"));

  return querySnapshot;
};

export const getSingleProduct = async (id) => {
  const querySnapShot = await getDoc(doc(fs, "products", id));
  return querySnapShot;
};

export const getLimitedProducts = async (dataLimit) => {
  const querySnapShot = await getDocs(
    query(collection(fs, "products"), limit(dataLimit))
  );
  return querySnapShot;
};

export const getProductCategory = async (docs) => {
  const querySnapShot = await getDoc(
    doc(fs, `product-categories`, `${docs.id}`)
  );
  return querySnapShot;
};

export const getCategory = async (category) => {
  const querySnapShot = await getDoc(doc(fs, `categories`, `${category}`));
  return querySnapShot;
};
