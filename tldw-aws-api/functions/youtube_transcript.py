import os
import math
import json
import boto3
from youtube_transcript_api import YouTubeTranscriptApi
from googleapiclient.discovery import build

def generateTranscript(event, context):
	client = boto3.client('lambda')
	dynamodb = boto3.resource('dynamodb')
	table = dynamodb.Table('topic_info')

	api_key = os.environ["YOUTUBE_API_KEY"]
	youtube = build('youtube','v3',developerKey = api_key)
	prompt = event['searchTerm']
	request = youtube.search().list(
		part="snippet",
		maxResults=3,
		type="video",
		q=prompt
	)	
	response = request.execute()
	items = response['items']
	vid_info = []
	for item in items:
		vid_info.append({ 
			'id':  item['id']['videoId'],
			'title': item['snippet']['title'], 
			'thumbnail': item['snippet']['thumbnails']['high']['url']
		}) 
	num_blocks = 0
	block_id = 0
	for vid in vid_info:
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
	payload = {
	    'key1': 'value1'
	}
	response = client.invoke(
	    FunctionName='embeddings',
	    Payload=json.dumps(payload)
	)
  # unused, can we remove this @tyler?
	response_payload = json.loads(response['Payload'].read().decode('utf-8'))

	response = table.put_item(Item=vid_info)

	return vid_info