const { SESClient, SendEmailCommand } = require("@aws-sdk/client-ses");

const ses = new SESClient({ region: process.env.AWS_REGION });

function getWelcomeEmailHtml({ first_name, tempPassword, loginUrl }) {
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

module.exports.sendWelcomeEmail = async (toEmail, { first_name, tempPassword, loginUrl }) => {
  const params = {
    Source: process.env.SES_FROM_EMAIL,
    Destination: { ToAddresses: [toEmail] },
    Message: {
      Subject: { Data: "Welcome to Our Platform" },
      Body: {
        Html: { Data: getWelcomeEmailHtml({ first_name, tempPassword, loginUrl }) },
      },
    },
  };
  await ses.send(new SendEmailCommand(params));
};
