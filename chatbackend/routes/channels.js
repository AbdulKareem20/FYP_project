const express = require('express');
const router = express.Router();
const Channel = require('../models/channel');

// Create a new channel
router.post('/', async (req, res) => {
  const { name } = req.body;
  try {
    const channel = new Channel({ name });
    await channel.save();
    res.status(201).json(channel);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all channels
router.get('/', async (req, res) => {
  try {
    const channels = await Channel.find().populate('users messages.user');
    res.json(channels);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Add a user to a channel
router.put('/:channelId/users', async (req, res) => {
  const { userId } = req.body;
  try {
    const channel = await Channel.findById(req.params.channelId);
    if (!channel.users.includes(userId)) {
      channel.users.push(userId);
    }
    await channel.save();
    res.json(channel);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Add a message to a channel
router.put('/:channelId/messages', async (req, res) => {
  const { userId, content } = req.body;
  try {
    const channel = await Channel.findById(req.params.channelId);
    channel.messages.push({ user: userId, content });
    await channel.save();
    res.json(channel);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
