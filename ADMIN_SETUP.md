# NeevKart Admin Dashboard

A comprehensive admin panel for managing your NeevKart e-commerce store. Admins can manage products, orders, and website settings.

## Features

- **Admin Authentication**: Secure login with email and password
- **Product Management**: 
  - Add, edit, and delete products
  - Upload and manage product images
  - Set prices and inventory
  - Organize products by category
  
- **Order Management**:
  - View all orders
  - Track order status (pending, processing, shipped, completed, cancelled)
  - Update payment status
  - View customer details and order items
  
- **Website Settings**:
  - Update footer address and contact information
  - Manage social media links
  - Configure payment methods
  
- **Dashboard**: Quick overview of products, orders, and revenue

## Setup Instructions

### Backend Setup

1. **Install dependencies**:
   ```bash
   cd neevkart-backend
   npm install
   ```

2. **Set up environment variables**:
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add:
   - `MONGODB_URI`: Your MongoDB connection string
   - `JWT_SECRET`: A secure secret for JWT tokens
   - `CLERK_SECRET_KEY`: Your Clerk Secret Key (starts with `sk_live_` or `sk_test_`)
   - `RAZORPAY_KEY_ID` & `RAZORPAY_KEY_SECRET`: Your Razorpay credentials (if using Razorpay)

3. **Create admin user** (run this once):
   ```bash
   node scripts/createAdmin.js
   ```
   
   This will prompt you to enter admin details.

4. **Start the backend**:
   ```bash
   npm run dev
   ```
   
   Backend will run on `http://localhost:5000`

### Frontend Setup

1. **Install dependencies**:
   ```bash
   cd neevkart-frontend
   npm install
   ```

2. **Set up environment variables**:
   ```bash
   cp .env.local.example .env.local
   ```
   
   Edit `.env.local` if needed. Default API URL: `http://localhost:5000`

3. **Start the frontend**:
   ```bash
   npm run dev
   ```
   
   Frontend will run on `http://localhost:3000`

## Accessing the Admin Panel

1. Navigate to `http://localhost:3000/admin/login`
2. Login with your admin credentials
3. You'll be redirected to the dashboard

## API Endpoints

### Admin Routes
- `POST /api/admin/login` - Admin login
- `POST /api/admin/register` - Register new admin

### Products
- `GET /api/admin/products` - Get all products
- `POST /api/admin/products` - Create product
- `PUT /api/admin/products/:id` - Update product
- `DELETE /api/admin/products/:id` - Delete product

### Orders
- `GET /api/admin/orders` - Get all orders
- `GET /api/admin/orders/:id` - Get single order
- `PATCH /api/admin/orders/:id` - Update order status
- `PATCH /api/admin/orders/:id/payment` - Update payment status

### Settings
- `GET /api/admin/settings` - Get all settings
- `PUT /api/admin/settings` - Update settings

## Creating an Admin User

To create an admin user that the backend can recognize, you need to:

1.  **Create a user in Clerk**: Go to your Clerk Dashboard and create a new user. This will be your admin user.
2.  **Get the Clerk User ID**: Once the user is created in Clerk, find their User ID. It typically starts with `user_`.
3.  **Run the following script** (replace `YOUR_CLERK_USER_ID`, `ADMIN_NAME`, and `ADMIN_EMAIL` with the actual values):

```bash
cd neevkart-backend
node -e "
const mongoose = require('mongoose');
require('dotenv').config();

const Admin = require('./models/Admin');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/neevkart').then(async () => {
  const clerkUserId = 'user_3E1HSmCeZnOGPBD80IjeEdfbtca'; // Replace with the actual Clerk User ID
  const name = 'ADMIN_NAME'; // Replace with the admin's name
  const email = 'ADMIN_EMAIL'; // Replace with the admin's email

  const admin = new Admin({ clerkUserId, name, email });
  await admin.save();
  console.log('Admin created:', email, 'with Clerk User ID:', clerkUserId);
  process.exit(0);
}).catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
"
```
This script will create an entry in your MongoDB `Admin` collection with the specified `clerkUserId`, name, and email. This is essential for the backend's `/api/admin/check-role` endpoint to correctly identify the user as an administrator.

## File Structure

```
neevkart-frontend/app/admin/
├── layout.tsx                 # Admin layout wrapper
├── login/
│   ├── page.tsx              # Login page
│   └── login.css             # Login styles
├── dashboard/
│   ├── page.tsx              # Dashboard home
│   └── dashboard.css         # Dashboard styles
├── products/
│   ├── page.tsx              # Products management
│   └── products.css          # Products styles
├── orders/
│   ├── page.tsx              # Orders management
│   └── orders.css            # Orders styles
├── settings/
│   ├── page.tsx              # Settings page
│   └── settings.css          # Settings styles
├── components/
│   ├── Sidebar.tsx           # Navigation sidebar
│   ├── Header.tsx            # Header component
│   ├── sidebar.css           # Sidebar styles
│   └── header.css            # Header styles
└── admin.css                 # Common styles

neevkart-backend/
├── models/
│   ├── Admin.js             # Admin schema
│   ├── Product.js           # Product schema
│   ├── Order.js             # Order schema
│   └── Settings.js          # Settings schema
├── routes/
│   ├── admin.js             # Admin auth routes
│   ├── products.js          # Product CRUD routes
│   ├── orders.js            # Order management routes
│   └── settings.js          # Settings routes
├── middleware/
│   └── adminAuth.js         # JWT authentication middleware
└── server.js                # Main server file
```

## Usage Guide

### Adding a Product

1. Go to **Products** in the sidebar
2. Click **"+ Add New Product"**
3. Fill in the form:
   - Product name
   - Price in rupees
   - Category (Sarees, Wedding, Festive, Dress Materials)
   - Description
   - Product image (click to upload)
4. Click **"Add Product"**

### Managing Orders

1. Go to **Orders** in the sidebar
2. Filter orders using buttons (All, Pending, Completed)
3. Update order status from the dropdown
4. Update payment status from the payment dropdown
5. Click **"View"** to see full order details

### Updating Settings

1. Go to **Settings** in the sidebar
2. Update:
   - Footer address
   - Phone number
   - Email address
   - Social media links
   - Available payment methods
3. Click **"Save Settings"**

## Troubleshooting

**Can't login?**
- Make sure the backend is running
- Check if the admin user exists in the database
- Verify MONGODB_URI in .env

**Images not uploading?**
- Ensure backend has access to store images
- Check browser console for errors
- Verify CORS is enabled in backend

**Orders not showing?**
- Check if MongoDB is connected
- Verify admin is authenticated
- Check network requests in browser DevTools

## Security Notes

- Always use strong passwords for admin accounts
- Keep JWT_SECRET secure
- Use HTTPS in production
- Implement additional rate limiting for login attempts
- Add role-based access control for multiple admins

## Contributing

Feel free to extend this admin panel with additional features like:
- Advanced analytics and reporting
- Bulk product import/export
- Customer management
- Inventory alerts
- Email notifications

## Support

For issues or questions, please check the documentation or contact support.