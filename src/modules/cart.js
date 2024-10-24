import { db } from "../firebase";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

export const addToCart = async (userId, productId, quantity) => {
  try {
    const cartRef = collection(db, "carts", userId, "items");
    const q = query(cartRef, where("productId", "==", productId));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      await addDoc(cartRef, { productId, quantity });
    } else {
      const cartItemDoc = querySnapshot.docs[0];
      await updateDoc(doc(cartRef, cartItemDoc.id), {
        quantity: cartItemDoc.data().quantity + quantity,
      });
    }
  } catch (error) {
    console.error("Error adding to cart:", error);
    throw new Error("Failed to add item to cart");
  }
};

export const getCart = async (userId) => {
  try {
    const cartRef = collection(db, "carts", userId, "items");
    const querySnapshot = await getDocs(cartRef);
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error getting cart:", error);
    throw new Error("Failed to get cart items");
  }
};

export const getCartItem = async (userId, itemId) => {
  try {
    const cartItemRef = doc(db, "carts", userId, "items", itemId);
    const docSnap = await getDoc(cartItemRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error getting cart item:", error);
    throw new Error("Failed to get cart item");
  }
};

export const updateCartItem = async (userId, itemId, newQuantity) => {
  try {
    const cartItemRef = doc(db, "carts", userId, "items", itemId);
    await updateDoc(cartItemRef, { quantity: newQuantity });
  } catch (error) {
    console.error("Error updating cart item:", error);
    throw new Error("Failed to update cart item");
  }
};

export const removeFromCart = async (userId, itemId) => {
  try {
    const cartItemRef = doc(db, "carts", userId, "items", itemId);
    await deleteDoc(cartItemRef);
  } catch (error) {
    console.error("Error removing from cart:", error);
    throw new Error("Failed to remove item from cart");
  }
};

export const clearCart = async (userId) => {
  try {
    const cartRef = collection(db, "carts", userId, "items");
    const querySnapshot = await getDocs(cartRef);
    const deletePromises = querySnapshot.docs.map((doc) => deleteDoc(doc.ref));
    await Promise.all(deletePromises);
  } catch (error) {
    console.error("Error clearing cart:", error);
    throw new Error("Failed to clear cart");
  }
};
