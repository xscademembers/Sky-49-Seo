import mongoose from 'mongoose';

const gallerySchema = new mongoose.Schema({
  src: { type: String, required: true },
  title: { type: String, required: true },
  desc: { type: String, default: '' },
  aspect: { type: String, default: 'aspect-[16/9]' },
  category: { type: String, enum: ['main', 'extra'], default: 'main' },
  order: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

export const GalleryImage = mongoose.model('GalleryImage', gallerySchema);
