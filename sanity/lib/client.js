import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

// Safety guard: if env resolution failed for some reason, fall back to known project values
const FINAL_PROJECT_ID = projectId || 's622lsa2'
const FINAL_DATASET = dataset || 'production'

if (!projectId || !dataset) {
  console.warn('[sanity/lib/client] Missing SANITY projectId or dataset in env; using fallback values', {
    projectId: projectId,
    dataset: dataset,
  })
}

export const client = createClient({
  projectId: FINAL_PROJECT_ID,
  dataset: FINAL_DATASET,
  apiVersion,
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
})
