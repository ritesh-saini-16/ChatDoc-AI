import { Pinecone } from "@pinecone-database/pinecone";

// Initialize Pinecone client
export const getPineconeClient = async () => {
  const client = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY,
  });
  return client;
};

// Get Pinecone index
export const getPineconeIndex = async () => {
  const client = await getPineconeClient();
  const indexName = process.env.PINECONE_INDEX_NAME;
  if (!indexName) {
    throw new Error("PINECONE_INDEX_NAME is not set in environment variables");
  }
  return client.Index(indexName);
};
