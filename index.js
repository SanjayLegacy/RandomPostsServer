const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

const db = require("./models");

const postRouter = require("./routes/Post_Route");
app.use("/posts", postRouter);

const commentsRouter = require("./routes/Comments_Route");
app.use("/comments", commentsRouter);

const usersRouter = require("./routes/Users_Route");
app.use("/auth", usersRouter);

db.sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log("<--- Server Connected --->");
  });
});
