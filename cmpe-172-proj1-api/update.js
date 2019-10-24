import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context) {
  const data = JSON.parse(event.body);
  console.log(data);
  const params = {
    TableName: process.env.tableName,
    Key: {
      userId: event.requestContext.identity.cognitoIdentityId,
      nodeId: event.pathParameters.id
    },
    UpdateExpression: "SET content = :content, attachment = :attachment, firstname = :firstname, lastname = :lastname, title = :title, updatedAt = :updatedAt",
    ExpressionAttributeValues: {
      ":attachment": data.file || null,
      ":content": data.content || null,
      ":firstname":data.firstname|| null,
      ":lastname":data.lastname||null,
      ":title":data.title||null,
      ":updatedAt":Date.now()||null
    },

    ReturnValues: "ALL_NEW"
  };

  try {
    await dynamoDbLib.call("update", params);
    return success({ status: true });
  } catch (e) {
    return failure({ status: false });
  }
}