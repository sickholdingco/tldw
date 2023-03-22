import os
import math
import json
from uuid import uuid4
import boto3
from youtube_transcript_api import YouTubeTranscriptApi
from googleapiclient.discovery import build

def generateTranscript(event, context):
	client = boto3.client('lambda')

	TOPIC_INFO_TABLE = os.environ['TOPIC_INFO_TABLE']
	dbClient = boto3.client('dynamodb')

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
	for item in items:
		search_videos.append({ 
			'id':  item['id']['videoId'],
			'title': item['snippet']['title'], 
			'thumbnail': item['snippet']['thumbnails']['high']['url']
		})

		num_blocks = 0
		block_id = 0
		for vid in search_videos:
			try:
				dict_list = YouTubeTranscriptApi.get_transcript(vid['id'])
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

				vid['blocks'] = blocks
			except:
				vid['blocks'] = []
				print('this video does not have transcription!')

	dbClient.put_item(
		TableName=TOPIC_INFO_TABLE,
		Item={
				'id': {
					'S': str(uuid4())
				},
				'search_videos': {
					'S': json.dumps(search_videos)
				}
		}
	)

	payload = {
		"search_videos": search_videos,
		"num_blocks": num_blocks
	}
	# response = client.invoke(
	# 		FunctionName='embeddings',
	# 		Payload=json.dumps(payload)
	# )

	return search_videos