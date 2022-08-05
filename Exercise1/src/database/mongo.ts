import mongoose from "mongoose";
import { httpsServer } from "../app";

import { MONGODB_URI, PORT } from "../config/config";

export const connectToDbRunServer = () => {
    mongoose
        .connect(MONGODB_URI)
        .then(async () => {
            console.log("✅ Connected to MongoDb");

            httpsServer.listen(PORT, () => console.log("✅ Listening on port:", PORT));
        })
        .catch((err) => console.log(err));
};
