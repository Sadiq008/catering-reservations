import { db, storage } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

export const uploadProduct = async (productData, imageFile) => {
  try {
    // Upload image to Firebase Storage
    const storageRef = ref(storage, `products/${Date.now()}_${imageFile.name}`);
    await uploadBytes(storageRef, imageFile);
    const imageUrl = await getDownloadURL(storageRef);

    // Add product data to Firestore
    const productWithImage = { ...productData, imageUrl };
    const docRef = await addDoc(collection(db, "products"), productWithImage);
    return docRef.id;
  } catch (error) {
    console.error("Error uploading product:", error);
    throw new Error("Failed to upload product");
  }
};

export const getProducts = async () => {
  try {
    console.log("Fetching products from Firestore...");
    const querySnapshot = await getDocs(collection(db, "products"));
    console.log("Raw querySnapshot:", querySnapshot);
    const products = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    console.log("Processed products:", products);
    return products;
  } catch (error) {
    console.error("Error getting products:", error);
    throw new Error("Failed to get products");
  }
};

export const getProduct = async (productId) => {
  try {
    const productRef = doc(db, "products", productId);
    const productSnap = await getDoc(productRef);
    if (productSnap.exists()) {
      return { id: productSnap.id, ...productSnap.data() };
    } else {
      throw new Error("Product not found");
    }
  } catch (error) {
    console.error("Error getting product:", error);
    throw new Error("Failed to get product");
  }
};

export const updateProduct = async (productId, updatedData, newImageFile) => {
  try {
    const productRef = doc(db, "products", productId);
    const productSnap = await getDoc(productRef);

    if (!productSnap.exists()) {
      throw new Error("Product not found");
    }

    let updatedProduct = { ...updatedData };

    if (newImageFile) {
      // Delete old image
      const oldImageUrl = productSnap.data().imageUrl;
      const oldImageRef = ref(storage, oldImageUrl);
      await deleteObject(oldImageRef);

      // Upload new image
      const storageRef = ref(
        storage,
        `products/${Date.now()}_${newImageFile.name}`
      );
      await uploadBytes(storageRef, newImageFile);
      const newImageUrl = await getDownloadURL(storageRef);
      updatedProduct.imageUrl = newImageUrl;
    }

    await updateDoc(productRef, updatedProduct);
  } catch (error) {
    console.error("Error updating product:", error);
    throw new Error("Failed to update product");
  }
};

export const deleteProduct = async (productId) => {
  try {
    const productRef = doc(db, "products", productId);
    const productSnap = await getDoc(productRef);

    if (!productSnap.exists()) {
      throw new Error("Product not found");
    }

    // Delete image from storage
    const imageUrl = productSnap.data().imageUrl;
    const imageRef = ref(storage, imageUrl);
    await deleteObject(imageRef);

    // Delete product document
    await deleteDoc(productRef);
  } catch (error) {
    console.error("Error deleting product:", error);
    throw new Error("Failed to delete product");
  }
};
