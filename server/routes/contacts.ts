import { Router } from 'express';
import { Contact } from '../models/Contact';
import { authMiddleware } from '../middleware/auth';

const router = Router();

router.post('/', async (req, res) => {
  try {
    const contact = await Contact.create(req.body);
    res.status(201).json(contact);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/', authMiddleware, async (_req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.patch('/:id/read', authMiddleware, async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { isRead: true },
      { new: true }
    );
    res.json(contact);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.patch('/:id/notes', authMiddleware, async (req, res) => {
  try {
    const notes = typeof req.body?.notes === 'string' ? req.body.notes.trim() : '';
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { notes },
      { new: true }
    );
    if (!contact) {
      res.status(404).json({ error: 'Lead not found' });
      return;
    }
    res.json(contact);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
