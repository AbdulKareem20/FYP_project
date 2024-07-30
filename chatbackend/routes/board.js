const Board = require('../models/board');

exports.getBoards = async (req, res) => {
  try {
    const boards = await Board.find();
    res.json(boards);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.createBoard = async (req, res) => {
  try {
    const newBoard = new Board(req.body);
    const savedBoard = await newBoard.save();
    res.json(savedBoard);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
