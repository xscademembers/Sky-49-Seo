import dotenv from 'dotenv';
// Load local development secrets first, then fall back to .env.
dotenv.config({ path: '.env.local' });
dotenv.config();

import app from './app';

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
