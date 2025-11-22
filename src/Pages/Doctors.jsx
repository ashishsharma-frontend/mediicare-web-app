/* eslint-disable react-hooks/rules-of-hooks */
import { useQuery } from "@tanstack/react-query";
import { GET } from "../Controllers/ApiControllers";
import {
  Box,
  Flex,
  Image,
  Skeleton,
  Text,
  IconButton,
  HStack,
  Alert,
  AlertIcon,
  AlertTitle,
  InputGroup,
  InputLeftElement,
  Input,
  VStack,
  Badge,
  Button,
  Container,
  Stack,
} from "@chakra-ui/react";
import imageBaseURL from "./../Controllers/image";
import Loading from "../Components/Loading";
import RatingStars from "../Hooks/RatingStars";
import {
  FaInstagram,
  FaFacebook,
  FaTwitter,
  FaYoutube,
  FaUserMd,
  FaChevronLeft,
  FaChevronRight,
  FaMapMarkerAlt,
  FaClock,
  FaCalendarCheck,
  FaWhatsapp,
  FaPhone,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import ErrorPage from "./ErrorPage";
import { SearchIcon } from "@chakra-ui/icons";
import { useCity } from "../Context/SelectedCity";
import { BsHospitalFill } from "react-icons/bs";
import { MdVerified, MdLocationOn } from "react-icons/md";
import NotAvailable from "../Components/NotAvailable";
import LocationSeletor from "../Components/LocationSeletor";
import useSearchFilter from "../Hooks/UseSearchFilter";
import { useRef, useState, useEffect } from "react";

export default function Doctors() {
  const { selectedCity } = useCity();
  const scrollRef = useRef(null);
  const [scrollLeft, setScrollLeft] = useState(false);
  const [scrollRight, setScrollRight] = useState(true);

  const getData = async () => {
    const res = await GET(
      `get_doctor?active=1&city_id=${selectedCity?.id || ""}`
    );
    return res.data;
  };

  const { isLoading, data, error } = useQuery({
    queryKey: ["Doctors", selectedCity],
    queryFn: getData,
  });

  const { handleSearchChange, searchTerm, filteredData } =
    useSearchFilter(data);

  const scrollLeftHandler = () => {
    if (scrollRef.current) {
      const scrollAmount = window.innerWidth < 768 ? 300 : 350;
      scrollRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    }
  };

  const scrollRightHandler = () => {
    if (scrollRef.current) {
      const scrollAmount = window.innerWidth < 768 ? 300 : 350;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const handleScroll = () => {
    if (scrollRef.current) {
      const {
        scrollLeft: currentScroll,
        scrollWidth,
        clientWidth,
      } = scrollRef.current;
      setScrollLeft(currentScroll > 10);
      setScrollRight(currentScroll < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (scrollElement) {
      scrollElement.addEventListener("scroll", handleScroll);
      handleScroll();
      return () => scrollElement.removeEventListener("scroll", handleScroll);
    }
  }, [filteredData]);

  if (isLoading) return <Loading />;
  if (error) return <ErrorPage />;

  return (
    <Box bg="#fafbfc" minH="100vh" fontFamily="'Inter', sans-serif" style={{ marginBottom: "-5rem" }}>
      {/* Clean Header Section */}
      <Box
        bg="#0f172a"
        borderBottom="1px solid #1e293b"
        py={{ base: 6, md: 8 }}
      >
        <Container
          maxW="1200px"
          px={{ base: 4, md: 6 }}
          style={{
            width: "100%",
            display: "flex",
          }}
        >
          <VStack spacing={6}>
            <Box maxW="1400px">
              <Text
                fontWeight="600"
                color="#ffffff"
                lineHeight="1.3"
                mb={3}
                style={{
                  fontSize: "clamp(1.2rem, 4vw, 1.5rem)",
                  marginTop: "1.2rem",
                  fontFamily: "var(--font-primary)",
                }}
              >
                Find Doctors in {selectedCity?.name || "Your City"}
              </Text>
              <Text
                color="rgba(255,255,255,0.8)"
                lineHeight="1.5"
                style={{
                  fontSize: "clamp(0.8rem, 3vw, 0.9rem)",
                  marginBottom: "1rem",
                  maxWidth: '550px',
                  marginTop: '1.2rem',
                  fontFamily: "var(--font-primary)",
                }}
              >
                Find trusted doctors in your city and connect with qualified
                healthcare professionals for the care you need, right when you
                need it.
              </Text>
            </Box>

            {/* Simple Search Section */}
            <Box w="full" maxW="800px">
              <Stack direction={{ base: "column", md: "row" }} spacing={4}>
                <Box w={{ base: "full", md: "140px" }}>
                  <LocationSeletor type="search" />
                </Box>
                <Box flex={1}>
                  <InputGroup>
                    <InputLeftElement>
                      <SearchIcon color="#94a3b8" boxSize={4} />
                    </InputLeftElement>
                    <Input
                      placeholder="Search doctors..."
                      bg="#ffffff"
                      border="1px solid #e2e8f0"
                      borderRadius="8px"
                      fontSize="14px"
                      h="44px"
                      color="#0f172a"
                      _hover={{ borderColor: "#cbd5e1" }}
                      _focus={{
                        borderColor: "#2563eb",
                        boxShadow: "0 0 0 1px #2563eb",
                        outline: "none",
                      }}
                      _placeholder={{ color: "#94a3b8" }}
                      onChange={(e) => handleSearchChange(e.target.value)}
                      value={searchTerm}
                    />
                  </InputGroup>
                </Box>
              </Stack>
            </Box>
          </VStack>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxW="1200px" px={{ base: 4, md: 6 }} py={{ base: 6, md: 8 }}>
        {filteredData ? (
          <>
            {filteredData?.length ? (
              <Box>
                {/* Simple Header */}
                <Flex
                  justify="space-between"
                  align="center"
                  mb={6}
                  direction={{ base: "column", md: "row" }}
                  gap={{ base: 4, md: 0 }}
                >
                  <Flex align="center" gap={3}>
                    <Box p={2} bg="#f5f7fa" borderRadius="6px">
                      <FaUserMd size="18px" color="#2563eb" />
                    </Box>
                    <Box>
                      <Text
                        fontSize={{ base: "20px", md: "22px" }}
                        fontWeight="600"
                        color="#0f172a"
                        fontFamily="var(--font-primary)"
                      >
                        Available Doctors
                      </Text>
                      <Text fontSize="14px" color="#64748b" fontFamily="var(--font-primary)">
                        {filteredData.length} doctors found
                      </Text>
                    </Box>
                  </Flex>

                  {/* Clean Navigation */}
                  <HStack spacing={2}>
                    <IconButton
                      icon={<FaChevronLeft />}
                      onClick={scrollLeftHandler}
                      isDisabled={!scrollLeft}
                      bg="#ffffff"
                      border="1px solid #e2e8f0"
                      borderRadius="6px"
                      size="sm"
                      color="#64748b"
                      _hover={{
                        bg: "#f8fafc",
                        borderColor: "#cbd5e1",
                      }}
                      _disabled={{
                        opacity: 0.3,
                        cursor: "not-allowed",
                        _hover: { bg: "#ffffff" },
                      }}
                      aria-label="Previous"
                    />
                    <IconButton
                      icon={<FaChevronRight />}
                      onClick={scrollRightHandler}
                      isDisabled={!scrollRight}
                      bg="#ffffff"
                      border="1px solid #e2e8f0"
                      borderRadius="6px"
                      size="sm"
                      color="#64748b"
                      _hover={{
                        bg: "#f8fafc",
                        borderColor: "#cbd5e1",
                      }}
                      _disabled={{
                        opacity: 0.3,
                        cursor: "not-allowed",
                        _hover: { bg: "#ffffff" },
                      }}
                      aria-label="Next"
                    />
                  </HStack>
                </Flex>

                {/* Clean Cards Container */}
                <Box
                  ref={scrollRef}
                  overflowX="auto"
                  overflowY="visible"
                  onScroll={handleScroll}
                  css={{
                    "&::-webkit-scrollbar": { display: "none" },
                    scrollbarWidth: "none",
                    msOverflowStyle: "none",
                  }}
                  pb={4}
                >
                  <Flex
                    gap={{ base: 4, md: 5 }}
                    align="stretch"
                    direction="row"
                    flexWrap="nowrap"
                  >
                    {filteredData?.map((doctor) => (
                      <Box
                        key={doctor.id}
                        as={Link}
                        to={`/doctor/${doctor.user_id}`}
                        minW={{ base: "290px", md: "320px" }}
                        w={{ base: "290px", md: "320px" }}
                        bg="#ffffff"
                        borderRadius="10px"
                        border="1px solid #f1f5f9"
                        overflow="hidden"
                        flexShrink={0}
                        transition="all 0.2s ease"
                        _hover={{
                          transform: "translateY(-2px)",
                          boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
                          borderColor: "#cbd5e1",
                        }}
                        boxShadow="0 1px 3px rgba(0,0,0,0.1)"
                      >
                        <Box p={5}>
                          {/* Doctor Profile */}
                          <Flex align="start" gap={4} mb={4}>
                            <Box position="relative" flexShrink={0}>
                              <Box
                                w="70px"
                                h="70px"
                                borderRadius="10px"
                                overflow="hidden"
                                bg="#f5f7fa"
                              >
                                <Image
                                  src={
                                    doctor.image
                                      ? `${imageBaseURL}/${doctor.image}`
                                      : "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=140&auto=format&fit=crop&q=60"
                                  }
                                  w="100%"
                                  h="100%"
                                  objectFit="cover"
                                  alt={`Dr. ${doctor.f_name} ${doctor.l_name}`}
                                />
                              </Box>
                              <Box
                                position="absolute"
                                bottom="-2px"
                                right="-2px"
                                bg="#10b981"
                                borderRadius="full"
                                p={1}
                                border="2px solid white"
                              >
                                <MdVerified color="white" size="10px" />
                              </Box>
                            </Box>

                            <Box flex={1} minW={0}>
                              <Text
                                fontSize="16px"
                                fontWeight="600"
                                color="#0f172a"
                                lineHeight="1.3"
                                noOfLines={1}
                                mb={1}
                                fontFamily="var(--font-primary)"
                              >
                                Dr. {doctor.f_name} {doctor.l_name}
                              </Text>

                              <Text
                                fontSize="13px"
                                color="#64748b"
                                mb={2}
                                noOfLines={1}
                                fontFamily="var(--font-primary)"
                              >
                                {doctor.department_name}
                              </Text>

                              <Badge
                                bg="#f0f4f8"
                                color="#475569"
                                fontSize="10px"
                                px={2}
                                py={1}
                                borderRadius="4px"
                                textTransform="none"
                                fontWeight="500"
                              >
                                {doctor.specialization}
                              </Badge>
                            </Box>
                          </Flex>

                          {/* Rating */}
                          <Flex align="center" gap={2} mb={4}>
                            <RatingStars
                              rating={parseFloat(doctor.average_rating) || 0}
                              size={12}
                            />
                            <Text fontSize="12px" color="#64748b" fontWeight="500" fontFamily="var(--font-primary)">
                              {parseFloat(doctor.average_rating).toFixed(1)} (
                              {doctor.number_of_reviews})
                            </Text>
                          </Flex>

                          {/* Simple Stats */}
                          <Flex gap={2} mb={4}>
                            <Box
                              flex={1}
                              p={2}
                              bg="#f8fafc"
                              borderRadius="6px"
                              textAlign="center"
                            >
                              <Flex
                                align="center"
                                justify="center"
                                gap={1}
                                mb={1}
                              >
                                <FaClock size="10px" color="#64748b" />
                                <Text
                                  fontSize="10px"
                                  fontWeight="600"
                                  color="#64748b"
                                  fontFamily="var(--font-primary)"
                                >
                                  Experience
                                </Text>
                              </Flex>
                              <Text
                                fontSize="11px"
                                fontWeight="600"
                                color="#0f172a"
                                fontFamily="var(--font-primary)"
                              >
                                {doctor.ex_year}+ Years
                              </Text>
                            </Box>

                            <Box
                              flex={1}
                              p={2}
                              bg="#f8fafc"
                              borderRadius="6px"
                              textAlign="center"
                            >
                              <Flex
                                align="center"
                                justify="center"
                                gap={1}
                                mb={1}
                              >
                                <FaCalendarCheck size="10px" color="#64748b" />
                                <Text
                                  fontSize="10px"
                                  fontWeight="600"
                                  color="#64748b"
                                  fontFamily="var(--font-primary)"
                                >
                                  Done
                                </Text>
                              </Flex>
                              <Text
                                fontSize="11px"
                                fontWeight="600"
                                color="#0f172a"
                                fontFamily="var(--font-primary)"
                              >
                                {doctor.total_appointment_done}
                              </Text>
                            </Box>
                          </Flex>

                          {/* Clinic Info */}
                          <Box p={3} bg="#f8fafc" borderRadius="8px" mb={4}>
                            <Flex align="center" gap={2} mb={1}>
                              <BsHospitalFill color="#64748b" size="12px" />
                              <Text
                                fontSize="12px"
                                fontWeight="500"
                                color="#0f172a"
                                noOfLines={1}
                                fontFamily="var(--font-primary)"
                              >
                                {doctor.clinic_title}
                              </Text>
                            </Flex>
                            <Flex align="start" gap={2}>
                              <MdLocationOn
                                color="#94a3b8"
                                size="12px"
                                style={{ marginTop: "1px", flexShrink: 0 }}
                              />
                              <Text
                                fontSize="11px"
                                color="#64748b"
                                lineHeight="1.3"
                                noOfLines={2}
                                fontFamily="var(--font-primary)"
                              >
                                {doctor.clinics_address}
                              </Text>
                            </Flex>
                          </Box>

                          {/* Alert */}
                          {doctor?.stop_booking === 1 && (
                            <Alert
                              status="warning"
                              borderRadius="6px"
                              mb={4}
                              py={2}
                              bg="#fef3c7"
                              border="1px solid #fbbf24"
                            >
                              <AlertIcon boxSize={3} color="#d97706" />
                              <AlertTitle fontSize="11px" color="#d97706" fontFamily="var(--font-primary)">
                                Not accepting appointments
                              </AlertTitle>
                            </Alert>
                          )}

                          {/* Simple Buttons */}
                          <Flex gap={2} mb={4}>
                            <Button
                              size="sm"
                              bg="#2563eb"
                              color="#ffffff"
                              flex={1}
                              borderRadius="6px"
                              fontSize="12px"
                              h="36px"
                              fontWeight="500"
                              leftIcon={<FaCalendarCheck size="10px" />}
                              isDisabled={doctor?.stop_booking === 1}
                              fontFamily="var(--font-button)"
                              _hover={{
                                bg: "#1d4ed8",
                              }}
                              _disabled={{
                                opacity: 0.4,
                                cursor: "not-allowed",
                                _hover: { bg: "#2563eb" },
                              }}
                            >
                              Book Now
                            </Button>

                            <IconButton
                              size="sm"
                              bg="#f5f7fa"
                              border="1px solid #e2e8f0"
                              aria-label="WhatsApp"
                              icon={<FaWhatsapp size="12px" color="#25D366" />}
                              borderRadius="6px"
                              h="36px"
                              w="36px"
                              as="a"
                              href={`https://wa.me/${
                                doctor.whatsapp || doctor.phone
                              }`}
                              target="_blank"
                              onClick={(e) => e.stopPropagation()}
                              _hover={{
                                bg: "#f1f5f9",
                              }}
                            />

                            <IconButton
                              size="sm"
                              bg="#f5f7fa"
                              border="1px solid #e2e8f0"
                              aria-label="Call"
                              icon={<FaPhone size="10px" color="#64748b" />}
                              borderRadius="6px"
                              h="36px"
                              w="36px"
                              as="a"
                              href={`tel:${doctor.phone}`}
                              onClick={(e) => e.stopPropagation()}
                              _hover={{
                                bg: "#f1f5f9",
                              }}
                            />
                          </Flex>

                          {/* Simple Social Links */}
                          <Box pt={3} borderTop="1px solid #f1f5f9">
                            <HStack spacing={1} justify="center">
                              {doctor.insta_link && (
                                <IconButton
                                  size="xs"
                                  variant="ghost"
                                  aria-label="Instagram"
                                  icon={
                                    <FaInstagram size="12px" color="#94a3b8" />
                                  }
                                  borderRadius="4px"
                                  as="a"
                                  href={doctor.insta_link}
                                  target="_blank"
                                  onClick={(e) => e.stopPropagation()}
                                  _hover={{ bg: "#f8fafc" }}
                                />
                              )}
                              {doctor.fb_linik && (
                                <IconButton
                                  size="xs"
                                  variant="ghost"
                                  aria-label="Facebook"
                                  icon={<FaFacebook size="12px" color="#94a3b8" />}
                                  borderRadius="4px"
                                  as="a"
                                  href={doctor.fb_linik}
                                  target="_blank"
                                  onClick={(e) => e.stopPropagation()}
                                  _hover={{ bg: "#f8fafc" }}
                                />
                              )}
                              {doctor.twitter_link && (
                                <IconButton
                                  size="xs"
                                  variant="ghost"
                                  aria-label="Twitter"
                                  icon={<FaTwitter size="12px" color="#94a3b8" />}
                                  borderRadius="4px"
                                  as="a"
                                  href={doctor.twitter_link}
                                  target="_blank"
                                  onClick={(e) => e.stopPropagation()}
                                  _hover={{ bg: "#f8fafc" }}
                                />
                              )}
                              {doctor.you_tube_link && (
                                <IconButton
                                  size="xs"
                                  variant="ghost"
                                  aria-label="YouTube"
                                  icon={<FaYoutube size="12px" color="#94a3b8" />}
                                  borderRadius="4px"
                                  as="a"
                                  href={doctor.you_tube_link}
                                  target="_blank"
                                  onClick={(e) => e.stopPropagation()}
                                  _hover={{ bg: "#f8fafc" }}
                                />
                              )}
                            </HStack>
                          </Box>
                        </Box>
                      </Box>
                    ))}
                  </Flex>
                </Box>
              </Box>
            ) : (
              <NotAvailable name="Doctors" />
            )}
          </>
        ) : (
          <NotAvailable name="Doctors" />
        )}

        {/* Clean Loading State */}
        {isLoading && (
          <Flex gap={5} overflowX="hidden">
            {[...Array(3)].map((_, i) => (
              <Box
                key={i}
                minW="320px"
                w="320px"
                bg="#ffffff"
                borderRadius="10px"
                border="1px solid #f1f5f9"
                p={5}
              >
                <Flex gap={4} mb={4}>
                  <Skeleton w="70px" h="70px" borderRadius="10px" />
                  <Box flex={1}>
                    <Skeleton height="16px" width="70%" mb={2} />
                    <Skeleton height="13px" width="50%" mb={2} />
                    <Skeleton height="20px" width="60%" />
                  </Box>
                </Flex>
                <Skeleton height="12px" width="50%" mb={4} />
                <Flex gap={2} mb={4}>
                  <Skeleton height="35px" flex={1} />
                  <Skeleton height="35px" flex={1} />
                </Flex>
                <Skeleton height="50px" mb={4} />
                <Flex gap={2} mb={4}>
                  <Skeleton height="36px" flex={1} />
                  <Skeleton height="36px" width="36px" />
                  <Skeleton height="36px" width="36px" />
                </Flex>
              </Box>
            ))}
          </Flex>
        )}

        {/* Simple Error State */}
        {error && (
          <VStack spacing={4} py={12} textAlign="center">
            <FaUserMd size="40px" color="#64748b" />
            <Text fontSize="18px" fontWeight="600" color="#0f172a" fontFamily="var(--font-primary)">
              Unable to Load Doctors
            </Text>
            <Text fontSize="14px" color="#64748b" fontFamily="var(--font-primary)">
              Please try again later
            </Text>
          </VStack>
        )}
      </Container>
    </Box>
  );
}