const mongoose = require("mongoose");

var Schema = mongoose.Schema;
var newSongBookSch = new Schema({
  songNo: String,
  artist: String,
  album: String,
  vol: String,
  audio: String,
  title: {
    English: { text: String },
    Tamil: { text: String },
  },
  lyricsEnglish: {
    verse: {
      type: ["String"],
    },
    prechorus: {
      type: ["String"],
    },
    chorus: {
      type: ["Array"],
    },
  },
  lyricsTamil: {
    verse: {
      type: ["String"],
    },
    prechorus: {
      type: ["String"],
    },
    chorus: {
      type: ["Array"],
    },
  },
});
const newSongBook = mongoose.model("new-song-book", newSongBookSch);

module.exports = newSongBook;
