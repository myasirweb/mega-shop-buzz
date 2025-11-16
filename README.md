# 🛍️ Mega Buzz Shop — Modern Blog Website (Next.js + Sanity CMS)

![Mega Buzz Shop Screenshot](./public/mega-buzz.png)

**Mega Buzz Shop** is a modern and responsive **blog website** built using **Next.js 14** and powered by **Sanity CMS** for seamless content management.  
It provides a dynamic platform to explore blogs, categories, and trending content in style — designed for speed, SEO, and scalability.

🔗 Live Demo: https://www.megashopbuzz.com/
🧠 CMS Platform: Sanity.io

---

## 🚀 Features

✅ **Modern Next.js 14 App Router Structure**  
✅ **Sanity CMS Integration** for easy blog management  
✅ **Dynamic Blog Pages** (Posts, Authors, Categories)  
✅ **Fully Responsive Design** (Mobile, Tablet, Desktop)  
✅ **Attractive UI/UX** using **Tailwind CSS**  
✅ **Email Subscription (EmailJS)** with Toast Notifications  
✅ **SEO Optimized** (Meta Tags, OG tags, Schema-ready)  
✅ **Reusable Components** (Header, Footer, Layout, etc.)  
✅ **Fast Image Optimization** using `next/image`  

---

## 🧩 Tech Stack

| Technology | Purpose |
|-------------|----------|
| **Next.js 14** | Frontend framework |
| **React 18** | UI library |
| **Sanity CMS** | Headless CMS for content |
| **Tailwind CSS** | Styling and responsive design |
| **Lucide Icons** | Lightweight icon set |
| **EmailJS** | Newsletter and email automation |
| **Vercel** | Hosting and deployment |

---

## 🛠️ Installation & Setup

Clone the repository and install dependencies:

```bash
# Clone the repo
git clone https://github.com/yourusername/mega-buzz-shop.git

# Navigate to the project
cd mega-buzz-shop

# Install dependencies
npm install


Start the development server:

npm run dev
# or
yarn dev
# or
pnpm dev

Open your browser at http://localhost:3000


⚙️ Environment Variables

Create a .env.local file in your root directory and add:

NEXT_PUBLIC_SANITY_PROJECT_ID=your_sanity_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2023-10-01
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key


📰 Content Management (Sanity CMS)

Go to Sanity.io

Manage your blog posts, categories, and authors easily.

Each content update reflects automatically on the website (real-time revalidation).


📧 Email Subscription

The website uses EmailJS for collecting user emails in the newsletter section (Footer).
To activate this feature:

Create a free account on EmailJS
.

Create a new service and email template.

Add your SERVICE_ID, TEMPLATE_ID, and PUBLIC_KEY in .env.local.


🌐 Deployment

Easily deploy to Vercel
:

Push your code to GitHub.

Connect your repository to Vercel.

Add environment variables under Project Settings → Environment Variables.

Click Deploy 🎉



👨‍💻 Developer

Designed & Developed by Yasir Dev

💻 Portfolio: yasir-portfolio-nextjs.vercel.app

📂 GitHub: github.com/myasirweb

Contributing

Contributions are welcome! Please create a pull request or open an issue if you encounter any bugs or have suggestions for improvements.

🪪 License

This project is licensed under the MIT License — see the LICENSE
 file for details.