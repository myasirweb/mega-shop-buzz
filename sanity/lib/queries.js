import { groq } from "next-sanity";

export const allBlogsQuery = groq`
  *[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    "author": author->name,
    "category": categories[0]->title,
    "image": mainImage.asset->url,
    publishedAt,
    excerpt,
    body
  }
`;

export const singleBlogQuery = groq`
  *[_type == "post" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    "author": author->name,
    "category": categories[0]->title,
    "image": mainImage.asset->url,
    publishedAt,
    excerpt,
    body[]{
      ...,
      _type == "image" => {
        ...,
        "asset": asset->{
          _id,
          url
        }
      }
    }
  }
`;



//  Get all categories
export const allCategoriesQuery = groq`
  *[_type == "category"] | order(title asc) {
    _id,
    title,
    "slug": slug.current,
    //  Fetch the latest blog post that belongs to this category
    "latestPostImage": *[_type == "post" && references(^._id)] | order(publishedAt desc)[0].mainImage.asset->url
  }
`;


// Get blogs by category slug
export const blogsByCategoryQuery = groq`
  *[_type == "post" && references(*[_type == "category" && slug.current == $slug]._id)]
  | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    "author": author->name,
    "category": categories[0]->title,
    "image": mainImage.asset->url,
    publishedAt,
    excerpt
  }
`;

// Get all stores
export const allStoresQuery = groq`
  *[_type == "store"] | order(name asc) {
    _id,
    name,
    slug,
    logo,
    description,
    affiliateLink,
    featured,
    rating,
    "couponCount": count(*[_type == "coupon" && references(^._id)])
  }
`;

// Get single store with its coupons
export const storeBySlugQuery = groq`
  *[_type == "store" && slug.current == $slug][0] {
    _id,
    name,
    slug,
    logo,
    description,
    website,
    affiliateLink,
    rating,
    "coupons": *[_type == "coupon" && references(^._id)] | order(_createdAt desc) {
      _id, title, description, code, type, discount, usedCount, isVerified, expiryDate
    },
    "popularStores": *[_type == "store" && slug.current != $slug] | order(_createdAt desc) [0..5] {
      name, slug
    }
  }
`;


