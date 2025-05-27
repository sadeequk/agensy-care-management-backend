const {
  CognitoIdentityProviderClient,
  ListGroupsCommand,
  CreateGroupCommand,
  AdminAddUserToGroupCommand,
  AdminCreateUserCommand,
  AdminSetUserPasswordCommand,
  AdminDeleteUserCommand,
} = require("@aws-sdk/client-cognito-identity-provider");

const cognito = new CognitoIdentityProviderClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_ACCESS_KEY_SECRET,
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

module.exports.createCognitoUser = async ({ email, first_name, last_name, email_verified }) => {
  try {
    const params = {
      UserPoolId: USER_POOL_ID,
      Username: email,
      UserAttributes: [
        { Name: "email", Value: email },
        { Name: "given_name", Value: first_name },
        { Name: "family_name", Value: last_name },
      ],
      MessageAction: "SUPPRESS", // We'll send our own email
    };
    if (email_verified !== undefined) {
      params.UserAttributes.push({ Name: "email_verified", Value: email_verified ? "true" : "false" });
    }
    const result = await cognito.send(new AdminCreateUserCommand(params));
    return result.User || result;
  } catch (error) {
    console.error("CognitoService [createCognitoUser] Error:", error);
    throw error;
  }
};

module.exports.setPermanentPassword = async ({ email, password }) => {
  try {
    const params = {
      UserPoolId: USER_POOL_ID,
      Username: email,
      Password: password,
      Permanent: true,
    };
    await cognito.send(new AdminSetUserPasswordCommand(params));
    return true;
  } catch (error) {
    console.error("CognitoService [setPermanentPassword] Error:", error);
    throw error;
  }
};

module.exports.deleteCognitoUser = async (email) => {
  try {
    await cognito.send(
      new AdminDeleteUserCommand({
        UserPoolId: USER_POOL_ID,
        Username: email,
      })
    );
    return true;
  } catch (error) {
    console.error("CognitoService [deleteCognitoUser] Error:", error);
    throw error;
  }
};
