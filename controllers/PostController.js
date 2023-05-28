import PostModel from "../models/Post.js";

export const getAll = async (req, res) => {
  try {
    const posts = await PostModel.find().populate("user").exec();
    res.json(posts);
  } catch (err) {
    res.status(500).json({
      message: "Failed to find an articles",
    });
  }
};
export const getOne = async (req, res) => {
  try {
    const postId = req.params.id;
    const updatedDoc = await PostModel.findOneAndUpdate(
      { _id: postId },
      { $inc: { viewsCount: 1 } },
      { new: true }
    );

    if (!updatedDoc) {
      return res.status(404).json({
        message: "Article not found",
      });
    }

    res.json(updatedDoc);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Failed to find an article",
    });
  }
};
export const remove = async (req, res) => {
  try {
    const postId = req.params.id;
    const removedDoc = await PostModel.findOneAndRemove({ _id: postId });

    if (!removedDoc) {
      return res.status(404).json({
        message: "Article not found",
      });
    }

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Failed to delete an article",
    });
  }
};
export const create = async (req, res) => {
  try {
    const doc = new PostModel({
      title: req.body.title,
      text: req.body.text,
      imageUrl: req.body.imageUrl,
      tags: req.body.tags,
      user: req.userId,
    });

    const post = await doc.save();
    res.json(post);
  } catch (err) {
    res.status(500).json({
      message: "Failed to create an article",
    });
  }
};
export const update = async (req, res) => {
  try {
    const postId = req.params.id;
    await PostModel.updateOne(
      { _id: postId },
      {
        title: req.body.title,
        text: req.body.text,
        imageUrl: req.body.imageUrl,
        tags: req.body.tags,
        user: req.userId,
      }
    );
    res.json({
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      message: "Failed to update an article",
    });
  }
};
