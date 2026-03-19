// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure = (S) =>
  S.list()
    .title('Content')
    .items([
      // Blog
      S.documentTypeListItem('post').title('Posts'),
      S.documentTypeListItem('category').title('Categories'),
      S.documentTypeListItem('author').title('Authors'),
      S.divider(),
      // Stores & Coupons
      S.documentTypeListItem('store').title('Stores'),
      S.documentTypeListItem('coupon').title('Coupons'),
      S.divider(),
      // Everything else not explicitly listed above
      ...S.documentTypeListItems().filter(
        (item) =>
          item.getId() &&
          !['post', 'category', 'author', 'store', 'coupon'].includes(item.getId()),
      ),
    ])
