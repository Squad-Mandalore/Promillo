// server.js
import express from 'express';
import path from 'path';
import { fileURLToPath, URLSearchParams } from 'url';
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

function redirectUnmatched(req, res) {
  const q = new URLSearchParams(req.query).toString();
  res.redirect('/' + (q ? `?${q}` : ''));
}

// ensure bucket exists and return its array
function getBucket(bucketId) {
  if (!store.has(bucketId)) return [];
  return store.get(bucketId);
}

// API: Liste holen
app.get('/api/items/:bucketId', (req, res) => {
  const { bucketId } = req.params;
  res.json({ items: getBucket(bucketId) });
});

// API: Eintrag hinzufügen
app.post('/api/items/:bucketId', (req, res) => {
  const { bucketId } = req.params;
  const text = (req.body?.text || '').trim();
  if (!text) return res.status(400).json({ error: 'text required' });
  const item = { id: crypto.randomUUID(), text, createdAt: Date.now() };
  const bucket = getBucket(bucketId);
  const next = [item, ...bucket];
  store.set(bucketId, next)
  res.status(201).json(item);
});

// API: Eintrag löschen
app.delete('/api/items/:bucketId/:id', (req, res) => {
  const { bucketId, id } = req.params;
  const bucket = getBucket(bucketId);
  const next = bucket.filter(i => i.id !== id);
  if (next.length === 0) {
    // letztes Item geloescht -> Bucket entfernen
    store.delete(bucketId);
  } else {
    store.set(bucketId, next);
  }
  return res.status(204).end();
});

app.use(redirectUnmatched);

const server = app.listen(PORT, () => {
  console.log(`Einkaufsliste läuft auf http://localhost:${PORT}`);
});

process.on('SIGTERM', () => {
  server.close(() => {
    console.log(`HTTP server gestoppt`);
  });
});
