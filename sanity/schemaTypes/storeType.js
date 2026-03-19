export const storeType = {
  name: 'store',
  title: 'Store',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Store Name',
      type: 'string',
      validation: R => R.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name' },
      validation: R => R.required(),
    },
    {
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'description',
      title: 'Description (About section)',
      type: 'text',
    },
    {
      name: 'website',
      title: 'Store Website',
      type: 'url',
    },
    {
      name: 'affiliateLink',
      title: 'Affiliate / Tracking Link',
      type: 'url',
    },
    {
      name: 'rating',
      title: 'Rating (1–5)',
      type: 'number',
      initialValue: 5,
      validation: R => R.min(1).max(5),
    },
    {
      name: 'featured',
      title: 'Featured?',
      type: 'boolean',
      initialValue: false,
    },
  ],
}
