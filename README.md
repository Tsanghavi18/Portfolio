# Tarun Sanghavi — Developer Portfolio 🚀

A modern, responsive, and performance-focused personal portfolio website built with **Next.js**, **React 19**, **Tailwind CSS v4**, and **Framer Motion**.

Designed with sleek glassmorphism aesthetics, fluid typography, dark/light theme switching, and smooth interactive animations to showcase full-stack projects, professional experience, skills, and credentials.

---

## 🌟 Highlights & Features

- **⚡ Modern Framework Stack**: Powered by **Next.js** and **React 19** with self-hosted Google Fonts (`next/font`) for zero layout shifts.
- **🎨 Glassmorphism & Tokenized Styling**: Built on **Tailwind CSS v4** with CSS design tokens, dynamic amber/orange gradients, and custom responsive scrollbars.
- **🌓 Instant Theme Switching**: Dark and light themes with pre-paint script execution to prevent white screen flicker on page reload.
- **📊 Real-time Page Visit Counter**: Interactive circular progress indicator tracking scroll exploration from `0%` to `100%`, transitioning smoothly into a fast back-to-top button.
- **📱 Fluid & Responsive**: Fully responsive across mobile, tablet, and widescreen displays using CSS `clamp()` and accessible layouts.
- **📬 Working Contact Form**: Clean floating-label contact form with client-side regex validation, Nodemailer SMTP backend, and mail client fallback.
- **🔍 SEO & Social Sharing Ready**: Complete with OpenGraph tags, Twitter Card cards, XML sitemap, `robots.txt`, and Google JSON-LD structured schema markup.
- **🎯 Single Source of Truth**: The entire website content (bio, skills, jobs, projects, socials) is controlled from a single centralized data file (`src/data/portfolio.js`).

---

## 🛠️ Built With

| Layer | Technology |
| :--- | :--- |
| **Framework** | [Next.js](https://nextjs.org/) (Pages Router) |
| **Library** | [React 19](https://react.dev/) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) |
| **Animations** | [Framer Motion](https://www.framer.com/motion/) |
| **Icons** | [Lucide React](https://lucide.dev/) & Custom SVG Brand Icons |
| **Email Handling** | [Nodemailer](https://nodemailer.com/) |

---

## 📁 Project Structure

```text
my-portfolio/
├── public/                 # Static assets (favicons, og-image, logo marks)
├── src/
│   ├── components/
│   │   ├── layout/         # Navbar, Footer
│   │   ├── sections/       # Hero, About, Skills, Projects, Experience, Education, Certifications, Contact
│   │   └── ui/             # BackToTop counter, GlassCard, Reveal, Buttons, ThemeToggle, Icons
│   ├── data/
│   │   └── portfolio.js    # Central portfolio data & configuration
│   ├── lib/
│   │   └── utils.js        # Helper functions (cn/clsx)
│   ├── pages/
│   │   ├── api/
│   │   │   └── contact.js  # Serverless Nodemailer contact form API route
│   │   ├── _app.js         # Root app wrapper & font loading
│   │   ├── _document.js    # Document shell & theme pre-render script
│   │   ├── index.js        # Single-page portfolio homepage
│   │   ├── sitemap.xml.js  # Dynamic search engine sitemap
│   │   └── robots.txt.js   # Dynamic search bot crawl rules
│   └── styles/
│       └── globals.css     # Design tokens, custom scrollbar, glassmorphic utilities
├── next.config.mjs         # Next.js configuration
├── package.json
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) (v18.18 or higher recommended) and npm installed:

```bash
node -v
npm -v
```

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Tsanghavi18/<repo-name>.git
   cd <repo-name>
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up Environment Variables (Optional - for Contact Form):**
   Create a `.env.local` file in the root directory:
   ```env
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-16-char-app-password
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## ⚙️ Customizing Content

To customize the portfolio with your own details, edit **`src/data/portfolio.js`**. 

You can update:
- Personal Bio & Taglines
- Social Media Links (GitHub, LinkedIn, Instagram)
- Technical Skills & Categories
- Work Experience & Job Responsibilities
- Projects, Live Demo URLs & GitHub Links
- Education & Certifications

---

## 📬 Contact & Connect

**Tarun Sanghavi** — Full Stack Developer  
- **LinkedIn**: [linkedin.com/in/tarun-sanghavi](https://www.linkedin.com/in/tarun-sanghavi/)  
- **GitHub**: [@Tsanghavi18](https://github.com/Tsanghavi18)  
- **Instagram**: [@tarunn.sanghavi](https://www.instagram.com/tarunn.sanghavi/)  
- **Email**: [tarunn.sanghavi@gmail.com](mailto:tarunn.sanghavi@gmail.com)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
# Portfolio
Modern, responsive personal developer portfolio built with Next.js, React 19, Tailwind CSS v4, and Framer Motion.
