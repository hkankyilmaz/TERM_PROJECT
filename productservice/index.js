import express from "express";
import 'dotenv/config';
import cors from "cors";
import multer from 'multer';
import productRoute from "./routes/productRoute.js";

const upload = multer({ storage: multer.memoryStorage() });


const app = express();


// regular middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// routes
app.use("/product", upload.single('image'), productRoute);

// listening the port
const server = app.listen(8080, () => {
  console.log("The Server Running  on the 8080 port...");
});
