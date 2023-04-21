import os
import logging
import math
import json
import boto3
from youtube_transcript_api import YouTubeTranscriptApi
from googleapiclient.discovery import build

def generateTranscript(event, context):
	client = boto3.client('lambda')

	api_key = os.environ["YOUTUBE_API_KEY"]
	youtube = build('youtube','v3',developerKey = api_key)
	prompt = event['searchTerm']
	search_filters = {'videoCaption': 'closedCaption'}
	request = youtube.search().list(
		part="snippet",
		maxResults=3,
		type="video",
		videoCaption=search_filters['videoCaption'],
		q=prompt
	)	
	response = request.execute()
	items = response['items']
	search_videos = []
	num_blocks = 0
	block_id = 0

	for item in items:
		try:
			dict_list = YouTubeTranscriptApi.get_transcript(item['id']['videoId'])
			result = ""
			for d in dict_list:
				result += " " + d['text']

			n = math.ceil((len(result)/4) / 3600)
			num_blocks += n
			blocks = []
			part_length = len(result) // n
			for i in range(n):
				blocks.append({
					'blockId': block_id,
					'text': result[i * part_length : (i + 1) * part_length]
				})
				block_id = block_id + 1

			summaries_payload = {
				"blocks": blocks
			}
			summaries = client.invoke(
					FunctionName='tldw-node-api-dev-summarizeBlocks',
					InvocationType='RequestResponse',
					Payload=json.dumps(summaries_payload)
			)
			summaryResponses = json.loads(summaries['Payload'].read())
			if summaryResponses['statusCode'] == 200:
				search_videos.append({ 
					'videoId':  item['id']['videoId'],
					'title': item['snippet']['title'], 
					'thumbnail': item['snippet']['thumbnails']['high']['url'],
					'blocks': blocks,
					'summaries': summaryResponses['body']
				})
			else:
				return {
					"status": "error",
				}
		except Exception as e:
			logging.exception(e)
			return {
				"status": "error",
			}

	db_payload = {
		'search_videos': search_videos
	}

	# calling our db api to create an item
	db_response = client.invoke(
			FunctionName='tldw-db-api-dev-createTopicInfo',
			InvocationType='RequestResponse',
			Payload=json.dumps(db_payload)
	)

	response_payload = json.loads(db_response['Payload'].read())

	embeddings_payload = {
		"search_videos": search_videos,
		"num_blocks": num_blocks,
		"db_id": json.loads(response_payload["body"])["id"]
	}

	client.invoke(
			FunctionName='tldw-node-api-dev-generateEmbeddings',
		  InvocationType='Event',
			Payload=json.dumps(embeddings_payload)
	)

	transcript_data = {
		"status": "success",
		"db_id": json.loads(response_payload["body"])["id"],
		"search_videos": search_videos
	}

	return transcript_data