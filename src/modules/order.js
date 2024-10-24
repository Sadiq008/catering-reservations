import { db } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  updateDoc,
  query,
  where,
  orderBy,
  doc,
  serverTimestamp,
} from "firebase/firestore";

export const createOrder = async (userId, orderData) => {
  try {
    const ordersRef = collection(db, "orders");
    const newOrder = {
      ...orderData,
      userId,
      createdAt: serverTimestamp(),
      status: "Pending",
    };
    console.log("Attempting to create order:", newOrder); // Log the order data
    const docRef = await addDoc(ordersRef, newOrder);
    console.log("Order created with ID:", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
};

export const getOrders = async (userId) => {
  try {
    const ordersRef = collection(db, "orders");
    const q = query(
      ordersRef,
      where("userId", "==", userId),
      orderBy("createdAt", "desc")
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error getting orders:", error);
    throw new Error("Failed to get orders");
  }
};

export const getOrder = async (orderId) => {
  try {
    const orderRef = doc(db, "orders", orderId);
    const orderSnap = await getDoc(orderRef);
    if (orderSnap.exists()) {
      return { id: orderSnap.id, ...orderSnap.data() };
    } else {
      throw new Error("Order not found");
    }
  } catch (error) {
    console.error("Error getting order:", error);
    throw new Error("Failed to get order");
  }
};

export const updateOrderStatus = async (orderId, newStatus) => {
  try {
    const orderRef = doc(db, "orders", orderId);
    await updateDoc(orderRef, { status: newStatus });
  } catch (error) {
    console.error("Error updating order status:", error);
    throw new Error("Failed to update order status");
  }
};

export const getUserOrders = async (userId) => {
  try {
    console.log("Getting orders for user:", userId);
    const ordersRef = collection(db, "orders");
    const q = query(
      ordersRef,
      where("userId", "==", userId),
      orderBy("createdAt", "desc")
    );
    const querySnapshot = await getDocs(q);
    const orders = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    console.log("Retrieved orders:", orders);
    return orders;
  } catch (error) {
    console.error("Error getting user orders:", error);
    throw error;
  }
};
