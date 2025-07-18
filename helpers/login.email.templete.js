require("dotenv").config();
const { SESClient, SendEmailCommand } = require("@aws-sdk/client-ses");
const ses = new SESClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_ACCESS_KEY_SECRET,
  },
});

const loginUrl = process.env.FRONTEND_URL;
const sourceEmail = `Agensy <${process.env.SES_EMAIL}>`;

function getLoginEmailHtml({ first_name, tempPassword, loginUrl }) {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee;">
      <h2 style="color: #333;">Welcome, ${first_name}!</h2>
      <p>Your account has been successfully created on <strong>Agensy Care Management System</strong>.</p>
      <p><strong>Login URL:</strong> <a href="${loginUrl}">${loginUrl}</a></p>
      <p><strong>Password:</strong> <code>${tempPassword}</code></p>
      <p>Please make sure to change your password after logging in for the first time.</p>
      <hr />
      <p style="font-size: 12px; color: #777;">If you did not request this account, please contact support immediately.</p>
    </div>
  `;
}

module.exports.sendLoginEmail = async (toEmail, { first_name, tempPassword }) => {
  try {
    const params = {
      Source: sourceEmail,
      Destination: { ToAddresses: [toEmail] },
      Message: {
        Subject: { Data: "Welcome to Agensy Care Management System" },
        Body: {
          Html: {
            Data: getLoginEmailHtml({ first_name, tempPassword, loginUrl }),
          },
        },
      },
    };

    await ses.send(new SendEmailCommand(params));
  } catch (error) {
    console.error("sendLoginEmail Error:", error);
    throw error;
  }
};
