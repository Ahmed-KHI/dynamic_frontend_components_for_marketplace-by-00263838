import { defineType, defineField } from "sanity";

export const productSchema = defineType({
  name: "products",
  title: "Products",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Product Title",
      type: "string",
    }),
    defineField({
      name: "price",
      title: "Price",
      type: "number",
    }),
    defineField({
      name: "priceWithoutDiscount",
      title: "Price without Discount",
      type: "number",
    }),
    defineField({
      name: "badge",
      title: "Badge",
      type: "string",
    }),
    defineField({
      name: "image",
      title: "Product Image",
      type: "image",
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "categories" }],
    }),
    defineField({
      name: "description",
      title: "Product Description",
      type: "text",
    }),
    defineField({
      name: "inventory",
      title: "Inventory Management",
      type: "number",
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Featured", value: "featured" },
          { title: "Follow products and discounts on Instagram", value: "instagram" },
          { title: "Gallery", value: "gallery" },
        ],
      },
    }),
  ],
});
