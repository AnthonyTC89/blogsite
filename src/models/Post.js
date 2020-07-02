const mongoose = require('mongoose');

const { Schema } = mongoose;
const PostSchema = new Schema({
  title: { type: String, required: true },
  text: { type: String, required: true },
  status: { type: Boolean, required: true },
  created_at: { type: Date, required: true },
}, { collection: 'posts' });

module.exports = mongoose.model('Post', PostSchema);
