import os
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
	for item in items:
		search_videos.append({ 
			'videoId':  item['id']['videoId'],
			'title': item['snippet']['title'], 
			'thumbnail': item['snippet']['thumbnails']['high']['url']
		})

		num_blocks = 0
		block_id = 0
		for vid in search_videos:
			try:
				dict_list = YouTubeTranscriptApi.get_transcript(vid['videoId'])
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

	response = client.invoke(
			FunctionName='tldw-aws-api-dev-generate_embeddings',
			InvocationType='Event',
			Payload=json.dumps(embeddings_payload)
	)

	return search_videos