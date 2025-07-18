require("dotenv").config();
const { User } = require("../models");

// const email = "bw8051116@gmail.com";
const email = "hinivo1852@besibali.com";

async function createSocketId() {
  try {
    const user = await User.findOne({ where: { email } });
    if (user.socket_id) {
      console.log("User already has a socket ID:", user.socket_id);
      return;
    }

    const socketId = `socket_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    await user.update({
      socket_id: socketId,
    });

    console.log("Successfully added socket ID:", {
      email: user.email,
      socket_id: socketId,
    });
  } catch (error) {
    console.error("Error adding socket ID:", error);
  }
}

createSocketId();
