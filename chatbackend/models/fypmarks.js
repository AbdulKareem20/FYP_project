const studentSchema = new mongoose.Schema({
    name: String,
    id: String,
    photo: String,
    internal: Number,
    external: Number,
  });
  
  const Student = mongoose.model('Student', studentSchema);