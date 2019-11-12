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
  s3: {
    REGION: "us-west-2",
    BUCKET: "cmpe-172-proj2-api-dev-cmpe172bucket-1webiq0g7633m"
  },
  apiGateway: {
    REGION: "us-west-2",
    URL: "https://yxixu3zwyj.execute-api.us-west-2.amazonaws.com/dev",
  },
  cognito: {
    REGION: "us-west-2",
    USER_POOL_ID: "us-west-2_Qxo5EYjR8",
    APP_CLIENT_ID: "7u8u3k53p18srgqvaibf2sfvss",
    IDENTITY_POOL_ID: "us-west-2:f3434436-e43c-43ee-9c2b-8541e967cddf"
  }
};

const prod = {
  s3: {
    REGION: "us-west-2",
    BUCKET: "cmpe-172-proj2-api-prod-cmpe172bucket-1iutvufkktsk0"
  },
  apiGateway: {
    REGION: "us-west-2",
    URL: "https://u7itb3clyk.execute-api.us-west-2.amazonaws.com/prod"
  },
  cognito: {
    REGION: "us-west-2",
    USER_POOL_ID: "us-west-2_gHJ5wFlgi",
    APP_CLIENT_ID: "6v0oi2rvrl0fpqebfr6p00rj03",
    IDENTITY_POOL_ID: "us-west-2:d8804d78-b5e4-4119-8bbb-012efffb8d2c"
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
