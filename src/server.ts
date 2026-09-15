import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import 'reflect-metadata';
import { AppDataSource } from './config/database';
import authRoutes from './routes/auth.routes';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/v1/auth', authRoutes);

// Health check
app.get('/', (req, res) => {
  res.json({ message: '🚀 API Backend Ghép xe Container Rỗng đang hoạt động!' });
});

// Start Server
AppDataSource.initialize()
  .then(() => {
    console.log('✅ [Database]: Kết nối PostgreSQL + PostGIS thành công!');
    app.listen(PORT, () => {
      console.log(`🚀 [Server]: Server đang chạy tại http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('❌ [Database Error]: Lỗi kết nối CSDL:', error);
  });
