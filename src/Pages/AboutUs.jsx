import React, { useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Img01 from "../Images/AboutImg/01.png";
import Img02 from "../Images/AboutImg/02.png";
import Img03 from "../Images/AboutImg/03.png";
import Img04 from "../Images/AboutImg/04.png";
import Img05 from "../Images/AboutImg/05.png";
import Img06 from "../Images/AboutImg/06.png";
import Img07 from "../Images/AboutImg/07.png";
import OutreachImg from "../Images/AboutImg/Health-Outreach.png";
import ECommerceImg from "../Images/AboutImg/shopping-bag.png";
import DigitalServicesImg from "../Images/AboutImg/Patient-Digital.png";
import DashboardImg from "../Images/AboutImg/Dashboard-Admin.png";
import MedicalServicesImg from "../Images/AboutImg/Core-Medical.png";
import AboutheroImg from "../Images/AboutImg/about-hero.png";
import Abouthero01Img from "../Images/AboutImg/about-02.png";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Simple and clean animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const stagger = {
  visible: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const slideUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

function AboutUs() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(4);

  // Refs for intersection observer
  const heroRef = useRef(null);
  const ecosystemRef = useRef(null);
  const successRef = useRef(null);
  const outreachRef = useRef(null);

  // Simple intersection observers
  const isHeroInView = useInView(heroRef, { once: true, margin: "-100px" });
  const isEcosystemInView = useInView(ecosystemRef, { once: true, margin: "-100px" });
  const isSuccessInView = useInView(successRef, { once: true, margin: "-100px" });
  const isOutreachInView = useInView(outreachRef, { once: true, margin: "-100px" });

  const successStories = [
    {
      text: "SupaDoc made my skin journey easy and stress-free. Dr. Hant's advice changed my life!",
      img: Img01,
      height: "320px",
      marginTop: "0px",
    },
    {
      text: "The telehealth feature is a blessing for busy professionals. Highly recommend SupaDoc.",
      img: Img02,
      height: "320px",
      marginTop: "40px",
    },
    {
      text: "I found the best dermatologist in Delhi through SupaDoc. Seamless experience!",
      img: Img03,
      height: "320px",
      marginTop: "0px",
    },
    {
      text: "E-commerce integration is so convenient. Got my Minimalist products delivered fast.",
      img: Img04,
      height: "320px",
      marginTop: "60px",
    },
    {
      text: "Clinic management is now effortless. The dashboard is intuitive and powerful.",
      img: Img05,
      height: "320px",
      marginTop: "0px",
    },
    {
      text: "My patients love the online appointment system. Thank you, SupaDoc!",
      img: Img06,
      height: "320px",
      marginTop: "30px",
    },
    {
      text: "The support team is responsive and helpful. SupaDoc is a game-changer.",
      img: Img07,
      height: "320px",
      marginTop: "0px",
    },
  ];

  const healthEcosystemCards = [
    {
      img: ECommerceImg,
      title: "E-Commerce Excellence",
      desc: "Curated products from Clinically, Minimalist, Cetaphil.",
    },
    {
      img: DigitalServicesImg,
      title: "Patient Digital Services",
      desc: "Online appointments and telehealth consultations.",
    },
    {
      img: DashboardImg,
      title: "Dashboard Admin Panel",
      desc: "Manage clinics, doctors, and live diagnostic services.",
    },
    {
      img: MedicalServicesImg,
      title: "Core Medical Services",
      desc: "Dermatology and medicine for life-first approach.",
    },
  ];

  useEffect(() => {
    const updateCardsPerView = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setCardsPerView(1);
      } else if (width < 768) {
        setCardsPerView(1);
      } else if (width < 1024) {
        setCardsPerView(2);
      } else if (width < 1280) {
        setCardsPerView(3);
      } else {
        setCardsPerView(4);
      }
    };

    updateCardsPerView();
    window.addEventListener("resize", updateCardsPerView);
    return () => window.removeEventListener("resize", updateCardsPerView);
  }, []);

  useEffect(() => {
    setCurrentSlide(0);
  }, [cardsPerView]);

  const maxSlides = Math.max(0, successStories.length - cardsPerView);

  const nextSlide = () => {
    setCurrentSlide((prev) => Math.min(prev + 1, maxSlides));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => Math.max(prev - 1, 0));
  };

  const goToSlide = (index) => {
    setCurrentSlide(Math.min(index, maxSlides));
  };

  const cardWidth = 100 / cardsPerView;
  const translateX = -(currentSlide * cardWidth);

  return (
    <div
      style={{
        fontFamily: "var(--font-primary)",
        backgroundColor: "var(--bg-primary)",
        minHeight: "100vh",
      }}
    >
      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        initial="hidden"
        animate={isHeroInView ? "visible" : "hidden"}
        variants={stagger}
        className="hero-section"
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "flex",
          justifyContent: "center",
          padding: "3rem 1rem",
        }}
      >
        <div
          style={{
            maxWidth: "1400px",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "25px",
          }}
        >
          {/* Header */}
          <motion.div
            variants={fadeIn}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              flexWrap: "wrap",
              gap: "30px",
            }}
          >
            <div>
              <p
                style={{
                  color: "var(--color-text)",
                  fontSize: "14px",
                  margin: "0 0 8px 0",
                  fontWeight: "400",
                }}
              >
                About me
              </p>
              <motion.h1
                variants={slideUp}
                style={{
                  color: "var(--color-heading)",
                  fontSize: "clamp(1.5rem, 4vw, 2rem)",
                  fontWeight: "700",
                  margin: "1.2rem 0",
                  lineHeight: "1.3",
                  maxWidth: "500px",
                }}
              >
                Welcome to SupaDoc: Your Health Partner
              </motion.h1>
              <motion.p
                variants={slideUp}
                style={{
                  color: "var(--color-text)",
                  fontSize: "clamp(0.8rem, 4vw, 0.9rem)",
                  margin: "16px 0 0 0",
                  maxWidth: "450px",
                  lineHeight: "1.6",
                }}
              >
                Dr. Prashant Hant's platform links clinics, doctors, and
                e-commerce with Clinically, Minimalist, Cetaphil products.
              </motion.p>
            </div>
            <motion.button
              variants={fadeIn}
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
              style={{
                backgroundColor: "transparent",
                border: "2px solid var(--border-color)",
                borderRadius: "8px",
                padding: "12px 24px",
                color: "var(--color-heading)",
                fontSize: "14px",
                fontWeight: "500",
                cursor: "pointer",
                fontFamily: "var(--font-button)",
                transition: "all 0.2s ease",
              }}
            >
              Join SupaDoc
            </motion.button>
          </motion.div>

          {/* Images */}
          <motion.div
            variants={fadeIn}
            style={{
              display: "grid",
              gridTemplateColumns: "65% 35%",
              gap: "10px",
              marginTop: "20px",
            }}
            className="hero-images"
          >
            <motion.img
              src={AboutheroImg}
              alt="Healthcare Professional at Desk"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              style={{
                width: "100%",
                height: "350px",
                borderRadius: "16px",
                objectFit: "cover",
              }}
            />
            <motion.img
              src={Abouthero01Img}
              alt="Doctor in Consultation Room"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              style={{
                width: "100%",
                height: "350px",
                borderRadius: "16px",
                objectFit: "cover",
              }}
            />
          </motion.div>
        </div>
      </motion.section>

      {/* Health Ecosystem Section */}
      <motion.section
        ref={ecosystemRef}
        initial="hidden"
        animate={isEcosystemInView ? "visible" : "hidden"}
        variants={stagger}
        className="health-ecosystem-section"
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "0 1rem",
          marginBottom: "3rem",
        }}
      >
        <motion.div
          variants={fadeIn}
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
                color: "var(--color-heading)",
                fontWeight: 600,
                fontSize: "clamp(1.2rem, 4vw, 1.3rem)",
                marginBottom: "28px",
                fontFamily: "var(--font-primary)",
              }}
            >
              Your All-in-One Health Ecosystem
            </h3>
            <p
              style={{
                color: "var(--color-text)",
                fontSize: "clamp(0.8rem, 4vw, 0.9rem)",
                lineHeight: "1.6",
                maxWidth: "600px",
                width: "100%",
                fontFamily: "var(--font-primary)",
              }}
            >
              Under Dr. Prashant Harit's visionary leadership, SupaDoc
              seamlessly integrates a network of clinics, expert doctors, and
              innovative services throughout Delhi.
            </p>
          </div>
        </motion.div>
        <div
          style={{
            maxWidth: "1200px",
            width: "100%",
            margin: "0 auto",
            textAlign: "center",
          }}
          className="health-ecosystem-cards"
        >
          <motion.div 
            variants={stagger}
            className="health-ecosystem-cards-scroll" 
            tabIndex={0}
          >
            {healthEcosystemCards.map((card, idx) => (
              <motion.div
                key={idx}
                variants={slideUp}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  flexDirection: "column",
                  alignItems: "center",
                  maxWidth: "270px",
                  minHeight: "180px",
                  justifyContent: "space-between",
                }}
                className="health-ecosystem-card"
              >
                <img
                  src={card.img}
                  alt={card.title}
                  className="health-ecosystem-card-img"
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
                    color: "var(--color-heading)",
                  }}
                  className="health-ecosystem-card-title"
                >
                  {card.title}
                </h4>
                <p
                  style={{
                    fontSize: "clamp(0.8rem, 4vw, 0.9rem)",
                    color: "var(--color-text)",
                  }}
                  className="health-ecosystem-card-desc"
                >
                  {card.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Success Story Section */}
      <motion.section
        ref={successRef}
        initial="hidden"
        animate={isSuccessInView ? "visible" : "hidden"}
        variants={stagger}
        style={{
          padding : '2rem 1rem',
          backgroundColor: "var(--bg-primary)",
          fontFamily: "var(--font-primary)",
        }}
      >
        <div
          style={{
            maxWidth: "1400px",
            width: "100%",
            margin: "0 auto",
          }}
        >
          {/* Header */}
          <motion.div
            variants={fadeIn}
            style={{
              marginBottom: "clamp(50px, 6vw, 70px)",
            }}
          >
            <h2
              style={{
                color: "var(--color-heading)",
                fontSize: "clamp(1.3rem, 4vw, 1.5rem)",
                fontWeight: "600",
                margin: "0 0 16px 0",
                lineHeight: "1.3",
                fontFamily: "var(--font-primary)",
              }}
            >
              Celebrating Our Success Gallery
            </h2>
            <p
              style={{
                color: "var(--color-text)",
                fontSize: "clamp(0.85rem, 2.5vw, 0.95rem)",
                lineHeight: "1.6",
                margin: 0,
                maxWidth: "600px",
                fontFamily: "var(--font-primary)",
              }}
            >
              Explore the journeys of happy patients and thriving doctors
              transformed by Dr. Prashant Hant's vision at SupaDoc.
            </p>
          </motion.div>

          {/* Carousel Container */}
          <motion.div
            variants={fadeIn}
            style={{
              position: "relative",
              overflow: "hidden",
              width: "100%",
              marginBottom: "clamp(40px, 5vw, 50px)",
            }}
          >
            <motion.div
              animate={{ x: `${translateX}%` }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              style={{
                display: "flex",
                gap: "clamp(16px, 2.5vw, 24px)", 
              }} 
              className="testimonial-cards-container"
            >
              {successStories.map((story, index) => (
                <motion.div
                  key={index}
                  whileHover={{ 
                    y: -8, 
                    boxShadow: "0 8px 30px rgba(0, 0, 0, 0.12)",
                    transition: { duration: 0.3 }
                  }}
                  className="testimonial-card"
                  style={{
                    width: `calc(${cardWidth}% - clamp(12px, 1.875vw, 18px))`,
                    minWidth: `calc(${cardWidth}% - clamp(12px, 1.875vw, 18px))`,
                    borderRadius: "16px",
                    position: "relative",
                    overflow: "hidden",
                    flexShrink: 0,
                    backgroundColor: "var(--bg-primary)",
                    border: "1px solid var(--border-color)",
                    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
                    transition: "all 0.3s ease",
                  }}
                >
                  {/* Image */}
                  <div
                    style={{
                      width: "100%",
                      height: "clamp(200px, 25vw, 260px)",
                      overflow: "hidden",
                      borderRadius: "16px 16px 0 0",
                    }}
                  >
                    <motion.img
                      src={story.img}
                      alt={`${story.name}`}
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>

                  {/* Content */}
                  <div
                    style={{
                      padding: "clamp(20px, 3vw, 28px)",
                      display: "flex",
                      flexDirection: "column",
                      gap: "16px",
                    }}
                  >
                    {/* Testimonial Text */}
                    <p
                      style={{
                        fontSize: "clamp(14px, 2.2vw, 15px)",
                        color: "var(--color-text)",
                        lineHeight: "1.6",
                        margin: 0,
                        fontStyle: "italic",
                        fontFamily: "var(--font-primary)",
                      }}
                    >
                      "{story.text}"
                    </p>

                    {/* Doctor Info */}
                    <div
                      style={{
                        borderTop: "1px solid var(--border-color)",
                        paddingTop: "16px",
                      }}
                    >
                      <h4
                        style={{
                          fontSize: "clamp(15px, 2.5vw, 16px)",
                          fontWeight: "600",
                          color: "var(--color-heading)",
                          margin: "0 0 4px 0",
                          fontFamily: "var(--font-primary)",
                        }}
                      >
                        {story.name}
                      </h4>
                      <p
                        style={{
                          fontSize: "clamp(13px, 2vw, 14px)",
                          color: "var(--color-button)",
                          margin: 0,
                          fontWeight: "500",
                          fontFamily: "var(--font-primary)",
                        }}
                      >
                        {story.specialty}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Navigation */}
          {maxSlides > 0 && (
            <motion.div
              variants={fadeIn}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "24px",
              }}
            >
              {/* Navigation Arrows */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "16px",
                }}
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={prevSlide}
                  disabled={currentSlide === 0}
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%",
                    border: `2px solid ${
                      currentSlide === 0
                        ? "var(--border-color)"
                        : "var(--color-button)"
                    }`,
                    backgroundColor:
                      currentSlide === 0
                        ? "var(--bg-secondary)"
                        : "var(--bg-primary)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: currentSlide === 0 ? "not-allowed" : "pointer",
                    color:
                      currentSlide === 0
                        ? "var(--border-color)"
                        : "var(--color-button)",
                    transition: "all 0.3s ease",
                    opacity: currentSlide === 0 ? 0.6 : 1,
                  }}
                >
                  <ChevronLeft size={20} />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={nextSlide}
                  disabled={currentSlide >= maxSlides}
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%",
                    border: `2px solid ${
                      currentSlide >= maxSlides
                        ? "var(--border-color)"
                        : "var(--color-button)"
                    }`,
                    backgroundColor:
                      currentSlide >= maxSlides
                        ? "var(--bg-secondary)"
                        : "var(--bg-primary)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor:
                      currentSlide >= maxSlides ? "not-allowed" : "pointer",
                    color:
                      currentSlide >= maxSlides
                        ? "var(--border-color)"
                        : "var(--color-button)",
                    transition: "all 0.3s ease",
                    opacity: currentSlide >= maxSlides ? 0.6 : 1,
                  }}
                >
                  <ChevronRight size={20} />
                </motion.button>
              </div>

              {/* Slide Indicators */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "8px",
                  flexWrap: "wrap",
                }}
              >
                {Array.from({ length: maxSlides + 1 }, (_, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => goToSlide(index)}
                    style={{
                      width: currentSlide === index ? "28px" : "10px",
                      height: "10px",
                      borderRadius: "5px",
                      border: "none",
                      backgroundColor:
                        currentSlide === index
                          ? "var(--color-button)"
                          : "var(--border-color)",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                    }}
                  />
                ))}
              </div>

              {/* Stats */}
              <div
                style={{
                  fontSize: "14px",
                  color: "var(--color-text)",
                  fontFamily: "var(--font-primary)",
                  textAlign: "center",
                }}
              >
                Showing {currentSlide + 1}-
                {Math.min(currentSlide + cardsPerView, successStories.length)}{" "}
                of {successStories.length} success stories
              </div>
            </motion.div>
          )}
        </div>
      </motion.section>

      {/* Health Outreach Section */}
      <motion.section
        ref={outreachRef}
        initial="hidden"
        animate={isOutreachInView ? "visible" : "hidden"}
        variants={stagger}
        style={{
          padding : '3rem 1rem',
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            maxWidth: "1400px",
            width: "100%",
            textAlign: "center",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <motion.h2
            variants={fadeIn}
            style={{
              color: "var(--color-heading)",
              fontSize: "clamp(1.2rem, 4vw, 1.4rem)",
              fontWeight: "700",
              margin: "0 0 20px 0",
            }}
          >
            Health Outreach
          </motion.h2>
          <motion.p
            variants={fadeIn}
            style={{
              color: "var(--color-text)",
              fontSize: "clamp(0.8rem, 4vw, 0.9rem)",
              margin: "0 0 60px 0",
              maxWidth: "600px",
              marginLeft: "auto",
              marginRight: "auto",
              lineHeight: "1.6",
            }}
          >
            We extend Dr. Prashant Hant's expertise to clinics and patients
            across India, with a mission to broaden telehealth and wellness
            access nationwide and beyond.
          </motion.p>

          {/* World Map Representation */}
          <motion.div
            variants={slideUp}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
            style={{
              borderRadius: "16px",
              display: "flex",
              maxWidth: "950px",
              justifyContent: "center",
              margin: "0 auto",
            }} 
            className="outreach-image"
          >
            <img src={OutreachImg} alt="Health Outreach Map" />
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}

export default AboutUs;