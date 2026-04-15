import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, default: '' },
  email: { type: String, default: '' },
  phone: { type: String, required: true },
  interest: { type: String, required: true },
  message: { type: String, default: '' },
  notes: { type: String, default: '' },
  wantsBrochure: { type: Boolean, default: false },
  isRead: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

export const Contact = mongoose.model('Contact', contactSchema);
