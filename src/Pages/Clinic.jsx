/* eslint-disable react/prop-types */
// @ts-nocheck
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  Text,
  VStack,
  Link as ChakraLink,
  Badge,
  HStack,
  Container,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { GET } from "../Controllers/ApiControllers";
import { useQuery } from "@tanstack/react-query";
import Loading from "../Components/Loading";
import GlightBoxSwiper from "./GlightBoxSwiper";
import { EmailIcon, PhoneIcon } from "@chakra-ui/icons";
import imageBaseURL from "../Controllers/image";
import NotAvailable from "../Components/NotAvailable";
import { 
  FaWhatsapp, 
  FaAmbulance, 
  FaMapMarkerAlt, 
  FaClock, 
  FaUserMd, 
  FaComments,
  FaHospital,
  FaPhone
} from "react-icons/fa";
import { MdPhone, MdLocationOn, MdEmail } from "react-icons/md";
import { BiImageAlt } from "react-icons/bi";
import DoctorsByClinic from "../Components/DoctorsByClinic";
import ClinicTestimonials from "../Components/ClinicTestimonials";

export default function Doctor() {
  const { id } = useParams();
  
  const getData = async () => {
    const res = await GET(`get_clinic/${id}`);
    return res.data;
  };
  const { isLoading, data } = useQuery({
    queryKey: ["Doctor", id],
    queryFn: getData,
  });

  const openNavigation = () => {
    const url = `https://www.google.com/maps?q=${data?.latitude},${data?.longitude}`;
    window.open(url, "_blank");
  };

  if (isLoading) return <Loading />;
  
  return (
    <Box bg="#fafbfc" minH="100vh" fontFamily="'Inter', sans-serif">
      {/* Clean Header */}
      <Box bg="#0f172a" borderBottom="1px solid #1e293b" py={{ base: 6, md: 8 }}>
        <Container maxW="1200px" px={{ base: 4, md: 6 }}>
          <VStack spacing={3} textAlign="center">
            <Text
              fontSize={{ base: "24px", md: "30px" }}
              fontWeight="600"
              color="#ffffff"
              fontFamily="var(--font-primary)"
            >
              Clinic Information
            </Text>
            <Text
              fontSize={{ base: "14px", md: "16px" }}
              color="rgba(255,255,255,0.8)"
              fontFamily="var(--font-primary)"
            >
              Complete healthcare facility details and services
            </Text>
          </VStack>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxW="1200px" px={{ base: 4, md: 6 }} py={{ base: 6, md: 8 }}>
        <Flex gap={6} direction={{ base: "column", lg: "row" }}>
          {/* Left Column - Clinic Details */}
          <Box w={{ base: "100%", lg: "40%" }}>
            <Box
              bg="#ffffff"
              border="1px solid #f1f5f9"
              borderRadius="10px"
              overflow="hidden"
              boxShadow="0 1px 3px rgba(0,0,0,0.1)"
            >
              {/* Clinic Profile Section */}
              <Box p={6}>
                <Flex alignItems="start" gap={4} mb={4}>
                  <Avatar
                    size="lg"
                    src={`${imageBaseURL}/${data.image}`}
                    fallback={
                      <Box bg="#f5f7fa" w="100%" h="100%" display="flex" alignItems="center" justifyContent="center">
                        <FaHospital color="#94a3b8" size="24px" />
                      </Box>
                    }
                    border="2px solid #f1f5f9"
                  />
                  <Box flex={1}>
                    <Text 
                      fontSize="18px" 
                      fontWeight="600" 
                      color="#0f172a" 
                      mb={2}
                      fontFamily="var(--font-primary)"
                    >
                      {data.title}
                    </Text>
                    <Flex align="center" gap={2} mb={2}>
                      <MdLocationOn color="#64748b" size="14px" />
                      <Text 
                        fontSize="13px" 
                        color="#64748b"
                        fontFamily="var(--font-primary)"
                      >
                        {data.address}
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
                      {data.city_title}, {data.state_title}
                    </Badge>
                  </Box>
                </Flex>

                {data?.stop_booking && (
                  <Alert
                    status="warning"
                    borderRadius="6px"
                    mb={4}
                    bg="#fef3c7"
                    border="1px solid #fbbf24"
                    py={3}
                  >
                    <AlertIcon color="#d97706" />
                    <Box>
                      <AlertTitle fontSize="13px" color="#d97706" fontFamily="var(--font-primary)">
                        Appointments Closed
                      </AlertTitle>
                      <AlertDescription fontSize="12px" color="#d97706" fontFamily="var(--font-primary)">
                        This clinic is not accepting appointments currently.
                      </AlertDescription>
                    </Box>
                  </Alert>
                )}

                <VStack spacing={3}>
                  <Button
                    leftIcon={<FaMapMarkerAlt />}
                    bg="#2563eb"
                    color="#ffffff"
                    size="md"
                    onClick={openNavigation}
                    w="100%"
                    borderRadius="6px"
                    fontWeight="500"
                    fontSize="14px"
                    h="44px"
                    fontFamily="var(--font-button)"
                    _hover={{ bg: "#1d4ed8" }}
                  >
                    Get Directions
                  </Button>

                  {(data?.ambulance_btn_enable === "true" ||
                    data?.ambulance_btn_enable === true ||
                    data?.ambulance_btn_enable === 1) && (
                    <Button
                      leftIcon={<FaAmbulance />}
                      bg="#dc2626"
                      color="#ffffff"
                      size="md"
                      as="a"
                      href={`tel:${data.ambulance_number}`}
                      w="100%"
                      borderRadius="6px"
                      fontWeight="500"
                      fontSize="14px"
                      h="44px"
                      fontFamily="var(--font-button)"
                      _hover={{ bg: "#b91c1c" }}
                    >
                      Emergency Ambulance
                    </Button>
                  )}
                </VStack>

                {data?.description?.length > 10 && (
                  <Box mt={4} p={4} bg="#f8fafc" borderRadius="6px">
                    <Text
                      color="#64748b"
                      fontSize="13px"
                      lineHeight="1.5"
                      fontFamily="var(--font-primary)"
                    >
                      {data.description}
                    </Text>
                  </Box>
                )}
              </Box>

              <Box h="1px" bg="#f1f5f9" />

              {/* Contact Details */}
              <Box p={6}>
                <Flex align="center" gap={2} mb={4}>
                  <FaPhone color="#64748b" size="16px" />
                  <Text 
                    fontSize="16px" 
                    fontWeight="600" 
                    color="#0f172a"
                    fontFamily="var(--font-primary)"
                  >
                    Contact Information
                  </Text>
                </Flex>
                <ContactDetails data={data} />
              </Box>

              <Box h="1px" bg="#f1f5f9" />

              {/* Clinic Images */}
              <Box p={6}>
                <Flex align="center" gap={2} mb={4}>
                  <BiImageAlt color="#64748b" size="16px" />
                  <Text 
                    fontSize="16px" 
                    fontWeight="600" 
                    color="#0f172a"
                    fontFamily="var(--font-primary)"
                  >
                    Clinic Gallery
                  </Text>
                </Flex>
                {data?.clinic_images && data?.clinic_images.length ? (
                  <Box bg="#f8fafc" p={3} borderRadius="6px">
                    <GlightBoxSwiper clinic_images={data?.clinic_images} />
                  </Box>
                ) : (
                  <Box bg="#f8fafc" p={4} borderRadius="6px" textAlign="center">
                    <Text fontSize="13px" color="#94a3b8" fontFamily="var(--font-primary)">
                      No images available
                    </Text>
                  </Box>
                )}
              </Box>

              <Box h="1px" bg="#f1f5f9" />

              {/* Opening Hours */}
              <Box p={6}>
                <Flex align="center" gap={2} mb={4}>
                  <FaClock color="#64748b" size="16px" />
                  <Text 
                    fontSize="16px" 
                    fontWeight="600" 
                    color="#0f172a"
                    fontFamily="var(--font-primary)"
                  >
                    Opening Hours
                  </Text>
                </Flex>
                {data?.opening_hours ? (
                  <VStack align="stretch" spacing={2}>
                    {Object.entries(JSON.parse(data.opening_hours)).map(
                      ([day, hours]) => (
                        <Flex
                          key={day}
                          justify="space-between"
                          align="center"
                          p={3}
                          borderRadius="6px"
                          bg="#f8fafc"
                          borderLeft="3px solid"
                          borderLeftColor={
                            hours === "eeee" || hours === null || hours === ""
                              ? "#dc2626"
                              : "#16a34a"
                          }
                        >
                          <Text 
                            fontSize="13px" 
                            fontWeight="500" 
                            textTransform="capitalize" 
                            color="#0f172a"
                            fontFamily="var(--font-primary)"
                          >
                            {day}
                          </Text>
                          <Text
                            fontSize="13px"
                            fontWeight="500"
                            color={
                              hours === "eeee" || hours === null || hours === ""
                                ? "#dc2626"
                                : "#16a34a"
                            }
                            fontFamily="var(--font-primary)"
                          >
                            {hours === "eeee" || hours === null || hours === ""
                              ? "Closed"
                              : hours}
                          </Text>
                        </Flex>
                      )
                    )}
                  </VStack>
                ) : (
                  <Box bg="#f8fafc" p={4} borderRadius="6px" textAlign="center">
                    <Text fontSize="13px" color="#94a3b8" fontFamily="var(--font-primary)">
                      Opening hours not available
                    </Text>
                  </Box>
                )}
              </Box>

              <Box h="1px" bg="#f1f5f9" />

              {/* Reviews */}
              <Box p={6}>
                <Flex align="center" gap={2} mb={4}>
                  <FaComments color="#64748b" size="16px" />
                  <Text 
                    fontSize="16px" 
                    fontWeight="600" 
                    color="#0f172a"
                    fontFamily="var(--font-primary)"
                  >
                    Patient Reviews
                  </Text>
                </Flex>
                <Box bg="#f8fafc" p={4} borderRadius="6px">
                  <ClinicTestimonials clinicId={id} />
                </Box>
              </Box>
            </Box>
          </Box>

          {/* Right Column - Doctors */}
          <Box w={{ base: "100%", lg: "60%" }}>
            <Box
              bg="#ffffff"
              border="1px solid #f1f5f9"
              borderRadius="10px"
              overflow="hidden"
              boxShadow="0 1px 3px rgba(0,0,0,0.1)"
            >
              {/* Header */}
              <Box p={6} bg="#f8fafc" borderBottom="1px solid #f1f5f9">
                <Flex align="center" justify="center" gap={3}>
                  <FaUserMd color="#64748b" size="18px" />
                  <Box textAlign="center">
                    <Text 
                      fontSize="16px" 
                      fontWeight="600" 
                      color="#0f172a"
                      fontFamily="var(--font-primary)"
                    >
                      Available Doctors
                    </Text>
                    <Text 
                      fontSize="13px" 
                      color="#64748b" 
                      mt={1}
                      fontFamily="var(--font-primary)"
                    >
                      {data.title}
                    </Text>
                  </Box>
                </Flex>
              </Box>
              
              {/* Doctors List */}
              <Box p={6}>
                <DoctorsByClinic clinicID={data.id} clinicName={data?.title} />
              </Box>
            </Box>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
}

const ContactDetails = ({ data }) => {
  const contactMethods = [
    {
      type: "email",
      icon: MdEmail,
      href: `mailto:${data.email}`,
      value: data.email,
      show: true,
      label: "Email",
    },
    {
      type: "phone",
      icon: FaPhone,
      href: `tel:${data.phone}`,
      value: data.phone,
      show: true,
      label: "Phone",
    },
    {
      type: "whatsapp",
      icon: FaWhatsapp,
      href: `https://wa.me/${data.whatsapp}`,
      value: data.whatsapp,
      show: true,
      label: "WhatsApp",
    },
    {
      type: "ambulance_number",
      icon: FaAmbulance,
      href: `tel:${data.ambulance_number}`,
      value: data.ambulance_number,
      show: data.ambulance_btn_enable === true || data.ambulance_btn_enable === 1,
      label: "Emergency",
    },
    {
      type: "phone_second",
      icon: MdPhone,
      href: `tel:${data.phone_second}`,
      value: data.phone_second,
      show: true,
      label: "Secondary Phone",
    },
  ];

  return (
    <VStack align="stretch" spacing={3}>
      {contactMethods
        .filter((item) => item.show && item.value)
        .map(({ type, icon: IconComponent, href, value, label }) => (
          <Flex 
            key={type}
            align="center" 
            p={3} 
            bg="#f8fafc" 
            borderRadius="6px"
            gap={3}
          >
            <IconComponent color="#64748b" size="14px" />
            <Box flex={1}>
              <Text 
                fontSize="11px" 
                color="#94a3b8" 
                fontWeight="500" 
                mb={1}
                fontFamily="var(--font-primary)"
              >
                {label}
              </Text>
              <ChakraLink
                href={href}
                isExternal
                color="#0f172a"
                fontSize="13px"
                fontWeight="500"
                _hover={{ color: "#475569" }}
                transition="color 0.2s"
                fontFamily="var(--font-primary)"
              >
                {value}
              </ChakraLink>
            </Box>
          </Flex>
        ))}
    </VStack>
  );
};