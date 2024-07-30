const boardSchema = new mongoose.Schema({
    name: String,
  });

const Board = mongoose.model('Board', boardSchema);