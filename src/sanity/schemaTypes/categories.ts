import { defineType, defineField } from "sanity";

export const categorySchema = defineType({
  name: "categories",
  title: "Categories",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Category Title",
      type: "string",
    }),
    defineField({
      name: "image",
      title: "Category Image",
      type: "image",
    }),
    defineField({
      name: "products",
      title: "Number of Products",
      type: "number",
    }),
  ],
});
