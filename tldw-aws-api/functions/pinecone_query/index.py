import os
import openai
import pinecone

def generatePinconeQuery(event, context):

	openai.api_key = os.environ["OPENAI_API_KEY"]
	pinecone.init(
		api_key = os.environ["PINECONE_API_KEY"],
		environment = os.environ["PINECONE_ENVIRONMENT"]
	)

	if 'block-embeddings' not in pinecone.list_indexes():
		pinecone.create_index('block-embeddings', dimension=1536)

	index = pinecone.Index('block-embeddings')

	response = openai.Embedding.create(
		input="Who is Greg Becker?",
		model="text-embedding-ada-002"
	)
	question_embeddings = response['data'][0]['embedding']

	query = index.query(vector=question_embeddings,top_k=1,namespace='svb-embeddings-namespace')
	print(query)