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



// ✅ Get all categories
export const allCategoriesQuery = groq`
  *[_type == "category"] | order(title asc) {
    _id,
    title,
    "slug": slug.current,
    // ✅ Fetch the latest blog post that belongs to this category
    "latestPostImage": *[_type == "post" && references(^._id)] | order(publishedAt desc)[0].mainImage.asset->url
  }
`;


// ✅ Get blogs by category slug
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


