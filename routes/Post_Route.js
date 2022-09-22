const express = require("express");
const router = express.Router();
const { Posts } = require("../models");

router.get("/getAllPosts", async (req, res) => {
  const listOfPosts = await Posts.findAll();
  res.status(200).json(listOfPosts);
});

router.get("/getPostsById/:id", async (req, res) => {
  const postId = req.params.id;
  const PostData = await Posts.findByPk(postId);
  res.status(200).json(PostData);
});

router.post("/post", async (req, res) => {
  const post = req.body;
  await Posts.create(post);
  res.status(200).json(post);
});

router.delete("/deletePost/:id", async (req, res) => {
  const postId = req.params.id;
  await Posts.destroy({ where: { id: postId } });
  res.status(200).json("Deleted Successfully");
});

module.exports = router;
