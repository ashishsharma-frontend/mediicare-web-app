import React, { useEffect, useRef, useState } from "react";
import Product01 from "../Images/01Products.jpg";
import Product02 from "../Images/02Products.jpg";
import Product03 from "../Images/03Products.jpg";
import Product04 from "../Images/04Products.jpg";

const testimonials = [
  {
    name: "Priya Sharma",
    title: "Software Engineer",
    stars: 5,
    heading: "Skin Cleared Fast!",
    desc: "Dr. Harit's expertise transformed my skin. Acne gone in 4 weeks. Highly recommend SupaDoc!",
    productImg: Product01,
    productName: "Minimalist Face Wash",
  },
  {
    name: "Rajesh Kumar",
    title: "Business Owner",
    stars: 5,
    heading: "Convenient Telehealth",
    desc: "Telehealth was easy and professional. Dr. Harit gave a great plan. Support team is responsive.",
    productImg: Product02,
    productName: "Minimalist Serum",
  },
  {
    name: "Anita Verma",
    title: "Teacher",
    stars: 5,
    heading: "Quality Products",
    desc: "Products recommended by Dr. Harit made my skin healthier. Genuine and effective.",
    productImg: Product03,
    productName: "Cetaphil Cleanser",
  },
  {
    name: "Mohit Agarwal",
    title: "Marketing Manager",
    stars: 5,
    heading: "Affordable & Effective",
    desc: "Expert advice, quality products, and affordable pricing. SupaDoc is my go-to for skincare.",
    productImg: Product04,
    productName: "Orimii Moisturizer",
  },
  {
    name: "Sneha Reddy",
    title: "Graphic Designer",
    stars: 5,
    heading: "Visible Hair Growth",
    desc: "Hair loss treated with modern solutions. Visible improvement in 6 weeks. Highly recommended.",
    productImg: Product01,
    productName: "Minimalist Hair Serum",
  },
];

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}) => {
  const containerRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);

  // Responsive speed for mobile
  const getDuration = () => {
    if (window.innerWidth <= 600) return "12s"; // Even faster on mobile
    if (speed === "fast") return "20s";
    if (speed === "normal") return "40s";
    return "80s";
  };

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.style.setProperty(
        "--animation-direction",
        direction === "left" ? "forwards" : "reverse"
      );
      containerRef.current.style.setProperty(
        "--animation-duration",
        getDuration()
      );
      containerRef.current.style.setProperty(
        "animation-play-state",
        isPaused ? "paused" : "running"
      );
    }
  }, [direction, speed, isPaused]);

  // Duplicate items for seamless infinite scroll
  const allItems = [...items, ...items];

  // Responsive card style
  const isMobile = window.innerWidth <= 600;
  const cardStyle = {
    background: "#fff",
    borderRadius: "10px",
    padding: isMobile ? "18px 10px" : "15px",
    minWidth: isMobile ? "90vw" : "330px",
    maxWidth: isMobile ? "95vw" : "320px",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "space-between",
    border: "1px solid #e5e7eb",
    fontFamily: "'Figtree', sans-serif",
    marginBottom: 0,
    boxShadow: isMobile
      ? "0 2px 12px rgba(0,0,0,0.07)"
      : "0 4px 24px rgba(0,0,0,0.08)",
  };

  const headerStyle = {
    display: "flex",
    alignItems: "center",
    gap: isMobile ? "10px" : "18px",
    marginBottom: "8px",
  };

  const nameStyle = {
    fontWeight: 600,
    color: "#22223b",
    fontSize: isMobile ? "1rem" : "1.08rem",
  };

  const badgeStyle = {
    color: "#6b7280",
    fontSize: isMobile ? "0.95rem" : "0.98rem",
    fontWeight: 400,
  };

  const starsStyle = {
    margin: "8px 0 12px 0",
    color: "#22223b",
    fontSize: isMobile ? "1.1rem" : "1.2rem",
    letterSpacing: "2px",
  };

  const titleStyle = {
    fontWeight: 600,
    color: "#22223b",
    fontSize: isMobile ? "1rem" : "1.03rem",
    marginBottom: "10px",
  };

  const descStyle = {
    color: "#4b5563",
    fontSize: isMobile ? "0.93rem" : "0.95rem",
    lineHeight: 1.5,
    margin: "12px 0",
    minHeight: "48px",
    maxHeight: isMobile ? "60px" : "80px",
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    WebkitLineClamp: isMobile ? 2 : 3,
    WebkitBoxOrient: "vertical",
    marginBottom: "65px",
  };

  const productStyle = {
    display: "flex",
    alignItems: "center",
    gap: isMobile ? "10px" : "18px",
    marginTop: "auto",
  };

  const productImgStyle = {
    width: isMobile ? "40px" : "44px",
    height: isMobile ? "40px" : "44px",
    borderRadius: "8px",
    objectFit: "cover",
    border: "1px solid #e5e7eb",
  };

  const productNameStyle = {
    fontSize: isMobile ? "0.93rem" : "0.95rem",
    color: "#22223b",
    fontWeight: 500,
  };

  return (
    <div
      ref={containerRef}
      style={{
        maxWidth: "1400px",
        width: "100%",
        margin: "0 auto",
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
      }}
      className={`scroller relative z-20 ${className || ""}`}
    >
      <ul
        className="flex flex-row flex-nowrap gap-8 py-4 animate-scroll"
        style={{
          width: "calc(200%)",
          display: "flex",
          flexDirection: "row",
          gap: isMobile ? "14px" : "15px",
          alignItems: "stretch",
          animation: `scroll var(--animation-duration, ${getDuration()}) var(--animation-direction, forwards) linear infinite`,
          animationPlayState: isPaused ? "paused" : "running",
        }}
      >
        {allItems.map((item, idx) => (
          <li
            style={cardStyle}
            key={item.name + idx}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div style={headerStyle}>
              <span style={nameStyle}>{item.name}</span>
              {/* <span style={badgeStyle}>{item.title}</span> */}
            </div>
            <div style={starsStyle}>{"★".repeat(item.stars)}</div>
            <div style={titleStyle}>{item.heading}</div>
            <div style={descStyle}>{item.desc}</div>
            <div style={productStyle}>
              <img
                src={item.productImg}
                alt={item.productName}
                style={productImgStyle}
              />
              <span style={productNameStyle}>{item.productName}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export function InfiniteMovingCardsDemo() {
  return (
    <div className="h-[40rem] rounded-md flex flex-col antialiased bg-background items-center justify-center relative overflow-hidden">
      <InfiniteMovingCards
        items={testimonials}
        direction="right"
        speed="slow"
      />
    </div>
  );
}
