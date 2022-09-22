const express = require("express");
const router = express.Router();
const { Comments } = require("../models");
const {validateToken} = require("../middlewares/authMiddleware");

router.get("/getCommentsById/:postId", async (req, res) => {
  const postId = req.params.postId;
  const CommentData = await Comments.findAll({ where: { PostId: postId } });
  res.status(200).json(CommentData);
});

router.post("/postComments", validateToken, async (req, res) => {
  const comment = req.body;
  await Comments.create(comment);
  res.status(200).json(comment);
});

module.exports = router;
