import express from "express"
import productRoutes from "./routes/productRoutes.js";
import userRoutes from './routes/authRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import cors from "cors"

import uploadRoutes from "./routes/uploadRoutes.js";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));
app.use(express.json());

app.use('/api/products', productRoutes);
app.use('/api/auth', userRoutes);
app.use('/api/cart', cartRoutes);

app.use("/uploads", express.static(path.join(__dirname, "uploads"))); 
app.use("/api/upload", uploadRoutes);

export default app;

