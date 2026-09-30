# 🍽️ TasteBite Restaurant

A modern, responsive restaurant ordering website built with **React, Vite, Tailwind CSS, and Motion**.

TasteBite provides a premium digital restaurant experience with menu browsing, food details, cart management, checkout, order history, order status tracking, testimonials, contact information, and persistent data using browser localStorage.

---

## 🌐 Live Demo

**Live Demo:** Add your deployed Vercel URL here

**GitHub:**
https://github.com/Abdullahyahya12/TasteBite-Restaurant

---

## ✨ Features

### 🏠 Modern Restaurant UI

* Premium restaurant-focused interface
* Responsive design for mobile, tablet, and desktop
* Dark and light theme support
* Smooth animations and interactive hover effects
* Modern orange and dark visual identity

### 🍔 Menu System

* Browse restaurant menu items
* Filter items by category
* Search menu items
* Sort items by recommendation, price, and rating
* Food ratings and category badges
* Detailed food information modal
* Quantity selection before adding items to cart

### 🛒 Shopping Cart

* Add food items to cart
* Increase/decrease item quantity
* Remove individual items
* Clear complete cart
* Automatic subtotal calculation
* Delivery fee calculation
* Automatic total calculation
* Cart persistence using localStorage

### 💳 Checkout

* Delivery and pickup options
* Customer information form
* Phone and email fields
* Delivery address
* City information
* Order notes
* Payment method selection
* Order confirmation
* Unique order number generation

### 📦 Order Management

Orders follow a simple lifecycle:

```text
Pending → Preparing → Delivered → Completed
```

* New orders start with `Pending`
* Order status can be updated in the frontend demo
* Order status is saved in localStorage
* Order history remains available after page refresh
* Order details include customer information, items, quantities, pricing, and status

### 🖼️ Food Gallery

* Restaurant food showcase
* Animated food cards
* Rating display
* Category labels
* Automatic image slider
* Responsive layout

### 👨‍🍳 About Section

* Restaurant story
* Chef-focused presentation
* Restaurant highlights
* Experience statistics
* Guest statistics
* Signature dishes information

### ⭐ Testimonials

* Customer testimonials
* Star ratings
* Customer avatars
* Verified guest indicators
* Automatic testimonial slider
* Navigation controls

### 📍 Contact

* Restaurant phone number
* Email address
* Location information
* Opening hours
* Contact form
* Google Maps location link

### 🧾 Footer

* Quick navigation links
* Menu categories
* Contact information
* Opening hours
* Social media placeholders
* Back-to-top functionality
* Dynamic copyright year

---

## 🛠️ Tech Stack

| Technology   | Purpose                               |
| ------------ | ------------------------------------- |
| React        | Frontend UI development               |
| Vite         | Development and production build tool |
| Tailwind CSS | Styling and responsive design         |
| JavaScript   | Application logic                     |
| Motion       | Animations and transitions            |
| Lucide React | Icons                                 |
| LocalStorage | Client-side data persistence          |
| Git          | Version control                       |
| GitHub       | Source code hosting                   |

---

## 📁 Project Structure

```text
Modern-Restaurant-Menu/
│
├── public/
│   └── images/
│
├── src/
│   ├── components/
│   │   ├── About.jsx
│   │   ├── CartDrawer.jsx
│   │   ├── Checkout.jsx
│   │   ├── Contact.jsx
│   │   ├── FoodDetailsModal.jsx
│   │   ├── FoodGallery.jsx
│   │   ├── Footer.jsx
│   │   ├── Hero.jsx
│   │   ├── Menu.jsx
│   │   ├── Navbar.jsx
│   │   ├── OrderHistory.jsx
│   │   └── Testimonials.jsx
│   │
│   ├── context/
│   │   └── CartContext.jsx
│   │
│   ├── data/
│   │   └── menuData.js
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── package.json
├── vite.config.js
└── README.md
```

---

## 💾 LocalStorage

The current frontend uses browser localStorage because the project does not currently have a backend.

### Cart

```text
restaurant-cart
```

Stores the current shopping cart.

### Order History

```text
restaurant-order-history
```

Stores completed checkout submissions and their order information.

### Theme

```text
restaurant-theme
```

Stores the user's selected dark/light theme.

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Abdullahyahya12/TasteBite-Restaurant.git
```

### 2. Open the project

```bash
cd TasteBite-Restaurant
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

The application will be available at the local development URL provided by Vite.

---

## 🏗️ Production Build

To create a production build:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

---

## 📱 Responsive Design

TasteBite is designed to work across:

* 📱 Mobile devices
* 📱 Tablets
* 💻 Laptops
* 🖥️ Desktop screens

The layout, navigation, cards, forms, checkout interface, and order history adapt to different screen sizes.

---

## 🔄 Current Order Flow

```text
Browse Menu
     ↓
View Food Details
     ↓
Add to Cart
     ↓
Review Cart
     ↓
Checkout
     ↓
Place Order
     ↓
Pending
     ↓
Preparing
     ↓
Delivered
     ↓
Completed
```

---

## 🔮 Future Improvements

The current version is frontend-focused. Future development can include:

* Backend API
* Database integration
* Admin dashboard
* Real-time order status updates
* Customer authentication
* Admin authentication
* Online payment integration
* Restaurant order management
* Inventory management
* Customer accounts
* Order notifications
* Email/SMS notifications
* Reservation management
* Sales and revenue analytics

---

## 🎯 Project Purpose

TasteBite was developed as a professional frontend project to demonstrate modern React development, reusable components, responsive UI design, state management, client-side persistence, animations, and real-world restaurant ordering workflows.

The architecture is designed so a backend and admin management system can be integrated later without rebuilding the entire frontend.

---

## 👨‍💻 Developer

**Abdullah Yahya**

Full Stack Developer

* GitHub: https://github.com/Abdullahyahya12

---

## 📄 License

This project is created for portfolio and educational purposes.
