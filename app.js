import express from 'express';
import cookieParser from 'cookie-parser';

import { PORT } from './config/env.js';

import authRouter from './routes/auth.routes.js';
import subscriptionRouter from './routes/subscription.routes.js';
import userRouter from './routes/user.routes.js';
import connectToDatabase from './database/mongodb.js';
import errorMiddleware from './middlewares/error.middleware.js';
import arcjetMiddleware from './middlewares/arcjet.middleware.js';
import workflowRouter from './routes/workflow.routes.js';

const app = express(); 

// Middleware để log địa chỉ IP
// app.use((req, res, next) => {
//   const clientIP = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
//   console.log("Client IP:", clientIP === "::1" ? "127.0.0.1" : clientIP);
//   req.clientIP = clientIP === "::1" ? "127.0.0.1" : clientIP; // Lưu vào biến khác
//   next();
// });

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(arcjetMiddleware);

app.use('/api/v1/auth', authRouter); //đường dẫn đến đki dạng: /api/v1/auth/sign-up;
app.use('/api/v1/users', userRouter);
app.use('/api/v1/subscriptions', subscriptionRouter);
app.use('/api/v1/workflows', workflowRouter);

app.use(errorMiddleware);

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(PORT, async () => {
  console.log(`Tracker is running on http://localhost:${PORT}`);

  await connectToDatabase();
});

export default app;