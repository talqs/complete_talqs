// routes/history.js
const express = require('express');
const router = express.Router();
const History = require('../models/History');

router.post('/save', async (req, res) => {
  try {
    const { userId, query, response, type } = req.body;

    const newHistory = new History({ userId, query, response, type });
    await newHistory.save();

    res.status(200).json({ message: 'History saved successfully' });
  } catch (error) {
    console.error('Error saving history:', error);
    res.status(500).json({ message: 'Failed to save history' });
  }
});

// routes/history.js
router.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const history = await History.find({ userId }).sort({ createdAt: -1 });  // latest first
    res.status(200).json(history);
  } catch (error) {
    console.error('Error fetching history:', error);
    res.status(500).json({ message: 'Failed to fetch history' });
  }
});



module.exports = router;
