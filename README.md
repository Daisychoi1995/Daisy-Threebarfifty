# 🍰 Threebarfifty - Dessert Shop App

**threefifty** started as a simple dessert shop run by myself.
At first, I built the website using Wix, but I wanted more control, better performance, and the ability to truly own what I create.

That’s when I began learning software engineering.

This project marks the beginning of my journey as a developer.
It’s not just a portfolio piece — it’s the reason I fell in love with coding.

**You can make an account to to admin! upload menu and delete menu as well!**

Check out the live website: [threebarfifty.com](https://www.threebarfifty.com)
Check out the live website made by Daisy: [threebarfifty.com](https://three-bar-fifty.firebaseapp.com/)
---


## 🛠️ Tech Stack

| Category        | Stack                                 |
|-----------------|----------------------------------------|
| Frontend        | Next.js (App Router), TypeScript       |
| Styling         | Tailwind CSS                           |
| State Management| Zustand                                |
| Backend         | Next.js API Routes                     |
| Database        | PostgreSQL                     |
| Hosting         | Firebase Hosting                       |
| Authentication  | Firebase Authentication                |
| Payment         | Stripe                                 |
| Image Hosting   | Cloudinary                             |

---


## 🚀 Features

✅ Server-Side Rendering (SSR) for item detail pages

✅ Zustand-based shopping cart (persistent and reactive)

✅ Firebase backend integration (Firestore + Hosting)

✅ Modular file structure and clean code architecture

✅ Optimized image rendering with next/image

✅ Stripe payment integration for secure transactions

✅ Cloudinary image upload and management for optimized delivery

---

## 🛒 Cart Management

- `addCart(item)`  
  → Add or update item in the cart

- `removeCart(id)`  
  → Decrease quantity or remove item from cart

- `removeItemFromCart(id)`  
  → Remove a item from cart

- `count`  
  → Total number of items in the cart


All cart data is persisted via `zustand/persist`.

---



## Contact

For any questions or feedback, feel free to contact me at chj15937@gmail.com.