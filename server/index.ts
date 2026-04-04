import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './db';
import { seedGallery } from './seed';
import authRoutes from './routes/auth';
import contactRoutes from './routes/contacts';
import galleryRoutes from './routes/gallery';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/gallery', galleryRoutes);

async function start() {
  await connectDB();
  await seedGallery();
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
}

start().catch(console.error);
