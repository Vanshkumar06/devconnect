
const Post = require("../models/Post");

const createPost = async (req, res) => {
  try {
    const { content } = req.body;

    const post = await Post.create({
      user: req.user._id,
      content,
    });

    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = { createPost };