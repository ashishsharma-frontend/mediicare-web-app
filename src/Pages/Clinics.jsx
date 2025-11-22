import { useQuery } from "@tanstack/react-query";
import { GET } from "../Controllers/ApiControllers";
import {
  Box,
  Flex,
  Image,
  Skeleton,
  Text,
  Container,
  HStack,
  IconButton,
} from "@chakra-ui/react";
import imageBaseURL from "./../Controllers/image";
import { Link } from "react-router-dom";
import ErrorPage from "../Pages/ErrorPage";
import { useCity } from "../Context/SelectedCity";
import NotAvailable from "../Components/NotAvailable";
import {
  FaHospital,
  FaMapMarkerAlt,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { useRef, useState, useEffect } from "react";

export default function Clinics({ onTabMount }) {
  const { selectedCity } = useCity();
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const getData = async () => {
    const url = selectedCity
      ? `get_clinic?active=1&city_id=${selectedCity.id}`
      : `get_clinic?active=1`;
    const res = await GET(url);
    return res.data;
  };

  const { isLoading, data, error } = useQuery({
    queryKey: ["clinics", selectedCity?.id, "1000"],
    queryFn: getData,
  });

  // Check scroll position and update button states
  const checkScrollButtons = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  // Scroll handlers
  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -340, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 340, behavior: "smooth" });
    }
  };

  // Effect to handle scroll and tab activation
  useEffect(() => {
    const container = scrollRef.current;
    if (container) {
      checkScrollButtons(); // Initial check
      const handleScroll = () => checkScrollButtons();
      container.addEventListener("scroll", handleScroll);

      // Cleanup
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, [data]);

  // Recheck on mount, tab switch, or prop change
  useEffect(() => {
    const timer = setTimeout(checkScrollButtons, 100);
    return () => clearTimeout(timer);
  }, [data, onTabMount]);

  if (error) return <ErrorPage />;

  return (
    <Box
      bg="#fafbfc"
      minH="100vh"
      fontFamily="'Inter', sans-serif"
      style={{ marginBottom: "-6rem" }}
    >
      <Box bg="#0f172a" color="white" py={{ base: 6, md: 8 }}>
        <Container maxW="1200px" px={{ base: 4, md: 6 }}>
          <Box maxW="600px">
            <Text
              fontWeight="600"
              lineHeight="1.3"
              mb={3}
              style={{ 
                fontSize: "clamp(1.2rem, 4vw, 1.5rem)",
                fontFamily: "var(--font-primary)",
              }}
            >
              Healthcare Clinics in {selectedCity?.name || "Your City"}
            </Text>
            <Text
              lineHeight="1.5"
              color="rgba(255,255,255,0.8)"
              style={{
                fontSize: "clamp(0.8rem, 2.5vw, 0.9rem)",
                marginTop: "1rem",
                fontFamily: "var(--font-primary)",
              }}
            >
              Quality healthcare facilities with expert physicians and advanced
              medical services for comprehensive patient care.
            </Text>
          </Box>
        </Container>
      </Box>

      <Container maxW="1200px" px={{ base: 4, md: 6 }} py={{ base: 6, md: 8 }}>
        <Flex align="center" justify="space-between" mb={6}>
          <Flex align="center" gap={3}>
            <Box p={2} bg="#f5f7fa" borderRadius="6px">
              <FaHospital size="18px" color="#2563eb" />
            </Box>
            <Box>
              <Text
                fontSize={{ base: "20px", md: "22px" }}
                fontWeight="600"
                color="#0f172a"
                fontFamily="var(--font-primary)"
              >
                Available Clinics
              </Text>
              <Text fontSize="14px" color="#64748b" fontFamily="var(--font-primary)">
                {data?.length || 0} healthcare facilities found
              </Text>
            </Box>
          </Flex>

          <HStack spacing={2}>
            <IconButton
              icon={<FaChevronLeft />}
              onClick={scrollLeft}
              isDisabled={!canScrollLeft}
              bg="#ffffff"
              border="1px solid #e2e8f0"
              borderRadius="6px"
              size="sm"
              color="#64748b"
              _hover={{ bg: "#f8fafc", borderColor: "#cbd5e1" }}
              _disabled={{
                opacity: 0.3,
                cursor: "not-allowed",
                _hover: { bg: "#ffffff" },
              }}
              aria-label="Previous clinics"
            />
            <IconButton
              icon={<FaChevronRight />}
              onClick={scrollRight}
              isDisabled={!canScrollRight}
              bg="#ffffff"
              border="1px solid #e2e8f0"
              borderRadius="6px"
              size="sm"
              color="#64748b"
              _hover={{ bg: "#f8fafc", borderColor: "#cbd5e1" }}
              _disabled={{
                opacity: 0.3,
                cursor: "not-allowed",
                _hover: { bg: "#ffffff" },
              }}
              aria-label="Next clinics"
            />
          </HStack>
        </Flex>

        {isLoading ? (
          <Flex gap={5} overflowX="hidden">
            {[...Array(3)].map((_, i) => (
              <Box
                key={i}
                minW="320px"
                w="320px"
                bg="#ffffff"
                borderRadius="10px"
                border="1px solid #f1f5f9"
                overflow="hidden"
              >
                <Skeleton height="180px" />
                <Box p={5}>
                  <Skeleton height="18px" width="80%" mb={3} />
                  <Skeleton height="14px" width="100%" mb={2} />
                  <Skeleton height="14px" width="90%" mb={2} />
                  <Skeleton height="14px" width="70%" mb={4} />
                  <Box h="1px" bg="#f1f5f9" mb={3} />
                  <Skeleton height="12px" width="40%" mb={2} />
                  <Skeleton height="12px" width="85%" />
                </Box>
              </Box>
            ))}
          </Flex>
        ) : data && data.length ? (
          <Box
            ref={scrollRef}
            overflowX="auto"
            overflowY="visible"
            css={{
              "&::-webkit-scrollbar": { display: "none" },
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
            position="relative"
            zIndex={1}
            w="100%"
          >
            <Flex gap={5} pb={4} align="stretch">
              {data.map((clinic) => (
                <Box
                  key={clinic.id}
                  as={Link}
                  to={`/clinic/${clinic.title}/${clinic.id}`}
                  minW="320px"
                  w="320px"
                  bg="#ffffff"
                  border="1px solid #f1f5f9"
                  borderRadius="10px"
                  overflow="hidden"
                  transition="all 0.2s ease"
                  cursor="pointer"
                  flexShrink={0}
                  _hover={{
                    transform: "translateY(-2px)",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
                    borderColor: "#cbd5e1",
                  }}
                  boxShadow="0 1px 3px rgba(0,0,0,0.1)"
                >
                  <Box
                    h="180px"
                    w="100%"
                    position="relative"
                    overflow="hidden"
                    bg="#f5f7fa"
                  >
                    <Image
                      src={
                        clinic.image
                          ? `${imageBaseURL}/${clinic.image}`
                          : "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=400&auto=format&fit=crop&q=60"
                      }
                      alt={clinic.title}
                      objectFit="cover"
                      w="100%"
                      h="100%"
                      fallback={
                        <Flex
                          bg="#f5f7fa"
                          w="100%"
                          h="100%"
                          align="center"
                          justify="center"
                          direction="column"
                          gap={2}
                        >
                          <FaHospital color="#94a3b8" size="24px" />
                          <Text color="#64748b" fontSize="12px" fontFamily="var(--font-primary)">
                            Clinic Image
                          </Text>
                        </Flex>
                      }
                    />
                    <Box
                      position="absolute"
                      top="12px"
                      left="12px"
                      bg="#ffffff"
                      px={2}
                      py={1}
                      borderRadius="4px"
                      border="1px solid #f1f5f9"
                    >
                      <Text fontSize="10px" fontWeight="600" color="#64748b" fontFamily="var(--font-primary)">
                        CLINIC
                      </Text>
                    </Box>
                  </Box>
                  <Box p={5}>
                    <Text
                      fontSize="16px"
                      fontWeight="600"
                      color="#0f172a"
                      lineHeight="1.3"
                      mb={3}
                      noOfLines={1}
                      fontFamily="var(--font-primary)"
                    >
                      {clinic.title}
                    </Text>
                    <Text
                      fontSize="13px"
                      color="#64748b"
                      lineHeight="1.4"
                      mb={4}
                      noOfLines={3}
                      fontFamily="var(--font-primary)"
                    >
                      {clinic.description ||
                        `Professional healthcare services with experienced medical staff. Comprehensive treatment and diagnostic facilities for quality patient care.`}
                    </Text>
                    <Box w="100%" h="1px" bg="#f1f5f9" mb={3} />
                    <Box>
                      <Flex align="center" gap={2} mb={2}>
                        <FaMapMarkerAlt color="#94a3b8" size="12px" />
                        <Text fontSize="12px" fontWeight="500" color="#64748b" fontFamily="var(--font-primary)">
                          Location
                        </Text>
                      </Flex>
                      <Text
                        fontSize="12px"
                        color="#64748b"
                        lineHeight="1.3"
                        noOfLines={2}
                        pl={5}
                        fontFamily="var(--font-primary)"
                      >
                        {clinic.address ||
                          `${
                            clinic.city_title || selectedCity?.name || "City"
                          }, ${clinic.state_title || "State"}`}
                      </Text>
                    </Box>
                    {clinic.phone && (
                      <Box mt={3} pt={3} borderTop="1px solid #f1f5f9">
                        <Text fontSize="11px" color="#94a3b8" textAlign="center" fontFamily="var(--font-primary)">
                          Call for appointments and consultations
                        </Text>
                      </Box>
                    )}
                  </Box>
                </Box>
              ))}
            </Flex>
          </Box>
        ) : (
          <NotAvailable name="Clinics" />
        )}

        {data && data.length > 3 && (
          <Flex justify="center" mt={8}>
            <Box
              bg="#2563eb"
              color="#ffffff"
              fontWeight="500"
              fontSize="14px"
              px={6}
              py={3}
              borderRadius="6px"
              _hover={{ bg: "#1d4ed8" }}
              cursor="pointer"
              textDecoration="none"
              fontFamily="var(--font-button)"
            >
              View All {data.length} Clinics
            </Box>
          </Flex>
        )}
      </Container>
    </Box>
  );
}