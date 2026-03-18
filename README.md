# Dynamic Modal Form for "Osebni Stečaj" (poraVnava d.o.o.)

![Build](https://img.shields.io/badge/build-passing-brightgreen)
![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-lightgrey)
![Made with](https://img.shields.io/badge/Made%20with-Vanilla%20JS-yellow)

Professional, high-performance lead generation form developed for a Slovenian law firm.  
This component is designed as a standalone module and can be easily integrated into a **WordPress** environment via a child theme.

---

## 🎬 Preview

> Replace the file below with your actual GIF preview

![Form Preview](./assets/preview.gif)

---

## 🚀 Overview

The **"Osebni Stečaj" (Personal Bankruptcy)** project requires a complex data collection process.  
This form uses **conditional logic** to guide users through legal questions, dynamically adapting its structure and size based on user input.

---

## 🛠 Tech Stack

- **HTML5** — Semantic structure  
- **CSS3 (Custom Properties)** — Responsive design with smooth modal transitions  
- **Vanilla JavaScript** — Core logic for field dependencies and UI adjustments (zero dependencies for maximum performance)  
- **WordPress Integration** — Optimized for Gutenberg and AJAX data handling  

---

## ✨ Key Features

- **Conditional Logic** — Fields dynamically appear and disappear based on user input  
- **Adaptive UI** — Modal automatically adjusts height and width for optimal layout  
- **State Management** — Built-in validation before progressing to the next step  
- **WP-Ready** — Designed for integration via `functions.php` and WordPress hooks  

---

## 📂 Project Structure

- **/src/styles** → Scoped CSS (prevents conflicts with WordPress themes)
- **/src/scripts** → Main JavaScript logic (form events & transitions)
- **/assets** → SVG icons, GIF preview, and branding elements


---

## 🔧 Integration Guide (WordPress)

To integrate the form into the `poraVnava` child theme:

1. Copy scripts and styles into your theme directory  
2. Enqueue the script in `functions.php`:

```php
wp_enqueue_script(
  'os-form-js',
  get_stylesheet_directory_uri() . '/js/form.js',
  array(),
  '1.0',
  true
);
```
3. Insert the form using a Shortcode or a Custom HTML block in Gutenberg

## 📦 Installation (Optional - NPM style)

1. git clone https://github.com/your-username/os-form.git
2. cd os-form
3. npm install

---

## 👨‍💻 Author

**Sasha**  
Frontend Developer & UI/UX Specialist  
[GitHub](https://github.com/your-username)