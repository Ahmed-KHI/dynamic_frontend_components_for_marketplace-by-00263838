// cartTypes.ts
export interface CartItem {
    id: string; // Unique identifier for the product
    title: string; // Name of the product
    description: string; // Short description of the product
    price: number; // Price per unit of the product
    image: string; // URL of the product image
    quantity: number; // Quantity of the product in the cart
  }
  