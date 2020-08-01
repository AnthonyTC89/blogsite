const mongoose = require('mongoose');

const { Schema } = mongoose;
const UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  status: { type: Boolean, required: true, default: true },
}, { collection: 'users', timestamps: true });

module.exports = mongoose.model('User', UserSchema);
