const channelSchema = new mongoose.Schema({
    name: String,
  });
  const Channel = mongoose.model('Channel', channelSchema);