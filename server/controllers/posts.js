import mongoose from "mongoose";
import PostMessaeg from "../models/postMessage.js";

export const getPostsBySearch = async (req, res) => {
  const { searchQuery } = req.query;
  const test = ["a", "b", "c"];
  try {
    const title = new RegExp(searchQuery, "i");
    const posts = await PostMessaeg.find({ title });
    // console.log("searchQuery", searchQuery);
    console.log("posts", posts);
    res.json({ data: posts });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getPosts = async (req, res) => {
  try {
    const postMessaeg = await PostMessaeg.find();
    res.status(200).json(postMessaeg);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createPosts = async (req, res) => {
  const post = req.body;
  const newPost = new PostMessaeg({
    ...post,
    creator: req.userId,
    createdAt: new Date().toISOString(),
  });
  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  const { id: _id } = req.params;
  const post = req.body;
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No post with that id");
  const updatedPost = await PostMessaeg.findByIdAndUpdate(
    _id,
    { ...post, _id },
    { new: true }
  );
  res.json(updatedPost);
};

export const deletePost = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No post with that id");
  await PostMessaeg.findByIdAndRemove(id);
  res.json({ message: "Post deleted successfully!" });
};

export const likePost = async (req, res) => {
  const { id } = req.params;
  if (!req.userId) return res.json({ message: "Unauthenticated" });

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No post with that id");
  const post = await PostMessaeg.findById(id);
  const index = post.likes.findIndex((id) => id === String(req.userId));
  if (index === -1) {
    post.likes.push(req.userId);
  } else {
    post.likes = post.likes.filter((id) => id !== String(req.userId));
  }

  const updatedPost = await PostMessaeg.findByIdAndUpdate(id, post, {
    new: true,
  });
  res.json(updatedPost);
};
