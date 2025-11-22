import React, { useRef, useState } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import DoctorImg from "../Images/Doctor.png";
import ExpertDoctorImg from "../Images/ExpertDoctor.png";
import Product01 from "../Images/01Products.jpg";
import Product02 from "../Images/02Products.jpg";
import Product03 from "../Images/03Products.jpg";
import Product04 from "../Images/04Products.jpg";
import { BsArrowRight } from "react-icons/bs";
import { InfiniteMovingCardsDemo } from "../Ui/infinite-moving-cards";
import AffordableAccessImg from "../Images/AffordableAccess.png";
import ExpertCareImg from "../Images/ExpertCare.png";
import TelehealthEaseImg from "../Images/Telehealth Ease.png";
import ProductsImg from "../Images/Products.png";
import Departments from "../Components/Departments";
import ClinicDoctor from "../Pages/ClinicDoctor";
import Hero01 from "../Images/Hero01.png";
import Hero02 from "../Images/Hero02.png";
import Hero03 from "../Images/Hero03.png";
import TooltipImg from "../Images/Tooltip.png";

// Data arrays for each section
const reachOutCards = [
  {
    title: "We're Here for You – Reach Out!",
    desc: "Have a question or need support? We're just a call or click away, ready to help you 24/7 with care and expertise. Get in touch anytime your well-being is our priority!",
    button: "Make Appointment",
    bg: "#0f172a",
    color: "#ffffff",
    link: "/doctor/11", // Different link for Make Appointment
  },
  {
    img: DoctorImg,
    alt: "Expert Team",
    bg: "#1e293b",
  },
  {
    title: "Meet Our Expert Team",
    desc: "Our doctors and specialists bring years of experience and a passion for healing. From diagnosis to recovery, we're with you every step, offering personalized attention and trusted care.",
    button: "Learn More",
    bg: "#ffffff",
    color: "#0f172a",
    svg: (
      <svg
        width="25"
        height="25"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        style={{ verticalAlign: "middle" }}
      >
        <circle cx="14" cy="10" r="4" />
        <path d="M6 22c0-4 8-4 8-4s8 0 8 4" />
      </svg>
    ),
    link: "/about-us", // Different link for Learn More
  },
];

const whyChooseCards = [
  {
    img: ExpertCareImg,
    title: "Expert Care",
    desc: "Treatments by Dr. Harit in Dermatology, General Medicine.",
  },
  {
    img: TelehealthEaseImg,
    title: "Telehealth Ease",
    desc: "Virtual consultations and prescriptions at home.",
  },
  {
    img: ProductsImg,
    title: "Product Quality",
    desc: "Products from Minimalist, Clinically, Cetaphil curated.",
  },
  {
    img: AffordableAccessImg,
    title: "Affordable Access",
    desc: "High-quality care and products for all.",
  },
];

const operationalCards = [
  {
    svg: (
      <svg
        width="28"
        height="28"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <rect x="4" y="7" width="20" height="17" rx="3" />
        <path d="M16 3v4M8 3v4" />
      </svg>
    ),
    step: "01",
    title: "Schedule & Consult",
    desc: "Easily book an appointment and meet our expert doctors for a personalized consultation.",
  },
  {
    svg: (
      <svg
        width="28"
        height="28"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <circle cx="14" cy="14" r="6" />
        <path d="M14 8v4l3 3" />
      </svg>
    ),
    step: "02",
    title: "Diagnosis & Treatment",
    desc: "Undergo thorough checkups and receive tailored treatments to address your health concerns.",
  },
  {
    svg: (
      <svg
        width="28"
        height="28"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M8 8h12M8 16h8M8 12h12" />
      </svg>
    ),
    step: "03",
    title: "Prescribe & Manage",
    desc: "Get prescriptions and handle payments seamlessly to complete your care journey.",
  },
];

const wellnessImages = [Product01, Product02, Product03, Product04];

