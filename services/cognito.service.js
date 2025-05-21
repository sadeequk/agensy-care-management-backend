const {
  CognitoIdentityProviderClient,
  ListGroupsCommand,
  CreateGroupCommand,
  AdminAddUserToGroupCommand,
} = require("@aws-sdk/client-cognito-identity-provider");

const cognito = new CognitoIdentityProviderClient({
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
    const groupsResult = await cognito.send(
      new ListGroupsCommand({
        UserPoolId: USER_POOL_ID,
      })
    );

    const groupExists = groupsResult.Groups.some((group) => group.GroupName === groupName);

    // Create group if it doesn't exist
    if (!groupExists) {
      await cognito.send(
        new CreateGroupCommand({
          UserPoolId: USER_POOL_ID,
          GroupName: groupName,
        })
      );
    }

    // Add user to group
    await cognito.send(
      new AdminAddUserToGroupCommand({
        UserPoolId: USER_POOL_ID,
        Username: username,
        GroupName: groupName,
      })
    );

    return true;
  } catch (error) {
    console.error("CognitoService [addUserToGroup] Error:", error);
    throw error;
  }
};
