import express from 'express';
import cors from "cors";
import 'dotenv/config';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, doc } from "firebase/firestore";
import { PubSub } from '@google-cloud/pubsub';
import { Buffer } from 'buffer';


const app = express();

const pubSubClient = new PubSub();

// regular middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());




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


app.get("/", (req, res) => {
    res.status(200).json({ message: "Welcome to the Order Service" });
}
);


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

    const { orders, totalPrice, email, name } = req.body;

    try {

        const topicName = 'order-topic';
        const message = { orders, totalPrice, email, name };
        const dataBuffer = Buffer.from(JSON.stringify(message));


        await addDoc(dbRef, {
            orders,
            totalPrice,
            email,
            name
        });

        const messageId = await pubSubClient.topic(topicName).publish(dataBuffer);
        console.log(`Message ${messageId} published.`);

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

