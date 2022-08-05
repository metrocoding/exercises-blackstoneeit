require("dotenv").config();
import { connectToDbRunServer } from "./database/mongo";

const startUp = () => {
    connectToDbRunServer();
};

startUp();
