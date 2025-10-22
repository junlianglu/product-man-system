import express from "express"
import productRoutes from "./routes/productRoutes.js";
import userRoutes from './routes/authRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import cors from "cors"

const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));
app.use(express.json());

app.use('/api/products', productRoutes);
app.use('/api/auth', userRoutes);
app.use('/api/cart', cartRoutes);

export default app;

