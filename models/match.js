const { model, Schema } = require("mongoose");

const matches = model(
  "matches", // document name
  new Schema({
    state: {
      type: String,
      required: true,
      trim: true,
    },
    player_1: {
      id_user: {
        type: String,
        require: true,
        trim: true,
      },
      points: {
        type: Number,
        require: true,
      },
    },
    player_2: {
      id_user: {
        type: String,
        require: true,
        trim: true,
      },
      points: {
        type: Number,
        require: true,
      },
    },
    games: [
      {
        gameNumber: {
          type: Number,
          require: true,
        },
        movePlayer_1: {
          type: String,
          require: true,
          trim: true,
        },
        movePlayer_2: {
          type: String,
          require: true,
          trim: true,
        },
        wonBy: {
          type: Number,
          require: true,
        },
      },
    ],
  })
);

module.exports = matches;
