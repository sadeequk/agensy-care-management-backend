const AWS = require("aws-sdk");

const cognito = new AWS.CognitoIdentityServiceProvider({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const USER_POOL_ID = process.env.USER_POOL_ID;

module.exports.addUserToGroup = async (username, groupName) => {
  try {
    // Check if group exists
    const groups = await cognito
      .listGroups({
        UserPoolId: USER_POOL_ID,
      })
      .promise();

    const groupExists = groups.Groups.some((group) => group.GroupName === groupName);

    // Create group if it doesn't exist
    if (!groupExists) {
      await cognito
        .createGroup({
          UserPoolId: USER_POOL_ID,
          GroupName: groupName,
        })
        .promise();
    }

    // Add user to group
    await cognito
      .adminAddUserToGroup({
        UserPoolId: USER_POOL_ID,
        Username: username,
        GroupName: groupName,
      })
      .promise();

    return true;
  } catch (error) {
    console.error("CognitoService [addUserToGroup] Error:", error);
    throw error;
  }
};
