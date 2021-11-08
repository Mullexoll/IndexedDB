import axios from "axios";
import * as AWS from "aws-sdk";
var AmazonCognitoIdentity = require("amazon-cognito-identity-js");
require("cross-fetch/polyfill");

var authenticationData = {
   Username: "mik@wmt.dk",
   Password: "123123q",
};
var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(
   authenticationData
);
var poolData = {
   UserPoolId: "us-east-1_hpSQzqDya", // Your user pool id here
   ClientId: "67b53vmhf7har3bvbstcbthigf", // Your client id here
};
var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
var userData = {
   Username: "mik@wmt.dk",
   Pool: userPool,
};
var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
cognitoUser.authenticateUser(authenticationDetails, {
   onSuccess: function (result) {
      var accessToken = result.getAccessToken().getJwtToken();
      console.log(accessToken);

      //POTENTIAL: Region needs to be set if not already set previously elsewhere.
      AWS.config.region = "us-east-1";

      AWS.config.credentials = new AWS.CognitoIdentityCredentials({
         IdentityPoolId: "", // your identity pool id here
         Logins: {
            // Change the key below according to the specific region your user pool is in.
            "cognito-idp.us-east-1.amazonaws.com/us-east-1_hpSQzqDya": result
               .getIdToken()
               .getJwtToken(),
         },
      });
   },

   onFailure: function (err) {
      alert(err.message || JSON.stringify(err));
   },
});

const token =
   "eyJraWQiOiIwVk9BSnM0dXY2cGJDalFsUjdiTUc1aWNoUG51M1J1STlWN2ZwNlk2M1pNPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiIxZTY1OGJjZi1lYTZiLTQ4MzktYWY3Yy1lNDI2NWYwNzMyY2YiLCJldmVudF9pZCI6ImEzNGEyMTE4LWVlYjQtNDg2MS04M2VhLWE1MzY5MGRlN2UyNSIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE2MzYzNjA1OTgsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC51cy1lYXN0LTEuYW1hem9uYXdzLmNvbVwvdXMtZWFzdC0xX2hwU1F6cUR5YSIsImV4cCI6MTYzNjM3Nzg5NywiaWF0IjoxNjM2Mzc0Mjk3LCJqdGkiOiI4MWY4OTc0Yy1kOWFhLTQzMGYtOTcyNC1lYWJhNDNkOGE5NDMiLCJjbGllbnRfaWQiOiI2N2I1M3ZtaGY3aGFyM2J2YnN0Y2J0aGlnZiIsInVzZXJuYW1lIjoiMWU2NThiY2YtZWE2Yi00ODM5LWFmN2MtZTQyNjVmMDczMmNmIn0.UOaEvkk3thyI8NXHVD7Y-ajeIS9YbFfT_DMGgYO1ObA1jtU0mNbSL3JNpW3iNiKSoDkjSp-Lb3yo9q6wk2lTEPXS9VNJhB-F85ZIkKwBpsz7tzrhjhzUnwmLVH6ARGkMWUOq1q5BN4usawjUyLa801qaz3qZ3Eqe1YNWDaA5CvkpGKi4k3TqmqyAsDhGJXUQAgStQaYb2YrC6N_MCbwrkdZxow_qrMBx23WM_LYnC36HZKiHW4MSqRU_9GPqY325ZSXlFZehpKmRBH2Ae6oaJ_4_hl8IZocFXAtoIeI8k-xLK-CeFs15L2CrS_TgcO_hVtbIqX8DmN19Z5hzIy8m1g";

const instance = axios.create({
   withCredentials: false,
   "Access-Control-Allow-Origin": "http://localhost:3000",
   origin: "http://localhost:3000",
   baseURL: "https://dev.prezentor.com/api/",
   headers: {
      Authorization: "Bearer " + token,
   },
});

export const usersAPI = {
   async getUsers() {
      return instance.get(`reports/meetings`);
   },
};

// aws cognito-idp admin-initiate-auth --user-pool-id us-east-1_hpSQzqDya --client-id 67b53vmhf7har3bvbstcbthigf --auth-flow ADMIN_NO_SRP_AUTH --auth-parameters USERNAME=mik@wmt.dk,PASSWORD=123123q
