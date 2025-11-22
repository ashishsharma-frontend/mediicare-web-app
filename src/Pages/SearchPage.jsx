import {
  Box,
  Button,
  Flex,
  FormControl,
  Grid,
  GridItem,
  Image,
  Input,
  SkeletonCircle,
  SkeletonText,
  Text,
  Container,
  VStack,
  HStack,
  Badge,
  IconButton,
  InputGroup,
  InputLeftElement,
  Skeleton,
} from "@chakra-ui/react";
import { useEffect, useState, useRef } from "react";
import { useCity } from "../Context/SelectedCity";
import { Link, useSearchParams } from "react-router-dom";
import { GET } from "../Controllers/ApiControllers";
import { useQuery } from "@tanstack/react-query";
import imageBaseURL from "../Controllers/image";
import RatingStars from "../Hooks/RatingStars";
import { 
  BsHospitalFill, 
  BsSearch 
} from "react-icons/bs";
import { 
  MdLocationOn, 
  MdVerified,
  MdLocalHospital,
  MdChevronLeft,
  MdChevronRight
} from "react-icons/md";
import { 
  FaUserMd, 
  FaClock, 
  FaCalendarCheck,
  FaWhatsapp,
  FaPhone
} from "react-icons/fa";
import { SearchIcon } from "@chakra-ui/icons";
import LocationSeletor from "../Components/LocationSeletor";
import NotAvailable from "../Components/NotAvailable";

const getDept = async () => {
  const res = await GET("get_department_active");
  return res.data;
};

