import { fs } from "../../Config/Config";
import { getDocs, getDoc, doc, collection } from "firebase/firestore";

export const getShipping = (user) => {
  const querySnapShot = getDoc(doc(fs, `shipping`, `${user}`));
  return querySnapShot;
};
