import { createClient } from "next-sanity";

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID, // your sanity project id
  dataset: "production", // or your dataset name
  apiVersion: "2025-01-01",
  useCdn: true, // `false` if you need the freshest data
});
