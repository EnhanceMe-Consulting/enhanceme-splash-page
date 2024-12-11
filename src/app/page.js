"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { trackEvent } from "../utils/analytics";
import "swiper/css";
import "swiper/css/pagination";

export default function HomePage() {
  const [isMobile, setIsMobile] = useState(false);
  const [formMessage, setFormMessage] = useState(null);
  const [messageType, setMessageType] = useState("success");

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 900);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const yearElement = document.getElementById("year");
    if (yearElement) {
      const currentYear = new Date().getFullYear();
      yearElement.textContent = currentYear;
    }
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
        // Success scenario
        setMessageType("success");
        setFormMessage(result.message || "You were successfully subscribed!");
        form.reset();

        // Track successful subscription
        trackEvent("subscribe", "Form", "Subscription Form", 1);
      } else if (response.status === 400 && result.error === "This email is already subscribed.") {
        // Handle "already subscribed" error
        setMessageType("info");
        setFormMessage("You're already subscribed!");

        // Track already subscribed
        trackEvent("subscribe_error", "Form", "Subscription Form - Already Subscribed", 0);
      } else {
        // Generic error handling
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
      <div className="background-pattern"></div>
      <header>
        <div className="logo">
          <img src="/assets/logo-white.svg" alt="EnhanceMe Logo" />
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
            <Swiper modules={[Pagination]} pagination={{ clickable: true }} loop>
              <SwiperSlide>
                <img src="/assets/image_1.jpeg" alt="Profile Image 1" />
              </SwiperSlide>
              <SwiperSlide>
                <img src="/assets/image_2.jpeg" alt="Profile Image 2" />
              </SwiperSlide>
              <SwiperSlide>
                <img src="/assets/image_3.jpeg" alt="Profile Image 3" />
              </SwiperSlide>
              <SwiperSlide>
                <img src="/assets/image_4.jpeg" alt="Profile Image 4" />
              </SwiperSlide>
              <SwiperSlide>
                <img src="/assets/image_5.jpeg" alt="Profile Image 5" />
              </SwiperSlide>
            </Swiper>
          </section>
        ) : (
          <section className="gallery">
            <img
              src="/assets/image_1.jpeg"
              alt="Profile Image 1"
              className="medium"
            />
            <img
              src="/assets/image_2.jpeg"
              alt="Profile Image 2"
              className="small"
            />
            <img
              src="/assets/image_3.jpeg"
              alt="Profile Image 3"
              className="large"
            />
            <img
              src="/assets/image_4.jpeg"
              alt="Profile Image 4"
              className="small"
            />
            <img
              src="/assets/image_5.jpeg"
              alt="Profile Image 5"
              className="medium"
            />
          </section>
        )}

        <section className="subscribe">
          <div className="content-subscribe">
            <p>Stay ahead of the curve. Subscribe!</p>
            <p className="privacy-note">
              We respect your privacy. <span className="mobile-break">No spam, only valuable updates.</span>
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
            <p
              className={`form-message ${messageType}`}
              aria-live="polite"
              role="alert"
            >
              {formMessage}
            </p>
          )}
        </section>
      </main>
      <footer>
        <div className="copyright">
          <p>
            Copyright &copy; <span id="year"></span> EnhanceMe - <span className="mobile-break">All Rights Reserved.</span>
          </p>
        </div>
        <div className="social-icons">
          <p>Follow us </p>
          <a
            href="https://www.facebook.com/enhanceme.consulting/"
            target="_blank"
            aria-label="Follow us on Facebook"
            onClick={() => trackEvent("social_click", "Social Media", "Facebook")}
          >
            <img src="/assets/facebook_icon.png" alt="Facebook Icon" />
          </a>
          <a
            href="https://www.instagram.com/enhanceme.consulting/"
            target="_blank"
            aria-label="Follow us on Instagram"
            onClick={() => trackEvent("social_click", "Social Media", "Instagram")}
          >
            <img src="/assets/instagram_icon.png" alt="Instagram Icon" />
          </a>
        </div>
      </footer>
    </>
  );
}
