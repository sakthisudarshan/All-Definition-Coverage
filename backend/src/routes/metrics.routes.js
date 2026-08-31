const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

const DATA_FILE = path.join(__dirname, '../data/metrics.json');

function readAll() {
  try {
    const raw = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    if (err.code === 'ENOENT') return [];
    throw err;
  }
}

// GET /api/metrics — returns all metrics present on this branch
router.get('/', (req, res) => {
  const metrics = readAll();
  res.json({ metrics });
});

// GET /api/metrics/:id — returns single metric by id
router.get('/:id', (req, res) => {
  const metrics = readAll();
  const metric = metrics.find(m => m.id === req.params.id.toUpperCase());
  if (!metric) {
    return res.status(404).json({ error: `Metric ${req.params.id} not found on this branch` });
  }
  res.json({ metric });
});

module.exports = router;
