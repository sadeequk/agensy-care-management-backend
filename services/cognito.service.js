const {
  CognitoIdentityProviderClient,
  AdminAddUserToGroupCommand,
  AdminCreateGroupCommand,
  AdminListGroupsForUserCommand,
  ListGroupsCommand,
} = require("@aws-sdk/client-cognito-identity-provider");

const cognito = new CognitoIdentityProviderClient({
  region: process.env.AWS_REGION,
});

const USER_POOL_ID = process.env.USER_POOL_ID;

module.exports.addUserToGroup = async (username, groupName) => {
  try {
    const groups = await cognito.send(
      new ListGroupsCommand({
        UserPoolId: USER_POOL_ID,
      })
    );

    const groupExists = groups.Groups.some((group) => group.GroupName === groupName);

    if (!groupExists) {
      await cognito.send(
        new AdminCreateGroupCommand({
          UserPoolId: USER_POOL_ID,
          GroupName: groupName,
        })
      );
    }

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

module.exports.getUserGroups = async (username) => {
  try {
    const response = await cognito.send(
      new AdminListGroupsForUserCommand({
        UserPoolId: USER_POOL_ID,
        Username: username,
      })
    );
    return response.Groups.map((group) => group.GroupName);
  } catch (error) {
    console.error("CognitoService [getUserGroups] Error:", error);
    throw error;
  }
};