export function HomePage() {
  const [ripples, setRipples] = useState([]);
  const heroRef = useRef(null);

  const handleHeroClick = (e) => {
    const rect = heroRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();

    setRipples((prev) => [...prev, { x, y, id }]);
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== id));
    }, 700);
  };

  return (
    <div
      className="homepage-container"
      style={{
        width: "100%",
        padding: "5px",
        backgroundColor: "#ffffff",
      }}
    >
      {/* HERO SECTION */}
      <section
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          gap: "2rem",
          maxWidth: "1400px",
          width: "100%",
          margin: "0 auto",
          padding: "20px 10px",
          marginTop: "1rem",
        }}
      >
        {/* Top Content Section */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "2rem",
            alignItems: "end",
            marginBottom: "1.2rem",
            flexWrap: "wrap",
          }}
        >
          <div
            className="hero-section-text"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1.3rem",
              maxWidth: "650px",
            }}
          >
            <span
              style={{
                fontSize: "clamp(1rem, 5vw, 1.2rem)",
                fontWeight: "600",
                color: "#2563eb",
                fontFamily: "var(--font-primary)",
              }}
            >
              SupaDoc
            </span>

            {/* Main Heading */}
            <h1
              style={{
                fontSize: "clamp(1.3rem, 5vw, 1.7rem)",
                fontWeight: "700",
                lineHeight: "1.1",
                margin: 0,
                color: "#0f172a",
                fontFamily: "var(--font-primary)",
              }}
            >
              Empowering Doctors with Smart, Affordable & Advanced Healthcare
              Solutions
            </h1>

            {/* Description */}
            <p
              style={{
                lineHeight: "1.6",
                color: "#64748b",
                margin: 0,
                maxWidth: "650px",
                fontSize: "clamp(0.8rem, 3vw, 0.9rem)",
                marginTop: "0.6rem",
                fontFamily: "var(--font-primary)",
              }}
            >
              Dream logicX for Doctors combines compassionate care, intelligent
              software, and modern hospital management for 24/7 medical support
              and personalized patient services. Streamline your practice with
              tools designed to enhance efficiency and patient outcomes.
            </p>
          </div>

          {/* Buttons */}
          <div
            style={{
              display: "flex",
              gap: "2rem",
              alignItems: "center",
            }}
          >
            <Link to="/doctors">
              <button
                style={{
                  cursor: "pointer",
                  backgroundColor: "#2563eb",
                  color: "#ffffff",
                  padding: "10px 25px",
                  borderRadius: "6px",
                  fontSize: "0.9rem",
                  fontFamily: "var(--font-button)",
                  fontWeight: "500",
                  border: "none",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "#1d4ed8";
                  e.target.style.transform = "scale(1.05)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "#2563eb";
                  e.target.style.transform = "scale(1)";
                }}
              >
                Get's Started
              </button>
            </Link>
            <Link to="/coming-soon">
              <button
                style={{
                  color: "#2563eb",
                  backgroundColor: "transparent",
                  borderBottom: "2px solid #2563eb",
                  padding: "10px 25px",
                  fontWeight: "600",
                  border: "none",
                  fontFamily: "var(--font-button)",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = "#1d4ed8";
                  e.target.style.borderBottomColor = "#1d4ed8";
                  e.target.style.transform = "scale(1.05)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = "#2563eb";
                  e.target.style.borderBottomColor = "#2563eb";
                  e.target.style.transform = "scale(1)";
                }}
              >
                Shop Now
              </button>
            </Link>
          </div>
        </div>

        {/* Bottom Images Section - 3 cards in a row */}
        <div
          className="hero-bottom-section"
          style={{
            display: "flex",
            gap: "1rem",
            justifyContent: "space-between",
          }}
        >
          {/* First Card - Only Image with 10px border radius */}
          <div
            className="hero-first-card"
            style={{
              borderRadius: "10px",
              overflow: "hidden",
              height: "350px",
              width: "100%",
            }}
          >
            <img
              src={Hero01}
              alt="Female Healthcare Worker"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </div>

          <div
            className="hero-right-section"
            style={{ display: "flex", maxWidth: "750px", gap: "1rem" }}
          >
            {/* Second Card - Image + Book Appointment + 98% Happy Patients */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                height: "350px",
                gap: "0",
              }}
            >
              {/* Top Image */}
              <div
                style={{
                  flex: "1.5",
                  borderRadius: "10px",
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                <img
                  src={Hero02}
                  alt="Male Doctor"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
                {/* Book Appointment Button */}
                <div
                  style={{
                    position: "absolute",
                    bottom: "15px",
                    left: "15px",
                    right: "15px",
                  }}
                >
                  <Link to="/doctor/11">
                    <button
                      style={{
                        width: "100%",
                        background: "white",
                        border: "none",
                        borderRadius: "8px",
                        padding: "12px 16px",
                        fontSize: "14px",
                        fontWeight: "600",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-around",
                        color: "#0f172a",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
                        fontFamily: "var(--font-button)",
                        transition: "all 0.3s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = "#f8fafc";
                        e.target.style.transform = "scale(1.03)";
                        e.target.style.boxShadow = "0 8px 16px rgba(0,0,0,0.15)";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = "white";
                        e.target.style.transform = "scale(1)";
                        e.target.style.boxShadow = "0 4px 12px rgba(0,0,0,0.12)";
                      }}
                    >
                      Book a appointment
                      <span>
                        <BsArrowRight
                          style={{
                            fontSize: "1.3rem",
                          }}
                        />
                      </span>
                    </button>
                  </Link>
                </div>
              </div>

              {/* Bottom 98% Happy Patients */}
              <div
                style={{
                  flex: "1",
                  background: "#0f172a",
                  borderRadius: "10px",
                  padding: "16px",
                  color: "white",
                  marginTop: "10px",
                  display: "flex",
                  justifyContent: "space-around",
                  alignItems: "center",
                }}
              >
                <div>
                  <img src={TooltipImg} alt="" style={{ maxWidth: "120px" }} />
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div
                    style={{
                      fontSize: "clamp(1.5rem, 4vw, 2rem)",
                      fontWeight: "700",
                      color: "#2563eb",
                      marginBottom: "2px",
                      fontFamily: "var(--font-primary)",
                    }}
                  >
                    98%
                  </div>
                  <div
                    style={{
                      fontSize: "clamp(0.9rem, 4vw, 1rem)",
                      fontWeight: "600",
                      fontFamily: "var(--font-primary)",
                    }}
                  >
                    Happy Patients
                  </div>
                </div>
              </div>
            </div>

            {/* Third Card - Image + Small Card + Description */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                height: "350px",
                position: "relative",
              }}
              className="hero-third-card"
            >
              {/* Background Image */}
              <div
                style={{
                  flex: "1",
                  borderRadius: "12px",
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                <img
                  src={Hero03}
                  alt="Skincare Treatment"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />

                {/* Bottom Card - exactly like your image */}
                <div
                  style={{
                    position: "absolute",
                    bottom: "16px",
                    left: "16px",
                    right: "16px",
                    background: "rgba(255, 255, 255, 0.95)",
                    borderRadius: "12px",
                    padding: "16px",
                    backdropFilter: "blur(10px)",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
                  }}
                >
                  <p
                    style={{
                      fontSize: "14px",
                      lineHeight: "1.4",
                      color: "#475569",
                      margin: 0,
                      fontWeight: "500",
                      fontFamily: "var(--font-primary)",
                    }}
                  >
                    Choose a specialist, view availability, and confirm your
                    appointment in just a few clicks.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* REACH OUT SECTION */}
      <section
        className="reach-out"
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          display: "flex",
          justifyContent: "center",
          alignItems: "stretch",
          gap: "20px",
          padding: "20px 10px",
          marginTop: "32px",
          flexWrap: "wrap",
        }}
      >
        {reachOutCards.map((card, idx) =>
          card.img ? (
            <div
              key={idx}
              style={{
                flex: 1,
                background: card.bg,
                borderRadius: "18px",
                padding: "0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minWidth: "280px",
                boxSizing: "border-box",
              }}
            >
              <img
                src={card.img}
                alt={card.alt}
                style={{
                  width: "100%",
                  objectFit: "cover",
                  borderRadius: "18px",
                  maxHeight: "300px",
                }}
              />
            </div>
          ) : (
            <div
              key={idx}
              style={{
                flex: 1,
                background: card.bg,
                color: card.color || "#fff",
                borderRadius: "10px",
                padding: "20px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                minWidth: "280px",
                boxSizing: "border-box",
                border: card.bg === "#ffffff" ? "1px solid #f1f5f9" : "none",
              }}
              className="reach-out-text"
            >
              <div style={{ flex: 1 }}>
                {card.svg && (
                  <div
                    style={{
                      color: "#2563eb",
                      fontSize: "1.6rem",
                      marginBottom: "18px",
                    }}
                  >
                    {card.svg}
                  </div>
                )}
                <h2
                  style={{
                    fontSize: "clamp(1.2rem, 4vw, 1.3rem)",
                    fontWeight: 600,
                    marginBottom: "18px",
                    fontFamily: "var(--font-primary)",
                    color: card.color || "#fff",
                  }}
                >
                  {card.title}
                </h2>
                <p
                  style={{
                    fontSize: "clamp(0.8rem, 4vw, 0.9rem)",
                    marginBottom: "32px",
                    marginTop: "32px",
                    lineHeight: "1.6",
                    fontFamily: "var(--font-primary)",
                    color: card.bg === "#ffffff" ? "#475569" : "inherit",
                  }}
                >
                  {card.desc}
                </p>
              </div>
              {card.button && (
                <Link to={card.link}>
                  <button
                    style={{
                      background: "#2563eb",
                      color: "#fff",
                      border: "none",
                      borderRadius: "6px",
                      padding: "12px 20px",
                      fontWeight: 500,
                      fontSize: "0.8rem",
                      cursor: "pointer",
                      marginTop: "auto",
                      maxWidth: "200px",
                      fontFamily: "var(--font-button)",
                      transition: "all 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = "#1d4ed8";
                      e.target.style.transform = "scale(1.05)";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = "#2563eb";
                      e.target.style.transform = "scale(1)";
                    }}
                  >
                    {card.button}
                  </button>
                </Link>
              )}
            </div>
          )
        )}
      </section>

      {/* FUTURE OF HEALTHCARE */}
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "0 10px",
          marginTop: "25px",
          marginBottom: "25px",
        }}
      >
        <h2
          style={{
            fontSize: "clamp(1.2rem, 4vw, 1.3rem)",
            fontWeight: 500,
            fontFamily: "var(--font-primary)",
            color: "#0f172a",
          }}
        >
          Building The Future Of{" "}
          <span style={{ color: "#2563eb" }}>Healthcare .</span>
        </h2>
      </div>

      {/* EXPERT WELLNESS SECTION */}
      <section
        className="expert-wellness-section"
        style={{
          maxWidth: "1400px",
          margin: "40px auto",
          display: "flex",
          gap: "20px",
          padding: "0 10px",
          alignItems: "stretch",
          flexWrap: "wrap",
        }}
      >
        {/* Expert Info */}
        <div
          style={{
            flex: 1.2,
            background: "#ffffff",
            borderRadius: "10px",
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            minWidth: "320px",
            border: "1px solid #f1f5f9",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          }}
          className="expert-info-content"
        >
          <div
            style={{
              display: "flex",
              gap: "24px",
              justifyContent: "center",
              alignItems: "center",
            }}
            className="expert-stats"
          >
            <div className="expert-info-text">
              <h2
                style={{
                  fontSize: "clamp(1.2rem, 4vw, 1.3rem)",
                  fontWeight: 600,
                  color: "#0f172a",
                  marginBottom: "25px",
                  fontFamily: "var(--font-primary)",
                }}
              >
                Meet Our Dermatology Expert
                <span style={{ color: "#2563eb" }}> .</span>
              </h2>
              <p
                style={{
                  fontSize: "clamp(0.8rem, 4vw, 0.9rem)",
                  color: "#475569",
                  lineHeight: "1.6",
                  flex: 1,
                  fontFamily: "var(--font-primary)",
                }}
              >
                Dr. Prashant Harit, with over 10 years in dermatology, leads
                SupaDoc in Datia. He specializes in skin care, hair loss, acne,
                psoriasis, using advanced diagnostics and personalized plans to
                restore confidence.
              </p>
            </div>
            <span
              style={{
                fontWeight: 700,
                fontSize: "clamp(1.3rem, 4vw, 1.5rem)",
                color: "#2563eb",
                marginLeft: "24px",
                whiteSpace: "nowrap",
                fontFamily: "var(--font-primary)",
              }}
            >
              Supadoc.
            </span>
          </div>
          <hr
            style={{
              margin: "24px 0",
              border: "none",
              borderTop: "1px solid #e2e8f0",
            }}
          />
          <div>
            <h3
              style={{
                fontSize: "clamp(0.8rem, 4vw, 1rem)",
                fontWeight: 500,
                color: "#0f172a",
                marginBottom: "1.3rem",
                maxWidth: "450px",
                fontFamily: "var(--font-primary)",
              }}
            >
              A glimpse into our commitment to advanced skin care and patient
              well–being.
            </h3>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "24px",
                justifyContent: "space-between",
              }}
              className="expert-stats"
            >
              <img
                src={ExpertDoctorImg}
                alt="Dermatology Expert"
                style={{
                  maxWidth: "280px",
                  maxHeight: "260px",
                  objectFit: "cover",
                  borderRadius: "10px",
                }}
              />
              <div style={{ textAlign: "center", maxWidth: "250px" }}>
                <span
                  style={{
                    fontWeight: 700,
                    fontSize: "clamp(2rem, 5vw, 2.2rem)",
                    color: "#0f172a",
                    fontFamily: "var(--font-primary)",
                  }}
                >
                  1{" "}
                  <span
                    style={{
                      background: "#2563eb",
                      color: "#fff",
                      borderRadius: "6px",
                      padding: "2px 10px",
                      fontSize: "1.1rem",
                      margin: "0 4px",
                      fontWeight: 600,
                      verticalAlign: "middle",
                      display: "inline-block",
                      fontFamily: "var(--font-primary)",
                    }}
                  >
                    In
                  </span>{" "}
                  5
                </span>
                <div
                  style={{
                    fontSize: "1rem",
                    color: "#475569",
                    marginTop: "8px",
                    fontFamily: "var(--font-primary)",
                  }}
                >
                  1 in 5 Patients See Improvement in 4 Weeks
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Wellness Products */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            minWidth: "320px",
            padding: "10px",
            maxWidth: "600px",
          }}
          className="wellness-products-content"
        >
          <h2
            style={{
              fontSize: "clamp(1.1rem, 4vw, 1.3rem)",
              fontWeight: 500,
              color: "#0f172a",
              marginBottom: "18px",
              fontFamily: "var(--font-primary)",
            }}
          >
            Feel Your Best with Our Wellness Treasures
          </h2>
          <div
            style={{
              overflow: "hidden",
              width: "352px",
              marginBottom: "18px",
              borderRadius: "8px",
            }}
            className="marquee-container"
          >
            <div
              style={{
                display: "flex",
                gap: "16px",
                animation: "marquee 16s linear infinite",
                width: "fit-content",
              }}
              className="marquee-images"
            >
              {[
                ...wellnessImages,
                ...wellnessImages, // repeat for smooth marquee
              ].map((src, idx) => (
                <img
                  key={idx}
                  src={src}
                  alt={`Product ${idx + 1}`}
                  style={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "10px",
                    objectFit: "cover",
                    flexShrink: 0,
                    border: "2px solid #FFFFFF",
                  }}
                />
              ))}
            </div>
          </div>
          <p
            style={{
              fontSize: "0.9rem",
              marginBottom: "32px",
              lineHeight: "1.6",
              fontFamily: "var(--font-primary)",
              color: "#475569",
            }}
          >
            Embrace a healthier you with products from Minimalist, Clinically,
            Orimii, Cetaphil, and more, handpicked by Dr. Prashant Harit. Shop
            with confidence for beauty and well-being on our store.
          </p>
          <Link to="/coming-soon">
            <span
              style={{
                cursor: "pointer",
                fontWeight: 600,
                backgroundColor: "#2563eb",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                maxWidth: "150px",
                padding: "15px 0px",
                justifyContent: "center",
                color: "#fff",
                borderRadius: "6px",
                fontSize: "0.8rem",
                fontFamily: "var(--font-button)",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "#1d4ed8";
                e.target.style.transform = "scale(1.05)";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "#2563eb";
                e.target.style.transform = "scale(1)";
              }}
            >
              Buy Products
            </span>
          </Link>
        </div>
      </section>

      {/* CLINIC & DOCTOR SECTION */}
      <ClinicDoctor />

      {/* OPERATIONAL METHOD SECTION */}
      <section
        className="healthcare-method-section"
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "0 10px",
          marginTop: "1.5rem",
        }}
      >
        <h2
          style={{
            color: "#2563eb",
            fontWeight: 600,
            fontSize: "clamp(1.2rem, 4vw, 1.3rem)",
            marginBottom: "45px",
            letterSpacing: "0.01em",
            textAlign: "center",
            fontFamily: "var(--font-primary)",
          }}
        >
          Our Operational Method
        </h2>
        <div
          className="heathcare-method-intro"
          style={{
            textAlign: "start",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <h3
            style={{
              color: "#0f172a",
              fontWeight: 600,
              fontSize: "clamp(1.2rem, 4vw, 1.3rem)",
              marginBottom: "15px",
              fontFamily: "var(--font-primary)",
            }}
          >
            Your Ultimate Health Companion
          </h3>
          <p
            style={{
              color: "#475569",
              fontSize: "clamp(0.8rem, 4vw, 0.9rem)",
              lineHeight: "1.6",
              maxWidth: "700px",
              width: "100%",
              fontFamily: "var(--font-primary)",
            }}
          >
            We serve as your reliable one-stop destination for all your
            healthcare needs. Our extensive directory is crafted to offer
            convenient access to a diverse array of healthcare services and
            providers, guaranteeing optimal care for you and your family.
          </p>
        </div>
        <div
          style={{
            display: "flex",
            gap: "32px",
            justifyContent: "center",
            flexWrap: "wrap",
            marginTop: "55px",
          }}
          className="operational-cards-container"
        >
          {operationalCards.map((card, idx) => (
            <div
              key={idx}
              style={{
                background: "#ffffff",
                borderRadius: "14px",
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                border: "1px solid #f1f5f9",
                padding: "20px",
                minWidth: "260px",
                maxWidth: "340px",
                flex: "1 1 260px",
                textAlign: "left",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "space-between",
                transition: "all 0.2s ease",
              }}
              className="operational-card"
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.12)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.1)";
              }}
            >
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  marginBottom: "18px",
                  justifyContent: "space-between",
                }}
              >
                <span
                  style={{
                    color: "#2563eb",
                    fontSize: "1.3rem",
                  }}
                >
                  {card.svg}
                </span>
                <span
                  style={{
                    fontWeight: 700,
                    fontSize: "1.1rem",
                    color: "#2563eb",
                    fontFamily: "var(--font-primary)",
                  }}
                >
                  {card.step}
                </span>
              </div>
              <h4
                style={{
                  fontWeight: 700,
                  fontSize: "clamp(1.1rem, 4vw, 1.15rem)",
                  marginBottom: "105px",
                  color: "#0f172a",
                  fontFamily: "var(--font-primary)",
                }}
              >
                {card.title}
              </h4>
              <p
                style={{
                  color: "#475569",
                  fontSize: "clamp(0.9rem, 4vw, 1rem)",
                  lineHeight: "1.5",
                  fontFamily: "var(--font-primary)",
                }}
              >
                {card.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* DEPARTMENT SECTION */}
      <section style={{ marginTop: "-30px" }}>
        <Departments />
      </section>

      {/* WHY CHOOSE US SECTION */}
      <section
        className="why-choose-section"
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "0 10px",
          marginTop: "60px",
        }}
      >
        <h2
          className="why-choose-heading"
          style={{
            color: "#0f172a",
            fontWeight: 600,
            fontSize: "clamp(1.2rem, 4vw, 1.3rem)",
            marginBottom: "45px",
            letterSpacing: "0.01em",
            textAlign: "center",
            fontFamily: "var(--font-primary)",
          }}
        >
          Why Choose Us ?
        </h2>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "45px",
            marginBottom: "40px",
            justifyContent: "center",
          }}
        >
          <div style={{ flex: 1 }}>
            <h3
              style={{
                color: "#0f172a",
                fontWeight: 600,
                fontSize: "clamp(1.2rem, 4vw, 1.3rem)",
                marginBottom: "28px",
                fontFamily: "var(--font-primary)",
              }}
            >
              The future of personal care is here
            </h3>
            <p
              style={{
                color: "#475569",
                fontSize: "clamp(0.8rem, 4vw, 0.9rem)",
                lineHeight: "1.6",
                maxWidth: "600px",
                width: "100%",
                fontFamily: "var(--font-primary)",
              }}
            >
              At SupaDoc, we integrate expert care, advanced telehealth, and
              curated products under Dr. Prashant Harit's leadership, delivering
              a holistic health experience for all.
            </p>
          </div>
        </div>
        <div
          style={{
            maxWidth: "1200px",
            width: "100%",
            margin: "0 auto",
            textAlign: "center",
          }}
          className="why-choose-cards"
        >
          <div className="why-choose-cards-scroll" tabIndex={0}>
            {whyChooseCards.map((card, idx) => (
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  flexDirection: "column",
                  alignItems: "center",
                  maxWidth: "270px",
                  minHeight: "180px",
                  justifyContent: "space-between",
                }}
                className="why-choose-card"
                key={idx}
              >
                <img
                  src={card.img}
                  alt={card.title}
                  className="why-choose-card-img"
                  style={{
                    width: "64px",
                    height: "64px",
                    marginBottom: "28px",
                    objectFit: "contain",
                  }}
                />
                <h4
                  style={{
                    fontSize: "clamp(1rem, 4vw, 1.1rem)",
                    fontWeight: 600,
                    color: "#0f172a",
                    fontFamily: "var(--font-primary)",
                  }}
                  className="why-choose-card-title"
                >
                  {card.title}
                </h4>
                <p
                  style={{
                    fontSize: "clamp(0.8rem, 4vw, 0.9rem)",
                    color: "#475569",
                    fontFamily: "var(--font-primary)",
                  }}
                  className="why-choose-card-desc"
                >
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIAL SECTION */}
      <section
        style={{
          maxWidth: "1400px",
          width: "100%",
          margin: "0 auto",
          padding: "0 10px",
          marginTop: "60px",
          overflow: "visible",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h2
          style={{
            color: "#0f172a",
            fontWeight: 600,
            fontSize: "clamp(1.2rem, 4vw, 1.3rem)",
            marginBottom: "45px",
            letterSpacing: "0.01em",
            textAlign: "center",
            fontFamily: "var(--font-primary)",
          }}
        >
          What Our Patients Say
        </h2>
        <div style={{ width: "100%" }}>
          <InfiniteMovingCardsDemo />
        </div>
      </section>
    </div>
  );
}

export default HomePage;