const { SESClient, SendEmailCommand } = require("@aws-sdk/client-ses");

const ses = new SESClient({ region: process.env.AWS_REGION });
const loginUrl = process.env.LOGIN_URL;
const sourceEmail = process.env.SES_EMAIL;

function getLoginEmailHtml({ first_name, tempPassword, loginUrl }) {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1>Welcome, ${first_name}!</h1>
      <p>Your account has been created.</p>
      <p><strong>Login URL:</strong> <a href="${loginUrl}">${loginUrl}</a></p>
      <p><strong>Temporary Password:</strong> ${tempPassword}</p>
      <p>Please change your password upon first login.</p>
    </div>
  `;
}

module.exports.sendLoginEmail = async (toEmail, { first_name, tempPassword }) => {
  const params = {
    Source: sourceEmail,
    Destination: { ToAddresses: [toEmail] },
    Message: {
      Subject: { Data: "Welcome to Agensy Care Management System" },
      Body: {
        Html: { Data: getLoginEmailHtml({ first_name, tempPassword, loginUrl }) },
      },
    },
  };
  await ses.send(new SendEmailCommand(params));
};
