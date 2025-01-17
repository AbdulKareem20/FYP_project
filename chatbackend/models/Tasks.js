const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: 
  { type: String, required: true

   },
  description: String,

  dueDate: Date,

  assignedTo:
   { type: mongoose.Schema.Types.ObjectId,
     ref: 'User' 
    },
  attachments: 
  [String],
});

module.exports = mongoose.model('Task', taskSchema);
