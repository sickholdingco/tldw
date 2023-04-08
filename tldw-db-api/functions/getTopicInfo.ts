"use strict";

import { type Handler } from "aws-lambda";
import { DynamoDB } from "aws-sdk";
import { type GetItemInput } from "aws-sdk/clients/dynamodb";

const dynamoDb = new DynamoDB.DocumentClient();

interface GetTopicInfoEvent {
  pathParameters: {
    id: string;
  };
}

export const get: Handler = (event: GetTopicInfoEvent, context, callback) => {
  const params = {
    TableName: process.env.TOPIC_INFO_TABLE,
    Key: {
      id: event.pathParameters.id,
    },
  } as GetItemInput;

  // fetch item from the database
  dynamoDb.get(params, (error, result) => {
    // handle potential errors
    if (error) {
      console.error(error);
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: { "Content-Type": "text/plain" },
        body: "Couldn't fetch the item.",
      });
      return;
    }

    // create a response
    const response = {
      statusCode: 200,
      body: JSON.stringify(result.Item),
    };
    callback(null, response);
  });
};
