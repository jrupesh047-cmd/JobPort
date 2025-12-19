import express from 'express';
import cors from 'cors';

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test Route
app.get("/", (req, res) => {
  res.send("Connection is connected");
});

// Routes 
import authRouter from './routes/auth.routes.js';
import userRoute from './routes/user.router.js'
import jobRoutes from "./routes/job.routes.js";
import applicationRoutes from "./routes/application.routes.js";
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users',userRoute)
app.use("/api/v1/jobs", jobRoutes);
app.use("/api/v1/applications", applicationRoutes);

export default app;