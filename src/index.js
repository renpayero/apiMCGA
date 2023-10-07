import express from "express";
import clientsRoutes from "./routes/clients.routes.js";

const app = express();

app.use(express.json());

app.use(clientsRoutes);

app.listen(3000, () => console.log("Server on port 3000"));

export default app;