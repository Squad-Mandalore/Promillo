// Kleiner Store mit Fallback auf localStorage + optionale API-Anbindung
const API_BASE = '/api/items'; // Backend-Endpunkte (optional)

const els = {
  input: document.getElementById('item-input'),
  addBtn: document.getElementById('add-btn'),
  list: document.getElementById('list'),
  empty: document.getElementById('empty'),
  count: document.getElementById('count'),
  tpl: document.getElementById('item-template'),
};

let items = []; // {id, text, createdAt}
let bucketId = null;

init();

function getBucketId() {
  return new URL(window.location.href).searchParams.get("shopping");
}

function init() {
  bucketId = getBucketId();
  wireUI();
  // Versuch, vom Backend zu laden – bei Fehler: aus localStorage
  loadItems().then(renderAll).catch(() => {
    items = loadFromLocal();
    renderAll();
  });
}

function wireUI() {
  els.addBtn.addEventListener('click', onAdd);
  els.input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') onAdd();
  });
}

async function onAdd() {
  const text = els.input.value.trim();
  if (!text) return;
  els.input.value = '';

  // Optimistisches Update
  const tmp = { id: crypto.randomUUID(), text, createdAt: Date.now(), _optimistic: true };
  items.unshift(tmp);
  renderAll();
  saveToLocal(items);

  try {
    const created = await apiCreate(text);
    // ersetze temp mit server-version (falls backend existiert)
    const idx = items.findIndex(i => i.id === tmp.id);
    if (idx !== -1) {
      items[idx] = created;
    } else {
      items.unshift(created);
    }
  } catch {
    // bleibt lokal erhalten
  } finally {
    renderAll();
    saveToLocal(items);
  }
}

function renderAll() {
  els.list.innerHTML = '';
  items.forEach(renderItem);
  els.empty.style.display = items.length ? 'none' : 'block';
  els.count.textContent = `${items.length} ${items.length === 1 ? 'Eintrag' : 'Einträge'}`;
}

function renderItem(item) {
  const node = els.tpl.content.firstElementChild.cloneNode(true);
  node.dataset.id = item.id;
  node.querySelector('.item__text').textContent = item.text;
  node.querySelector('.item__done').addEventListener('click', () => onDone(item.id, node));
  if (item._optimistic) node.style.opacity = .7;
  els.list.appendChild(node);
}

async function onDone(id, node) {
  // UI zuerst
  node.style.transition = 'opacity .15s ease, transform .15s ease';
  node.style.opacity = '0';
  node.style.transform = 'scale(0.98)';
  setTimeout(() => {
    items = items.filter(i => i.id !== id);
    renderAll();
    saveToLocal(items);
  }, 150);

  // Backend (best effort)
  try {
    await apiDelete(id);
  } catch { /* noop */ }
}

// ===== Persistence (localStorage) =====
const LS_KEY = 'shopping-items-v1';
function loadFromLocal() {
  try { return JSON.parse(localStorage.getItem(LS_KEY)) ?? []; }
  catch { return []; }
}
function saveToLocal(list) {
  localStorage.setItem(LS_KEY, JSON.stringify(list));
}

// ===== API helpers =====
async function loadItems() {
  const res = await fetch(`${API_BASE}/${bucketId}`, { headers: { 'Accept': 'application/json' } });
  if (!res.ok) throw new Error('No API');
  const data = await res.json();
  items = data.items ?? [];
  // merge mit localStorage (einfachster wins: server priorisieren)
  const local = loadFromLocal();
  const merged = new Map();
  [...items, ...local].forEach(i => merged.set(i.id, i));
  items = Array.from(merged.values()).sort((a,b) => (b.createdAt ?? 0) - (a.createdAt ?? 0));
  return items;
}

async function apiCreate(text) {
  const res = await fetch(`${API_BASE}/${bucketId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    body: JSON.stringify({ text })
  });
  if (!res.ok) throw new Error('POST failed');
  return res.json();
}

async function apiDelete(id) {
  const res = await fetch(`${API_BASE}/${bucketId}/${encodeURIComponent(id)}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('DELETE failed');
}
