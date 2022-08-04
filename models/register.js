const { Schema, model } = require("mongoose");

const RegisterSchema = Schema(
  {
    gamertag: {
      type: String,
      require: true,
    },
    score: {
      type: Number,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = model("Register", RegisterSchema);
