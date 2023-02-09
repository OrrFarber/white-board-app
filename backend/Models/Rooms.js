const mongoose = require("mongoose");
const roomSchema = new mongoose.Schema({
  roomid: {
    type: String,
    required: true,
    unique: true,
  },
  sketch: {
    type: Array,
  },
});
module.exports = mongoose.model("Room", roomSchema);
