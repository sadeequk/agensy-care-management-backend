const socketio = require("socket.io");
const { authenticateSocket } = require("../middlewares/socket.mw");
const { User, Thread, Message } = require("../models");

let io;

module.exports.configureSockets = (server) => {
  io = socketio(server, {
    cors: {
      origin: "*",
      allowedHeaders: ["authorization"],
    },
  });

  io.use(authenticateSocket);

  io.on("connection", async (client) => {
    // console.log(`" ${client.user.email}" Connected , SocketId: ${client.id})`);

    try {
      const user = await User.findByPk(client.user.id);
      if (user) {
        await user.update({ socket_id: client.id });
        // console.log(`"${user.email} "Socket Id Updated `);
      }
    } catch (err) {
      console.error("[ERROR] Failed to update socket_id:", err);
    }

    client.on("sendMessage", async (data) => {
      const { threadId, content } = data;
      // console.log(`[SEND MESSAGE] by ${client.user.email} to thread  ====>: ${threadId}`);

      if (!threadId || !content) {
        return client.emit("error", { error: "threadId and content are required." });
      }

      try {
        const thread = await Thread.findByPk(threadId, {
          include: [
            {
              model: User,
              as: "participants",
              where: { id: client.user.id },
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
              order: [["createdAt", "DESC"]],
              limit: 1,
            },
          ],
        });

        if (!thread) {
          // console.log(`[ERROR] Thread not found or unauthorized`);
          return client.emit("error", { error: "Thread not found or user not authorized" });
        }

        const message = await Message.create({
          thread_id: threadId,
          sender_id: client.user.id,
          content,
        });

        await thread.update({
          last_message: content,
          last_message_time: message.createdAt,
          last_message_sender_id: client.user.id,
        });

        const participants = await thread.getParticipants();
        const messageData = {
          threadId: thread.id,
          message: {
            ...message.toJSON(),
            sender: {
              id: client.user.id,
              first_name: client.user.first_name,
              last_name: client.user.last_name,
              avatar: client.user.avatar,
            },
            thread: {
              id: thread.id,
              type: thread.type,
              sub_type: thread.sub_type,
              creator: thread.creator,
            },
          },
        };

        // console.log(`${participants.length} participants`);
        participants.forEach((participant) => {
          if (participant.socket_id && participant.id !== client.user.id) {
            console.log(`Sending to ${participant.email} [${participant.socket_id}]`);
            io.to(participant.socket_id).emit("receiveMessage", messageData);
          }
        });

        client.emit("messageSent", messageData);
      } catch (error) {
        // console.error("[ERROR] sendMessage:", error);
        client.emit("error", { error: "Failed to send message." });
      }
    });

    client.on("disconnect", async () => {
      // console.log(`[DISCONNECT] ${client.user.email} (${client.id})`);
      try {
        const user = await User.findByPk(client.user.id);
        if (user) {
          await user.update({ socket_id: null });
          // console.log(`[SOCKET CLEARED] for ${user.email}`);
        }
      } catch (error) {
        console.error("[ERROR] clearing socket_id:", error);
      }
    });
  });
};
