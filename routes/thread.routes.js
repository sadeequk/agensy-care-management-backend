const express = require("express");
const router = express.Router();
const threadController = require("../controllers/thread.controller");

router.post("/", threadController.thread_post);
router.get("/", threadController.threads_get);
router.get("/:threadId", threadController.thread_get);

//add/remove participant routes will be added here

module.exports = router;
