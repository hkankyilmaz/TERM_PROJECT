import express from 'express';
import cors from "cors";
import 'dotenv/config';
import { initializeApp } from "firebase/app";
import { PubSub } from '@google-cloud/pubsub';
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";

const app = express();

const pubSubClient = new PubSub();

// regular middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: true, credentials: true }));


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
const dbRef = collection(db, "mail");



async function listenForMessages() {
    const subscriptionName = 'order-topic-sub';
    const subscription = pubSubClient.subscription(subscriptionName);

    const messageHandler = async (message) => {
        console.log(`Received message: ${message.id}`);
        console.log(`Data: ${message.data}`);

        const _data = JSON.parse(Buffer.from(message.data, 'base64').toString());



        await addDoc(dbRef, {
            to: [`${_data.email}`],
            message: {
                subject: "Order Notification",
                html: `
                <p><strong>Your Orders Detail:</strong> ${_data.orderDetails}</p>
            
              `,
            },
        });
        message.ack();
    };

    subscription.on('message', messageHandler);
}

listenForMessages();



// listening the port
const server = app.listen(8080, () => {
    console.log("The Server Running  on the 8080 port...");
});

