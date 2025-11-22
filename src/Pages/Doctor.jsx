/* eslint-disable react/prop-types */
// @ts-nocheck
import {
  Alert,
  AlertIcon,
  AlertTitle,
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  HStack,
  IconButton,
  Text,
  VStack,
  Link,
  Badge,
  Container,
} from "@chakra-ui/react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { GET } from "../Controllers/ApiControllers";
import { useQuery } from "@tanstack/react-query";
import Loading from "../Components/Loading";
import imageBaseURL from "../Controllers/image";
import { BiCalendar } from "react-icons/bi";
import {
  FaInstagram,
  FaFacebook,
  FaTwitter,
  FaYoutube,
  FaUserAlt,
  FaStethoscope,
  FaHospital,
  FaMapMarkerAlt,
  FaPhone,
} from "react-icons/fa";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MdHandshake, MdEmail, MdLocationOn } from "react-icons/md";
import { BsFillCameraVideoFill, BsHospitalFill } from "react-icons/bs";
import { GrEmergency } from "react-icons/gr";
import RatingStars from "../Hooks/RatingStars";
import user from "../Controllers/user";
import currency from "../Controllers/currency";
import DoctorReviews from "../Components/DoctorReviews";
import { EmailIcon, PhoneIcon } from "@chakra-ui/icons";
import { ImLocation } from "react-icons/im";
import GlightBoxSwiper from "./GlightBoxSwiper";

const feeData = [
  {
    id: 1,
    title: "OPD",
    fee: 400,
    service_charge: 0,
    created_at: "2024-01-28 12:39:29",
    updated_at: "2024-08-10 13:29:27",
  },
  {
    id: 2,
    title: "Video Consultant",
    fee: 250,
    service_charge: 20,
    created_at: "2024-01-28 12:40:11",
    updated_at: "2024-01-28 12:40:11",
  },
  {
    id: 3,
    title: "Emergency",
    fee: 500,
    service_charge: 30,
    created_at: "2024-01-28 12:40:11",
    updated_at: "2024-08-10 13:29:39",
  },
];

