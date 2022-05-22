import express from "express";
import cors from 'cors';
import router from "./routes";

require("dotenv").config();

const PORT = process.env.PORT;

const app = express();

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api", router);

app.listen(PORT, () => console.log(`Running on port ${PORT}`));
