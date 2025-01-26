import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

// Create the Sanity client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  apiVersion: '2023-01-01',
  token: process.env.SANITY_API_TOKEN,
})

// Initialize Image URL Builder
const builder = imageUrlBuilder(client)

// Helper function to generate image URLs
export const urlFor = (source) => builder.image(source)

// Export the Sanity client
export default client