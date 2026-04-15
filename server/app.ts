import express from 'express';
import cors from 'cors';
import { connectDB } from './db';
import { seedGallery } from './seed';
import authRoutes from './routes/auth';
import contactRoutes from './routes/contacts';
import galleryRoutes from './routes/gallery';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);

let seeded = false;
app.use(async (_req, res, next) => {
  try {
    await connectDB();
    if (!seeded) {
      await seedGallery();
      seeded = true;
    }
    next();
  } catch (err: any) {
    res.status(500).json({ error: 'Database connection failed' });
  }
});

app.use('/api/contacts', contactRoutes);
app.use('/api/gallery', galleryRoutes);

export default app;
