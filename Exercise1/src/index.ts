import { connectToDbRunServer } from "./database/mongo";

require("dotenv").config();

const startUp = () => {
    connectToDbRunServer();
};

startUp();
