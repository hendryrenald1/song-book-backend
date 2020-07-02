const songsRouter = require("express").Router();
const Song = require("../models/Songs");

const authError = (request) => {
  const authorization = request.get("authorization");
  if (!authorization || !authorization.toLowerCase().startsWith("bearer ")) {
    return { error: "bearer token required" };
  }

  try {
    jwt.verify(authorization.substring(7), process.env.SECRET);
  } catch (error) {
    return { error: error.toString() };
  }

  return null;
};

songsRouter.get("/", (request, response) => {
  Song.find({}).then((songs) => {
    response.json(songs);
  });
  //Fcmbook.find({}).then((songs) => response.json(songs));
  /*
  const fcmbook = new Fcmbook({
    artist: "from node1",
    album: "from node2",
    vol: "fron node3"
  });
  fcmbook.save().then((result) => response.json(fcmbook));
  */
});

songsRouter.post("/", (request, response) => {
  //const error = authError(request);
  //if (error) return response.status(401).send(error);

  const input = request.body;
  //   const song = new Song({
  //     english: input.english,
  //     lyrics: input.lyrics,
  //     recording: input.recording,
  //     chorded: input.chorded,
  //   });

  const song = new Song({
    songNo: input.songNo,
    artist: input.artist,
    album: input.album,
    vol: input.vol,
    audio: input.audio,
    lyricsEnglish: {
      verse: input.lyricsEnglish.verse,
      prechorus: input.lyricsEnglish.prechorus,
      chorus: input.lyricsEnglish.chorus,
    },
    lyricsTamil: {
      verse: input.lyricsTamil.verse,
      prechorus: input.lyricsTamil.prechorus,
      chorus: input.lyricsTamil.chorus,
    },
  });
  song.save().then((result) => response.json(song));
});

songsRouter.put("/:id", (request, response) => {
  // const error = authError(request);
  // if (error) return response.status(401).send(error);

  console.log("id", request.params.id);

  const song = new Song({
    songNo: request.body.songNo,
    artist: request.body.artist,
    album: request.body.album,
    vol: request.body.vol,
    audio: request.body.audio,
    lyricsEnglish: {
      verse: request.body.lyricsEnglish.verse,
      prechorus: request.body.lyricsEnglish.prechorus,
      chorus: request.body.lyricsEnglish.chorus,
    },
    lyricsTamil: {
      verse: request.body.lyricsTamil.verse,
      prechorus: request.body.lyricsTamil.prechorus,
      chorus: request.body.lyricsTamil.chorus,
    },
  });
  Song.findByIdAndUpdate(
    request.params.id,
    { $set: request.body },
    { new: true }
  )
    .then((updatedSong) => {
      console.log(updatedSong);
      response.json(updatedSong);
    })
    .catch((error) => {
      console.log(error);
      response.status(400).send({ error: "malformatted id" });
    });
});

songsRouter.delete("/:id", (request, response) => {
  const error = authError(request);
  if (error) return response.status(401).send(error);

  Song.remove({ _id: request.params.id }).then((result) =>
    response.status(204).send()
  );
});

module.exports = songsRouter;
