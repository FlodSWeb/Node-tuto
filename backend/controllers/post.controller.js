const PostModel = require("../models/post.models.js");

// GET / find()
module.exports.getItems = async (req, res) => {
  const items = await PostModel.find();

  res.status(200).json(items);
};

// CREATE / create()
module.exports.createItem = async (req, res) => {
  if (!req.body.author) {
    res.status(400).json({ message: "Entre un author" });
  } else {
    const item = await PostModel.create({
      message: req.body.message,
      author: req.body.author,
    });
    res.status(200).json(item);
  }
};

// EDIT / findByIdAndUpdate()
module.exports.editItem = async (req, res) => {
  if (!req.params.id) {
    res.status(400).json("ITEM INTROUVABLE // EDIT");
  } else {
    const edit = await PostModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(edit);
  }
};

// DELETE / deleteOne()
module.exports.deleteItem = async (req, res) => {
  const item = await PostModel.findById(req.params.id);

  if (!item) {
    res.status(400).json("ITEM INTROUVABLE // DELETE");
  } else {
    await item.deleteOne();
    res.status(200).json(item);
  }
};

// PATCH / findByIdAndUpdate() send() $addToSet
module.exports.addLiker = async (req, res) => {
  try {
    await PostModel.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { likers: req.body.userId } },
      { new: true }
    ).then((data) => res.status(200).send(data));
  } catch (err) {
    // res.status(404).json(err);
    res.status(400).json("ITEM/USER INTROUVABLE");
  }
};
// PATCH / findByIdAndUpdate() send() $pull
module.exports.removeLiker = async (req, res) => {
  try {
    await PostModel.findByIdAndUpdate(
      req.params.id,
      { $pull: { likers: req.body.userId } },
      { new: true }
    ).then((data) => res.status(200).send(data));
  } catch (err) {
    res.status(400).json("ITEM/USER INTROUVABLE");
  }
};
