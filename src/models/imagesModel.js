const mongoose = require("mongoose");
const aws = require("aws-sdk");
const fs = require("fs");
const path = require("path");
const { promisify } = require("util");

const s3 = new aws.S3();

const ImageSchema = new mongoose.Schema({
  name: String,
  size: Number,
  key: String,
  url: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

/* middlewares para salvar e remover a imagem */
ImageSchema.pre("save", function() {
  if (!this.url) {
    this.url = `${process.env.APP_URL}/files/${this.key}`;
  }
});

ImageSchema.pre("remove", function() {
  if (process.env.STORAGE_TYPE === "s3") {
    return s3
      .deleteObject({
        Bucket: process.env.AWS_BUCKET,
        Key: this.key
      })
      .promise();
  } else {
<<<<<<< HEAD
    return promisify(fs.unlink)(
      path.resolve(__dirname, "..", "..", "tmp", "uploads", this.key)
    );
=======
  
  return promisify(
    fs.unlink
  )(path.resolve(__dirname, "..", "..", "tmp", "uploads", this.key));
>>>>>>> 8f94120321423cbd91ce44275660cc79c1ec490b
  }
});

module.exports = mongoose.model("Image", ImageSchema);
