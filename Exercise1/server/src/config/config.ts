if (!process.env.DB_URL) throw new Error("database url not set");

if (!process.env.PORT) throw new Error("port not set");

export const PORT = process.env.PORT;
export const MONGODB_URI = process.env.DB_URL;
