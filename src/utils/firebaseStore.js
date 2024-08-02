import { setDoc, getDoc, doc } from "firebase/firestore";
import { db } from "../../firebase.config";
const saveUserData = async (userId, userData) => {
  try {
    await setDoc(doc(db, "users", userId), userData);
  } catch (error) {
    console.error("Error writing document: ", error);
  }
};
const getUserData = async (userId) => {
  const docRef = doc(db, "users", userId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    console.log("No such document!");
    return null;
  }
};
export { getUserData, saveUserData };
