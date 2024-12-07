"use client";

import { useEffect } from "react";
import Swiper, { Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";

Swiper.use([Pagination]); // Enable Pagination module

export default function HomePage() {
  useEffect(() => {
    const swiperContainer = document.querySelector(".swiper");
    const gallery = document.querySelector(".gallery");

    const toggleSwiper = () => {
      if (window.innerWidth <= 900) {
        // Mobile: Initialize Swiper
        if (!swiperContainer.swiper) {
          new Swiper(".swiper", {
            loop: true,
            pagination: {
              el: ".swiper-pagination",
              clickable: true,
            },
          });
          gallery.style.display = "none"; // Hide the row layout on mobile
          swiperContainer.style.display = "block"; // Show Swiper
        }
      } else {
        // Desktop: Destroy Swiper if initialized and show the row layout
        if (swiperContainer.swiper) {
          swiperContainer.swiper.destroy(true, true);
        }
        gallery.style.display = "flex"; // Show the row layout on desktop
        swiperContainer.style.display = "none"; // Hide Swiper
      }
    };

    toggleSwiper();
    window.addEventListener("resize", toggleSwiper);

    // Cleanup
    return () => window.removeEventListener("resize", toggleSwiper);
  }, []);

  useEffect(() => {
    const yearElement = document.getElementById("year");
    const currentYear = new Date().getFullYear();
    yearElement.textContent = currentYear;
  }, []);

  return (
    <>
      <header>
        <div className="logo">
          <img src="/assets/logo-white.svg" alt="EnhanceMe Logo" />
        </div>
        <section className="content-header">
          <p>
            Everything is about relationships. <br /> We'll help you enhance
            your potential in building them.
          </p>
          <p className="launch-date">Coming soon.</p>
        </section>
      </header>
      <main>
        <section className="gallery">
          <img
            src="/assets/image_1.jpg"
            alt="Profile Image 1"
            className="medium"
          />
          <img
            src="/assets/image_2.jpg"
            alt="Profile Image 2"
            className="small"
          />
          <img
            src="/assets/image_3.jpg"
            alt="Profile Image 3"
            className="large"
          />
          <img
            src="/assets/image_4.jpg"
            alt="Profile Image 4"
            className="small"
          />
          <img
            src="/assets/image_5.jpg"
            alt="Profile Image 5"
            className="medium"
          />
        </section>
        <section className="swiper">
          <div className="swiper-wrapper">
            <div className="swiper-slide">
              <img src="/assets/image_1_mobile.jpg" alt="Profile Image 1" />
            </div>
            <div className="swiper-slide">
              <img src="/assets/image_2_mobile.jpg" alt="Profile Image 2" />
            </div>
            <div className="swiper-slide">
              <img src="/assets/image_3_mobile.jpg" alt="Profile Image 3" />
            </div>
            <div className="swiper-slide">
              <img src="/assets/image_4_mobile.jpg" alt="Profile Image 4" />
            </div>
            <div className="swiper-slide">
              <img src="/assets/image_5_mobile.jpg" alt="Profile Image 5" />
            </div>
          </div>
          <div className="swiper-pagination"></div>
        </section>
        <section className="subscribe">
          <div className="content-subscribe">
            <p>Stay ahead of the curve. Subscribe!</p>
            <p className="privacy-note">
              We respect your privacy. No spam, only valuable updates.
            </p>
          </div>
          <form action="/.netlify/functions/subscribe" method="POST">
            <input
              type="text"
              placeholder="Name (Required)"
              name="name"
              id="name"
              className="form-input name-input"
              required
            />
            <input
              type="email"
              placeholder="Email (Required)"
              name="email"
              id="email"
              className="form-input email-input"
              required
            />
            <button type="submit">Notify me</button>
          </form>
        </section>
      </main>
      <footer>
        <div className="copyright">
          <p>
            Copyright &copy; <span id="year"></span> EnhanceMe - All Rights
            Reserved.
          </p>
        </div>
        <div className="social-icons">
          <p>Follow us </p>
          <a
            href="#"
            aria-label="Follow us on Facebook"
            target="_blank"
          >
            <img src="/assets/facebook_icon.png" alt="Facebook Icon" />
          </a>
          <a
            href="https://www.instagram.com/enhanceme.consulting/"
            target="_blank"
            aria-label="Follow us on Instagram"
          >
            <img src="/assets/instagram_icon.png" alt="Instagram Icon" />
          </a>
        </div>
      </footer>
    </>
  );
}
