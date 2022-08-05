const mongoose = require("mongoose");

const CharacterId = mongoose.model("CharacterId", {
  characterId: String,
});

module.exports = CharacterId;
