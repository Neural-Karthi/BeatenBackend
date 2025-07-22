# Database Seeding Scripts

This directory contains scripts for seeding the database with initial data.

## Available Scripts

### 1. seedProducts.js

Seeds the database with sample product data including variants with different sizes, colors, and prices.

**Features:**

- 8 different products across various categories (T-shirts, Shirts, Hoodies, Jackets, Cargo Pants)
- Multiple variants per product with different sizes (S, M, L, XL) and colors
- Realistic pricing and stock levels
- Proper SKU generation for each variant
- Product images and descriptions
- Ratings and review counts

**Product Categories Included:**

- T-shirts (Premium Street, Oversized Graphic, Classic Crew Neck)
- Shirts (Casual Linen, Formal Cotton)
- Hoodies (Premium Hoodie)
- Jackets (Denim Jacket)
- Bottom Wear (Cargo Pants)

## How to Run

### Prerequisites

1. Make sure MongoDB is running
2. Ensure your `.env` file has the correct `MONGODB_URI`
3. Install dependencies: `npm install`

### Running the Seed Script

```bash
# Navigate to backend directory
cd backend

# Run the seed products script
npm run seed-products
```

### What the Script Does

1. **Connects to MongoDB** using the connection string from your `.env` file
2. **Clears existing products** to avoid duplicates
3. **Inserts new products** with all their variants
4. **Displays a summary** of seeded products and their variant counts
5. **Exits cleanly** when complete

### Sample Output

```
Connected to MongoDB
Cleared existing products
Successfully seeded 8 products

Seeded Products Summary:
- Premium Street T-Shirt: 6 variants
- Oversized Graphic T-Shirt: 6 variants
- Classic Crew Neck T-Shirt: 9 variants
- Casual Linen Shirt: 6 variants
- Formal Cotton Shirt: 6 variants
- Premium Hoodie: 6 variants
- Denim Jacket: 6 variants
- Cargo Pants: 6 variants

Database seeding completed successfully!
```

## Product Schema

The seed data follows the Product schema defined in `models/Product.js`:

```javascript
{
  name: String (required),
  description: String,
  brand: String,
  categories: [String],
  tags: [String],
  mainImage: String,
  images: [String],
  variants: [{
    sku: String (required, unique),
    color: String,
    size: String,
    price: Number (required),
    stock: Number,
    images: [String]
  }],
  isActive: Boolean,
  isFeatured: Boolean,
  rating: Number,
  reviews: Number
}
```

## Customization

To add more products or modify existing ones:

1. Edit the `sampleProducts` array in `seedProducts.js`
2. Follow the schema structure
3. Ensure unique SKUs for each variant
4. Run the script again to update the database

## Notes

- The script will clear all existing products before seeding
- Each variant has a unique SKU following the pattern: `[PRODUCT-TYPE]-[VARIANT]-[COLOR]-[SIZE]`
- Stock levels are realistic and some products have zero stock to simulate out-of-stock scenarios
- Images reference the existing image files in the frontend/public/images directory
