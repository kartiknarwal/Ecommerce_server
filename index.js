import express from 'express';
import dotenv from 'dotenv';
import connectDb from './utils/db.js';
import cloudinary from 'cloudinary';
import cors from 'cors';

// Load env vars
dotenv.config();

// Cloudinary config
cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const app = express();

// Middlewares
app.use(express.json());
// app.use(cors({
//    origin: "https://ecommerce-frontend-six-vert-45.vercel.app"
// }));

app.use(cors({
    origin: ["https://ecommerce-frontend-six-vert-45.vercel.app"],
    methods: ["GET","POST","PUT","DELETE","OPTIONS"],
    credentials: true
}));
app.options("*", cors()); // handle preflight


// Health check route (optional, useful for Render monitoring)
app.get("/api/health", (req, res) => {
  res.send("Server is running ✅");
});

// Importing routes
import userRoutes from './routes/user.js';
import productRoutes from './routes/product.js';
import cartRoutes from './routes/cart.js';
import addressRoutes from './routes/address.js';
import orderRoutes from './routes/order.js';

// Using routes
app.use("/api", userRoutes);
app.use("/api", productRoutes);
app.use("/api", cartRoutes);
app.use("/api", addressRoutes);
app.use("/api", orderRoutes);

// Server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`🚀 Server is running on http://localhost:${port}`);
  connectDb();
});