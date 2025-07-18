const threadService = require("../services/thread.service");
const { USER_ROLES } = require("../constants");
const joiSchemas = require("../validation/thread.schemas");

exports.thread_post = async (req, res) => {
  try {
    const userId = req.user.id;
    const primaryUserId = req.user.role === USER_ROLES.PRIMARY_USER ? userId : req.user.primary_user_id;
    const results = await joiSchemas.thread_post.validateAsync(req.body);

    const thread = await threadService.createThread(results, primaryUserId, userId);
    return res.success(thread);
  } catch (error) {
    console.error("ThreadController [thread_post] Error:", error);
    res.serverError(error);
  }
};

exports.threads_get = async (req, res) => {
  try {
    const userId = req.user.id;
    const threads = await threadService.getUserThreads(userId);
    return res.success(threads);
  } catch (error) {
    console.error("ThreadController [threads_get] Error:", error);
    res.serverError(error);
  }
};

exports.thread_get = async (req, res) => {
  try {
    const { threadId } = req.params;
    const thread = await threadService.getThreadById(threadId);

    if (!thread) {
      return res.fail("Thread not found");
    }

    return res.success(thread);
  } catch (error) {
    console.error("ThreadController [thread_get] Error:", error);
    res.serverError(error);
  }
};
