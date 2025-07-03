const { Thread, User, Client, Message } = require("../models");
const { Op } = require("sequelize");
const { THREAD_TYPES } = require("../constants");

exports.createThread = (data, primaryUserId, createdBy) => {
  return new Promise(async (resolve, reject) => {
    try {
      // ^ Will change the logic when we shifted to groups
      const existingThread = await Thread.findOne({
        include: [
          {
            model: User,
            as: "participants",
            through: { attributes: [] },
            where: {
              [Op.or]: [{ id: createdBy }, { id: data.participant_id }],
            },
          },
        ],
        where: {
          type: data.type,
          sub_type: data.sub_type,
        },
      });

      if (existingThread) {
        const participants = await existingThread.getParticipants();
        const participantIds = participants.map((p) => p.id);

        if (participantIds.includes(createdBy) && participantIds.includes(data.participant_id)) {
          return resolve(existingThread);
        }
      }

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
            attributes: ["id", "first_name", "last_name", "role", "avatar"],
          },
          {
            model: User,
            as: "primaryUser",
            attributes: ["id", "first_name", "last_name", "role", "avatar"],
          },
          {
            model: User,
            as: "creator",
            attributes: ["id", "first_name", "last_name", "role", "avatar"],
          },
          {
            model: Client,
            as: "client",
            attributes: ["id", "first_name", "last_name"],
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
      const userThreads = await Thread.findAll({
        include: [
          {
            model: User,
            as: "participants",
            attributes: ["id"],
            through: { attributes: [] },
            required: true,
            where: { id: userId },
          },
        ],
        attributes: ["id"],
      });

      const threadIds = userThreads.map((thread) => thread.id);

      const threads = await Thread.findAll({
        where: {
          id: {
            [Op.in]: threadIds,
          },
        },
        include: [
          {
            model: User,
            as: "participants",
            attributes: ["id", "first_name", "last_name", "role", "avatar"],
            through: { attributes: [] },
          },
          {
            model: User,
            as: "creator",
            attributes: ["id", "first_name", "last_name", "role", "avatar"],
          },
          {
            model: User,
            as: "primaryUser",
            attributes: ["id", "first_name", "last_name", "role", "avatar"],
          },
          {
            model: Client,
            as: "client",
            attributes: ["id", "first_name", "last_name"],
          },
          //^Keeping the messages in response coz  frontend need it
          {
            model: Message,
            as: "messages",
            include: [
              {
                model: User,
                as: "sender",
                attributes: ["id", "first_name", "last_name", "role", "avatar"],
              },
            ],
            order: [["createdAt", "DESC"]],
            limit: 50,
          },
        ],
        order: [["last_message_time", "DESC"]],
      });

      resolve(threads);
    } catch (error) {
      reject(error);
    }
  });
};

//^ it doesnot work (doesnot extract all the participants)
// exports.getUserThreads = (userId) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       const threads = await Thread.findAll({
//         include: [
//           {
//             model: User,
//             as: "participants",
//             attributes: ["id", "first_name", "last_name", "role", "avatar"],
//             through: { attributes: [] },
//             required: true,
//             where: { id: userId },
//           },
//           {
//             model: User,
//             as: "creator",
//             attributes: ["id", "first_name", "last_name", "role", "avatar"],
//           },
//           {
//             model: User,
//             as: "primaryUser",
//             attributes: ["id", "first_name", "last_name", "role", "avatar"],
//           },
//           {
//             model: Client,
//             as: "client",
//             attributes: ["id", "first_name", "last_name"],
//           },

//           //^Keeping the messages in response coz  frontend need it
//           {
//             model: Message,
//             as: "messages",
//             include: [
//               {
//                 model: User,
//                 as: "sender",
//                 attributes: ["id", "first_name", "last_name", "role", "avatar"],
//               },
//             ],
//             order: [["createdAt", "DESC"]],
//             limit: 50,
//           },
//         ],
//         order: [["last_message_time", "DESC"]],
//       });

//       resolve(threads);
//     } catch (error) {
//       reject(error);
//     }
//   });
// };

exports.getThreadById = (threadId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const thread = await Thread.findByPk(threadId, {
        include: [
          {
            model: User,
            as: "participants",
            attributes: ["id", "first_name", "last_name", "role", "avatar"],
            through: { attributes: [] },
          },
          {
            model: User,
            as: "creator",
            attributes: ["id", "first_name", "last_name", "role", "avatar"],
          },
          {
            model: User,
            as: "primaryUser",
            attributes: ["id", "first_name", "last_name", "role", "avatar"],
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
                attributes: ["id", "first_name", "last_name", "role", "avatar"],
              },
            ],
            order: [["createdAt ", "DESC"]],
          },
        ],
      });
      resolve(thread);
    } catch (error) {
      reject(error);
    }
  });
};