export default function Doctor() {
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const [doctor, setdoctor] = useState();
  const [appointmentType, setappointmentType] = useState();
  const navigate = useNavigate();
  const location = useLocation();

  const getData = async () => {
    const res = await GET(`get_doctor/${id}`);
    return res.data;
  };
  const { isLoading, data } = useQuery({
    queryKey: ["Doctor", id],
    queryFn: getData,
  });

  const isDisableTypeButton = (ID, doc) => {
    switch (ID) {
      case 1:
        return doc.video_appointment;
      case 2:
        return doc.clinic_appointment;
      case 3:
        return doc.emergency_appointment;
      default:
        return "Unknown Step";
    }
  };

  const getfee = (type, doc) => {
    switch (type) {
      case "OPD":
        return doc.opd_fee;
      case "Video Consultant":
        return doc.video_fee;
      case "Emergency":
        return doc.emg_fee;
      default:
        return doc.emg_fee;
    }
  };

  const googleMapsUrl = `https://www.google.com/maps?q=${data?.clinic_latitude},${data?.clinic_longitude}`;

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
              Doctor Profile
            </Text>
            <Text
              fontSize={{ base: "14px", md: "16px" }}
              color="rgba(255,255,255,0.8)"
              fontFamily="var(--font-primary)"
            >
              Professional healthcare information and booking
            </Text>
          </VStack>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxW="800px" px={{ base: 4, md: 6 }} py={{ base: 6, md: 8 }}>
        <Box
          bg="#ffffff"
          border="1px solid #f1f5f9"
          borderRadius="10px"
          overflow="hidden"
          boxShadow="0 1px 3px rgba(0,0,0,0.1)"
        >
          {/* Doctor Information */}
          <Box p={{ base: 5, md: 8 }}>
            <Flex
              direction={{ base: "column", md: "row" }}
              gap={6}
              align={{ base: "center", md: "flex-start" }}
              textAlign={{ base: "center", md: "left" }}
            >
              <Avatar
                size="2xl"
                src={`${imageBaseURL}/${data.image}`}
                fallback={
                  <Box bg="#f5f7fa" w="100%" h="100%" display="flex" alignItems="center" justifyContent="center">
                    <FaStethoscope color="#94a3b8" size="32px" />
                  </Box>
                }
                border="2px solid #f1f5f9"
              />

              <Box flex={1}>
                <Text
                  fontSize={{ base: "20px", md: "24px" }}
                  fontWeight="600"
                  color="#0f172a"
                  mb={2}
                  fontFamily="var(--font-primary)"
                >
                  Dr. {data.f_name} {data.l_name}
                </Text>
                <Text
                  fontSize="16px"
                  fontWeight="500"
                  color="#64748b"
                  mb={2}
                  fontFamily="var(--font-primary)"
                >
                  {data.department_name}
                </Text>
                <Badge
                  bg="#f0f4f8"
                  color="#475569"
                  fontSize="12px"
                  px={3}
                  py={1}
                  borderRadius="4px"
                  textTransform="none"
                  fontWeight="500"
                  mb={4}
                >
                  {data.specialization}
                </Badge>

                <Flex
                  gap={4}
                  mb={3}
                  wrap="wrap"
                  justify={{ base: "center", md: "flex-start" }}
                  align="center"
                >
                  <Text fontSize="13px" color="#64748b" fontWeight="500" fontFamily="var(--font-primary)">
                    {data.ex_year}+ Years Experience
                  </Text>
                  <Flex align="center" gap={2}>
                    <RatingStars rating={data.average_rating} size={12} />
                    <Text fontSize="13px" color="#64748b" fontWeight="500" fontFamily="var(--font-primary)">
                      {parseFloat(data.average_rating).toFixed(1)} ({data.number_of_reviews})
                    </Text>
                  </Flex>
                </Flex>

                <Flex
                  align="center"
                  gap={2}
                  fontSize="13px"
                  color="#64748b"
                  justify={{ base: "center", md: "flex-start" }}
                >
                  <FaUserAlt fontSize="11px" />
                  <Text fontFamily="var(--font-primary)">{data.total_appointment_done} Appointments Completed</Text>
                </Flex>
              </Box>
            </Flex>

            {/* Social Links */}
            <Flex
              gap={1}
              mt={6}
              justify={{ base: "center", md: "flex-start" }}
            >
              {data.insta_link && (
                <IconButton
                  as={Link}
                  href={data.insta_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  icon={<FaInstagram />}
                  size="sm"
                  variant="ghost"
                  color="#94a3b8"
                  _hover={{ bg: "#f8fafc" }}
                />
              )}
              {data.fb_linik && (
                <IconButton
                  as={Link}
                  href={data.fb_linik}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  icon={<FaFacebook />}
                  size="sm"
                  variant="ghost"
                  color="#94a3b8"
                  _hover={{ bg: "#f8fafc" }}
                />
              )}
              {data.twitter_link && (
                <IconButton
                  as={Link}
                  href={data.twitter_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter"
                  icon={<FaTwitter />}
                  size="sm"
                  variant="ghost"
                  color="#94a3b8"
                  _hover={{ bg: "#f8fafc" }}
                />
              )}
              {data.you_tube_link && (
                <IconButton
                  as={Link}
                  href={data.you_tube_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  icon={<FaYoutube />}
                  size="sm"
                  variant="ghost"
                  color="#94a3b8"
                  _hover={{ bg: "#f8fafc" }}
                />
              )}
            </Flex>
          </Box>

          <Box h="1px" bg="#f1f5f9" />

          {/* Clinic Information */}
          <Box p={{ base: 5, md: 8 }}>
            <Flex align="center" gap={2} mb={5}>
              <FaHospital color="#64748b" size="16px" />
              <Text fontSize="16px" fontWeight="600" color="#0f172a" fontFamily="var(--font-primary)">
                Clinic Information
              </Text>
            </Flex>

            <VStack align="stretch" spacing={4}>
              <Flex align="center" gap={3} p={3} bg="#f8fafc" borderRadius="6px">
                <BsHospitalFill color="#64748b" size="14px" />
                <Box flex={1}>
                  <Text fontSize="11px" color="#94a3b8" fontWeight="500" mb={1} fontFamily="var(--font-primary)">
                    Clinic Name
                  </Text>
                  <Link
                    href={googleMapsUrl}
                    isExternal
                    color="#0f172a"
                    fontSize="13px"
                    fontWeight="500"
                    _hover={{ color: "#475569" }}
                    fontFamily="var(--font-primary)"
                  >
                    {data.clinic_title}
                  </Link>
                </Box>
              </Flex>

              <Flex align="start" gap={3} p={3} bg="#f8fafc" borderRadius="6px">
                <MdLocationOn color="#64748b" size="14px" style={{ marginTop: "2px" }} />
                <Box flex={1}>
                  <Text fontSize="11px" color="#94a3b8" fontWeight="500" mb={1} fontFamily="var(--font-primary)">
                    Address
                  </Text>
                  <Link
                    href={googleMapsUrl}
                    isExternal
                    color="#0f172a"
                    fontSize="13px"
                    fontWeight="500"
                    _hover={{ color: "#475569" }}
                    lineHeight="1.3"
                    fontFamily="var(--font-primary)"
                  >
                    {data.clinics_address}
                  </Link>
                </Box>
              </Flex>

              {data.clinic_email && (
                <Flex align="center" gap={3} p={3} bg="#f8fafc" borderRadius="6px">
                  <MdEmail color="#64748b" size="14px" />
                  <Box flex={1}>
                    <Text fontSize="11px" color="#94a3b8" fontWeight="500" mb={1} fontFamily="var(--font-primary)">
                      Email
                    </Text>
                    <Link
                      href={`mailto:${data.clinic_email}`}
                      isExternal
                      color="#0f172a"
                      fontSize="13px"
                      fontWeight="500"
                      _hover={{ color: "#475569" }}
                      fontFamily="var(--font-primary)"
                    >
                      {data.clinic_email}
                    </Link>
                  </Box>
                </Flex>
              )}

              {data.clinic_phone && (
                <Flex align="center" gap={3} p={3} bg="#f8fafc" borderRadius="6px">
                  <FaPhone color="#64748b" size="14px" />
                  <Box flex={1}>
                    <Text fontSize="11px" color="#94a3b8" fontWeight="500" mb={1} fontFamily="var(--font-primary)">
                      Phone
                    </Text>
                    <Link
                      href={`tel:${data.clinic_phone}`}
                      isExternal
                      color="#0f172a"
                      fontSize="13px"
                      fontWeight="500"
                      _hover={{ color: "#475569" }}
                      fontFamily="var(--font-primary)"
                    >
                      {data.clinic_phone}
                    </Link>
                  </Box>
                </Flex>
              )}
            </VStack>
          </Box>

          {/* Clinic Images */}
          {data?.clinic_images && data?.clinic_images.length > 0 && (
            <>
              <Box h="1px" bg="#f1f5f9" />
              <Box p={{ base: 5, md: 8 }}>
                <Text fontSize="16px" fontWeight="600" color="#0f172a" mb={4} fontFamily="var(--font-primary)">
                  Clinic Gallery
                </Text>
                <Box bg="#f8fafc" p={3} borderRadius="6px">
                  <GlightBoxSwiper clinic_images={data?.clinic_images} />
                </Box>
              </Box>
            </>
          )}

          <Box h="1px" bg="#f1f5f9" />

          {/* Booking Section */}
          <Box p={{ base: 5, md: 8 }}>
            {(data?.stop_booking === 1 || data.stop_booking === true) && (
              <Alert
                status="warning"
                borderRadius="6px"
                mb={6}
                bg="#fef3c7"
                border="1px solid #fbbf24"
              >
                <AlertIcon color="#d97706" />
                <AlertTitle fontSize="13px" color="#d97706" fontFamily="var(--font-primary)">
                  Doctor not accepting appointments
                </AlertTitle>
              </Alert>
            )}

            {(data?.clinic_stop_booking === 1 || data.clinic_stop_booking === true) && (
              <Alert
                status="warning"
                borderRadius="6px"
                mb={6}
                bg="#fef3c7"
                border="1px solid #fbbf24"
              >
                <AlertIcon color="#d97706" />
                <AlertTitle fontSize="13px" color="#d97706" fontFamily="var(--font-primary)">
                  Clinic not scheduling appointments currently
                </AlertTitle>
              </Alert>
            )}

            <Button
              w="full"
              h="44px"
              bg="#2563eb"
              color="#ffffff"
              fontSize="14px"
              fontWeight="500"
              borderRadius="6px"
              leftIcon={<BiCalendar />}
              fontFamily="var(--font-button)"
              onClick={() => {
                if (user) {
                  setdoctor(data);
                  setOpen(!open);
                } else {
                  navigate(`/login?ref=${location.pathname}`);
                }
              }}
              isDisabled={
                data?.stop_booking === 1 ||
                data.stop_booking === true ||
                data?.clinic_stop_booking === 1 ||
                data.clinic_stop_booking === true
              }
              _hover={{ bg: "#1d4ed8" }}
              _disabled={{
                bg: "#f1f5f9",
                color: "#94a3b8",
                cursor: "not-allowed",
              }}
            >
              Book Appointment
            </Button>

            <AnimatePresence>
              {open && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  style={{ overflow: "hidden" }}
                >
                  <Box mt={6}>
                    <Text
                      fontSize="16px"
                      fontWeight="500"
                      color="#0f172a"
                      mb={4}
                      fontFamily="var(--font-primary)"
                    >
                      Select Appointment Type
                    </Text>

                    <VStack spacing={3}>
                      {feeData.map((fee) => (
                        <Box
                          key={fee.id}
                          w="full"
                          p={4}
                          border="1px solid"
                          borderColor={
                            appointmentType?.id === fee.id
                              ? "#cbd5e1"
                              : isDisableTypeButton(fee?.id, data) === 1
                              ? "#e2e8f0"
                              : "#f1f5f9"
                          }
                          borderRadius="6px"
                          bg={
                            appointmentType?.id === fee.id
                              ? "#f8fafc"
                              : isDisableTypeButton(fee?.id, data) === 1
                              ? "#ffffff"
                              : "#f8fafc"
                          }
                          cursor={
                            isDisableTypeButton(fee?.id, data) === 1
                              ? "pointer"
                              : "not-allowed"
                          }
                          opacity={
                            isDisableTypeButton(fee?.id, data) === 1 ? 1 : 0.5
                          }
                          onClick={(e) => {
                            if (isDisableTypeButton(fee?.id, data) === 0) {
                              e.stopPropagation();
                              return;
                            }
                            e.stopPropagation();
                            setappointmentType(
                              appointmentType?.id === fee?.id ? null : fee
                            );
                            navigate(
                              `/book-appointment/${doctor.user_id}/${fee.id}`
                            );
                          }}
                          _hover={
                            isDisableTypeButton(fee?.id, data) === 1
                              ? {
                                  borderColor: "#cbd5e1",
                                  bg: "#f8fafc",
                                }
                              : {}
                          }
                          transition="all 0.2s"
                        >
                          <Flex align="center" justify="space-between">
                            <Flex align="center" gap={3}>
                              <Box color="#64748b">
                                {fee.id === 1 ? (
                                  <MdHandshake fontSize="18px" />
                                ) : fee.id === 2 ? (
                                  <BsFillCameraVideoFill fontSize="18px" />
                                ) : fee.id === 3 ? (
                                  <GrEmergency fontSize="18px" />
                                ) : null}
                              </Box>

                              <Text
                                fontSize="14px"
                                fontWeight="500"
                                color="#0f172a"
                                fontFamily="var(--font-primary)"
                              >
                                {fee.id === 2 ? "Video Call" : fee.title}
                              </Text>
                            </Flex>

                            <Text
                              fontSize="14px"
                              fontWeight="600"
                              color="#0f172a"
                              fontFamily="var(--font-primary)"
                            >
                              {getfee(fee.title, data)} {currency}
                            </Text>
                          </Flex>
                        </Box>
                      ))}
                    </VStack>
                  </Box>
                </motion.div>
              )}
            </AnimatePresence>
          </Box>

          <Box h="1px" bg="#f1f5f9" />

          {/* Reviews Section */}
          <Box p={{ base: 5, md: 8 }}>
            <Text fontSize="16px" fontWeight="600" color="#0f172a" mb={4} fontFamily="var(--font-primary)">
              Patient Reviews
            </Text>
            <DoctorReviews id={id} />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}