# Ridma Photo

Ridma Photo is a full-stack, modern photography portfolio and e-commerce platform built with **Next.js (App Router)**. It allows clients to browse professional photography services, add them to a cart, seamlessly book and pay via Stripe, and receive automated email confirmations. It also features a secure, dedicated Admin Dashboard for managing the service catalog and client orders.

## 🚀 Tech Stack & Libraries

- **Framework:** Next.js 16+ (App Router), React 19, TypeScript
- **Styling:** Tailwind CSS v4, `tailwind-merge`, `clsx`, `tw-animate-css`
- **UI Components:** Shadcn UI, Radix UI (`@base-ui/react`), Lucide React (Icons)
- **Database:** MongoDB via Mongoose
- **Payments:** Stripe Checkout (`stripe`, `@stripe/stripe-js`)
- **Emails:** Resend (Automated booking confirmations)
- **Image Hosting:** Cloudinary (`next-cloudinary`)
- **State Management:** React Context API (Cart) + LocalStorage
- **Authentication:** Custom JWT auth (`jose`), `bcryptjs`, Next.js Middleware
- **Theming:** `next-themes` (Dark/Light mode support)

---

## 📁 Project Structure & Pages

### Public Client Pages
All public pages are designed with a sleek, dark-themed, cinematic aesthetic tailored for a photography studio.

- **`/` (Home):** The landing page featuring a Hero section, About section, Portfolio highlights, and a Contact form.
- **`/services`:** The public catalog where clients can browse available photography and videography services.
- **`/services/[id]`:** Detailed view of a specific service with an "Add to Cart" function.
- **`/projects` & `/projects/[id]`:** Dedicated portfolio pages showcasing past photography projects and galleries.
- **`/cart`:** The shopping cart page where users can review selected services. State is maintained via `lib/cart-context.tsx` and persisted in `localStorage`.
- **`/checkout`:** Collects client details (Name, Email, Phone, Event Date, Requirements) before redirecting to the Stripe Checkout portal.
- **`/contact`:** A standard contact/inquiry page.
- **`/privacy` & `/terms`:** Legal and policy pages.

### Admin Dashboard (Protected)
The `/admin` routes are protected by Next.js `middleware.ts` which verifies HTTP-only JWT cookies.

- **`/admin`:** The secure login portal for administrators.
- **`/admin/dashboard`:** The main overview panel showing key metrics: Total Orders, Total Revenue, Total Services, and a table of the most recent orders. 
- **`/admin/dashboard/orders`:** A comprehensive order management system. Admins can view complete order details (customer info, event date, requirements, line items) and update order statuses to "completed".
- **`/admin/dashboard/services`:** A CRUD interface for the service catalog. Admins can Add, Edit, or Delete services. This includes a seamless image upload integration using **Cloudinary** widget.

---

## ⚙️ Core Functionality & Flows

### 1. User Booking & Payment Flow
1. **Selection:** Users browse `/services` and add desired packages to their cart via the `CartContext`.
2. **Checkout:** On `/checkout`, users provide their event details.
3. **Payment Initiation:** Submitting the checkout form triggers `POST /api/checkout`. This creates a **Stripe Checkout Session** containing the cart items and customer metadata.
4. **Stripe Portal:** The user is redirected to Stripe's secure hosted checkout to complete their payment.
5. **Webhook Fulfillment:** Upon successful payment, Stripe sends an event to `POST /api/webhook/stripe`.
   - The webhook validates the signature.
   - Extracts the line items and metadata.
   - Saves the new `Order` to the MongoDB database with status `"paid"`.
   - Uses **Resend** to fire a stylized, HTML confirmation email to the client containing their booking summary.
6. **Redirection:** The user is redirected back to the site with a success parameter.

### 2. Admin Authentication Flow
1. Admins log in at `/admin`.
2. `POST /api/admin/login` verifies the email and uses `bcryptjs` to check the hashed password against the `Admin` MongoDB collection.
3. If successful, `lib/auth.ts` generates a JWT using `jose` and sets an HTTP-only cookie named `session` valid for 2 hours.
4. `middleware.ts` intercepts requests to `/admin/dashboard/*`, decrypts the JWT, and redirects unauthenticated users back to the login page.

### 3. Cart State Management
Implemented in `lib/cart-context.tsx`, the cart uses React Context to provide global state. It automatically syncs with browser `localStorage` (`ridma_cart`) to ensure items persist across page reloads.

---

## 🔌 API Routes

### Client / Public APIs
- **`POST /api/checkout`:** Receives cart items and customer details, constructs line items, and returns a Stripe Checkout Session URL.
- **`POST /api/webhook/stripe`:** Listens for `checkout.session.completed` events from Stripe. Creates the order in the database and triggers the Resend email.
- **`GET /api/services`:** Fetches the public list of available services from the database.

### Admin APIs (Protected)
- **`POST /api/admin/login`:** Authenticates the admin and sets the JWT cookie.
- **`POST /api/admin/logout`:** Clears the JWT cookie.
- **`GET /api/orders`:** Retrieves all customer orders (Dynamic rendering forced to bypass Next.js cache).
- **`PATCH /api/orders/[id]`:** Updates the status of a specific order (e.g., marking it as "completed").
- **`POST /api/services`:** Creates a new service in the catalog.
- **`PUT /api/services/[id]`:** Updates an existing service.
- **`DELETE /api/services/[id]`:** Removes a service from the catalog.

---

## 🗄️ Database Models (MongoDB)

- **`Service` (`models/Service.ts`):** Defines a catalog item (Title, Description, Price, Image URL, Category).
- **`Order` (`models/Order.ts`):** Defines a client booking. Includes Customer Name, Email, Phone, Event Date, Requirements, Array of Line Items (from cart), Total Price, Stripe Session ID, and Status (pending, paid, completed).
- **`Admin` (`models/Admin.ts`):** Defines the admin user credentials (Email, Hashed Password).

---

## 🛠️ Environment Variables

To run this project locally, create a `.env.local` file with the following keys:

```env
# MongoDB Connection
MONGODB_URI=your_mongodb_connection_string

# Stripe Payments
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Resend Emails
RESEND_API_KEY=re_...

# Cloudinary Image Uploads
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your_upload_preset

# Authentication
JWT_SECRET=your_super_secret_jwt_key

# Application
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

---

## 🚦 Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Seed the Admin User (Optional):**
   Run the seed script to create a default admin user in the database.
   ```bash
   npm run seed
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Access the application:**
   - Main Site: [http://localhost:3000](http://localhost:3000)
   - Admin Panel: [http://localhost:3000/admin](http://localhost:3000/admin)

---

## 👥 Team Members

- **Risindu Hewapathiranage** (Team Leader / Frontend Developer) - [email@example.com]
- **Lahiru Gamaralalage** (Full-Stack Developer) - [email@example.com]
- **MD Anajbin Rahman** (Backend Developer) - [email@example.com]
- **Chamod Mahawaththage Don** (QA & Documentation Specialist) - [email@example.com]