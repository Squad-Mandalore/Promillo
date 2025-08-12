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

// In-Memory Store: bucketId -> array of items
// items =  {id, text, createdAt}
const store = new Map();


// Static files (dist/public folder mit index.html, style.css, script.js)
app.use(express.static(path.join(__dirname, 'public')));

// ensure bucket exists and return its array
function getBucket(bucketId) {
  if (!store.has(bucketId)) store.set(bucketId, []);
  return store.get(bucketId);
}

// API: Liste holen
app.get('/api/items/:bucketId', (req, res) => {
  const { bucketId } = req.params;
  if (!bucketId ) return res.status(400).json({ error: 'text required' });
  res.json({ items: getBucket(bucketId) });
});

// API: Eintrag hinzufügen
app.post('/api/items/:bucketId', (req, res) => {
  const { bucketId } = req.params;
  const text = (req.body?.text || '').trim();
  if (!text || !bucketId ) return res.status(400).json({ error: 'text required' });
  const item = { id: crypto.randomUUID(), text, createdAt: Date.now() };
  const bucket = getBucket(bucketId);
  bucket.unshift(item);
  res.status(201).json(item);
});

// API: Eintrag löschen
app.delete('/api/items/:bucketId/:id', (req, res) => {
  const { bucketId, id } = req.params;
  if (!bucketId ) return res.status(400).json({ error: 'text required' });
  const bucket = getBucket(bucketId);
  const next = bucket.filter(i => i.id !== id);
  store.set(bucketId, next)
  return res.status(204).end();
});

app.listen(PORT, () => {
  console.log(`Einkaufsliste läuft auf http://localhost:${PORT}`);
});
