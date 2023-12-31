import express from "express";
import clientsRoutes from "./routes/clients.routes.js";
import productsRoutes from "./routes/products.routes.js"
import salesRoutes from "./routes/sales.routes.js"

const app = express();

app.use(express.json());

app.use(clientsRoutes);
app.use(productsRoutes);
app.use(salesRoutes);

app.listen(3000, () => console.log("Server on port 3000"));

export default app;