import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context) {
  const params = {
    TableName: process.env.tableName,
    ExpressionAttributeValues: {
        ":search": event.pathParameters.id
      },
    FilterExpression: "nodeId = :search",
      };

  try {
    const result = await dynamoDbLib.call("scan", params);
    if (result.Items) {
      return success(result.Items);
    } else {
      return failure({ status: false, error: "Item not found." });
    }
  } catch (e) {
    return failure({ status: false });
  }
}