function SearchPage() {
  const { selectedCity } = useCity();
  const [selectedDept, setselectedDept] = useState();
  const [searchTerm, setsearchTerm] = useState();
  const [searchParams, setSearchParams] = useSearchParams();
  const scrollRef = useRef(null);
  const [scrollLeft, setScrollLeft] = useState(false);
  const [scrollRight, setScrollRight] = useState(true);

  const { isLoading: deptLoading, data: deptData } = useQuery({
    queryKey: ["departments"],
    queryFn: getDept,
  });

  const getDoctors = async () => {
    const res = await GET(
      `get_doctor?active=1&city_id=${selectedCity?.id || ""}&department=${
        selectedDept?.id || ""
      }&search=${searchParams.get("search") || ""}`
    );
    return res.data;
  };

  const { isLoading, data } = useQuery({
    queryKey: [
      "Doctors",
      selectedCity,
      selectedDept,
      searchParams.get("search"),
    ],
    queryFn: getDoctors,
  });

  const scrollLeftHandler = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  const scrollRightHandler = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft: currentScroll, scrollWidth, clientWidth } = scrollRef.current;
      setScrollLeft(currentScroll > 10);
      setScrollRight(currentScroll < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    if (searchParams.get("search")) {
      setsearchTerm(searchParams.get("search"));
    } else {
      setsearchTerm("");
    }
  }, [searchParams]);

  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (scrollElement) {
      scrollElement.addEventListener("scroll", handleScroll);
      handleScroll();
      return () => scrollElement.removeEventListener("scroll", handleScroll);
    }
  }, [deptData]);

  return (
    <Box bg="#fafbfc" minH="100vh" fontFamily="'Inter', sans-serif">
      {/* Clean Header Section */}
      <Box
        bg="#0f172a"
        borderBottom="1px solid #1e293b"
        py={{ base: 8, md: 10 }}
      >
        <Container maxW="1200px" px={{ base: 4, md: 6 }}>
          <VStack spacing={6}>
            <Box textAlign="center">
              <Text
                fontWeight="600"
                color="#ffffff"
                lineHeight="1.3"
                mb={3}
                fontFamily="var(--font-primary)"
                style={{
                  fontSize: "clamp(1.5rem, 4vw, 2rem)",
                }}
              >
                Find Your Perfect Doctor
              </Text>
              <Text
                color="rgba(255,255,255,0.8)"
                lineHeight="1.5"
                fontFamily="var(--font-primary)"
                style={{
                  fontSize: "clamp(0.9rem, 3vw, 1.1rem)",
                  maxWidth: "500px",
                  margin: "0 auto"
                }}
              >
                Search for trusted healthcare professionals in your area
              </Text>
            </Box>

            {/* Modern Search Section */}
            <Box w="full" maxW="700px">
              <Box 
                p={3} 
                bg="#ffffff" 
                borderRadius="12px" 
                boxShadow="0 1px 3px rgba(0,0,0,0.1)"
                border="1px solid #f1f5f9"
              >
                <Flex
                  direction={{ base: "column", md: "row" }}
                  gap={3}
                  align="stretch"
                >
                  <Box w={{ base: "full", md: "160px" }}>
                    <LocationSeletor type="search" />
                  </Box>
                  
                  <Box flex={1}>
                    <InputGroup>
                      <InputLeftElement>
                        <SearchIcon color="#94a3b8" boxSize={4} />
                      </InputLeftElement>
                      <Input
                        placeholder="Search doctors, clinics, specializations..."
                        border="1px solid #e2e8f0"
                        borderRadius="8px"
                        fontSize="14px"
                        h="44px"
                        bg="#ffffff"
                        color="#0f172a"
                        _hover={{ borderColor: "#cbd5e1" }}
                        _focus={{
                          borderColor: "#2563eb",
                          boxShadow: "0 0 0 1px #2563eb",
                        }}
                        _placeholder={{ color: "#94a3b8" }}
                        value={searchTerm || ""}
                        onChange={(e) => setsearchTerm(e.target.value)}
                      />
                    </InputGroup>
                  </Box>
                  
                  <Button
                    bg="#2563eb"
                    color="#ffffff"
                    borderRadius="8px"
                    px={6}
                    h="44px"
                    fontSize="14px"
                    fontWeight="500"
                    fontFamily="var(--font-button)"
                    _hover={{ bg: "#1d4ed8" }}
                    onClick={() => {
                      setSearchParams({ search: searchTerm || "" });
                    }}
                  >
                    Search
                  </Button>
                </Flex>
              </Box>
            </Box>
          </VStack>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxW="1200px" px={{ base: 4, md: 6 }} py={8}>
        {/* Departments Section */}
        <Box
          bg="#ffffff"
          borderRadius="12px"
          p={6}
          mb={6}
          boxShadow="0 1px 3px rgba(0,0,0,0.1)"
          border="1px solid #f1f5f9"
        >
          <Flex justify="space-between" align="center" mb={4}>
            <Flex align="center" gap={3}>
              <Box p={2} bg="#f5f7fa" borderRadius="6px">
                <MdLocalHospital size="18px" color="#2563eb" />
              </Box>
              <Box>
                <Text 
                  fontSize="18px" 
                  fontWeight="600" 
                  color="#0f172a"
                  fontFamily="var(--font-primary)"
                >
                  Departments
                </Text>
                <Text 
                  fontSize="13px" 
                  color="#64748b"
                  fontFamily="var(--font-primary)"
                >
                  Filter by specialty
                </Text>
              </Box>
            </Flex>

            <HStack spacing={2}>
              <IconButton
                icon={<MdChevronLeft />}
                onClick={scrollLeftHandler}
                isDisabled={!scrollLeft}
                bg="#ffffff"
                border="1px solid #e2e8f0"
                borderRadius="6px"
                size="sm"
                color="#64748b"
                _hover={{ bg: "#f8fafc" }}
                _disabled={{ 
                  opacity: 0.3,
                  cursor: "not-allowed",
                  _hover: { bg: "#ffffff" }
                }}
                aria-label="Previous"
              />
              <IconButton
                icon={<MdChevronRight />}
                onClick={scrollRightHandler}
                isDisabled={!scrollRight}
                bg="#ffffff"
                border="1px solid #e2e8f0"
                borderRadius="6px"
                size="sm"
                color="#64748b"
                _hover={{ bg: "#f8fafc" }}
                _disabled={{ 
                  opacity: 0.3,
                  cursor: "not-allowed",
                  _hover: { bg: "#ffffff" }
                }}
                aria-label="Next"
              />
            </HStack>
          </Flex>

          <Box
            ref={scrollRef}
            overflowX="auto"
            onScroll={handleScroll}
            css={{
              "&::-webkit-scrollbar": { display: "none" },
              scrollbarWidth: "none",
            }}
          >
            <Flex gap={4} pb={2}>
              {(deptLoading ? [...Array(8)] : deptData)?.map((item, index) => (
                <Box
                  key={index}
                  minW="110px"
                  cursor="pointer"
                  onClick={() =>
                    selectedDept?.id === item?.id
                      ? setselectedDept(null)
                      : setselectedDept(item)
                  }
                  transition="all 0.2s ease"
                  _hover={{ transform: "translateY(-2px)" }}
                >
                  <VStack spacing={3} align="center">
                    {deptLoading ? (
                      <>
                        <SkeletonCircle size="60px" />
                        <Skeleton height="12px" width="70px" />
                      </>
                    ) : (
                      <>
                        <Box
                          w="60px"
                          h="60px"
                          borderRadius="12px"
                          overflow="hidden"
                          bg="#f8fafc"
                          border={
                            selectedDept?.id === item?.id
                              ? "3px solid #2563eb"
                              : "2px solid #f1f5f9"
                          }
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          transition="all 0.2s ease"
                        >
                          <Image
                            src={`${imageBaseURL}/${item.image}`}
                            w="35px"
                            h="35px"
                            objectFit="contain"
                            alt={item.title}
                          />
                        </Box>
                        <Text
                          fontSize="12px"
                          fontWeight="500"
                          color={selectedDept?.id === item?.id ? "#2563eb" : "#64748b"}
                          textAlign="center"
                          lineHeight="1.2"
                          fontFamily="var(--font-primary)"
                        >
                          {item.title}
                        </Text>
                      </>
                    )}
                  </VStack>
                </Box>
              ))}
            </Flex>
          </Box>
        </Box>

        {/* Doctors Section */}
        <Box
          bg="#ffffff"
          borderRadius="12px"
          p={6}
          boxShadow="0 1px 3px rgba(0,0,0,0.1)"
          border="1px solid #f1f5f9"
        >
          <Flex align="center" gap={3} mb={6}>
            <Box p={2} bg="#f5f7fa" borderRadius="6px">
              <FaUserMd size="18px" color="#2563eb" />
            </Box>
            <Box>
              <Text 
                fontSize="20px" 
                fontWeight="600" 
                color="#0f172a"
                fontFamily="var(--font-primary)"
              >
                Available Doctors
              </Text>
              <Text 
                fontSize="14px" 
                color="#64748b"
                fontFamily="var(--font-primary)"
              >
                {data?.length || 0} doctors found
              </Text>
            </Box>
          </Flex>

          {isLoading ? (
            <Grid templateColumns={{ base: "1fr", lg: "repeat(2, 1fr)" }} gap={5}>
              {[...Array(6)].map((_, index) => (
                <GridItem key={index}>
                  <Box
                    bg="#ffffff"
                    border="1px solid #f1f5f9"
                    borderRadius="10px"
                    p={5}
                  >
                    <Flex gap={4} align="start" mb={4}>
                      <SkeletonCircle size="80px" />
                      <Box flex={1}>
                        <Skeleton height="16px" width="70%" mb={2} />
                        <Skeleton height="12px" width="50%" mb={2} />
                        <Skeleton height="12px" width="60%" />
                      </Box>
                    </Flex>
                    <Skeleton height="40px" mb={3} />
                    <Skeleton height="30px" />
                  </Box>
                </GridItem>
              ))}
            </Grid>
          ) : data?.length ? (
            <Grid templateColumns={{ base: "1fr", lg: "repeat(2, 1fr)" }} gap={5}>
              {data.map((item) => (
                <GridItem key={item.id}>
                  <Box
                    as={Link}
                    to={`/doctor/${item.user_id}`}
                    bg="#ffffff"
                    border="1px solid #f1f5f9"
                    borderRadius="10px"
                    p={5}
                    transition="all 0.2s ease"
                    _hover={{
                      transform: "translateY(-2px)",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
                      borderColor: "#cbd5e1"
                    }}
                    cursor="pointer"
                  >
                    {/* Doctor Profile */}
                    <Flex gap={4} align="start" mb={4}>
                      <Box position="relative">
                        <Box
                          w="80px"
                          h="80px"
                          borderRadius="12px"
                          overflow="hidden"
                          bg="#f5f7fa"
                        >
                          <Image
                            src={
                              item.image
                                ? `${imageBaseURL}/${item.image}`
                                : "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=160&auto=format&fit=crop&q=60"
                            }
                            w="100%"
                            h="100%"
                            objectFit="cover"
                            alt={`Dr. ${item.f_name} ${item.l_name}`}
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
                          <MdVerified color="white" size="12px" />
                        </Box>
                      </Box>

                      <Box flex={1} minW={0}>
                        <Text
                          fontSize="16px"
                          fontWeight="600"
                          color="#0f172a"
                          lineHeight="1.3"
                          mb={1}
                          fontFamily="var(--font-primary)"
                        >
                          Dr. {item.f_name} {item.l_name}
                        </Text>
                        
                        <Text 
                          fontSize="13px" 
                          color="#64748b" 
                          mb={2}
                          fontFamily="var(--font-primary)"
                        >
                          {item.department_name} • {item.specialization}
                        </Text>

                        <Flex align="center" gap={2} mb={2}>
                          <RatingStars rating={parseFloat(item.average_rating) || 0} size={12} />
                          <Text 
                            fontSize="12px" 
                            color="#64748b" 
                            fontWeight="500"
                            fontFamily="var(--font-primary)"
                          >
                            {parseFloat(item.average_rating).toFixed(1)} ({item.number_of_reviews})
                          </Text>
                        </Flex>

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
                          {item.ex_year}+ Years Experience
                        </Badge>
                      </Box>
                    </Flex>

                    {/* Stats */}
                    <Flex gap={2} mb={4}>
                      <Box flex={1} p={2} bg="#f8fafc" borderRadius="6px" textAlign="center">
                        <Flex align="center" justify="center" gap={1} mb={1}>
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
                          {item.ex_year}+ Years
                        </Text>
                      </Box>
                      
                      <Box flex={1} p={2} bg="#f8fafc" borderRadius="6px" textAlign="center">
                        <Flex align="center" justify="center" gap={1} mb={1}>
                          <FaCalendarCheck size="10px" color="#64748b" />
                          <Text 
                            fontSize="10px" 
                            fontWeight="600" 
                            color="#64748b"
                            fontFamily="var(--font-primary)"
                          >
                            Appointments
                          </Text>
                        </Flex>
                        <Text 
                          fontSize="11px" 
                          fontWeight="600" 
                          color="#0f172a"
                          fontFamily="var(--font-primary)"
                        >
                          {item.total_appointment_done}
                        </Text>
                      </Box>
                    </Flex>

                    {/* Clinic Info */}
                    <Box p={3} bg="#f8fafc" borderRadius="8px" mb={4}>
                      <Flex align="center" gap={2} mb={2}>
                        <BsHospitalFill color="#64748b" size="12px" />
                        <Text 
                          fontSize="12px" 
                          fontWeight="500" 
                          color="#0f172a"
                          fontFamily="var(--font-primary)"
                        >
                          {item.clinic_title}
                        </Text>
                      </Flex>
                      <Flex align="start" gap={2}>
                        <MdLocationOn color="#94a3b8" size="12px" style={{ marginTop: "1px" }} />
                        <Text 
                          fontSize="11px" 
                          color="#64748b" 
                          lineHeight="1.3"
                          fontFamily="var(--font-primary)"
                        >
                          {item.clinics_address}
                        </Text>
                      </Flex>
                    </Box>

                    {/* Action Buttons */}
                    <Flex gap={2}>
                      <Button
                        size="sm"
                        bg="#2563eb"
                        color="#ffffff"
                        flex={1}
                        borderRadius="6px"
                        fontSize="12px"
                        h="36px"
                        fontWeight="500"
                        fontFamily="var(--font-button)"
                        _hover={{ bg: "#1d4ed8" }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        Book Appointment
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
                        href={`https://wa.me/${item.whatsapp || item.phone}`}
                        target="_blank"
                        onClick={(e) => e.stopPropagation()}
                        _hover={{ bg: "#f1f5f9" }}
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
                        href={`tel:${item.phone}`}
                        onClick={(e) => e.stopPropagation()}
                        _hover={{ bg: "#f1f5f9" }}
                      />
                    </Flex>
                  </Box>
                </GridItem>
              ))}
            </Grid>
          ) : (
            <NotAvailable name="Doctors" />
          )}
        </Box>
      </Container>
    </Box>
  );
}

export default SearchPage;