import express from 'express';
import cors from "cors";
import 'dotenv/config';
import { initializeApp } from "firebase/app";


const app = express();

// regular middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: true, credentials: true }));



import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";

const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID,
    measurementId: process.env.MEASUREMENT_ID,
};

const firebaseApp = initializeApp(firebaseConfig);


const db = getFirestore(firebaseApp);
const dbRef = collection(db, "orders");


app.get("/orders", async (req, res) => {
    try {
        const querySnapshot = await getDocs(dbRef);
        const orders = querySnapshot.docs.map((doc) => {
            return { id: doc.id, ...doc.data() };
        });

        res.status(200).json({ orders });
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "Something went wrong" });
    }
});

app.post("/orders", async (req, res) => {

    const { orderDetails } = req.body;

    try {
        await addDoc(dbRef, {
            orderDetails,
        });

        res.status(200).json({ message: "Order created successfully" });
    }
    catch (e) {
        console.log(e);
        res.status(500).json({ message: "Something went wrong" });
    }
});



// listening the port
const server = app.listen(8080, () => {
    console.log("The Server Running  on the 8080 port...");
});

