const mongoose = require("mongoose");

const commentsSchema = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  userName: { type: String, required: true },
  comment: { type: String, required: true }
});

const issueSchema = mongoose.Schema({
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  authorName: { type: String, required: true },
  images: {
    _id: { type: mongoose.Schema.Types.ObjectId, ref: "Image" },
    url: { type: String, required: true },
    key: { type: String, required: true }
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true
  },
  postedAt: { type: Date, default: Date.now() },
  street: { type: String, required: true },
  neighborhood: { type: String, required: true },
  city: { type: String, required: true },
  latitude: { type: String, required: true },
  longitude: { type: String, required: true },
  description: { type: String, default: "" },
  voters: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }
    ],
    default: []
  },
  comments: {
    type: [commentsSchema],
    default: []
  }
});

module.exports = mongoose.model("Issues", issueSchema);
