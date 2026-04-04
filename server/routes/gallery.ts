import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { GalleryImage } from '../models/Gallery';
import { authMiddleware } from '../middleware/auth';

const uploadDir = path.join(process.cwd(), 'public', 'uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadDir),
  filename: (_req, file, cb) => {
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`;
    cb(null, unique);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    const allowed = /\.(jpg|jpeg|png|gif|webp)$/i;
    cb(null, allowed.test(path.extname(file.originalname)));
  },
});

const router = Router();

router.get('/', async (_req, res) => {
  try {
    const images = await GalleryImage.find().sort({ order: 1, createdAt: 1 });
    res.json(images);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', authMiddleware, upload.single('image'), async (req, res) => {
  try {
    let src = req.body.src || '';
    if (req.file) {
      src = `/uploads/${req.file.filename}`;
    }
    if (!src) {
      res.status(400).json({ error: 'No image file or URL provided' });
      return;
    }

    const image = await GalleryImage.create({
      src,
      title: req.body.title || 'Untitled',
      desc: req.body.desc || '',
      aspect: req.body.aspect || 'aspect-[16/9]',
      category: req.body.category || 'main',
      order: parseInt(req.body.order) || 0,
    });
    res.status(201).json(image);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

router.patch('/:id', authMiddleware, async (req, res) => {
  try {
    const image = await GalleryImage.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(image);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const image = await GalleryImage.findById(req.params.id);
    if (image) {
      if (image.src.startsWith('/uploads/')) {
        const filePath = path.join(process.cwd(), 'public', image.src);
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
      }
      await GalleryImage.findByIdAndDelete(req.params.id);
    }
    res.json({ success: true });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
