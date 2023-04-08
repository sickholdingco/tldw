"use strict";

import * as uuid from "uuid";

import { DynamoDB } from "aws-sdk";
import { type Handler } from "aws-lambda";
import { type PutItemInput } from "aws-sdk/clients/dynamodb";

const dynamoDb = new DynamoDB.DocumentClient();

interface Block {
  blockId: number;
  text: string;
}

interface TopicEvent {
  search_videos:
    | [
        {
          videoId: string;
          title: string;
          thumbnail: string;
          blocks: Block[];
        },
      ]
    | string;
}

export const create: Handler = (event: TopicEvent, context, callback) => {
  const timestamp = new Date().getTime();

  let data = event.search_videos;

  if (typeof data !== "string") {
    data = JSON.stringify(data);
  }

  const params = {
    TableName: process.env.TOPIC_INFO_TABLE,
    Item: {
      id: uuid.v4(),
      search_videos: data,
      createdAt: timestamp,
      updatedAt: timestamp,
    },
  } as PutItemInput;

  try {
    dynamoDb.put(params, (error) => {
      // handle potential errors
      if (error) {
        console.error(error);
        callback(new Error("Couldn't create the item."));
        return;
      }

      // create a response
      const response = {
        statusCode: 200,
        body: JSON.stringify(params.Item),
      };
      callback(null, response);
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};
