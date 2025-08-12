// server.js
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3069;

app.use(cors());
app.use(express.json());

// In-Memory Store
let items = []; // {id, text, createdAt}

// Static files (dist/public folder mit index.html, style.css, script.js)
app.use(express.static(path.join(__dirname, 'public')));

// API: Liste holen
app.get('/api/items', (req, res) => {
  res.json({ items });
});

// API: Eintrag hinzufügen
app.post('/api/items', (req, res) => {
  const text = (req.body?.text || '').trim();
  if (!text) return res.status(400).json({ error: 'text required' });
  const item = { id: crypto.randomUUID(), text, createdAt: Date.now() };
  items.unshift(item);
  res.status(201).json(item);
});

// API: Eintrag löschen
app.delete('/api/items/:id', (req, res) => {
  const { id } = req.params;
  const before = items.length;
  items = items.filter(i => i.id !== id);
  return res.status(before === items.length ? 404 : 204).end();
});

app.listen(PORT, () => {
  console.log(`Einkaufsliste läuft auf http://localhost:${PORT}`);
});
