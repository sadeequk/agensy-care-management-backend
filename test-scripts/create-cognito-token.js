require("dotenv").config();
const {
  CognitoIdentityProviderClient,
  InitiateAuthCommand,
  AdminInitiateAuthCommand,
  RespondToAuthChallengeCommand,
} = require("@aws-sdk/client-cognito-identity-provider");

const cognito = new CognitoIdentityProviderClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_ACCESS_KEY_SECRET,
  },
});

const USER_POOL_ID = process.env.USER_POOL_ID;
const CLIENT_ID = process.env.COGNITO_CLIENT_ID;


const testUser = {
  email: "bw8051116@gmail.com",
  password: "Abc12345678$$$",
};

async function createCognitoToken() {
  try {
    console.log("Attempting to authenticate user:", testUser.email);

    let authResult;
    
    // Try USER_PASSWORD_AUTH first
    try {
      const authParams = {
        AuthFlow: "USER_PASSWORD_AUTH",
        ClientId: CLIENT_ID,
        AuthParameters: {
          USERNAME: testUser.email,
          PASSWORD: testUser.password,
        },
      };

      authResult = await cognito.send(new InitiateAuthCommand(authParams));
      console.log("Authentication initiated successfully with USER_PASSWORD_AUTH");
    } catch (error) {
      if (error.name === "NotAuthorizedException" && error.message.includes("Auth flow not enabled")) {
        console.log("USER_PASSWORD_AUTH not enabled, trying ADMIN_NO_SRP_AUTH...");
        
        const adminAuthParams = {
          AuthFlow: "ADMIN_NO_SRP_AUTH",
          ClientId: CLIENT_ID,
          UserPoolId: USER_POOL_ID,
          AuthParameters: {
            USERNAME: testUser.email,
            PASSWORD: testUser.password,
          },
        };

        authResult = await cognito.send(new AdminInitiateAuthCommand(adminAuthParams));
        console.log("Authentication initiated successfully with ADMIN_NO_SRP_AUTH");
      } else {
        throw error;
      }
    }

    if (authResult.ChallengeName) {
      console.log("Challenge received:", authResult.ChallengeName);
      
      if (authResult.ChallengeName === "NEW_PASSWORD_REQUIRED") {
        const challengeParams = {
          ChallengeName: "NEW_PASSWORD_REQUIRED",
          ClientId: CLIENT_ID,
          ChallengeResponses: {
            USERNAME: testUser.email,
            NEW_PASSWORD: testUser.password,
          },
          Session: authResult.Session,
        };

        const challengeResult = await cognito.send(new RespondToAuthChallengeCommand(challengeParams));
        console.log("Password challenge completed");
        
        if (challengeResult.AuthenticationResult) {
          console.log("Token generated successfully!");
          console.log("Access Token:", challengeResult.AuthenticationResult.AccessToken);
          console.log("ID Token:", challengeResult.AuthenticationResult.IdToken);
          console.log("Refresh Token:", challengeResult.AuthenticationResult.RefreshToken);
          return challengeResult.AuthenticationResult;
        }
      }
    } else if (authResult.AuthenticationResult) {
      console.log("Token generated successfully!");
      console.log("Access Token:", authResult.AuthenticationResult.AccessToken);
      console.log("ID Token:", authResult.AuthenticationResult.IdToken);
      console.log("Refresh Token:", authResult.AuthenticationResult.RefreshToken);
      return authResult.AuthenticationResult;
    }

    console.log("Failed to generate token");
    return null;

  } catch (error) {
    console.error("Error creating Cognito token:", error.message);
    
    if (error.name === "NotAuthorizedException") {
      if (error.message.includes("Auth flow not enabled")) {
        console.log("Tip: Enable one of these auth flows in your Cognito User Pool Client settings");
      } else {
        console.log(" Tip: Check if the user exists and password is correct");
      }
    } else if (error.name === "UserNotConfirmedException") {
      console.log("Tip: User needs to be confirmed first");
    } else if (error.name === "UserNotFoundException") {
      console.log(" Tip: User does not exist in Cognito");
    } else if (error.name === "InvalidParameterException") {
      console.log(" Tip: Check your USER_POOL_ID and CLIENT_ID configuration");
    }
    
    throw error;
  }
}

function decodeToken(token) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
}

async function main() {
  try {
    console.log("Starting Cognito token generation...");
    console.log("User Pool ID:", USER_POOL_ID);
    console.log("Client ID:", CLIENT_ID);
    console.log("Region:", process.env.AWS_REGION);
    console.log("---");

    const tokens = await createCognitoToken();
    
    if (tokens) {
      console.log("\nToken Details:");
      console.log("Access Token Length:", tokens.AccessToken?.length || 0);
      console.log("ID Token Length:", tokens.IdToken?.length || 0);
      console.log("Refresh Token Length:", tokens.RefreshToken?.length || 0);
      
      if (tokens.IdToken) {
        const decoded = decodeToken(tokens.IdToken);
        if (decoded) {
          console.log("\n🔍 ID Token Payload:");
          console.log("Email:", decoded.email);
          console.log("Sub:", decoded.sub);
          console.log("Issued At:", new Date(decoded.iat * 1000));
          console.log("Expires At:", new Date(decoded.exp * 1000));
        }
      }
    }

  } catch (error) {
    console.error("Script failed:", error.message);
    process.exit(1);
  }
}

main(); 