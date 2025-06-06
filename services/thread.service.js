const { Thread, User, Client, Message } = require("../models");
const { Op } = require("sequelize");
const { THREAD_TYPES } = require("../constants");

exports.createThread = (data, primaryUserId, createdBy) => {
  return new Promise(async (resolve, reject) => {
    try {
      const thread = await Thread.create({
        primary_user_id: primaryUserId,
        client_id: data.client_id,
        type: data.type,
        sub_type: data.subType,
        created_by: createdBy,
        started_at: new Date(),
      });

      await thread.addParticipant(createdBy);
      await thread.addParticipant(data.participant_id);

      const threadWithRelations = await Thread.findByPk(thread.id, {
        include: [
          {
            model: User,
            as: "participants",
            through: { attributes: [] },
            attributes: ["id", "first_name", "last_name", "avatar"],
          },
          {
            model: User,
            as: "primaryUser",
            attributes: ["id", "first_name", "last_name", "avatar"],
          },
          {
            model: User,
            as: "creator",
            attributes: ["id", "first_name", "last_name", "avatar"],
          },
          {
            model: Client,
            as: "client",
            attributes: ["id", "first_name", "last_name"],
          },
          {
            model: Message,
            as: "messages",
            include: [
              {
                model: User,
                as: "sender",
                attributes: ["id", "first_name", "last_name", "avatar"],
              },
            ],
            order: [["sent_at", "ASC"]],
          },
        ],
      });

      resolve(threadWithRelations);
    } catch (error) {
      console.error("ThreadService [createThread] Error:", error);
      reject(error);
    }
  });
};

exports.getUserThreads = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const threads = await Thread.findAll({
        attributes: ["id", "type", "sub_type", "client_id", "created_by", "started_at", "primary_user_id"],
        include: [
          {
            model: User,
            as: "participants",
            through: { attributes: [] },
            attributes: ["id", "first_name", "last_name", "avatar"],
          },
          {
            model: User,
            as: "primaryUser",
            attributes: ["id", "first_name", "last_name", "avatar"],
          },
          {
            model: User,
            as: "creator",
            attributes: ["id", "first_name", "last_name", "avatar"],
          },
          {
            model: Client,
            as: "client",
            attributes: ["id", "first_name", "last_name"],
          },
          {
            model: Message,
            as: "messages",
            include: [
              {
                model: User,
                as: "sender",
                attributes: ["id", "first_name", "last_name", "avatar"],
              },
            ],
            order: [["sent_at", "ASC"]],
          },
        ],
        where: {
          [Op.or]: [{ primary_user_id: userId }, { created_by: userId }],
        },
      });
      resolve({ threads });
    } catch (error) {
      reject(error);
    }
  });
};

exports.getThreadById = (threadId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const thread = await Thread.findByPk(threadId, {
        include: [
          {
            model: User,
            as: "participants",
            attributes: ["id", "first_name", "last_name", "avatar"],
            through: { attributes: [] },
          },
          {
            model: User,
            as: "creator",
            attributes: ["id", "first_name", "last_name", "avatar"],
          },
          {
            model: Message,
            as: "messages",
            include: [
              {
                model: User,
                as: "sender",
                attributes: ["id", "first_name", "last_name", "avatar"],
              },
            ],
            order: [["sent_at", "ASC"]],
          },
        ],
      });
      resolve(thread);
    } catch (error) {
      reject(error);
    }
  });
};

exports.updateLastMessageTime = (threadId) => {
  return new Promise(async (resolve, reject) => {
    try {
      await Thread.update({ last_message_time: new Date() }, { where: { id: threadId } });
      resolve(true);
    } catch (error) {
      reject(error);
    }
  });
};

module.exports.addParticipant = (threadId, userIdToAdd) =>
  new Promise(async (resolve, reject) => {
    try {
      const thread = await Thread.findByPk(threadId);

      if (!thread) {
        return reject(new Error("Thread not found."));
      }

      const user = await User.findByPk(userIdToAdd);
      if (!user) {
        return reject(new Error("User to add not found."));
      }

      await thread.addParticipant(user);

      const updatedThread = await Thread.findByPk(threadId, {
        include: [
          {
            model: User,
            as: "participants",
            attributes: ["id", "first_name", "last_name", "avatar"],
            through: { attributes: [] },
          },
        ],
      });

      // Get additional relations separately
      const [primaryUser, creator, client] = await Promise.all([
        User.findByPk(thread.primary_user_id, {
          attributes: ["id", "first_name", "last_name", "avatar"],
        }),
        User.findByPk(thread.created_by, {
          attributes: ["id", "first_name", "last_name", "avatar"],
        }),
        thread.client_id
          ? Client.findByPk(thread.client_id, {
              attributes: ["id", "first_name", "last_name"],
            })
          : null,
      ]);

      // Add the relations to the thread object
      updatedThread.dataValues.primaryUser = primaryUser;
      updatedThread.dataValues.creator = creator;
      updatedThread.dataValues.client = client;

      return resolve(updatedThread);
    } catch (error) {
      console.error("ThreadService [addParticipant] Error:", error);
      return reject(error);
    }
  });
