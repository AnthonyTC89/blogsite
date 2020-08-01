const mongoose = require('mongoose');

const { Schema } = mongoose;
const PostSchema = new Schema({
  title: { type: String, required: true },
  text: { type: String, required: true },
  status: { type: Boolean, required: true },
  user_id: { type: String, required: true },
}, { collection: 'posts', timestamps: true });

module.exports = mongoose.model('Post', PostSchema);
