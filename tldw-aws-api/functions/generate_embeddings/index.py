import os
import concurrent.futures
import openai
import json
import pinecone

def embed(text):
	return openai.Embedding.create(
			input=text,
			model="text-embedding-ada-002"
	)

def generateEmbeddings(event, context):

	with open("transcripts.json", "r") as f:
			json_string = f.read()

	data = json.loads(json_string)

	openai.api_key = os.environ["OPENAI_API_KEY"]
	pinecone.init(
		api_key = os.environ["PINECONE_API_KEY"],
		environment = os.environ["PINECONE_ENVIRONMENT"]
	)

	if 'block-embeddings' not in pinecone.list_indexes():
		pinecone.create_index('block-embeddings', dimension=1536)

	index = pinecone.Index('block-embeddings')

	executor = concurrent.futures.ThreadPoolExecutor(max_workers=data["num_blocks"])
	futures = []
	for vid in data["vid_info"]:
		for block in vid["blocks"]:
			futures.append(executor.submit(embed, block["text"]))

	results = {
		"embeddings": [future.result() for future in futures],
	}

	embeddings = []
	id = 0
	for result in results["embeddings"]:
		data = ("test-" + str(id), result["data"][0]["embedding"])
		embeddings.append(data)
		id += 1

	index.upsert(vectors=embeddings, namespace='svb-embeddings-namespace')

	# json_string = json.dumps(results)

	# with open("embeddings.json", "w") as f:
	# 	f.write(json_string)