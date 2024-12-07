"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

export default function HomePage() {
  const [isMobile, setIsMobile] = useState(false);
  const [formMessage, setFormMessage] = useState(null); // Track the message for the user
  const [messageType, setMessageType] = useState("success"); // Track message type ('success' or 'error')

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 900);
    };

    handleResize(); // Set initial state
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const yearElement = document.getElementById("year");
    const currentYear = new Date().getFullYear();
    yearElement.textContent = currentYear;
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const data = {
      name: form.name.value,
      email: form.email.value,
    };

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (response.ok) {
        setMessageType("success");
        setFormMessage(result.message || "Successfully subscribed!");
        form.reset(); // Clear the form inputs
      } else {
        setMessageType("error");
        setFormMessage(result.error || "Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessageType("error");
      setFormMessage("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <>
      <header>
        <div className="logo">
          <Image src="/assets/logo-white.svg" alt="EnhanceMe Logo" width={500} height={150} />
        </div>
        <section className="content-header">
          <p>
            Everything is about relationships. <br /> We&#39;ll help you enhance
            your potential in building them.
          </p>
          <p className="launch-date">Coming soon.</p>
        </section>
      </header>
      <main>
        {isMobile ? (
          <section className="swiper">
            <Swiper
              modules={[Pagination]}
              pagination={{ clickable: true }}
              loop
            >
              <SwiperSlide>
                <img src="/assets/image_1_mobile.jpg" alt="Profile Image 1" />
              </SwiperSlide>
              <SwiperSlide>
                <img src="/assets/image_2_mobile.jpg" alt="Profile Image 2" />
              </SwiperSlide>
              <SwiperSlide>
                <img src="/assets/image_3_mobile.jpg" alt="Profile Image 3" />
              </SwiperSlide>
              <SwiperSlide>
                <img src="/assets/image_4_mobile.jpg" alt="Profile Image 4" />
              </SwiperSlide>
              <SwiperSlide>
                <img src="/assets/image_5_mobile.jpg" alt="Profile Image 5" />
              </SwiperSlide>
            </Swiper>
          </section>
        ) : (
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
        )}

        <section className="subscribe">
          <div className="content-subscribe">
            <p>Stay ahead of the curve. Subscribe!</p>
            <p className="privacy-note">
              We respect your privacy. No spam, only valuable updates.
            </p>
          </div>
          <form onSubmit={handleSubmit}>
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
          {formMessage && (
            <p className={`form-message ${messageType}`}>
              {formMessage}
            </p>
          )}
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
          <a href="#" aria-label="Follow us on Facebook" target="_blank">
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
