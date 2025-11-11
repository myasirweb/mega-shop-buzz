export const apiVersion =
  process.env.SANITY_STUDIO_API_VERSION ||
  process.env.NEXT_PUBLIC_SANITY_API_VERSION ||
  '2025-10-20';

export const dataset =
  process.env.SANITY_STUDIO_DATASET ||
  process.env.NEXT_PUBLIC_SANITY_DATASET ||
  'production';

export const projectId =
  process.env.SANITY_STUDIO_PROJECT_ID ||
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ||
  's622lsa2';
   
// Provide clearer diagnostics so you can see where values are coming from
const source = {
  fromSANITY_STUDIO: !!process.env.SANITY_STUDIO_PROJECT_ID || !!process.env.SANITY_STUDIO_DATASET,
  fromNEXT_PUBLIC: !!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || !!process.env.NEXT_PUBLIC_SANITY_DATASET,
  usingFallback: projectId === 's622lsa2' || dataset === 'production',
};

console.log('Sanity Env Check:', { projectId, dataset, apiVersion, source });
