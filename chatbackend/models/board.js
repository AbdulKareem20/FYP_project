const mongoose = require('mongoose');

const BoardSchema = new mongoose.Schema({
  title: { type: String, required: true },
  columns: [
    {
      title: { type: String, required: true },
      items: [
        {
          title: { type: String, required: true },
          description: { type: String, required: true },
          userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
          dueDate: { type: Date },
          attachments: [{ url: String }],
          checklist: [{ item: String, completed: Boolean }],
          completed: { type: Boolean, default: false },
        },
      ],
    },
  ],
});

module.exports = mongoose.model('Board', BoardSchema);
