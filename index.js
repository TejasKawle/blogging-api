import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { connectDB } from './config/db.js'
import authRoutes from './routes/authRoutes.js'
import userRoutes from "./routes/userRoutes.js"
import postRoutes from "./routes/postRoutes.js";
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());


app.get("/", (req, res) => {
  res.send("Welcome to my Blogging API ");
});

connectDB();

app.use('/api/auth', authRoutes);
app.use('/admin', userRoutes);
app.use("/api/posts", postRoutes);
const PORT=process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
  
})