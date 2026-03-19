export const couponType = {
  name: 'coupon',
  title: 'Coupon',
  type: 'document',
  fields: [
    {
      name: 'store',
      title: 'Store',
      type: 'reference',
      to: [{ type: 'store' }],
      validation: R => R.required(),
    },
    {
      name: 'title',
      title: 'Coupon Title',
      type: 'string',
      description: 'e.g. "20% Off Sitewide"',
      validation: R => R.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'string',
      description: 'e.g. "Get 20% Off Sitewide"',
    },
    {
      name: 'code',
      title: 'Coupon Code',
      type: 'string',
      description: 'e.g. "SAVE20". Leave empty for Deal type (no code).',
    },
    {
      name: 'type',
      title: 'Type',
      type: 'string',
      options: {
        list: [
          { title: 'Code', value: 'Code' },
          { title: 'Deal', value: 'Deal' },
        ],
        layout: 'radio',
      },
      initialValue: 'Code',
    },
    {
      name: 'discount',
      title: 'Discount Badge',
      type: 'string',
      description: 'e.g. "20% OFF" — shown as badge on the coupon card',
    },
    {
      name: 'usedCount',
      title: 'Used Count',
      type: 'number',
      description: 'How many people have used this coupon',
      initialValue: 0,
    },
    {
      name: 'isVerified',
      title: 'Verified?',
      type: 'boolean',
      initialValue: true,
    },
    {
      name: 'expiryDate',
      title: 'Expiry Date',
      type: 'date',
    },
  ],
}
