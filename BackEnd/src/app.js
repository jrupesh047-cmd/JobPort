import express from 'express';
import cors from 'cors';

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Test Route
app.get("/", (req, res) => {
  res.send("Connection is connected");
});

// Routes 
import authRouter from './routes/auth.routes.js';
import userRoute from './routes/user.router.js'
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users',userRoute)

export default app;