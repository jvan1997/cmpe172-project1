// export default {
//     s3: {
//       REGION: "us-west-1",
//       BUCKET: "project1cmpe172"
//     },
//     apiGateway: {
//       REGION: "us-west-2",
//       URL: "https://hrtm2qdvjl.execute-api.us-west-2.amazonaws.com/prod"
//     },
//     cognito: {
//       REGION: "us-west-2",
//       USER_POOL_ID: "us-west-2_wzB9vQASc",
//       APP_CLIENT_ID: "54d8j17pp4mq9o2dq8m5p5c3mv",
//       IDENTITY_POOL_ID: "us-west-2:2da7820c-2676-4af6-95d9-53423dd5ec8a"
//     },
//     social:{
//       FB: "2628605577196325",
//     }
//   };
const dev = {
  STRIPE_KEY: "YOUR_STRIPE_DEV_PUBLIC_KEY",
  s3: {
    REGION: "YOUR_DEV_S3_UPLOADS_BUCKET_REGION",
    BUCKET: "YOUR_DEV_S3_UPLOADS_BUCKET_NAME"
  },
  apiGateway: {
    REGION: "YOUR_DEV_API_GATEWAY_REGION",
    URL: "YOUR_DEV_API_GATEWAY_URL"
  },
  cognito: {
    REGION: "YOUR_DEV_COGNITO_REGION",
    USER_POOL_ID: "YOUR_DEV_COGNITO_USER_POOL_ID",
    APP_CLIENT_ID: "YOUR_DEV_COGNITO_APP_CLIENT_ID",
    IDENTITY_POOL_ID: "YOUR_DEV_IDENTITY_POOL_ID"
  }
};

const prod = {
  STRIPE_KEY: "YOUR_STRIPE_PROD_PUBLIC_KEY",
  s3: {
    REGION: "YOUR_PROD_S3_UPLOADS_BUCKET_REGION",
    BUCKET: "YOUR_PROD_S3_UPLOADS_BUCKET_NAME"
  },
  apiGateway: {
    REGION: "YOUR_PROD_API_GATEWAY_REGION",
    URL: "YOUR_PROD_API_GATEWAY_URL"
  },
  cognito: {
    REGION: "YOUR_PROD_COGNITO_REGION",
    USER_POOL_ID: "YOUR_PROD_COGNITO_USER_POOL_ID",
    APP_CLIENT_ID: "YOUR_PROD_COGNITO_APP_CLIENT_ID",
    IDENTITY_POOL_ID: "YOUR_PROD_IDENTITY_POOL_ID"
  }
};

// Default to dev if not set
const config = process.env.REACT_APP_STAGE === 'prod'
  ? prod
  : dev;

export default {
  // Add common config values here
  MAX_ATTACHMENT_SIZE: 5000000,
  ...config
};