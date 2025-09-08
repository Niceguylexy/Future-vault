/* ============================
   scripts.js — interactive behaviors
   - Mobile menu
   - Smooth scrolling
   - Contact form validation & submit (fetch)
   - Small UX polish
   ============================ */

document.addEventListener("DOMContentLoaded", () => {
    // ---------- Utilities ----------
    const qs = (s) => document.querySelector(s);
    const qsa = (s) => Array.from(document.querySelectorAll(s));

    // Insert current year in footer
    const yearEl = qs("#year");
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // ---------- Mobile nav toggle ----------
    const menuToggle = qs("#menu-toggle");
    const mainNav = qs("#main-nav");
    menuToggle &&
        menuToggle.addEventListener("click", () => {
            const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
            menuToggle.setAttribute("aria-expanded", String(!isOpen));
            mainNav.classList.toggle("open");
        });

    // Close mobile nav on link click & smooth scroll behavior
    qsa(".nav__link").forEach((link) => {
        link.addEventListener("click", (e) => {
            // Smooth scroll to anchors
            const href = link.getAttribute("href");
            if (href && href.startsWith("#")) {
                e.preventDefault();
                const el = document.querySelector(href);
                if (el) {
                    const top =
                        el.getBoundingClientRect().top +
                        window.scrollY -
                        (qs(".site-header")?.offsetHeight || 60);
                    window.scrollTo({ top, behavior: "smooth" });
                }
            }
            // close mobile nav
            mainNav.classList.remove("open");
            menuToggle.setAttribute("aria-expanded", "false");
        });
    });

    // ---------- Form Handling ----------
    // const form = qs("#lead-form");
    // const status = qs("#form-status");
    // const submitBtn = qs("#submit-btn");

    // if (form) {
    //     form.addEventListener("submit", async (e) => {
    //         e.preventDefault();

    //         // Basic client-side validation
    //         const data = new FormData(form);
    //         const name = data.get("name")?.trim();
    //         const email = data.get("email")?.trim();
    //         const phone = data.get("phone")?.trim();
    //         const message = data.get("message")?.trim();
    //         const honeypot = data.get("company")?.trim(); // should be empty

    //         if (honeypot) {
    //             // Bot detected — quietly exit
    //             return;
    //         }

    //         if (!name || !email || !phone || !message) {
    //             status.textContent = "Please complete all required fields.";
    //             status.style.color = "crimson";
    //             return;
    //         }

    //         // Email simple regex
    //         const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    //         if (!emailRe.test(email)) {
    //             status.textContent = "Please enter a valid email address.";
    //             status.style.color = "crimson";
    //             return;
    //         }

    //         // Prepare payload
    //         const payload = {
    //             name,
    //             email,
    //             phone,
    //             message,
    //             source: "website:futurevault",
    //         };

    //         // UX: disable button
    //         submitBtn.disabled = true;
    //         const originalText = submitBtn.textContent;
    //         submitBtn.textContent = "Sending...";
    //         status.textContent = "";

    //         try {
    //             // Replace '/api/lead' with your serverless function or API endpoint.
    //             // server must validate & sanitize input, then send to CRM/Nodemailer.
    //             const res = await fetch("/api/lead", {
    //                 method: "POST",
    //                 headers: { "Content-Type": "application/json" },
    //                 body: JSON.stringify(payload),
    //             });

    //             if (!res.ok) {
    //                 // server returned an error
    //                 const errorText = await res
    //                     .text()
    //                     .catch(() => res.statusText);
    //                 throw new Error(errorText || "Submission failed.");
    //             }

    //             // success
    //             status.style.color = "green";
    //             status.textContent =
    //                 "Thank you — your request is received. We will contact you within 24 hours.";
    //             form.reset();
    //         } catch (err) {
    //             // Fallback: gracefully notify user; log error to console for developer
    //             console.error("Lead submission error:", err);
    //             status.style.color = "crimson";
    //             status.textContent =
    //                 "Sorry — we could not submit your request. Please email info@futurevault.com";
    //         } finally {
    //             submitBtn.disabled = false;
    //             submitBtn.textContent = originalText;
    //         }
    //     });
    // }

    // ---------- Simple Intersection animations ----------
    /* const animItems = qsa('.card, .feature-bullets li, .testimonial, .kpi-row div');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(en => {
      if (en.isIntersecting) {
        en.target.classList.add('in-view');
        io.unobserve(en.target);
      }
    });
  }, { threshold: 0.12 });
  animItems.forEach(i => io.observe(i)); */

    // Add intersection observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
            }
        });
    }, observerOptions);

    // Observe elements for scroll animation
    const animatedElements = document.querySelectorAll(
        ".card, .feature-bullets li, .testimonial, .kpi-row div, .container, .qa details, .form .form-row, .contact-header, .contact-p, .btn"
    );

    animatedElements.forEach((el) => {
        el.style.opacity = "0";
        el.style.transform = "translateY(20px)";
        el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
        observer.observe(el);
    });
});
