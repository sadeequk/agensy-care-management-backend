const express = require("express");
const router = express.Router();
const threadController = require("../controllers/thread.controller");

router.post("/", threadController.thread_post);
router.get("/", threadController.threads_get);
router.get("/:threadId", threadController.thread_get);
router.post("/:threadId/participants", threadController.participant_post);

module.exports = router;
