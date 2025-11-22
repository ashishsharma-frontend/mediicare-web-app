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
  Container,
  VStack,
} from "@chakra-ui/react";
import imageBaseURL from "./../Controllers/image";
import "swiper/css";
import { Link } from "react-router-dom";
import ErrorPage from "../Pages/ErrorPage";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { MdLocalHospital } from "react-icons/md";
import { useRef, useState, useEffect } from "react";

export default function Departments() {
  const scrollRef = useRef(null);
  const [scrollLeft, setScrollLeft] = useState(false);
  const [scrollRight, setScrollRight] = useState(true);

  const getData = async () => {
    const res = await GET("get_department_active");
    return res.data;
  };
  const { isLoading, data, error } = useQuery({
    queryKey: ["departments"],
    queryFn: getData,
  });

  const scrollLeftHandler = () => {
    if (scrollRef.current) {
      const scrollAmount = window.innerWidth < 768 ? 280 : 300;
      scrollRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    }
  };

  const scrollRightHandler = () => {
    if (scrollRef.current) {
      const scrollAmount = window.innerWidth < 768 ? 280 : 300;
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
  }, [data]);

  if (error) return <ErrorPage />;

  return (
    <Box
      style={{
        maxWidth: "1400px",
        width: "100%",
        margin: "0 auto",
        padding: "0 20px",
        marginTop: "80px",
        marginBottom: "60px",
      }}
      className="container"
      fontFamily="'Inter', sans-serif"
    >
      {data ? (
        <>
          {/* Header Section */}
          <Container maxW="1400px" px={0} mb={6}>
            <VStack spacing={4} align="start">
              <Box>
                <Text
                  fontWeight="600"
                  color="var(--color-heading)"
                  lineHeight="1.3"
                  mb={3}
                  style={{
                    fontSize: "clamp(1.2rem, 4vw, 1.5rem)",
                    fontFamily: "var(--font-primary)",
                  }}
                >
                  Our Specialized Departments
                </Text>
                <Text
                  color="#64748b"
                  lineHeight="1.5"
                  style={{
                    fontSize: "clamp(0.8rem, 3vw, 0.9rem)",
                    fontFamily: "var(--font-primary)",
                    maxWidth: "550px",
                  }}
                >
                  Experience the ease of finding everything you need under one
                  roof with our comprehensive departmental offerings.
                </Text>
              </Box>
            </VStack>
          </Container>

          {data?.length ? (
            <Box>
              {/* Header with Navigation */}
              <Flex
                justify="space-between"
                align="center"
                mb={6}
                direction={{ base: "column", md: "row" }}
                gap={{ base: 4, md: 0 }}
                style={{
                  marginTop: "3rem",
                }}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "12px" }}
                >
                  <Box p={2} bg="#f5f5f5" borderRadius="6px">
                    <MdLocalHospital size="18px" color="var(--color-button)" />
                  </Box>
                  <span
                    style={{
                      fontSize: "1.3rem",
                      fontWeight: "600",
                      color: "var(--color-heading)",
                      fontFamily: "var(--font-primary)",
                    }}
                  >
                    Departments
                  </span>
                </div>

                {/* Navigation Buttons */}
                <HStack spacing={2}>
                  <IconButton
                    icon={<FaChevronLeft />}
                    onClick={scrollLeftHandler}
                    isDisabled={!scrollLeft}
                    bg="white"
                    border="1px solid #ddd"
                    borderRadius="6px"
                    size="sm"
                    color="#666"
                    _hover={{
                      bg: "#f5f5f5",
                      borderColor: "#999",
                    }}
                    _disabled={{
                      opacity: 0.3,
                      cursor: "not-allowed",
                      _hover: { bg: "white" },
                    }}
                    aria-label="Previous"
                  />
                  <IconButton
                    icon={<FaChevronRight />}
                    onClick={scrollRightHandler}
                    isDisabled={!scrollRight}
                    bg="white"
                    border="1px solid #ddd"
                    borderRadius="6px"
                    size="sm"
                    color="#666"
                    _hover={{
                      bg: "#f5f5f5",
                      borderColor: "#999",
                    }}
                    _disabled={{
                      opacity: 0.3,
                      cursor: "not-allowed",
                      _hover: { bg: "white" },
                    }}
                    aria-label="Next"
                  />
                </HStack>
              </Flex>

              {/* Scrollable Cards Container */}
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
                pb={4} style={{ scrollBehavior: "smooth" , }}
              >
                <Flex
                  gap={{ base: 4, md: 5 }}
                  align="stretch"
                  direction="row"
                  flexWrap="nowrap" style={{marginTop : '1.2rem'}}
                >
                  {data?.map((item) => (
                    <Box
                      key={item.id}
                      as={Link}
                      to={`/department/${item.title}/${item.id}`}
                      minW={{ base: "200px", md: "220px" }}
                      w={{ base: "200px", md: "220px" }}
                      bg="white"
                      borderRadius="12px"
                      border="1px solid #e5e5e5"
                      overflow="hidden"
                      flexShrink={0}
                      transition="all 0.2s ease"
                      _hover={{
                        transform: "translateY(-4px)",
                        boxShadow: "0 8px 25px rgba(0,0,0,0.12)",
                        borderColor: "#ccc",
                      }}
                      boxShadow="0 2px 8px rgba(0,0,0,0.06)"
                      cursor="pointer"
                    >
                      <Box p={6} textAlign="center">
                        {/* Department Icon/Image */}
                        <Box
                          mx="auto"
                          mb={4}
                          w="80px"
                          h="80px"
                          bg="#f8fafc"
                          borderRadius="16px"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          border="2px solid #e2e8f0"
                          transition="all 0.2s ease"
                          _groupHover={{
                            backgroundColor: "#eff6ff",
                            borderColor: "#93c5fd",
                          }}
                        >
                          <Image
                            src={
                              item.image
                                ? `${imageBaseURL}/${item.image}`
                                : "imagePlaceholder.png"
                            }
                            w="50px"
                            h="50px"
                            objectFit="contain"
                            borderRadius="8px"
                            alt={item.title}
                          />
                        </Box>

                        {/* Department Name */}
                        <Text
                          fontSize={{ base: "15px", md: "16px" }}
                          fontWeight="600"
                          color="var(--color-heading)"
                          lineHeight="1.3"
                          noOfLines={2}
                          mb={2}
                          style={{
                            fontFamily: "var(--font-primary)",
                          }}
                        >
                          {item.title}
                        </Text>

                        {/* Simple Divider */}
                        <Box
                          w="30px"
                          h="2px"
                          bg="#e5e5e5"
                          mx="auto"
                          mt={4}
                          borderRadius="1px"
                          transition="all 0.2s ease"
                          _groupHover={{
                            bg: "var(--color-button)",
                            w: "50px",
                          }}
                        />
                      </Box>
                    </Box>
                  ))}
                </Flex>
              </Box>
            </Box>
          ) : (
            <VStack spacing={4} py={12} textAlign="center">
              <MdLocalHospital size="40px" color="#666" />
              <Text fontSize="18px" fontWeight="600" color="#333">
                No Departments Available
              </Text>
              <Text fontSize="14px" color="#666">
                Please check back later
              </Text>
            </VStack>
          )}
        </>
      ) : null}

      {/* Loading State */}
      {isLoading ? (
        <Box>
          {/* Header Loading */}
          <Container maxW="1400px" px={0} mb={6}>
            <VStack spacing={4} align="start">
              <Box>
                <Skeleton height="28px" width="350px" mb={3} />
                <Skeleton height="16px" width="500px" />
              </Box>
            </VStack>
          </Container>

          {/* Navigation Loading */}
          <Flex justify="space-between" align="center" mb={6}>
            <Flex align="center" gap={3}>
              <Skeleton w="42px" h="42px" borderRadius="6px" />
              <Box>
                <Skeleton height="22px" width="180px" mb={1} />
                <Skeleton height="14px" width="120px" />
              </Box>
            </Flex>
            <HStack spacing={2}>
              <Skeleton w="32px" h="32px" borderRadius="6px" />
              <Skeleton w="32px" h="32px" borderRadius="6px" />
            </HStack>
          </Flex>

          {/* Cards Loading */}
          <Flex gap={5} overflowX="hidden">
            {[...Array(6)].map((_, i) => (
              <Box
                key={i}
                minW="220px"
                w="220px"
                bg="white"
                borderRadius="12px"
                border="1px solid #e5e5e5"
                p={6}
                textAlign="center"
              >
                <Skeleton
                  w="80px"
                  h="80px"
                  borderRadius="16px"
                  mx="auto"
                  mb={4}
                />
                <Skeleton height="16px" width="70%" mx="auto" mb={2} />
                <Skeleton height="2px" width="30px" mx="auto" mt={4} />
              </Box>
            ))}
          </Flex>
        </Box>
      ) : null}

      {/* Error State */}
      {error ? (
        <VStack spacing={4} py={12} textAlign="center">
          <MdLocalHospital size="40px" color="#666" />
          <Text fontSize="18px" fontWeight="600" color="#333">
            Unable to Load Departments
          </Text>
          <Text fontSize="14px" color="#666">
            Something went wrong! Can't fetch departments.
          </Text>
        </VStack>
      ) : null}
    </Box>
  );
}
