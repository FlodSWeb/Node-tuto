// import express from "express";
const express = require("express");

const {
  getItems,
  createItem,
  editItem,
  deleteItem,
  addLiker,
  removeLiker,
} = require("../controllers/post.controller");
const router = express.Router();

router.get("/", getItems);
router.post("/", createItem);
router.put("/:id", editItem);
router.delete("/:id", deleteItem);
router.patch("/like/:id", addLiker);
router.patch("/unlike/:id", removeLiker);

module.exports = router;
