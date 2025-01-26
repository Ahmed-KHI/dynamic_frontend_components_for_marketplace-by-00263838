import {client} from '../../sanity/lib/client';

export const fetchCategories = async () => {
  const query = `*[_type == "categories"]{
    title,
    "slug": slug.current
  }`;

  const categories = await client.fetch(query);
  return categories;
};