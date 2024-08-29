import { app } from '../util/dbConnect.js';
import { getFirestore, collection, addDoc, getDocs, deleteDoc, updateDoc, doc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes, getStorage } from "firebase/storage";


const db = getFirestore(app);
const dbRef = collection(db, "products");
const storage = getStorage(app);

const getAllProducts = async (req, res) => {

  try {
    const querySnapshot = await getDocs(dbRef);
    const products = querySnapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });

    res.status(200).json({ products });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Something went wrong" });
  }

};

const createProduct = async (req, res) => {
  const { productName, productPrice, productDescription } = req.body;
  const image = req.file;

  console.log(productName, productPrice, productDescription);

  try {
    if (!image) {
      return res.status(400).json({ message: "Image file is required" });
    }

    const imageRef = ref(storage, `images/${image.originalname}`);
    await uploadBytes(imageRef, image.buffer);
    const imageUrl = await getDownloadURL(imageRef);

    await addDoc(dbRef, {
      productName,
      productPrice,
      productDescription,
      imageUrl,
    });

    res.status(200).json({ message: "Product created successfully" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const updateProduct = async (req, res) => {

  const { id, productName, productPrice, productDescription } = req.body;
  const image = req.file;

  try {
    if (!image) {
      await updateDoc(doc(db, "products", id), {
        productName,
        productPrice,
        productDescription,
      });
    } else {
      const imageRef = ref(storage, `images/${image.originalname}`);
      await uploadBytes(imageRef, image.buffer);
      const imageUrl = await getDownloadURL(imageRef);
      await updateDoc(doc(db, "products", id), {
        productName,
        productPrice,
        productDescription,
        imageUrl,
      });
    }

    res.status(200).json({ message: "Product updated successfully" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Something went wrong" });
  }


};
const deleteProduct = async (req, res) => {

  const { id } = req.body;

  try {
    await deleteDoc(doc(db, "products", id));

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Something went wrong" });
  }



};

export {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct
};